import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function DeleteItem({
  itemId,
  itemName,
  showDeleteModal,
  setShowDeleteModal,
  reload = false,
  setReload,
  onItemDeleted,
}) {
  const navigate = useNavigate();

  const myInit = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  };

  const handleDelete = (id, item) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${item}s/${id}`, myInit)
      .then((response) => {
        if (response.status === 204) {
          setShowDeleteModal(false);
          if (item === "subject") {
            navigate("/");
          }
          if (onItemDeleted) onItemDeleted(id);
          else setReload(!reload);
        } else throw new Error("La suppression n'a pas fonctionné");
      })
      .catch((err) => {
        console.error("erreur dans DeleteItem", err);
      });
  };

  let message = "";
  switch (itemName) {
    case "subject":
      message = "Etes vous sur de vouloir supprimer ce Sujet";
      break;
    case "answer":
      message = "Etes vous sur de vouloir supprimer cette Réponse";
      break;
    case "comment":
      message = "Etes vous sur de vouloir supprimer ce Commentaire";
      break;
    default:
      console.error(`Etes vous sur de vouloir supprimer cet item`);
  }

  return (
    <div
      className={`modal fade show ${showDeleteModal && "d-block showModal"}`}
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
                onClick={() => setShowDeleteModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setShowDeleteModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleDelete(itemId, itemName)}
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
export default DeleteItem;

DeleteItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  showDeleteModal: PropTypes.bool.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  reload: PropTypes.bool,
  setReload: PropTypes.func,
  onItemDeleted: PropTypes.func,
};
