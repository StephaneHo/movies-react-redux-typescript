import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tvseries"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              TV Series
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
