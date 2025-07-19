import "./ModalWithForm.css";
import closeButton from "../../assets/close-btn-dark.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        >
          <img className="modal_close-img" src={closeButton} alt="close" />
        </button>
        <form className="modal__form" action="">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
