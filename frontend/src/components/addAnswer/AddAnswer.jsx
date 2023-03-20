import { useState } from "react";
import PropTypes from "prop-types";

function AddAnswer({ subjectId, reload, setReload }) {
  const [textareaState, setTextareaState] = useState("");
  const handleSubmitAddAnswer = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/answers/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textareaState,
        subject_id: subjectId,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          setTextareaState("");
          setReload(!reload);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.info(error);
      });
  };

  return (
    <div className="my-4 multiSelect rounded ">
      <form onSubmit={handleSubmitAddAnswer}>
        <div className="my-3 mx-2 mx-sm-3">
          <textarea
            name="postContent"
            required
            type="text"
            className="form-control bg-white border"
            id="textAddAnswer"
            placeholder="Votre réponse..."
            value={textareaState}
            onChange={(e) => setTextareaState(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row-reverse">
          <button
            type="submit"
            className="btn btn-primary btn-sm mx-2 mb-3 mx-sm-3"
          >
            envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

AddAnswer.propTypes = {
  subjectId: PropTypes.number.isRequired,
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
};

export default AddAnswer;
