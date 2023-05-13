import "./App.js";
import logoMestoHeader from "../images/logo__mesto_header.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__main">
        <img className="header__logo" src={logoMestoHeader} alt="Место" />
      </div>
    </header>
  );
}

export default Header;
