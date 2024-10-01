
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);}

const Header = () => {
  return (
      <nav className={styles.nav}>
    <NavLink  to='/' className={buildLinkClass}>
        Home
    </NavLink>
    <NavLink  to='/movies' className={buildLinkClass}>
        Movies
    </NavLink>
</nav>

  )
}

export default Header