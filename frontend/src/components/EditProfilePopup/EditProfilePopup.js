import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import CurrentUserContext from '../../contexts/CurrentUserContexts.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const handleNameInput = (evt) => setName(evt.target.value);
  const handleAboutInput = (evt) => setAbout(evt.target.value);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({ name, about });
    props.onClose();
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <div className="popup__input-wrapper">
        <input value={name || ''} onChange={handleNameInput} type="text" className="popup__input" placeholder="Имя" required minLength="2" maxLength="40" />
        <p className="popup__error-text" />
      </div>
      <div className="popup__input-wrapper">
        <input value={about || ''} onChange={handleAboutInput} type="text" className="popup__input" placeholder="Род занятий" required minLength="2" maxLength="200" />
        <p className="popup__error-text" />
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;