import "./ItemModal.css";
import closeButton from "../../assets/close-btn-light.png";
import deleteItem from "../../assets/Delete item.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  handleCloseModal,
  handleDeleteClick,
  card,
  isOpen,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const ownedByCurrentUser = card.owner === currentUser._id;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        >
          <img src={closeButton} alt="close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__name-delete">
            <h2 className="modal__caption">{card.name}</h2>
            {ownedByCurrentUser && (
            <button
              onClick={handleDeleteClick}
              className="modal__delete-button"
            >
              <img src={deleteItem} alt="delete-button" />
            </button>
            )}
          </div>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
