import "./App.js";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2022-{new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
