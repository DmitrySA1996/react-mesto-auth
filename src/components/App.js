import React from "react";
import "../pages/index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import Register from "./Register"
import Login from "./Login"
import InfoToolTip from "./InfoToolTip.js"

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/API";
import * as AuthApi from "../utils/AuthApi.js"

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const history = React.useHistory()
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getRealUserInfo(), api.getInitialCards()])
      .then(([userProfile, cards]) => {
        setCurrentUser(userProfile);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    } else {
      api
        .addLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleUpdateUser(UserInfo) {
    api
      .editProfileUserInfo(UserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleUpdateAvatar(Avatar) {
    api
      .updateProfileUserAvatar(Avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    if (jwt) {
      AuthApi
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true)
          setEmail(res.data.email)
          history.push("/")
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате")
          }
          console.log("401 — Переданный токен некорректен")
        })
    }
  }, [history])

  function handleSignOut() {
    localStorage.removeItem("jwt")
    setIsLoggedIn(false)
    setIsMobileMenuOpen(false)
    history.push("/sign-in")
    setIsMobileMenuOpen(false)
  }

  function handleClickOpenMobileMenu() {
    if (isLoggedIn) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  }

  function handleLoginSubmit(email, password) {
    AuthApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token)
        setIsLoggedIn(true)
        setEmail(email)
        history.push("/")
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей")
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден")
        }
      })
  }

  function handleRegisterSubmit(email, password) {
    AuthApi
      .register(email, password)
      .then((res) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        history.push("/sign-in")
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей")
        }
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        <div className="page">
          <Header
            email={email}
            onSignOut={handleSignOut}
            isMobileMenuOpen={isMobileMenuOpen}
            handleClickOpenMobileMenu={handleClickOpenMobileMenu}
            isLoggedIn={isLoggedIn}
          />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onDeletedCard={handleCardDelete}
              cards={cards}
              component={Main}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLoginSubmit} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegisterSubmit} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="popup_type_confirmation"
            title="Вы уверены?"
            buttonText="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;