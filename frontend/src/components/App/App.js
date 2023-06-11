import { React, useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Main from '../Main/Main.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';

import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';

import CurrentUserContext from '../../contexts/CurrentUserContexts.js';
import api from '../../utils/Api.js';
import * as auth from '../../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({ isOpened: false, sucsess: true });
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltip({ ...infoTooltip, isOpened: false });
    setSelectedCard({ name: '', link: '' });
  }
  const handleUpdateUser = (data) => api.editProfile(data)
    .then(res => setCurrentUser(res))
    .catch(err => console.log(err));
  const handleUpdateAvatar = (avatar) => api.editAvatar(avatar)
    .then(res => setCurrentUser(res))
    .catch(err => console.log(err));
  const handleLikeClick = (card) => {
    const isLiked = card.likes.some(el => el._id === currentUser._id);
    (isLiked ? api.removeLike(card._id) : api.setLike(card._id))
      .then(newCard => setCards(cards.map(el => el._id === card._id ? newCard : el)))
      .catch(err => console.log(err));
  }
  const handleDeleteClick = (card) => {
    api.removeCard(card._id)
      .then(res => setCards(cards.filter(el => !(el._id === card._id))))
      .catch(err => console.log(err));
  }
  const handlePlaceAdd = (data) => api.addNewCard(data)
    .then(newCard => setCards([newCard, ...cards]))
    .catch(err => console.log(err));

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserInfo({ ...res.data });
            navigate("/", { replace: true });
          }
        })
        .catch(err => console.log(err));
    }
  }
  const handleLogin = () => handleTokenCheck();

  useEffect(() => {
    handleTokenCheck();
  }, []);
  useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then(res => setCurrentUser(res))
        .catch(err => console.log(err));
      api.getStartedCardsPack()
        .then(res => setCards(res))
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={{ loggedIn, setLoggedIn }} userInfo={{ userInfo, setUserInfo }} />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onLikeClick={handleLikeClick}
            onDeleteClick={handleDeleteClick}
            loggedIn={loggedIn}
          />
        } />
        <Route path="/sign-up" element={
          <Register setInfoTooltip={setInfoTooltip} loggedIn={loggedIn} />
        } />
        <Route path="/sign-in" element={
          <Login handleLogin={handleLogin} setUserInfo={setUserInfo} />
        } />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handlePlaceAdd} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <InfoTooltip infoTooltipState={infoTooltip} onClose={closeAllPopups} successText="Вы успешно зарегистрировались!" errorText="Что - то пошло не так! Попробуйте ещё раз." />

    </CurrentUserContext.Provider>
  );
}
export default App;