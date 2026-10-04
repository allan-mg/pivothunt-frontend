import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getMultipleJobPages } from "../../utils/TheMuseApi";

import {
  signIn,
  signUp,
  getCurrentUser,
  updateProfile,
} from "../../utils/AuthApi";

import {
  getSavedJobs,
  saveJob,
  deleteSavedJob,
} from "../../utils/SavedJobsApi";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import SavedJobs from "../SavedJobs/SavedJobs";
import MyApplications from "../MyApplications/MyApplications";
import JobDetails from "../JobDetails/JobDetails";
import Footer from "../Footer/Footer";

function getInitialJobs() {
  const storedJobs = localStorage.getItem("pivothuntJobs");

  if (!storedJobs) {
    return [];
  }

  try {
    return JSON.parse(storedJobs);
  } catch (err) {
    console.error("Could not read saved jobs data:", err);
    localStorage.removeItem("pivothuntJobs");
    return [];
  }
}

function App() {
  const navigate = useNavigate();

  // SIGN IN
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [signInEmailError, setSignInEmailError] = useState("");
  const [signInPasswordError, setSignInPasswordError] = useState("");

  // AUTH
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("jwt")),
  );

  const [currentUser, setCurrentUser] = useState(null);

  // SIGN UP
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpNameError, setSignUpNameError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState("");

  // MODALS
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // JOBS
  const [jobs, setJobs] = useState(getInitialJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(
    () => getInitialJobs().length === 0,
  );
  const [savedJobsError, setSavedJobsError] = useState("");
  const [apiError, setApiError] = useState("");

  // LOAD JOBS FROM THE MUSE
  useEffect(() => {
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

  // RESTORE CURRENT USER FROM JWT
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

  // LOAD SAVED JOBS FROM MONGODB
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token || !isLoggedIn) {
      return;
    }

    getSavedJobs(token)
      .then((savedJobsData) => {
        const formattedSavedJobs = savedJobsData.map((savedJob) => ({
          id: savedJob.jobId,
          _id: savedJob._id,
          jobId: savedJob.jobId,
          title: savedJob.title,
          company: savedJob.company,
          location: savedJob.location,
          level: savedJob.level,
          description: savedJob.description,
          url: savedJob.url,
        }));

        setSavedJobs(formattedSavedJobs);
      })
      .catch((err) => {
        console.error("Could not load saved jobs:", err);
      });
  }, [isLoggedIn]);

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSignInEmailChange(evt) {
    const { value } = evt.target;

    setSignInEmail(value);

    if (!value) {
      setSignInEmailError("Email is required.");
    } else if (!validateEmail(value)) {
      setSignInEmailError("Please enter a valid email address.");
    } else {
      setSignInEmailError("");
    }
  }

  function handleSignInPasswordChange(evt) {
    const { value } = evt.target;

    setSignInPassword(value);

    if (!value) {
      setSignInPasswordError("Password is required.");
    } else {
      setSignInPasswordError("");
    }
  }

  function handleSignUpNameChange(evt) {
    const { value } = evt.target;

    setSignUpName(value);

    if (!value) {
      setSignUpNameError("Name is required.");
    } else if (value.length < 2) {
      setSignUpNameError("Name must contain at least 2 characters.");
    } else if (value.length > 30) {
      setSignUpNameError("Name cannot exceed 30 characters.");
    } else {
      setSignUpNameError("");
    }
  }

  function handleSignUpEmailChange(evt) {
    const { value } = evt.target;

    setSignUpEmail(value);

    if (!value) {
      setSignUpEmailError("Email is required.");
    } else if (!validateEmail(value)) {
      setSignUpEmailError("Please enter a valid email address.");
    } else {
      setSignUpEmailError("");
    }
  }

  function handleSignUpPasswordChange(evt) {
    const { value } = evt.target;

    setSignUpPassword(value);

    if (!value) {
      setSignUpPasswordError("Password is required.");
    } else if (value.length < 8) {
      setSignUpPasswordError("Password must contain at least 8 characters.");
    } else {
      setSignUpPasswordError("");
    }
  }

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
      .then(() => signIn(signUpEmail, signUpPassword))
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);

        setSignUpName("");
        setSignUpEmail("");
        setSignUpPassword("");

        setSignUpNameError("");
        setSignUpEmailError("");
        setSignUpPasswordError("");

        closeAllModals();
      })
      .catch((err) => {
        console.error(err);

        setSignUpError(err.message || String(err));
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");

    setCurrentUser(null);
    setSavedJobs([]);
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
    const token = localStorage.getItem("jwt");

    if (!token) {
      setSavedJobsError("Please sign in to save jobs.");
      return;
    }

    setSavedJobsError("");

    const existingSavedJob = savedJobs.find(
      (savedJob) => String(savedJob.id || savedJob.jobId) === String(job.id),
    );

    // REMOVE SAVED JOB
    if (existingSavedJob) {
      return deleteSavedJob(token, existingSavedJob._id)
        .then(() => {
          setSavedJobs((currentSavedJobs) =>
            currentSavedJobs.filter(
              (savedJob) => savedJob._id !== existingSavedJob._id,
            ),
          );

          setSavedJobsError("");
        })
        .catch((err) => {
          console.error("Could not delete saved job:", err);

          setSavedJobsError(
            "We couldn't remove this job from your saved jobs. Please try again.",
          );
        });
    }

    // SAVE JOB
    return saveJob(token, job)
      .then((savedJob) => {
        setSavedJobs((currentSavedJobs) => [
          ...currentSavedJobs,
          {
            ...job,
            _id: savedJob._id,
            jobId: savedJob.jobId,
          },
        ]);

        setSavedJobsError("");
      })
      .catch((err) => {
        console.error("Could not save job:", err);

        setSavedJobsError("We couldn't save this job. Please try again.");
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

  const isSignInValid =
    signInEmail !== "" &&
    signInPassword !== "" &&
    validateEmail(signInEmail) &&
    !signInEmailError &&
    !signInPasswordError;

  const isSignUpValid =
    signUpName.length >= 2 &&
    signUpName.length <= 30 &&
    signUpEmail !== "" &&
    validateEmail(signUpEmail) &&
    signUpPassword.length >= 8 &&
    !signUpNameError &&
    !signUpEmailError &&
    !signUpPasswordError;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onSignInClick={handleSignInClick}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />

        {savedJobsError && (
          <div className="app__saved-jobs-error" role="alert">
            <span>{savedJobsError}</span>

            <button
              className="app__saved-jobs-error-close"
              type="button"
              aria-label="Dismiss error"
              onClick={() => setSavedJobsError("")}
            >
              ×
            </button>
          </div>
        )}

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
                isLoggedIn={isLoggedIn}
                onSignInRequired={handleSignUpClick}
              />
            }
          />

          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onSignInRequired={handleSignInClick}
              >
                <SavedJobs
                  savedJobs={savedJobs}
                  onSaveJob={handleSaveJob}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onSignInRequired={handleSignInClick}
              >
                <Profile onUpdateProfile={handleUpdateProfile} />
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
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onSignInRequired={handleSignInClick}
              >
                <MyApplications />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer isLoggedIn={isLoggedIn} />

        <ModalWithForm
          isOpen={isSignInOpen}
          onClose={closeAllModals}
          title="Sign in"
          buttonText="Sign in"
          onSubmit={handleSignInSubmit}
          isValid={isSignInValid}
        >
          <label className="modal__label">
            Email
            <input
              className="modal__input"
              type="email"
              placeholder="Enter your email"
              value={signInEmail}
              onChange={handleSignInEmailChange}
              required
            />
            {signInEmailError && (
              <span className="modal__input-error">{signInEmailError}</span>
            )}
          </label>

          <label className="modal__label">
            Password
            <input
              className="modal__input"
              type="password"
              placeholder="Enter your password"
              value={signInPassword}
              onChange={handleSignInPasswordChange}
              required
            />
            {signInPasswordError && (
              <span className="modal__input-error">{signInPasswordError}</span>
            )}
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
          isValid={isSignUpValid}
        >
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              placeholder="Enter your name"
              value={signUpName}
              onChange={handleSignUpNameChange}
              required
            />
            {signUpNameError && (
              <span className="modal__input-error">{signUpNameError}</span>
            )}
          </label>

          <label className="modal__label">
            Email
            <input
              className="modal__input"
              type="email"
              placeholder="Enter your email"
              value={signUpEmail}
              onChange={handleSignUpEmailChange}
              required
            />
            {signUpEmailError && (
              <span className="modal__input-error">{signUpEmailError}</span>
            )}
          </label>

          <label className="modal__label">
            Password
            <input
              className="modal__input"
              type="password"
              placeholder="Create a password"
              value={signUpPassword}
              onChange={handleSignUpPasswordChange}
              required
            />
            {signUpPasswordError && (
              <span className="modal__input-error">{signUpPasswordError}</span>
            )}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
