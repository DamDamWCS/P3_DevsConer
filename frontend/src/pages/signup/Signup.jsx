/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastame] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState({
    firstname,
    lastname,
    email,
    password,
    secondPassword,
  });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;

  const control = () => {
    if (
      firstname === "" ||
      (firstname.length <= 2 && firstname.length >= 255)
    ) {
      setErrorRegister((previous) => ({
        ...previous,
        firstname: "Le champ FIRSTNAME est obligatoire",
      }));
    } else {
      setErrorRegister((previous) => ({
        ...previous,
        firstname: null,
      }));
    }
    if (lastname === "" || (lastname.length <= 2 && lastname.length >= 255)) {
      setErrorRegister((previous) => {
        return {
          ...previous,
          lastname: "Le champ LASTNAME est obligatoire",
        };
      });
    } else {
      setErrorRegister((previous) => {
        return {
          ...previous,
          lastname: null,
        };
      });
    }
    if (email === "" || !emailRegex.test(email)) {
      setErrorRegister((previous) => {
        return {
          ...previous,
          email: "Ce champ EMAIL est obligatoire",
        };
      });
    } else {
      setErrorRegister((previous) => {
        return {
          ...previous,
          email: null,
        };
      });
    }
    if (password === "" || !passwordRegex.test(password)) {
      setErrorRegister((previous) => {
        return {
          ...previous,
          password: "Ce champ PASSWORD est obligatoire",
        };
      });
    } else {
      setErrorRegister((previous) => {
        return {
          ...previous,
          password: null,
        };
      });
    }
    if (secondPassword === "" || password !== secondPassword) {
      setErrorRegister((previous) => {
        return {
          ...previous,
          secondPassword: "ce champ doit etre identique au premier",
        };
      });
    } else {
      setErrorRegister((previous) => {
        return {
          ...previous,
          secondPassword: null,
        };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    control();
  };

  useEffect(() => {
    if (
      errorRegister.firstname === null &&
      errorRegister.lastname === null &&
      errorRegister.email === null &&
      errorRegister.password === null &&
      errorRegister.secondPassword === null
    ) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      })
        .then((res) => {
          if (res.status === 409) {
            throw new Error("Compte utilisateur déjà existant");
          }
          if (res.status === 201) {
            navigate("/login");
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [errorRegister]);

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center flex-grow-1">
      <div className="d-flex justify-content-center m-4 signup-login-max-width">
        <img
          className="rounded-left d-none d-md-block signup-login-media w-50"
          src="src/assets/register.jpg"
          alt="train bleu"
        />
        <div className="bg-white rounded signup-login-rounded-left">
          <div className="pt-4 d-flex justify-content-center justify-content-md-end pr-md-4">
            <h1 className="text-primary font-weight-bold">S'enregistrer</h1>
          </div>
          <div className="pt-4 d-flex justify-content-center">
            {error && <div className="text-danger">{error.message}</div>}
          </div>
          <div className="p-4">
            <form className="d-flex flex-column" onSubmit={onSubmit}>
              <div className="form-control-container">
                <label
                  className="font-weight-medium mb-2 required"
                  htmlFor="inputName"
                >
                  Name
                </label>

                <div className="form-control-container">
                  <div className="d-sm-flex" name="inputName">
                    <div className="pr-sm-3 ">
                      <div
                        className={`form-control-container ${
                          errorRegister.firstname && "is-invalid"
                        }`}
                      >
                        <input
                          type="text"
                          id="inputFirstname"
                          className="form-control"
                          value={firstname}
                          placeholder="John"
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                        <span className="form-control-state" />
                      </div>
                      <h6 className="font-weight-light">First Name</h6>
                    </div>

                    <div>
                      <div
                        className={`form-control-container ${
                          errorRegister.lastname && "is-invalid"
                        }`}
                      >
                        <input
                          type="text"
                          id="inputLastname"
                          className="form-control"
                          value={lastname}
                          placeholder="Doe"
                          onChange={(e) => setLastame(e.target.value)}
                        />
                        <span className="form-control-state" />
                      </div>
                      <h6 className="font-weight-light">Last Name</h6>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="required" htmlFor="inputEmail">
                    Email
                  </label>
                  <div
                    className={`form-control-container ${
                      errorRegister.email && "is-invalid"
                    }`}
                  >
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      name="inputEmail"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="form-control-state" />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    className="font-weight-medium mb-2 required"
                    htmlFor="inputPassword"
                  >
                    Mot de passe
                  </label>
                  <div
                    className={`form-control-container ${
                      errorRegister.password && "is-invalid"
                    }`}
                  >
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      name="inputPassword"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="form-control-state" />
                  </div>
                  <small className="text-muted">
                    Doit avoir 8-15 caractères avec une Majuscule, une
                    Minuscule, un Caractère spécial.
                  </small>
                </div>
                <div className="form-group">
                  <label
                    className="font-weight-medium mb-2 required"
                    htmlFor="inputSecondPassword"
                  >
                    Confirmer le mot de passe
                  </label>
                  <div
                    className={`form-control-container ${
                      errorRegister.secondPassword && "is-invalid"
                    }`}
                  >
                    <input
                      type="password"
                      className="form-control"
                      id="inputSecondPassword"
                      name="inputSecondPassword"
                      placeholder="password"
                      value={secondPassword}
                      onChange={(e) => setSecondPassword(e.target.value)}
                    />
                    <span className="form-control-state" />
                  </div>
                  {errorRegister.secondPassword && (
                    <small className="text-danger">
                      Les deux mots de passe doivent etre identiques
                    </small>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="pb-4 d-flex justify-content-around">
            <Link to="..">
              <button type="button" className="btn btn-secondary">
                Retour
              </button>
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
