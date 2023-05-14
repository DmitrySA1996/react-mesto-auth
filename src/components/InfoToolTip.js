import SuccessIcon from "../images/Success.svg";
import FailIcon from "../images/Fail.svg";
import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose} />
        <div className="popup__form">
          {props.isSuccess ? (
            <>
              <img
                src={`${SuccessIcon}`}
                alt="Регистрация прошла успешно."
                className="popup__tooltip_image"
              />
              <p className="popup__tooltip_message">
                Вы успешно зарегистрировались!
              </p>
            </>
          ) : (
            <>
              <img
                src={`${FailIcon}`}
                alt="Регистрация не была выполнена."
                className="popup__tooltip_image"
              />
              <p className="popup__tooltip_message">
                Что-то пошло не так. Попробуйте ещё раз!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;