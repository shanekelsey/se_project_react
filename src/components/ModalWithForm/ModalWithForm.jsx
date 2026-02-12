import "./ModalWithForm.css";
import closeButton from "../../assets/close-btn-dark.png";

function ModalWithForm({
  children,
  buttonText,
  alternativeButtonText,
  title,
  activeModal,
  handleCloseModal,
  isOpen,
  onSubmit,
  onAlternative
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        >
          <img className="modal__close-img" src={closeButton} alt="close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" action="">
          {children}
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {alternativeButtonText && (
              <button
                onClick={onAlternative}
                className="modal__alternative"
                type="button"
              >
                {alternativeButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
