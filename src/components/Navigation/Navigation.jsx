import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({ onSignInClick, isLoggedIn, onLogout }) {
  return (
    <nav className="navigation">
      <NavLink
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
        to="/saved-jobs"
      >
        Saved Jobs
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
            to="/applications"
          >
            My Applications
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `navigation__button ${
                isActive ? "navigation__button_active" : ""
              }`
            }
            to="/profile"
          >
            Profile
          </NavLink>

          <button
            className="navigation__logout-button"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="navigation__button"
          type="button"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Navigation;
