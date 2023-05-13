import React from "react";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import pencil from "../images/pencil.svg";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete
}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__image"
            name="avatar"
            src={`${currentUser.avatar}`}
            alt="Аватар"
          />
          <button
            className="profile__edit-avatar"
            type="button"
            onClick={onEditAvatar}
          >
            <img className="profile__pencil" src={pencil} alt="Карандаш" />
          </button>
          <div className="profile__edit">
            <div className="profile__text">
              <h1 className="profile__title">{`${currentUser.name}`}</h1>
              <p className="profile__subtitle">{`${currentUser.about}`}</p>
            </div>
            <button
              type="button"
              className="profile__edit-text"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
              onCardDelete={onCardDelete}
              key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
