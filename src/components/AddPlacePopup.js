import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace
}) {
    const [placeName, setPlaceName] = React.useState("");
    const [placeLink, setPlacelink] = React.useState("");

    React.useEffect(() => {
        setPlaceName("");
        setPlacelink("");
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: placeName,
            link: placeLink
        });
    }

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlacelink(e.target.value);
    }

    return (
        <PopupWithForm
            name="popup_type_image"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                value={placeName}
                placeholder="Название"
                id="title-image"
                className="popup__text popup__text_type_title"
                minLength="2"
                maxLength="30"
                onChange={handleChangePlaceName}
                required
            />
            <span className="title-image-error popup__text-error"></span>

            <input
                type="url"
                name="link"
                value={placeLink}
                id="link"
                placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_subtitle"
                onChange={handleChangePlaceLink}
                required
            />
            <span className="link-error popup__text-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;