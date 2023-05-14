import "./App.js";

function PopupWithForm({ 
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit
}) {
  return (
    <div className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}/>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
