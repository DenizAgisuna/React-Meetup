import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import {
  ALL_MEETUP_PAGE,
  FAVORITES_PAGE,
  NEW_MEETUP_PAGE,
} from "./utils/constants";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { FavoritesContextProvider } from "./store/FavoritesContext";
import { MeetupsContextProvider } from "./store/MeetupsContext";

function App() {
  return (
    <FavoritesContextProvider>
      <MeetupsContextProvider>
      <Router>
        <div data-test="app" style={{marginTop:'7rem'}}>
          <MainNavigation />
          <Layout>
            <Switch>
              <Route exact path={ALL_MEETUP_PAGE} component={AllMeetupsPage} />
              <Route path={NEW_MEETUP_PAGE} component={NewMeetupsPage} />
              <Route path={FAVORITES_PAGE} component={FavoritesPage} />
            </Switch>
          </Layout>
        </div>
      </Router>
      </MeetupsContextProvider>
    </FavoritesContextProvider>
  );
}

export default App;
