import closeButton from "../../assets/close-btn-dark.png";
import "../DeleteModal/DeleteModal.css";

function DeleteModal({ isOpen, handleCloseModal, onDelete, card }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        >
          <img src={closeButton} alt="close" className="modal__close-icon" />
        </button>
        <p className="confirm-delete">
          Are you sure you want to delete this item?
          <br /> This action is irreversible
        </p>
        <div className="deleteModal__delete-btns">
          <button onClick={onDelete} className="deleteModal__delete-btn">
            <p className="deleteModal__confirmation">Yes, delete item</p>
          </button>
          <button
            onClick={handleCloseModal}
            className="deleteModal__cancel-btn"
          >
            <p className="deleteModal__cancel">Cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
