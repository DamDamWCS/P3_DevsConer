import React, { useState } from "react";
import PropTypes from "prop-types";

function ModifyComment({
  commentId,
  text,
  reload,
  setReload,
  setShowModifyComment,
}) {
  const [commentUpdate, setCommentUpdate] = useState(text);
  const [caractereCount, setCaractereCount] = useState(text.length);

  const handelChange = (e) => {
    setCommentUpdate(e.target.value);
    setCaractereCount(e.target.value.length);
  };

  const handleModifyCommentClick = () => {
    setShowModifyComment(false);
  };

  const controlText = (t) => {
    if (t.length >= 1 && t.length < 501) {
      return true;
    }
    return false;
  };

  const handleModifyComment = (e) => {
    e.preventDefault();
    if (controlText(text)) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "PUT",
        body: JSON.stringify({
          text: commentUpdate,
        }),
      })
        .then((response) => {
          if (response.status === 204) {
            setReload(!reload);
            setShowModifyComment(false);
          } else {
            throw new Error(
              "Erreur serveur, votre commentaire n'a pas été modifié"
            );
          }
        })
        .catch((err) => console.warn("Une erreur est survenue :", err));
    }
  };

  return (
    <div className="w-100 d-block showForm">
      <form onSubmit={handleModifyComment}>
        <div className="form-container mx-sm-3" data-component="control">
          <textarea
            type="text"
            required
            className="form-control bg-white border"
            maxLength={500}
            id="countTextarea1"
            data-role="input"
            aria-describedby="charcounter"
            placeholder="Votre commentaire"
            defaultValue={commentUpdate}
            onChange={handelChange}
          />
          <span className="form-control-state " />
        </div>
        <div
          className="mt-2 font-weight-medium d-flex pl-sm-3"
          data-role="counter"
          data-limit="500"
          id="charcounter"
        >
          <span data-role="counter-value">{caractereCount}</span>
          /500 caractères
        </div>
        <div className="d-flex flex-row justify-content-end mt-2 mt-sm-0 mb-sm-2 mx-sm-3">
          <button
            type="button"
            className="btn btn-secondary btn-sm text-white ml-sm-3 my-1 mb-sm-0"
            data-dismiss="modal"
            onClick={handleModifyCommentClick}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary  btn-sm text-white ml-3 my-1 mb-sm-0"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

ModifyComment.propTypes = {
  commentId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
  setShowModifyComment: PropTypes.func.isRequired,
};

export default ModifyComment;
