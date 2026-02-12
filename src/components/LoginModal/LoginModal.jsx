import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import useForm from "../../Hooks/useForm";

function LoginModal({ closeModal, activeModal, isOpen, handleLogin, onAlternative }) {

const inputValues = {
  email: "",
  password: "",
}

const { values, handleChange, resetForm } = useForm(inputValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(values);
  };

 useEffect(() => {
    resetForm(inputValues);
  }, [isOpen]);


  return (
    <ModalWithForm
      buttonText="Log In"
      title="Log In"
      isOpen={isOpen}
      activeModal={activeModal}
      handleCloseModal={closeModal}
      onSubmit={handleSubmit}
      alternativeButtonText="or Sign Up"
      onAlternative={onAlternative}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
export default LoginModal;
