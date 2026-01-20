import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__wrapper-left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__wrapper-right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
        </>
        ) : (
          <>
        <button
          onClick={handleRegisterClick}
          className="header__signup-button"
          type="button"
        >
          Sign Up
        </button>
        <button
          onClick={handleLoginClick}
          className="header__log-in-button"
          type="button"
        >
          Log In
        </button>
        </>
        )}
      </div>
    </header>
  );
}

export default Header;
