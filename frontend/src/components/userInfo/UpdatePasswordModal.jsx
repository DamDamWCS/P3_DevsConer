import PropTypes from "prop-types";

function UpdatePasswordModal({
  userId,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  setSecondPassword,
  showUpdatePasswordModal,
  setShowUpdatePasswordModal,
  setError,
}) {
  const handleUpdate = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/modifyPassword`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: oldPassword,
          newPassword,
        }),
      }
    )
      .then((response) => {
        if (response.status === 201) {
          setNewPassword("");
          setSecondPassword("");
          setOldPassword("");
          throw new Error("Changement de mot de passe effectué");
        }
        if (response.status === 401) {
          setOldPassword("");
          throw new Error("Ancien mot de passe incorrect");
        }
        return response.json();
      })
      .catch((err) => {
        setError(err);
      });
    setShowUpdatePasswordModal(false);
  };

  return (
    <div
      className={`modal fade show ${
        showUpdatePasswordModal && "d-block showModal"
      }`}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div className="d-flex align-items-center h-100">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h1 modal-title text-danger" id="exampleModalLabel">
                Attention
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowUpdatePasswordModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Êtes vous sur de vouloir changer votre mot de passe ?</p>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setShowUpdatePasswordModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdate()}
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdatePasswordModal;

UpdatePasswordModal.propTypes = {
  userId: PropTypes.number.isRequired,
  oldPassword: PropTypes.string.isRequired,
  setOldPassword: PropTypes.func.isRequired,
  newPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  setSecondPassword: PropTypes.func.isRequired,
  showUpdatePasswordModal: PropTypes.bool.isRequired,
  setShowUpdatePasswordModal: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
