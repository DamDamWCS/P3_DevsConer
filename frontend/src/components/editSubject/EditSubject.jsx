/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import "./EditSubject.css";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useForm } from "react-hook-form";

function EditSubject({
  showModalEditSubject,
  setShowModalEditSubject,
  subject,
  reload,
  setReload,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [options, setOptions] = useState();
  const [selectedValue, setSelectedValue] = useState([]);
  const [editSubject, setEditSubject] = useState(subject);
  const [errorMessage, setErrorMessage] = useState({ message: "" });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((tags) => {
            const optionsTags = tags.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }));
            setOptions(optionsTags);
          });
        } else {
          throw new Error("impossible de charger la liste des tags.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  }, []);

  useEffect(() => {
    setEditSubject(subject);
    reset({ ...subject });
    if (subject.tags) {
      setSelectedValue(
        subject.tags.map((tag) => ({ label: tag.name, value: tag.id }))
      );
    }
  }, [subject]);

  const handleCloseModal = () => {
    setShowModalEditSubject(false);
    setEditSubject(subject);
    reset({ ...subject });
    setSelectedValue(
      subject.tags.map((tag) => ({ label: tag.name, value: tag.id }))
    );
    setErrorMessage({ message: "" });
  };

  const onSubmit = () => {
    if (selectedValue.length >= 1) {
      const tagsFormat = [];
      selectedValue.map((tag) => tagsFormat.push(tag.value));
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subjects/${subject.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        method: "PUT",
        body: JSON.stringify({
          title: editSubject.title,
          text: editSubject.text,
          tags: tagsFormat,
        }),
      })
        .then((response) => {
          if (response.ok) {
            handleCloseModal();
            setReload(!reload);
          } else {
            throw new Error(
              "Erreur serveur, votre message n'a pas été modifier"
            );
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error);
        });
    }
  };
  return (
    <div
      className={`modal fade bd-example-modal-lg show ${
        showModalEditSubject && "d-block showModal"
      }`}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div
        className="modal-dialog modal-lg d-flex align-items-center pt-3"
        role="document"
      >
        <div className="modal-content">
          {errorMessage.message && (
            <div className="text-danger text-center p-3">
              {errorMessage.message}
            </div>
          )}
          <div className="modal-header">
            <h5 className="h1 modal-title text-primary " id="exampleModalLabel">
              Modifier un sujet
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
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Titre:
                </label>
                <div
                  className={`form-control-container ${
                    errors.title && "is-invalid"
                  }`}
                >
                  <input
                    {...register("title", { required: true, maxLength: 150 })}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) =>
                      setEditSubject({
                        ...editSubject,
                        title: e.target.value,
                      })
                    }
                  />
                  <span className="form-control-state" />
                </div>
                {errors.title && (
                  <span className="text-danger">
                    Champ requis / longueur max : 150 charactères
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
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
                {selectedValue.length === 0 && (
                  <span className="text-danger">
                    Veulliez sélectionner au minimum un tag
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  Message:
                </label>
                <div
                  className={`form-control-container ${
                    errors.text && "is-invalid"
                  }`}
                >
                  <textarea
                    {...register("text", { required: true, maxLength: 30000 })}
                    className="form-control"
                    id="message-text"
                    onChange={(e) =>
                      setEditSubject({ ...editSubject, text: e.target.value })
                    }
                  />
                  <span className="form-control-state" />
                </div>
                {errors.text && (
                  <span className="text-danger">Champ requis</span>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleCloseModal}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSubject;

EditSubject.propTypes = {
  showModalEditSubject: PropTypes.bool,
  setShowModalEditSubject: PropTypes.func,
  subject: PropTypes.shape({
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      })
    ),
    title: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
};
