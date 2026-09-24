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
  const [savedJobs, setSavedJobs] = useState([]);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Northstar Labs",
      location: "Remote · United States",
      level: "Junior",
      description:
        "Build modern and responsive web experiences using React and JavaScript.",
    },
    {
      id: 2,
      title: "React Developer",
      company: "BrightPath Technologies",
      location: "Remote",
      level: "Mid Level",
      description:
        "Join a product team focused on building intuitive applications for thousands of users.",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Orbit Systems",
      location: "Austin, TX",
      level: "Junior",
      description:
        "Work across React, Node.js, and REST APIs to build scalable web products.",
    },
  ];

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

  function handleSaveJob(job) {
    const isAlreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id);

    if (isAlreadySaved) {
      setSavedJobs(savedJobs.filter((savedJob) => savedJob.id !== job.id));
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  }

  return (
    <div className="app">
      <Header onSignInClick={handleSignInClick} />

      <Routes>
        <Route
          path="/"
          element={
            <Main jobs={jobs} savedJobs={savedJobs} onSaveJob={handleSaveJob} />
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <SavedJobs savedJobs={savedJobs} onSaveJob={handleSaveJob} />
          }
        />
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
