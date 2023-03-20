import React, { useContext } from "react";
import PropTypes from "prop-types";
import TokenContext from "../../services/context/TokenContext";

function DisableAccount({
  showDisableAccountModal,
  setShowDisableAccountModal,
  setError,
}) {
  const { user, setUser, reload, setReload, setIsLoggedIn } =
    useContext(TokenContext);

  const handleDisableAccount = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}/disable`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({
        state: 0,
      }),
    })
      .then((response) => {
        if (response.status === 204) {
          setShowDisableAccountModal(false);
          sessionStorage.clear("token");
          setIsLoggedIn(false);
          setUser();
          setReload(!reload);
        } else throw new Error("La désactivation n'a pas fonctionnée");
      })
      .catch((err) => {
        setShowDisableAccountModal(false);
        setError(err);
      });
  };

  return (
    <div
      className={`modal fade show ${
        showDisableAccountModal && "d-block showModal"
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
                onClick={() => setShowDisableAccountModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Êtes vous sur de souhaiter désactiver votre compte?</p>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setShowDisableAccountModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleDisableAccount()}
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

export default DisableAccount;

DisableAccount.propTypes = {
  showDisableAccountModal: PropTypes.bool.isRequired,
  setShowDisableAccountModal: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
