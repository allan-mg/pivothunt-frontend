import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedJobs from "../SavedJobs/SavedJobs";
import Footer from "../Footer/Footer";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  function handleSignInClick() {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  }

  function handleSignUpClick() {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  }

  function closeAllModals() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  }

  function handleSignInSubmit(evt) {
    evt.preventDefault();
  }

  function handleSignUpSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className="app">
      <Header onSignInClick={handleSignInClick} />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>

      <Footer />

      <ModalWithForm
        isOpen={isSignInOpen}
        onClose={closeAllModals}
        title="Sign in"
        buttonText="Sign in"
        onSubmit={handleSignInSubmit}
      >
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            placeholder="Enter your email"
            required
          />
        </label>

        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            placeholder="Enter your password"
            required
          />
        </label>

        <p className="modal__switch-text">
          New to PivotHunt?{" "}
          <button
            className="modal__switch-button"
            type="button"
            onClick={handleSignUpClick}
          >
            Create an account
          </button>
        </p>
      </ModalWithForm>

      <ModalWithForm
        isOpen={isSignUpOpen}
        onClose={closeAllModals}
        title="Sign up"
        buttonText="Create account"
        onSubmit={handleSignUpSubmit}
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            placeholder="Enter your name"
            required
          />
        </label>

        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            placeholder="Enter your email"
            required
          />
        </label>

        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            placeholder="Create a password"
            required
          />
        </label>

        <p className="modal__switch-text">
          Already have an account?{" "}
          <button
            className="modal__switch-button"
            type="button"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        </p>
      </ModalWithForm>
    </div>
  );
}

export default App;
