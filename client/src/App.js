import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from './components/LandingPage/LandingPage'
import LandingPage2 from './components/LandingPage/LandingPage2'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from "./components/RegisterPage/RegisterPage";
import NewDiaryPage from "./components/NewDiaryPage/NewDiaryPage";
import ShowDiaryPage from "./components/ShowDiaryPage/ShowDiaryPage.js";
import MyPage from "./components/MyPage/MyPage.js";
import Auth from './hoc/auth'

function App() {

  // const AuthLandingPage = Auth(LandingPage, false);
  // const AuthLoginPage = Auth(LoginPage, false);
  // const AuthRegisterPage = Auth(RegisterPage, false);
  // const AuthLandingPage2 = Auth(LandingPage2, true);
  // const AuthNewDiaryPage = Auth(NewDiaryPage, true);
  // const AuthShowDiaryPage = Auth(ShowDiaryPage, true);
  // const AuthMyPage = Auth(MyPage, true);


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<AuthLandingPage />} />
        <Route exact path="/after" element={<AuthLandingPage2 />} />
        <Route exact path="/login" element={<AuthLoginPage />} />
        <Route exact path="/register" element={<AuthRegisterPage />} />
        <Route exact path="/newdiary" element={<AuthNewDiaryPage />} />
        <Route exact path="/showdiary" element={<AuthShowDiaryPage />} />
        <Route exact path="/mypage" element={<AuthMyPage />} /> */}
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/after" element={<LandingPage2 />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/newdiary" element={<NewDiaryPage />} />
        <Route exact path="/showdiary" element={<ShowDiaryPage />} />
        <Route exact path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
