import { NavLink } from "react-router-dom";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./../../utils/constants";
import { useContext, useEffect, useRef, useState } from "react";
import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/FavoritesContext";

export default function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  const [visible, setVisible] = useState(true);
  const prevScroll = useRef(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );

  useEffect(() => {
    function onScroll() {
      const current = window.pageYOffset || document.documentElement.scrollTop;
      setVisible(prevScroll.current > current);
      prevScroll.current = current;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }, []);

  return (
    <header
      className={`${classes.header} ${!visible ? classes.hidden : ""}`}
      data-test="navigation-header"
    >
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
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
