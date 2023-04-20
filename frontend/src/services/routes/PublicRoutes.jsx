/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";
import SignupPage from "../../pages/signup/SignupPage";
import LandingPage from "../../pages/landing/LandingPage";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default PublicRoutes;
