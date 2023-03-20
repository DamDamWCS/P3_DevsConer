function Footer() {
  return (
    <footer className="mastfooter bg-gray footer">
      <div className="container d-flex flex-column">
        <div className="order-3 row text-sm gt-2 gb-2 font-weight-medium justify-content-center">
          <div className="">
            <div className="py-2 text-white text-center">Suivre SNCF :</div>
            <ul className="d-flex list-unstyled mb-0 justify-content-center flex-wrap">
              <li className="pr-2">
                <a href="https://www.sncf.fr">
                  <img
                    src="../src/assets/sncf-logo.png"
                    alt="logo SNCF"
                    height="40px"
                  />
                </a>
              </li>
              <li className="pr-2">
                <button
                  onClick={(e) => {
                    window.open("https://numerique.sncf.com/", "_blank");
                    e.currentTarget.blur();
                  }}
                  type="button"
                  className="btn-rounded btn-color-footer"
                >
                  <i className="icons-facebook" aria-hidden="true" />
                </button>
              </li>
              <li className="pr-2">
                <button
                  onClick={(e) => {
                    window.open(
                      "https://www.instagram.com/groupesncf/",
                      "_blank"
                    );
                    e.currentTarget.blur();
                  }}
                  type="button"
                  className="btn-rounded btn-color-footer"
                >
                  <i className="icons-instagram" aria-hidden="true" />
                </button>
              </li>
              <li className="pr-2">
                <button
                  onClick={(e) => {
                    window.open("https://twitter.com/SNCFNumerique", "_blank");
                    e.currentTarget.blur();
                  }}
                  type="button"
                  className="btn-rounded btn-color-footer"
                >
                  <i className="icons-twitter" aria-hidden="true" />
                </button>
              </li>
            </ul>
            <div className="py-2 text-white text-center">
              Version 1.0 | WildCodeSchool @2023
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
