import React from "react";

function Card({ 
  card, 
  onCardClick, 
  onCardLike, 
  currentUser,
  onCardDelete
}) {

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );

  function handleCardClick() {
    onCardClick(card);
  };
  
  function handleDeleteClick() {
    onCardDelete(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  return (
    <li className="elements__card">
      {isOwn && <button type="button" 
      className="elements__delete" 
      onClick={handleDeleteClick}/>}
      <img
        className="elements__image popup__text_type_title"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={handleCardClick}
      />
      <article className="elements__texts">
        <h2 className="elements__text popup__text_type_subtitle">{`${card.name}`}</h2>
        <article className="elements__like-group">
          <button type="button" 
          className={cardLikeButtonClassName} 
          onClick={handleLikeClick} 
          />
          <p className="elements__amount-like">{`${card.likes.length}`}</p>
        </article>
      </article>
    </li>
  );
}

export default Card;
