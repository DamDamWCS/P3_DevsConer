import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="navBar m-3 m-sm-0 navBar">
      <div className="d-flex justify-content-between align-items-center align-items-sm-stretch ">
        <Link to="/" className="d-flex">
          <div className="TitleNavBar p-3 pl-sm-4 d-flex align-items-center ">
            <img
              className="d-none d-sm-inline mr-sm-3"
              src="../src/assets/sncf-logo.png"
              alt="logo SNCF"
              height="40px"
            />

            <span>
              <span className="text-gray">Dev's</span>{" "}
              <span className="text-primary">CORNER</span>
            </span>
          </div>
        </Link>
        <div className="d-none d-sm-flex justify-content-center  ">
          <NavLink to="/">
            <div className="d-flex flex-column align-items-center py-3 px-5 linkNavBar ">
              <i className="icons-file icons-size-50px" aria-hidden="true" />
              <span className="text-center my-auto">SUJETS</span>
            </div>
          </NavLink>
          <NavLink to="/account">
            <div className="d-flex flex-column align-items-center py-3 px-5 linkNavBar">
              <i
                className="icons-circle-account-connected icons-size-50px"
                aria-hidden="true"
              />
              <span className="text-center my-auto">
                MON
                <br />
                COMPTE
              </span>
            </div>
          </NavLink>
        </div>
        <div className="d-sm-none">
          <i
            type="button"
            onClick={toggleMenu}
            className={`icons-menu-burger icons-size-30px mr-4 ${
              showMenu && "d-none"
            }`}
            aria-hidden="true"
          />
          <i
            type="button"
            onClick={toggleMenu}
            className={`icons-close icons-size-30px mr-4 ${
              !showMenu && "d-none"
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className={`p-2 d-sm-none ${!showMenu && "d-none"}`}>
        <NavLink to="/">
          <div className="linkNavBar font-weight-bold py-2">SUJETS</div>
        </NavLink>
        <NavLink to="/account">
          <div className="linkNavBar font-weight-bold py-2">MON COMPTE</div>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
