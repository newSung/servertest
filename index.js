require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

const { User } = require("./server/models/User");
const { Diary } = require("./server/models/Diary");
const { Frequest } = require("./server/models/FriendRequest");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

// const config = require('./config/key')

const { auth } = require("./server/middleware/auth")

// app.use(cors({
//     origin: 'https://gregarious-meerkat-c611cb.netlify.app',
// }));
app.use(cors())



//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose')
//mongoose.set('strictQuery', true);
// mongoose.connect(config.mongoURI, {
mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('db connected'))
    .catch(err => console.log(err))


app.get('/', (req, res) => { res.send('hellossssssssssssssss world') })

//test
app.get('/api/test', (req, res) => {
    return res.json({ text: 'test success' })
})

//회원가입
app.post('/api/users/register', (req, res) => {

    //회원가입 정보를 client에서 데이터베이스에 전달

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})
//로그인
app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //이메일과 비밀번호가 같은지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            //같으면 토큰생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 쿠키 ,로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.delete('/api/users/delete', (req, res) => {

    User.findOne({ token: req.cookies.x_auth }, (err, user) => {
        // console.log(req)
        user.comparePassword(req.body.curpw, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "현재 비밀번호가 틀렸습니다." })
        })

        const userId = user.username;

        Diary.deleteMany({ username: userId }, (err, diaries) => {
            if (err) {
                return res.status(500).json({ success: false, error: '삭제할수 없습니다.' });
            }
        })


        // 유저 삭제 전, 친구 리스트를 조회하여 해당 유저를 삭제
        User.find({ friends: userId }, (err, usersWithFriend) => {
            if (err) {
                // console.error(err);
                return res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
            }
            // console.log(usersWithFriend)

            usersWithFriend.forEach(user => {
                user.friends = user.friends.filter(friendId => friendId !== userId);
                console.log(user.friends)
                user.save((err) => {
                    if (err) {
                        // console.error(err);
                    }
                });
            });

            //유저 삭제
            User.findByIdAndDelete(user._id, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
                }

                res.json({ success: true, message: "유저가 삭제되었습니다." });
            });
        });
    })
})


app.put('/api/users/change', (req, res) => {
    console.log(req.body)
    User.findOne({ token: req.cookies.x_auth }, (err, user) => {
        console.log(user)
        user.comparePassword(req.body.curpw, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "현재 비밀번호가 틀렸습니다." })
            if (req.body.newpw === req.body.curpw)
                return res.json({ loginSuccess2: false, message: "현재 비밀번호와 바꾸려는 비밀번호가 같습니다" })

            user.password = req.body.newpw
            user.save((err, Info) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({
                    success: true
                })
            })
        }
        )
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 왔다면 authentication 이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role,
        registerDate: req.user.registerDate,
        friends: req.user.friends
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })

        })
})

app.delete('/api/users/frienddelete/:username', auth, (req, res) => {
    const friendUsername = req.params.username;

    // User 스키마에서 friendUsername으로 검색 후 해당 유저의 friends 필드에서 req.user.username 삭제
    User.findOneAndUpdate({ username: friendUsername }, { $pull: { friends: req.user.username } }, { new: true }, (err, friendUser) => {
        if (err) {
            res.status(500).send(err);
        } else if (!friendUser) {
            res.status(404).send('Friend user not found');
        } else {
            // User 스키마에서 req.user.username으로 검색 후 해당 유저의 friends 필드에서 friendUsername 삭제
            User.findOneAndUpdate({ username: req.user.username }, { $pull: { friends: friendUsername } }, { new: true }, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else if (!user) {
                    res.status(404).send('User not found');
                } else {
                    res.json(user);
                }
            });
        }
    });
});


app.get('/api/users/search/:username', (req, res) => {
    console.log(req.params.username)
    User.findOne({ username: req.params.username }
        , (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else if (!user) {
                res.send('User not found');
            } else {
                res.send(user);
            }
        })

})

app.delete('/api/friendrequest/delete/:_id', (req, res) => {
    console.log(req.params)
    Frequest.findOneAndDelete({ _id: req.params._id }, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ success: true })
        }
    })
})

app.post('/api/friendrequest/addfriend/:_id', (req, res) => {
    Frequest.findOne({ _id: req.params._id }, (err, freq) => {
        User.findOne({ username: freq.username }, (err, user) => {
            user.friends.push(freq.from)
            user.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    User.findOne({ username: freq.from }, (err, user2) => {
                        user2.friends.push(freq.username)
                        user2.save((err) => {
                            if (err) {
                                res.status(500).send(err);
                            }
                            else {
                                Frequest.findOneAndDelete({ _id: req.params._id }, (err) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        res.json({ success: true })
                                    }
                                })
                            }
                        })
                    })
                }
            })
        })
    })
})

app.post('/api/friendrequest/add', (req, res) => {
    User.findOne({ username: req.body.from, friends: req.body.username }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else if (user) {
            return res.json({ err: "이미 친구입니다" })
        }
        else {
            Frequest.findOne({ username: req.body.username, from: req.body.from }, (err, freq) => {
                if (freq) {
                    return res.json({ success: false, err })
                }
                else {
                    const frequest = new Frequest(req.body)

                    frequest.save((err, frequestInfo) => {
                        if (err) {
                            console.log(err)
                            return res.json({ success: false, err })
                        }
                        return res.status(200).json({
                            success: true
                        })
                    })

                }
            })

        }

    })




})

app.post('/api/diary/write', (req, res) => {
    const diary = new Diary(req.body)
    diary.save((err, diaryInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })

})
app.get('/api/diary/read', auth, (req, res) => {
    // Diary.find({ username: req.user.username }
    //     , (err, diaries) => {
    //         if (err) return res.json({ success: false, err });
    //         return res.status(200).send(diaries)
    //     })
    const { username, friends } = req.user;
    Diary.find({ username: { $in: [...friends, username] } }
        , (err, diaries) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send(diaries)
        })

})
app.get('/api/friendrequest/read', auth, (req, res) => {
    Frequest.find({ username: req.user.username }
        , (err, flist) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send(flist)
        })

})

app.put('/api/diary/update', (req, res) => {
    Diary.findOneAndUpdate({ _id: req.body._id },
        { title: req.body.title, diary: req.body.diary }
        , (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})
app.delete('/api/diary/delete', (req, res) => {
    console.log(req.body)
    Diary.deleteOne({ _id: req.body._id }, (err) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            deletesuccess: true
        })
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
