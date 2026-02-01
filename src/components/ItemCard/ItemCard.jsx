import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onToggleLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleToggleLike = (event) => {
    onToggleLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-toggle ${
              isLiked ? "card__like-toggle_liked" : "card__like-toggle_unliked"
            }`}
            onClick={handleToggleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
