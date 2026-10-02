import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  buttonText,
  children,
  onSubmit,
  isValid = true,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />

      <div className="modal__container">
        <button
          className="modal__close-button"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}

          <button
            className="modal__submit-button"
            type="submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
