import avatar from "../../assets/avatar.png";
import "./Sidebar/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default Sidebar;
