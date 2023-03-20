import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TokenContext from "../../services/context/TokenContext";

function Header() {
  const currentPath = useLocation().pathname;
  const [titleHeader, SetTitleHeader] = useState();
  const { user, setUser, setIsLoggedIn } = useContext(TokenContext);
  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser();
  };
  useEffect(() => {
    if (currentPath === "/login") {
      SetTitleHeader("AUTHENTIFICATION");
    } else if (currentPath === "/signup") {
      SetTitleHeader("INSCRIPTION");
    } else {
      SetTitleHeader("Bienvenue sur Dev's CORNER");
    }
  }, [currentPath]);
  return (
    <header className="bg-gray d-flex justify-content-between align-items-center py-1 px-2 ">
      <div className="d-flex">
        <img
          className={
            currentPath === "/signup" ||
            currentPath === "/login" ||
            (currentPath === "/" && !user)
              ? "d-sm-block"
              : "d-sm-none"
          }
          src="/src/assets/sncf-logo.png"
          alt="logo SNCF"
          height="22px"
        />

        <div className="text-white pl-2 text-sm">{titleHeader}</div>
      </div>
      {currentPath === "/signup" || currentPath === "/login" ? null : (
        <div>
          {user ? (
            <div>
              <div className="text-white pr-2 d-none d-sm-inline">
                <i
                  className="icons-menu-account icons-size-25px pr-2"
                  aria-hidden="true"
                />
                {user.first_name} {user.last_name}
              </div>
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-primary px-2 py-0"
              >
                déconnexion
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button type="button" className="btn btn-primary px-2 py-0">
                connexion
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
