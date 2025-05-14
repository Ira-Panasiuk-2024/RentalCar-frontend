import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = ({ className }) => {
  return (
    <nav className={`${css.navigation} ${className || ''}`}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.active}` : css.navLink
            }
          >
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.active}` : css.navLink
            }
          >
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
