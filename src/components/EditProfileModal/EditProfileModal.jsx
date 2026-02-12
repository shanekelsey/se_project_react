import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useForm from "../../Hooks/useForm";

function EditProfileModal({ closeModal, activeModal, onSubmit, isOpen }) {
const { currentUser } = useContext(CurrentUserContext);

const inputValues = {
  name: "",
  avatar: "",
}

const { values, handleChange, setValues, resetForm } = useForm(inputValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    setValues({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });
  }, [currentUser, activeModal]);

 

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      isOpen={activeModal === "edit-profile"}
      handleCloseModal={closeModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          name="name"
          required
          placeholder="Name"
          minLength="2"
          maxLength="30"
          type="text"
          value={values.name}
          onChange={handleChange}
          className="modal__input"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
export default EditProfileModal;