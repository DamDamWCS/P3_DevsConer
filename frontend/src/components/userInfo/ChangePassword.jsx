import React, { useContext, useState, useEffect } from "react";
import TokenContext from "../../services/context/TokenContext";
import UpdatePasswordModal from "./UpdatePasswordModal";

function ChangePassword() {
  const { user } = useContext(TokenContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState({
    oldPassword,
    newPassword,
    secondPassword,
  });
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;

  const control = () => {
    if (oldPassword === "" || !passwordRegex.test(oldPassword)) {
      setErrorPassword((previous) => {
        return {
          ...previous,
          oldPassword: "Ce champ est obligatoire",
        };
      });
    } else {
      setErrorPassword((previous) => {
        return {
          ...previous,
          oldPassword: null,
        };
      });
    }
    if (
      newPassword === "" ||
      !passwordRegex.test(newPassword) ||
      newPassword === oldPassword
    ) {
      setErrorPassword((previous) => {
        return {
          ...previous,
          newPassword: "Ce champ est obligatoire",
        };
      });
    } else {
      setErrorPassword((previous) => {
        return {
          ...previous,
          newPassword: null,
        };
      });
    }
    if (secondPassword === "" || newPassword !== secondPassword) {
      setErrorPassword((previous) => {
        return {
          ...previous,
          secondPassword: "ce champ doit etre identique au premier",
        };
      });
    } else {
      setErrorPassword((previous) => {
        return {
          ...previous,
          secondPassword: null,
        };
      });
    }
  };

  useEffect(() => {
    if (
      errorPassword.oldPassword === null &&
      errorPassword.newPassword === null &&
      errorPassword.secondPassword === null
    ) {
      setShowUpdatePasswordModal(true);
    }
  }, [errorPassword]);

  return (
    <div className="my-4">
      <h1 className="display-1 text-primary d-inline py-2 mx-sm-2 mb-sm-3">
        NOUVEAU MOT DE PASSE
      </h1>
      <div className=" multiSelect rounded mx-1 mx-sm-2 mt-4 p-2 p-sm-3">
        <form className=" pb-2 pt-1">
          <div className="pr-3 pr-sm-5">
            <div className="d-flex flex-column flex-sm-row justify-content-between w-75 mb-2">
              <div className="font-weight-bold required">
                Ancien mot de passe
              </div>
              <input
                type="password"
                id="oldPassword"
                className={`${errorPassword.oldPassword && "alert-danger"}`}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-between w-75 mb-2">
              <div className="font-weight-bold required">
                Nouveau mot de passe
              </div>
              <input
                type="password"
                id="newPassword"
                className={`${errorPassword.newPassword && "alert-danger"}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-between w-75">
              <div className="font-weight-bold required">Confirmation</div>
              <input
                type="password"
                id="secondPassword"
                className={`${errorPassword.secondPassword && "alert-danger"}`}
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
        {error && (
          <div className="d-flex justify-content-center text-danger">
            {error.message}
          </div>
        )}
        <div className="w-100 d-flex flex-row justify-content-end">
          <button
            type="submit"
            className="btn-primary btn btn-sm mt-2 mb-1 px-3"
            onClick={control}
          >
            modifier
          </button>
        </div>
      </div>
      {user && (
        <UpdatePasswordModal
          userId={user.id}
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          setSecondPassword={setSecondPassword}
          showUpdatePasswordModal={showUpdatePasswordModal}
          setShowUpdatePasswordModal={setShowUpdatePasswordModal}
          setError={setError}
        />
      )}
    </div>
  );
}

export default ChangePassword;
