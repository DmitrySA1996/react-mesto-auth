function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_card ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_theme_image">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__sign">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
