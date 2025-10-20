import { NavLink } from "react-router-dom";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";

export default function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <header className={classes.header} data-test="navigation-header">
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              to={ALL_MEETUP_PAGE}
              activeClassName={classes.active}
            >
              All Meetups
            </NavLink>
          </li>

          <li>
            <NavLink to={NEW_MEETUP_PAGE} activeClassName={classes.active}>
              Add New Meetup
            </NavLink>
          </li>
          <li>
            <NavLink to={FAVORITES_PAGE} activeClassName={classes.active}>
              My Favorites
              <span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
