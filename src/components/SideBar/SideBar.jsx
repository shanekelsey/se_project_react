import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Sidebar({handleLogoutClick, handleEditProfileClick}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img className="sidebar__avatar" src={currentUser.avatar} alt="avatar" />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button onClick={handleEditProfileClick} type="button" className="sidebar__edit-profile-btn">Change profile data</button>
        <button onClick={handleLogoutClick} type="button" className="sidebar__log-out-btn">Log out</button>
      </div>
    </div>
  );
}

export default Sidebar;
