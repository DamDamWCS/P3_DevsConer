/* eslint-disable import/no-unresolved */
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SubjectList from "../SubjectList/SUbjectList";
import TokenContext from "../../services/context/TokenContext";

function MySubjects() {
  const [mySubjectList, setMySubjectList] = useState([]);
  const { user } = useContext(TokenContext);
  // PAGINATION
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = mySubjectList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(mySubjectList.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % mySubjectList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (user) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/subjects?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => setMySubjectList(result));
    }
  }, [user]);
  return (
    <>
      <h1 className="display-1 text-primary d-inline mx-sm-2 ">MES SUJETS</h1>
      <div className="mx-sm-1">
        {currentItems.length > 0 ? (
          <>
            {currentItems.map((subject) => (
              <div key={subject.id}>
                <SubjectList subject={subject} />
              </div>
            ))}
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
        ) : (
          <div className="text-center my-2">
            Vous n'avez pas encore posté de sujet !
          </div>
        )}
      </div>
    </>
  );
}

export default MySubjects;
