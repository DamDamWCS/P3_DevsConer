/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import DeleteItem from "../deleteItem/DeleteItem";
import TokenContext from "../../services/context/TokenContext";
import openCloseSubject from "./subjectFunctions";

function Subject({ subject, reload, setReload, setShowModalEditSubject }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useContext(TokenContext);

  const HandleopenCloseSubject = () => {
    openCloseSubject(subject.id, subject.status_resolve, reload, setReload);
  };

  // Gestion de la date
  const formatDateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  let dateString;
  if (subject.id !== 0) {
    dateString = new Date(subject.created_at).toLocaleDateString(
      "fr-FR",
      formatDateOptions
    );
  }

  return (
    <div className="rounded subject text-dark p-2 px-sm-3 mt-3">
      <div className="d-flex justify-content-between flex-wrap align-items-start mt-1">
        <div className="font-weight-bold text-secondary my-auto mr-2">
          {subject.full_name
            .split(" ")
            .map((s, i) => {
              if (i === 0) {
                return s.charAt(0).toUpperCase() + s.slice(1);
              }
              return s.charAt(0).toUpperCase();
            })
            .join(".")}
        </div>
        <div className="p-1 px-sm-2 text-right font-weight-bold text-sm ">
          Le {dateString.split(" ").join(" à ")}
        </div>
      </div>
      <div className="m-3 overflow-auto text-sm text-break px-md-5">
        {subject.text}
      </div>
      {user && subject && (
        <div className="d-flex align-items-center px-sm-3 pb-sm-3">
          {subject.user_id === user.id ? (
            <button
              type="submit"
              className="btn btn-success btn-sm mr-3 text-white mb-2 mb-sm-0"
              onClick={HandleopenCloseSubject}
            >
              {subject.status_resolve ? "Réouvrir" : "Cloturer"}
            </button>
          ) : (
            <div />
          )}
          <div className="d-flex justify-content-end ml-0 ml-sm-3 flex-row flex-grow-1 flex-wrap">
            {subject.user_id === user.id || user.role === "admin" ? (
              <button
                type="submit"
                className="btn btn-danger btn-sm text-white ml-sm-3 mb-2 mb-sm-0"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                supprimer
              </button>
            ) : null}
            {subject.user_id === user.id || user.role === "admin" ? (
              <button
                type="submit"
                className="btn btn-primary btn-sm text-white ml-3 ml-sm-3 mb-2 mb-sm-0"
                onClick={() => setShowModalEditSubject(true)}
              >
                modifier
              </button>
            ) : null}
          </div>
        </div>
      )}

      <DeleteItem
        itemId={subject.id}
        itemName="subject"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        reload={reload}
        setReload={setReload}
      />
    </div>
  );
}

export default Subject;

Subject.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
    created_at: PropTypes.string,
    status_resolve: PropTypes.number,
    best_answer: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      })
    ),
    user_id: PropTypes.number,
  }),
  setShowModalEditSubject: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func,
};
