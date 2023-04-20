import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import TokenContext from "../../services/context/TokenContext";
import "./LoginPage.css";

function Login() {
  const { setIsLoggedIn } = useContext(TokenContext);

  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          sessionStorage.setItem("token", result.token);
        } else {
          throw new Error(result.validationErrors[0].message);
        }
      })
      .then(() => setIsLoggedIn(true))
      .catch((error) => {
        console.info(error);
        setErrorMessage(error);
      });
  };
  return (
    <section className="bg-dark d-flex justify-content-center align-items-center flex-grow-1">
      <div className="d-flex justify-content-center m-4 signup-login-max-width">
        <img
          className="rounded-left d-none d-md-block signup-login-media w-50"
          src="src/assets/login.jpg"
          alt="train à quai sous la verrière de la gare"
        />
        <div className=" py-4 px-3 p-sm-4 bg-white rounded signup-login-rounded-left  d-flex flex-column justify-content-center">
          <h1 className="text-blue text-center text-sm-right font-weight-bold pb-sm-4">
            Connexion
          </h1>
          {errorMessage && (
            <div className="text-center text-danger font-weight-bold ">
              {" "}
              {errorMessage.message}
            </div>
          )}
          <form onSubmit={(e) => handleSubmitLogin(e)} className="bg-white">
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-form-label required">
                Email
              </label>
              <div className="form-control-container">
                <input
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                  required
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmailState(e.target.value)}
                />
                <span className="form-control-state" />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="inputPassword"
                className="col-form-label required"
              >
                Mot de passe
              </label>
              <div className="form-control-container">
                <input
                  pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$"
                  required
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPasswordState(e.target.value)}
                />
                <span className="form-control-state" />
              </div>
              <p className="text-center">
                <span className="text-red"> * </span>Champs obligatoires
              </p>
            </div>
            <div className="text-center">
              <div className="d-flex justify-content-around pb-3">
                <Link to="..">
                  <button
                    type="button"
                    className="btn btn-secondary m-0 login-btn"
                  >
                    Retour
                  </button>
                </Link>
                <button type="submit" className="btn btn-primary m-0 login-btn">
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account ?
                  <span className="nk-liregister text-center">
                    <Link to="/signup" className="pl-1 link-register text-red">
                      Register here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Login;
