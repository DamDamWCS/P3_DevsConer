import { Route, Routes, Navigate } from "react-router-dom";
import SubjectListPage from "../../pages/subjectsList/SubjectsListPage";
import SubjectPage from "../../pages/subject/SubjectPage";
import AccountPage from "../../pages/account/AccountPage";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/Navbar";

function PrivateRoute() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SubjectListPage />} />
        <Route path="/subject/:id" element={<SubjectPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default PrivateRoute;
