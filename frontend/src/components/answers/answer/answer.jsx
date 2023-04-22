import React, { useState, useEffect, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import DeleteItem from "../../deleteItem/DeleteItem";
import TokenContext from "../../../services/context/TokenContext";
import CreateComment from "../../comments/createComment/CreateComment";
import Comment from "../../comments/comment/Comment";
import choiceBestAnswer from "./answerFunctions";
import ModifyAnswer from "../modifAnswer/ModifAnswer";
import "./answer.css";

function Answer({
  answer,
  bestAnswerId,
  subjectUserId,
  subjectId,
  reload,
  setReload,
  onAnswerDeleted,
}) {
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [currentAnswer] = useState(answer);
  const [comments, setComments] = useState();
  const [showModifAnswer, setShowModifAnswer] = useState(false);
  const { user } = useContext(TokenContext);
  const myInit = {
    method: "GET",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  };
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/comments/${answer.id}`,
      myInit
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [reloadComments]);

  // Gestion de la date
  const formatDateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const dateString = new Date(currentAnswer.created_at).toLocaleDateString(
    "fr-FR",
    formatDateOptions
  );
  return (
    <div className="rounded subject text-dark p-2 p-sm-3 mb-2">
      <div className="d-flex justify-content-between">
        <div className="font-weight-bold text-secondary my-auto mr-2">
          {currentAnswer.full_name
            .split(" ")
            .map((s, i) => {
              if (i === 0) {
                return s.charAt(0).toUpperCase() + s.slice(1);
              }
              return s.charAt(0).toUpperCase();
            })
            .join(".")}
        </div>

        <div className="p-1 px-sm-2 flex-grow-1 text-right font-weight-bold text-sm ">
          Le {dateString.split(" ").join(" à ")}
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="d-flex flex-column mr-2 justify-content-center align-items-center">
          {bestAnswerId === currentAnswer.id ? (
            <span
              className="pointer"
              onClick={() => {
                choiceBestAnswer(subjectId, 0, setReload, reload);
              }}
              aria-hidden="true"
            >
              <i
                className="icons-checked icons-size-30px text-success"
                aria-hidden="true"
              />
            </span>
          ) : (
            <div className="pl-md-5" />
          )}
          {subjectUserId === user.id && bestAnswerId !== currentAnswer.id && (
            <span
              className="pointer"
              onClick={() => {
                choiceBestAnswer(
                  subjectId,
                  currentAnswer.id,
                  setReload,
                  reload
                );
              }}
              aria-hidden="true"
            >
              <i className="icons-checked icons-size-30px" aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="w-100">
          {showModifAnswer ? (
            <ModifyAnswer
              answerId={answer.id}
              text={answer.text}
              reload={reload}
              setReload={setReload}
              setShowModifAnswer={setShowModifAnswer}
            />
          ) : (
            <div className="mx-1 my-3 mx-sm-3 text-sm text-break overflow-auto">
              {answer.text.split("\n").map((item, key) => {
                return (
                  <Fragment key={key}>
                    {item}
                    <br />
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {user &&
        !showModifAnswer &&
        (currentAnswer.user_id === user.id || user.role === "admin") && (
          <div className="d-flex justify-content-end px-sm-3 pt-3 py-sm-3">
            <div className="d-flex ml-sm-3 justify-content-end flex-grow-1 flex-row flex-grow-1 mb-1 mb-sm-0 ">
              <button
                type="submit"
                className="btn btn-danger btn-sm text-white ml-sm-3 mb-1 mb-sm-0"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                supprimer
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm text-white ml-3 mb-1 mb-sm-0"
                onClick={() => setShowModifAnswer(true)}
              >
                modifier
              </button>
            </div>
          </div>
        )}

      {comments && comments.length > 0 && (
        <div className="w-80 mb-3 px-3 px-sm-5">
          <small className="d-flex justify-content-center text-muted">
            commentaire{comments.length > 1 && "s"}
          </small>
        </div>
      )}
      {comments && comments.length > 0 && (
        <div className="w-80 mb-3 px-3 px-md-5">
          <div className="border border-muted" />
        </div>
      )}

      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            reload={reloadComments}
            setReload={setReloadComments}
            onCommentDeleted={() => {
              setComments(comments.filter((c) => c.id !== comment.id));
            }}
          />
        ))}
      <DeleteItem
        itemId={answer.id}
        itemName="answer"
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onItemDeleted={onAnswerDeleted}
      />
      {showCreateComment ? (
        <CreateComment
          showCreateComment={showCreateComment}
          setShowCreateComment={setShowCreateComment}
          currentAnswer={currentAnswer.id}
          reload={reloadComments}
          setReload={setReloadComments}
        />
      ) : (
        <div className="d-flex flex-row-reverse mr-sm-3 mb-sm-2">
          <button
            type="submit"
            className="btn btn-success btn-sm text-white ml-sm-3 mb-1 mb-sm-0"
            onClick={() => setShowCreateComment(true)}
          >
            commenter
          </button>
        </div>
      )}
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
    created_at: PropTypes.string,
    note: PropTypes.number,
    subject_id: PropTypes.number,
    text: PropTypes.string,
    update_at: PropTypes.string,
    user_id: PropTypes.number,
  }).isRequired,
  bestAnswerId: PropTypes.number.isRequired,
  subjectUserId: PropTypes.number.isRequired,
  subjectId: PropTypes.number.isRequired,
  reload: PropTypes.bool,
  setReload: PropTypes.func,
  onAnswerDeleted: PropTypes.func,
};

export default Answer;
