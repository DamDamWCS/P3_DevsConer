/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TokenContext from "../../services/context/TokenContext";
import "./UserInfo.css";

function UserInfo() {
  const [updateAccount, setUpdateAccount] = useState(false);
  const [editUser, setEditUser] = useState();
  const [error, setError] = useState({ message: "" });
  const { user, reload, setReload } = useContext(TokenContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  const handleCancel = () => {
    setUpdateAccount(false);
    reset(user);
    setEditUser(user);
    setError({ message: "" });
  };

  const handleUpdate = () => {
    setUpdateAccount(true);
  };

  const onSubmit = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({
        firstname: editUser.first_name,
        lastname: editUser.last_name,
        email: editUser.email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setUpdateAccount(false);
          reset(user);
          setEditUser(user);
          setError({ message: "" });
          setReload(!reload);
        } else {
          throw new Error(
            "Erreur serveur, vos informations n'a pas été modifiées"
          );
        }
      })
      .catch((err) => {
        reset(user);
        setEditUser(user);
        setError({ message: err.message });
      });
  };
  return (
    <>
      <h1 className="display-1 text-primary d-inline py-2 mx-sm-2 mb-sm-3">
        MES INFORMATIONS
      </h1>
      <div className=" multiSelect rounded mx-1 mx-sm-2 p-2 p-sm-3">
        <div className="text-danger text-center">{error.message}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" d-flex pb-3 pt-1 ">
            {editUser && (
              <div className="flex-grow-1">
                <div className="d-flex  align-items-center my-2">
                  <label
                    htmlFor="firtName"
                    className="font-weight-bold d-block labelUserInfo my-2"
                  >
                    Prenom
                  </label>
                  {!updateAccount ? (
                    <span className="text-break overflow-auto">
                      {editUser.first_name}
                    </span>
                  ) : (
                    <div>
                      <div
                        className={`form-control-container ${
                          errors.firstName && "is-invalid"
                        }`}
                      >
                        <input
                          {...register("firstName", {
                            required: true,
                            maxLength: 255,
                          })}
                          type="text"
                          id="firstName"
                          className="form-control bg-white"
                          defaultValue={editUser.first_name}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              first_name: e.target.value,
                            })
                          }
                        />
                        <span className="form-control-state" />
                      </div>
                      {errors.firstName && (
                        <span className="text-danger">Champ obligatoire.</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-center my-2">
                  <label
                    htmlFor="lastName"
                    className="font-weight-bold labelUserInfo m-0 my-2"
                  >
                    Nom
                  </label>
                  {!updateAccount ? (
                    <span className="text-break overflow-auto">
                      {editUser.last_name}
                    </span>
                  ) : (
                    <div>
                      <div
                        className={`form-control-container ${
                          errors.lastName && "is-invalid"
                        }`}
                      >
                        <input
                          {...register("lastName", {
                            required: true,
                            maxLength: 255,
                          })}
                          type="text"
                          id="lastName"
                          className="form-control bg-white"
                          defaultValue={editUser.last_name}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              last_name: e.target.value,
                            })
                          }
                        />
                        <span className="form-control-state" />
                      </div>
                      {errors.lastName && (
                        <span className="text-danger">Champ obligatoire.</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-center my-2">
                  <label
                    htmlFor="email"
                    className="font-weight-bold labelUserInfo my-2"
                  >
                    Email
                  </label>
                  {!updateAccount ? (
                    <span className="text-break overflow-auto">
                      {editUser.email}
                    </span>
                  ) : (
                    <div>
                      <div
                        className={`form-control-container ${
                          errors.email && "is-invalid"
                        }`}
                      >
                        <input
                          {...register("email", {
                            required: true,
                            maxLength: 255,
                            pattern:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          })}
                          type="text"
                          id="email"
                          className="form-control bg-white"
                          defaultValue={editUser.email}
                          onChange={(e) =>
                            setEditUser({ ...editUser, email: e.target.value })
                          }
                        />
                        <span className="form-control-state" />
                      </div>
                      {errors.email && (
                        <span className="text-danger ">
                          Format email obligatoire.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-100 d-flex flex-row-reverse">
            {!updateAccount ? (
              <button
                type="button"
                className="btn-primary btn btn-sm mb-1 px-3"
                onClick={handleUpdate}
              >
                modifier
              </button>
            ) : (
              <div className="d-flex flex-row">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary btn-sm px-3 mb-1 mr-3"
                >
                  annuler
                </button>
                <button
                  className="btn btn-primary btn-sm px-3 mb-1"
                  type="submit"
                >
                  valider
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default UserInfo;
