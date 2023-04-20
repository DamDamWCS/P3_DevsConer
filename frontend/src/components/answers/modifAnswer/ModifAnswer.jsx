import { useState } from "react";
import PropTypes from "prop-types";

function ModifyAnswer({
  setShowModifAnswer,
  answerId,
  text,
  reload,
  setReload,
}) {
  const [textareaModifyAnswerState, setTextareaModifyAnswerState] =
    useState(text);
  const onSubmitModifyAnswer = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answers/${answerId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ text: textareaModifyAnswerState }),
    })
      .then((response) => {
        if (response.status === 204) {
          setReload(!reload);
          setShowModifAnswer(false);
        } else {
          throw new Error("Erreur serveur, votre réponse n'a pas été modifiée");
        }
      })
      .catch((err) => {
        console.info(err);
      });
  };
  return (
    <div className="mt-2 mx-sm-3 ">
      <form onSubmit={onSubmitModifyAnswer}>
        <textarea
          name="postContent"
          required
          type="text"
          className="form-control bg-white border"
          id="textModifyAddAnswer"
          placeholder="Votre réponse..."
          value={textareaModifyAnswerState}
          onChange={(e) => setTextareaModifyAnswerState(e.target.value)}
        />
        <div className="d-flex flex-row-reverse mt-3 mb-2">
          <button
            className="btn btn-primary btn-sm mt-1 ml-2 ml-sm-3"
            type="submit"
          >
            valider
          </button>
          <button
            onClick={() => setShowModifAnswer(false)}
            className="btn btn-secondary btn-sm mt-1"
            type="button"
          >
            annuler
          </button>
        </div>
      </form>
    </div>
  );
}

ModifyAnswer.propTypes = {
  setShowModifAnswer: PropTypes.func.isRequired,
  answerId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
};

export default ModifyAnswer;
