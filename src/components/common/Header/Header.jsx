import Navigation from '../Header/Navigation/Navigation';
import css from '../Header/Header.module.css';
import Logo from '../Header/Logo/Logo';

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.box}>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
