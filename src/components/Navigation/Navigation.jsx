import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({ onSignInClick }) {
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

      <button
        className="navigation__button"
        type="button"
        onClick={onSignInClick}
      >
        Sign In
      </button>
    </nav>
  );
}

export default Navigation;
