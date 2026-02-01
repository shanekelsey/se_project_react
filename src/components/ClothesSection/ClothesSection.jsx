import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
   const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p>Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__button">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
         {clothingItems.map((item) => {
          if (item.owner === currentUser._id) {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
