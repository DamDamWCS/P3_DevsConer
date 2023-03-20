/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes, Navigate } from "react-router-dom";
import SubjectListPage from "../../pages/subjectsList/SubjectsListPage";
import SubjectPage from "../../pages/subject/SubjectPage";
import Account from "../../pages/account/Account";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/Navbar";

function PrivateRoute() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SubjectListPage />} />
        <Route path="/subject/:id" element={<SubjectPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default PrivateRoute;
