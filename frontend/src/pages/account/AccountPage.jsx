import React, { useState } from "react";
import UserInfo from "../../components/userInfo/UserInfo";
import ChangePassword from "../../components/userInfo/ChangePassword";
import MySubjects from "../../components/userInfo/MySubjects";
import DisableAccount from "../../components/userInfo/DisableAccountModal";

function Account() {
  const [showDisableAccountModal, setShowDisableAccountModal] = useState(false);
  const [error, setError] = useState();
  return (
    <div className="b-shadow flex-grow-1 rounded bg-white m-3 m-sm-4">
      <div className="d-flex flex-column contenairSubjectList mx-2 my-3 mx-sm-auto my-sm-5">
        <UserInfo />
        <ChangePassword />
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-danger btn-sm px-5 mb-3 "
            onClick={() => setShowDisableAccountModal(true)}
          >
            désactiver mon Compte
          </button>
        </div>
        {error && <div className="text-danger m-auto">{error.message}</div>}
        <MySubjects />
      </div>
      <DisableAccount
        showDisableAccountModal={showDisableAccountModal}
        setShowDisableAccountModal={setShowDisableAccountModal}
        setError={setError}
      />
    </div>
  );
}

export default Account;
