import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>DecAd</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/home' className={navData => navData.isActive ? classes.active : '' }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/connect-wallet' className={navData => navData.isActive ? classes.active : '' }>
              Connect Wallet
            </NavLink>
          </li>
          <li>
            <NavLink to='/companies' className={navData => navData.isActive ? classes.active : '' }>
              Companies
            </NavLink>
          </li>
          <li>
            <NavLink to='/influencers' className={navData => navData.isActive ? classes.active : '' }>
              Influencers
            </NavLink>
          </li>
          <li>
            <NavLink to='/products' className={navData => navData.isActive ? classes.active : '' }>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
