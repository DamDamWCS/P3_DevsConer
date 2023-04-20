import { useContext, useState } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../../services/context/TokenContext";

function CreateComment({
  reload,
  setReload,
  showCreateComment,
  setShowCreateComment,
  currentAnswer,
}) {
  const { user } = useContext(TokenContext);
  const [caractereCount, setCaractereCount] = useState(0);
  const [text, setText] = useState("");

  const handleTextareaChange = (event) => {
    setText(event.target.value);
    setCaractereCount(event.target.value.length);
  };
  const reset = () => {
    setText("");
    setCaractereCount(0);
    setShowCreateComment(false);
  };

  const controlText = (t) => {
    if (t.length >= 1 && t.length <= 501) {
      return true;
    }
    return false;
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (controlText(text)) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          text,
          answer_id: currentAnswer,
          user_id: user.id,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            reset();
            setReload(!reload);
          } else {
            throw new Error(
              "Erreur serveur, votre commentaire n'a pas été créé"
            );
          }
        })
        .catch((err) => console.warn("Une erreur est survenue :", err));
    }
  };

  return (
    <div
      className={`comment-container ${
        showCreateComment ? "d-block" : "d-none"
      }`}
    >
      <form onSubmit={handleComment}>
        <div className="form-container mx-sm-3" data-component="control">
          <label htmlFor="countTextarea1">Commentaire</label>
          <textarea
            type="text"
            required
            className="form-control bg-white border "
            value={text}
            maxLength={500}
            id="countTextarea1"
            placeholder="Votre commentaire"
            data-role="input"
            aria-describedby="charcounter"
            onChange={handleTextareaChange}
          />

          <span className="form-control-state" />
        </div>
        <div
          className="mt-2 font-weight-medium"
          data-role="counter"
          data-limit="500"
          id="charcounter"
        >
          <span data-role="counter-value" className="ml-sm-3">
            {caractereCount}
          </span>
          /500 caractères
          <div className="d-flex flex-row justify-content-end mt-2 mt-sm-0 mb-sm-2 mx-sm-3">
            <button
              type="button"
              className="btn btn-secondary btn-sm text-white mr-3 mb-1 mb-sm-0"
              data-dismiss="modal"
              onClick={reset}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary  btn-sm text-white mb-1 mb-sm-0"
            >
              Valider
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

CreateComment.propTypes = {
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
  showCreateComment: PropTypes.bool.isRequired,
  setShowCreateComment: PropTypes.func.isRequired,
  currentAnswer: PropTypes.number.isRequired,
};

export default CreateComment;
