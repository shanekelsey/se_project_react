import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  closeModal,
  activeModal,
  handleRegistration,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      buttonText="Next"
      alternativeButtonText="or Log In"
      title="Sign Up"
      isOpen={isOpen}
      handleCloseModal={closeModal}
      onSubmit={handleSubmit}
      // onAlternative={onAlternative}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          id="register-name"
          name="name"
          required
          placeholder="Name"
          minLength="2"
          maxLength="30"
          type="text"
          value={data.name}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
export default RegisterModal;
