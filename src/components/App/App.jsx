import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import { getMultipleJobPages } from "../../utils/TheMuseApi";
import {
  signIn,
  signUp,
  getCurrentUser,
  updateProfile,
} from "../../utils/AuthApi";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import SavedJobs from "../SavedJobs/SavedJobs";
import MyApplications from "../MyApplications/MyApplications";
import JobDetails from "../JobDetails/JobDetails";
import Footer from "../Footer/Footer";

function App() {
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("jwt")),
  );

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState(() => {
    const storedSavedJobs = localStorage.getItem("pivothuntSavedJobs");

    if (!storedSavedJobs) {
      return [];
    }

    try {
      return JSON.parse(storedSavedJobs);
    } catch (err) {
      console.error("Could not read saved jobs:", err);
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const storedJobs = localStorage.getItem("pivothuntJobs");

    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs);

        setJobs(parsedJobs);
        setIsLoading(false);
      } catch (err) {
        console.error("Could not read saved jobs data:", err);
        localStorage.removeItem("pivothuntJobs");
      }
    }

    setIsLoading(true);
    setApiError("");

    getMultipleJobPages(5)
      .then((jobsData) => {
        const formattedJobs = jobsData.map((job) => ({
          id: job.id,
          title: job.name,
          company: job.company?.name || "Company not available",
          location: job.locations?.[0]?.name || "Location not available",
          level: job.levels?.[0]?.name || "Level not specified",
          description: job.contents
            ? `${job.contents.replace(/<[^>]*>/g, "").slice(0, 160)}...`
            : "No description available.",
          url: job.refs?.landing_page || "#",
        }));

        setJobs(formattedJobs);

        localStorage.setItem("pivothuntJobs", JSON.stringify(formattedJobs));
      })
      .catch((err) => {
        console.error(err);

        setApiError(
          "Sorry, something went wrong while requesting jobs. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("pivothuntSavedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Could not get current user:", err);

        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  function handleSignInClick() {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
    setAuthError("");
  }

  function handleSignUpClick() {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
    setSignUpError("");
  }

  function closeAllModals() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  }

  function handleSignInSubmit(evt) {
    evt.preventDefault();
    setAuthError("");

    signIn(signInEmail, signInPassword)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);

        setSignInEmail("");
        setSignInPassword("");

        closeAllModals();
      })
      .catch((err) => {
        console.error(err);
        setAuthError(err.message || String(err));
      });
  }

  function handleSignUpSubmit(evt) {
    evt.preventDefault();
    setSignUpError("");

    signUp(signUpName, signUpEmail, signUpPassword)
      .then(() => {
        setSignUpName("");
        setSignUpEmail("");
        setSignUpPassword("");

        setIsSignUpOpen(false);
        setIsSignInOpen(true);
      })
      .catch((err) => {
        console.error(err);

        setSignUpError(err.message || String(err));
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleUpdateProfile(profileData) {
    const token = localStorage.getItem("jwt");

    return updateProfile(token, profileData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      })
      .catch((err) => {
        console.error("Could not update profile:", err);
        throw err;
      });
  }

  function handleSaveJob(job) {
    setSavedJobs((currentSavedJobs) => {
      const isAlreadySaved = currentSavedJobs.some(
        (savedJob) => savedJob.id === job.id,
      );

      if (isAlreadySaved) {
        return currentSavedJobs.filter((savedJob) => savedJob.id !== job.id);
      }

      return [...currentSavedJobs, job];
    });
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();

    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.level.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app">
      <Header
        onSignInClick={handleSignInClick}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              jobs={filteredJobs}
              savedJobs={savedJobs}
              onSaveJob={handleSaveJob}
              onSearch={handleSearch}
              isLoading={isLoading}
              apiError={apiError}
            />
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <SavedJobs savedJobs={savedJobs} onSaveJob={handleSaveJob} />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                currentUser={currentUser}
                onUpdateProfile={handleUpdateProfile}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={<JobDetails isLoggedIn={isLoggedIn} />}
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyApplications />
            </ProtectedRoute>
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
            value={signInEmail}
            onChange={(evt) => setSignInEmail(evt.target.value)}
            required
          />
        </label>

        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            placeholder="Enter your password"
            value={signInPassword}
            onChange={(evt) => setSignInPassword(evt.target.value)}
            required
          />
        </label>

        {authError && <p className="modal__error">{authError}</p>}

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
            value={signUpName}
            onChange={(evt) => setSignUpName(evt.target.value)}
            required
          />
        </label>

        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            placeholder="Enter your email"
            value={signUpEmail}
            onChange={(evt) => setSignUpEmail(evt.target.value)}
            required
          />
        </label>

        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            placeholder="Create a password"
            value={signUpPassword}
            onChange={(evt) => setSignUpPassword(evt.target.value)}
            required
          />
        </label>

        {signUpError && <p className="modal__error">{signUpError}</p>}

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
