/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Subject from "../../components/subject/Subject";
import Answer from "../../components/answer/answer";
import TokenContext from "../../services/context/TokenContext";
import EditSubject from "../../components/editSubject/EditSubject";
import AddAnswer from "../../components/addAnswer/AddAnswer";
import "./subjectPage.css";

const InitData = {
  id: 0,
};
function SubjectPage() {
  const [showModalEditSubject, setShowModalEditSubject] = useState(false);
  const subjectId = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(InitData);
  const [answers, setAnswers] = useState([]);
  const { user } = useContext(TokenContext);
  const [isLoading, setIsloading] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadAnswers, setReloadAnswers] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // PAGINATION
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = answers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(answers.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % answers.length;
    setItemOffset(newOffset);
  };

  const myInit = {
    method: "GET",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  };

  const onAnswerDeleted = (id) => {
    setAnswers(answers.filter((answer) => id !== answer.id));
  };

  useEffect(() => {
    setIsloading(true);
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/subjects/${subjectId.id}`,
      myInit
    )
      .then((response) => {
        if (response.ok) return response.json();
        navigate("/");
        throw new Error(`subject ${response.statusText}`);
      })
      .then((data) => {
        setSubject(data);
        setIsloading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
        console.warn(error.message);
      });
  }, [reload]);

  useEffect(() => {
    if (subject.id) {
      setAnswers([]);
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/answers/${subject.id}`,
        myInit
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(`answer ${response.statusText}`);
        })
        .then((data) => {
          setAnswers(data);
        })
        .catch((error) => {
          setErrorMessage(error);
          console.warn(error.message);
        });
    }
  }, [subject, reloadAnswers]);
  return (
    <div className="d-flex flex-column align-items-center b-shadow flex-grow-1 rounded bg-white m-3 m-sm-4 pt-3 px-2 ">
      {isLoading && <div>Chargement</div>}
      {subject.id && user && (
        <div className="pt-sm-4 contenairSubject w-100">
          <div className="d-flex flex-wrap align-items-center">
            <h1 className="display-1 text-primary d-inline mt-1 ml-1 mr-3 ">
              {subject.title.toUpperCase()}
            </h1>
            <div className="d-flex">
              {subject.tags.map((elem) => {
                return (
                  <div
                    key={elem.id}
                    className="bg-primary text-white rounded px-2 py-1 mr-1 tags"
                  >
                    {elem.name}
                  </div>
                );
              })}
              {subject.status_resolve === 0 ? null : (
                <div className="bg-success text-white rounded px-2 py-1 mr-1 tags">
                  clos
                </div>
              )}
            </div>
          </div>
          <Subject
            key={subject.id}
            user={user}
            subject={subject}
            setShowModalEditSubject={setShowModalEditSubject}
            reload={reload}
            setReload={setReload}
          />
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {answers
        ? answers
            .filter((elem) => subject.best_answer === elem.id)
            .map((elem) => (
              <div className="w-100 contenairSubject mt-4" key={elem.id}>
                <h1 className="w-100 contenairSubject text-primary mb-4">
                  MEILLEUR REPONSE
                </h1>
                <Answer
                  user={user}
                  answer={elem}
                  bestAnswerId={subject.best_answer}
                  subjectUserId={subject.user_id}
                  subjectId={subject.id}
                  reload={reloadAnswers}
                  setReload={setReloadAnswers}
                  onAnswerDeleted={onAnswerDeleted}
                />
              </div>
            ))
        : null}
      <div className="pt-4 w-100 contenairSubject">
        {answers && (
          <h1 className="d-flex justify-content-between text-primary mb-4">
            {answers.length} REPONSE{answers.length > 1 && "S"}
          </h1>
        )}
      </div>
      {currentItems.length === 0 && (
        <p>Il n'y a pas de réponse pour le moment !</p>
      )}
      {currentItems && (
        <>
          {currentItems.map((elem) => (
            <div key={elem.id} className="w-100 contenairSubject mb-4">
              <Answer
                user={user}
                answer={elem}
                bestAnswerId={subject.best_answer}
                subjectUserId={subject.user_id}
                subjectId={subject.id}
                reload={reload}
                setReload={setReload}
                onAnswerDeleted={onAnswerDeleted}
              />
            </div>
          ))}
          <div className="contenairSubject mb-4 w-100">
            <AddAnswer
              subjectId={subject.id}
              reload={reloadAnswers}
              setReload={setReloadAnswers}
            />
          </div>
          <div className="ReactPaginateStyle">
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <>
                  <span className="d-none d-sm-inline">suivant</span>
                  {" >"}
                </>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel={
                <>
                  {"< "}
                  <span className="d-none d-sm-inline">précédent</span>
                </>
              }
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      )}
      <p>{errorMessage.message}</p>
      <EditSubject
        showModalEditSubject={showModalEditSubject}
        setShowModalEditSubject={setShowModalEditSubject}
        subject={subject}
        reload={reload}
        setReload={setReload}
      />
    </div>
  );
}

export default SubjectPage;
