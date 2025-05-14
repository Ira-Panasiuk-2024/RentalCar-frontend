import css from './Logo.module.css';

export const Logo = () => {
  return (
    <p className={css.textLogo}>
      Rental<span className={css.logoAccent}>Car</span>
    </p>
  );
};

export default Logo;