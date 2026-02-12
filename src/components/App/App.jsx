import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  getItems,
  postItem,
  deleteItem,
  likeClothes,
  unlikeClothes,
} from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth";
import { getToken, setToken } from "../../utils/token.js";
import { useNavigate, Navigate } from "react-router-dom";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { updateUser } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 99 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setActiveModal("register");
  };

  const handleEditProfileClick = (event) => {
    event.preventDefault();
    setActiveModal("edit-profile");
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    setActiveModal("login");
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, image, weather }) => {
    postItem(name, image, weather)
      .then((res) => {
        setClothingItems((prev) => [res.data, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
  };

  function handleCardDelete() {
    deleteItem(selectedCard._id)
      .then(() => {
        const filteredArray = clothingItems.filter(
          (item) => item._id !== selectedCard._id,
        );
        setClothingItems(filteredArray);
        closeModal();
      })
      .catch(console.error);
  }

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth.register(email, password, name, avatar).then((data) => {
      handleLogin({ email, password });
    }).catch(console.error);
  };

   const handleAlternativeRegisterClick = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password).then((data) => {
      setToken(data.token);

      auth
        .validateLogin(data.token)
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          closeModal();
          navigate("/");
        })
        .catch(console.error);
    });
  };

    const handleAlternativeLoginClick = () => {
    setActiveModal("register");
  };

  const handleToggleLike = ({ id, isLiked }) => {
    isLiked
      ? unlikeClothes(id)
          .then((updatedGarment) => {
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === id ? updatedGarment.data : item,
              ),
            );
          })
          .catch(console.error)
      : likeClothes(id)
          .then((updatedGarment) => {
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === id ? updatedGarment.data : item,
              ),
            );
          })
          .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    updateUser(name, avatar)
      .then((data) => {
        const updatedUser = currentUser;
        updatedUser.name = data.data.name;
        updatedUser.avatar = data.data.avatar;

        setCurrentUser(updatedUser);

        closeModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .validateLogin(jwt)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onToggleLike={handleToggleLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleLogoutClick={handleLogoutClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onToggleLike={handleToggleLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeModal={closeModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleCloseModal={closeModal}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
        <DeleteModal
          isOpen={activeModal === "delete"}
          card={selectedCard}
          onDelete={handleCardDelete}
          handleCloseModal={closeModal}
          deleteItem={deleteItem}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          activeModal={activeModal}
          closeModal={closeModal}
          handleLogin={handleLogin}
          onAlternative={handleAlternativeLoginClick}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          activeModal={activeModal}
          closeModal={closeModal}
          handleRegistration={handleRegistration}
          onAlternative={handleAlternativeRegisterClick}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          activeModal={activeModal}
          onSubmit={handleEditProfile}
          closeModal={closeModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
