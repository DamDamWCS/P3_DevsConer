/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import MultiSelected from "../../components/subjects/multiSelected/MultiSelected";
import SubjectList from "../../components/subjects/SubjectList/SUbjectList";
import "./SubjectListPage.css";
import CreateSubject from "../../components/subjects/createSubject/CreateSubject";

function SubjectListPage() {
  const [reload, setReload] = useState(false);
  const [showModalCreateSubject, setShowModalCreateSubject] = useState(false);
  const [options, setOptions] = useState();
  const [selectedValue, setSelectedValue] = useState([]); // tag sélectionné
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((tags) => {
        const optionsTags = tags.map((tag) => ({
          label: tag.name,
          value: tag.id,
        }));
        setOptions(optionsTags);
      });
  }, []);

  useEffect(() => {
    if (selectedValue.length > 0) {
      const tagsQueryString = `?tag=${selectedValue
        .map(({ value }) => value)
        .join("&tag=")}`;
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/subjects${tagsQueryString}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => setSubjects(result));
    } else {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subjects`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => setSubjects(result));
    }
  }, [selectedValue, reload]);

  // PAGINATION
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = subjects.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(subjects.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % subjects.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="b-shadow flex-grow-1 rounded bg-white m-3 m-sm-4 py-3 px-2">
      <div className="d-flex flex-column contenairSubjectList mx-auto  my-sm-5">
        <div>
          <div className="d-flex align-items-center mr-3 justify-content-between justify-content-sm-start">
            <h1 className="display-1 text-primary d-inline ml-1 mr-4 ">
              LISTE DES SUJETS
            </h1>
            <button
              type="button"
              onClick={() => setShowModalCreateSubject(true)}
              className="btn btn-primary py-1 px-4 px-sm-2"
            >
              + <span className="d-none d-sm-inline">Nouveau</span>
            </button>
          </div>
          {options && (
            <MultiSelected
              options={options}
              setOptions={setOptions}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          )}
          {currentItems &&
            currentItems.map((subject) => (
              <div key={subject.id}>
                <SubjectList subject={subject} />
              </div>
            ))}
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
      </div>
      {options && (
        <CreateSubject
          options={options}
          setOptions={setOptions}
          showModalCreateSubject={showModalCreateSubject}
          setShowModalCreateSubject={setShowModalCreateSubject}
          reload={reload}
          setReload={setReload}
        />
      )}
    </div>
  );
}

export default SubjectListPage;
