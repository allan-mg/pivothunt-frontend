import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import logo from "../../images/pivothunt-logo.png";

function Header({ onSignInClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img className="header__logo-image" src={logo} alt="PivotHunt" />
        </Link>

        <Navigation onSignInClick={onSignInClick} />
      </div>
    </header>
  );
}

export default Header;
