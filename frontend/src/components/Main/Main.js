import React from 'react';
import Card from '../Card/Card.js';
import CurrentUserContext from '../../contexts/CurrentUserContexts.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile position-center">
        <div className="profile__avatar-container" onClick={props.onEditAvatar} style={{ background: `no-repeat center / cover url(${currentUser.avatar})` }}></div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__heading">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="edit-profile" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__paragraph">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="gallery">
        <ul className="gallery__list position-center">
          {props.cards.map((card) => (<Card card={card} key={card._id} onCardClick={props.onCardClick} onLikeClick={props.onLikeClick} onDeleteClick={props.onDeleteClick} />))}
        </ul>
      </section>

    </main>
  )
}
export default Main;