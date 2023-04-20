import { useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";

function CreateSubject({
  reload,
  setReload,
  options,
  showModalCreateSubject,
  setShowModalCreateSubject,
}) {
  const [selectedValue, setSelectedValue] = useState([]); // tag sélectionné
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const reset = () => {
    setTitle("");
    setSelectedValue([]);
    setText("");
  };

  const controlTitle = (t) => {
    if (t.length >= 2 && t.length <= 200) {
      return true;
    }
    return false;
  };

  const controlTag = (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  };

  const controlText = (l) => {
    if (l.length >= 10 && l.length <= 10000) {
      return true;
    }
    return false;
  };

  const handleValidate = (e) => {
    e.preventDefault();
    const tags = selectedValue.map((items) => items.value);

    if (controlTitle(title) && controlText(text) && controlTag(selectedValue)) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subjects/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          text,
          tags,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            setReload(!reload);
            setShowModalCreateSubject(false);
            reset();
          } else {
            throw new Error();
          }
        })
        .catch((err) => console.warn("Une erreur est survenue :", err));
    }
  };

  const handleCloseModal = () => {
    setShowModalCreateSubject(false);
    reset("");
  };

  return (
    <div
      className={`modal fade show ${
        showModalCreateSubject && "d-block showModal"
      }`}
    >
      <div className="d-flex align-items-center pt-3 modal-dialog modal-lg t-10">
        <div className="modal-content">
          <fieldset className=" was-validated">
            <div className="modal-header">
              <h5 className="h1 modal-title text-primary">
                Ajouter un nouveau sujet
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="title modal-body">
              <div className="form-group">
                <label
                  htmlFor="inputTitle"
                  className="font-weight-medium mb-2 required"
                >
                  Titre :
                </label>
                <div className="form-control-container is-invalid">
                  <input
                    type="text"
                    id="inputTitle"
                    required
                    className="form-control"
                    minLength={2}
                    maxLength={200}
                    value={title}
                    placeholder="Titre du sujet"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <span className="form-control-state" />
                </div>
              </div>
              <div id="inputTags" className="form-group">
                <label htmlFor="recipient-name" className="required">
                  Langages :
                </label>
                <div
                  className={` bg-light p-3 rounded ${
                    selectedValue.length === 0 && "errorTag"
                  }`}
                >
                  {options && (
                    <MultiSelect
                      options={options}
                      value={selectedValue}
                      onChange={setSelectedValue}
                      labelledBy="Select"
                    />
                  )}
                  <span className="form-control-state" />
                </div>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="inputText"
                  className="font-weight-medium mb-2 required"
                >
                  Texte :
                </label>
                <div className="form-control-container  is-invalid">
                  <textarea
                    type="text"
                    id="inputText"
                    required
                    className="form-control"
                    minLength={10}
                    maxLength={10000}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <span className="form-control-state" />
                </div>
                <p className="text-center mt-2">
                  <span className="text-red"> * </span>Champs obligatoires
                </p>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center pt-0 justify-content-sm-start">
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn btn-secondary "
                data-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleValidate}
                className="btn btn-primary ml-2"
              >
                Valider
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

CreateSubject.propTypes = {
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  showModalCreateSubject: PropTypes.bool.isRequired,
  setShowModalCreateSubject: PropTypes.func.isRequired,
};

export default CreateSubject;
