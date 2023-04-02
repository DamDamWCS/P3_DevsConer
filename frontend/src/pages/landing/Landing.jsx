import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./Landing.css";

export default function Landing() {
  return (
    <>
      <div className=" b-shadow flex-grow-1 rounded bg-white m-2 m-sm-4">
        <div className="mainPicture">
          <h1 className="titleLanding text-center">Dev's CORNER</h1>
        </div>

        <div className="aboutLanding mx-auto px-3 m-4">
          <div className=" text-primary pb-2 text-center text-sm-left titleAbout">
            ABOUT US
          </div>
          <p className="">
            Bienvenue sur notre plateforme de développement de la SNCF ! Nous
            sommes un espace communautaire dédié aux développeurs internes de la
            SNCF qui cherchent à résoudre des problèmes, partager des
            connaissances et collaborer sur des projets. Que vous soyez débutant
            ou expert, vous trouverez ici une communauté accueillante et une
            source précieuse d'informations pour vous aider à réussir dans vos
            projets. N'hésitez pas à poser des questions, partager des idées et
            apprendre les uns des autres. Rejoignez-nous dès maintenant pour
            faire partie de cette communauté en constante évolution de
            développeurs talentueux de la SNCF !
          </p>
        </div>

        <div className="text-center pb-4">
          <Link to="/signup">
            <button type="button" className="btn btn-primary">
              S'inscrire
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
