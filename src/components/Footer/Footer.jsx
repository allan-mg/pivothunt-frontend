import { Link } from "react-router-dom";
import "./Footer.css";

function Footer({ isLoggedIn }) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2026 PivotHunt</p>

        <nav className="footer__navigation">
          <Link className="footer__link" to="/">
            Home
          </Link>

          {isLoggedIn && (
            <Link className="footer__link" to="/saved-jobs">
              Saved Jobs
            </Link>
          )}

          <a
            className="footer__link"
            href="https://github.com/allan-mg/pivothunt-frontend"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
