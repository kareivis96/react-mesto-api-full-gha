import React from "react";

function ImagePopup(props) {

  const handleEscClick = (evt) => evt.key === 'Escape' && props.onClose();
  const handleOverlayClick = (evt) => evt.target === evt.currentTarget && props.onClose();
  React.useEffect(() => {
    if (!props.card.link) return;
    document.addEventListener('keydown', handleEscClick);
    return () => {
      document.removeEventListener('keydown', handleEscClick);
    }
  }, [props.card.link]);

  return (
    <div id="image-popup" onMouseDown={handleOverlayClick} className={`popup popup_type_image-popup ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="image-block">
        <img src={props.card.link} alt={props.card.name} className="image-block__img" />
        <h2 className="image-block__heading">{props.card.name}</h2>
        <button id="image-block-close-button" type="button" className="close-button" onMouseDown={props.onClose}></button>
      </div>
    </div>
  )
}
export default ImagePopup;