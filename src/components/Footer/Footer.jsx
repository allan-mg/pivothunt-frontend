import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2026 PivotHunt</p>

        <nav className="footer__navigation">
          <a className="footer__link" href="/">
            Home
          </a>

          <a className="footer__link" href="/saved-jobs">
            Saved Jobs
          </a>

          <a
            className="footer__link"
            href="https://github.com/"
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
