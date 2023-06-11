import React from "react";

function PopupWithForm(props) {

  const handleEscClick = (evt) => { if (evt.key === 'Escape') props.onClose() }
  const handleOverlayClick = (evt) => { if (evt.target === evt.currentTarget) props.onClose() }
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClick);
    return () => {
      document.removeEventListener('keydown', handleEscClick);
    }
  });

  return (
    <div onMouseDown={handleOverlayClick} className={`popup popup_type_${props.name} ${props.isOpened && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__heading">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          {props.children && props.children}
          <button type="submit" className="popup__save-button">{props.buttonText}</button>
        </form>
        <button type="button" className="close-button" onMouseDown={props.onClose}></button>
      </div>
    </div>
  )
}
export default PopupWithForm;