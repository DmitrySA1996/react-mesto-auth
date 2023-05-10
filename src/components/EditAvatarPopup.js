import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {

    const avatarRef = React.useRef(null)

    React.useEffect(() => {
        avatarRef.current.value = ""
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            name="popup_type_update-avatar"
            title="Обновить аватар"
            buttonText="Сохранение"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="avatar"
                id="avatar"
                className="popup__text popup__text_type_subtitle"
                placeholder="Введите ссылку URL"
                ref={avatarRef}
                required
            />
            <span className="avatar-error popup__text-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;