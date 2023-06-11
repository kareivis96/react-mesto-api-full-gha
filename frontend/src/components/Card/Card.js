import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContexts.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = currentUser._id === props.card.owner._id;
  const isLiked = props.card.likes.some(el => el._id === currentUser._id);

  const handleClick = () => props.onCardClick(props.card);

  return (
    <article className="card">
      <div className="card__img" style={{ background: `no-repeat center / cover url(${props.card.link}) #000` }} onMouseDown={handleClick} />
      <div className="card__container">
        <h2 className="card__text">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={`card__like-button ${isLiked && 'card__like-button_active'}`} onClick={() => props.onLikeClick(props.card)} />
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwner && <button type="button" className="card__delete-button" onClick={() => props.onDeleteClick(props.card)} />}
    </article>
  );
}
export default Card;