import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, handleAddClick, clothingItems, handleLogoutClick, handleEditProfileClick, onToggleLike}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar handleLogoutClick={handleLogoutClick} handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onToggleLike={onToggleLike}
        />
      </section>
    </div>
  );
}

export default Profile;
