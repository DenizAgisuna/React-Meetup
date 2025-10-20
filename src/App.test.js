/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { FavoritesContext } from "./store/FavoritesContext";

// Mock the FavoritesContext module before importing consumers so tests and components share the same context object.
jest.mock("./store/FavoritesContext", () => {
  const React = require("react");
  const ctx = React.createContext(); // single shared context instance
  return {
    __esModule: true,
    default: ctx,
    FavoritesContext: ctx,
  };
});

/**
 * Factory function to create a ShallowWrapper for the App component
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

// helper to find by data-test attribute
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders App without crashing", () => {
  const wrapper = setup();
  expect(wrapper.exists()).toBe(true);
});

test("App has root element with data-test='app'", () => {
  const wrapper = setup();
  const appDiv = findByTestAttr(wrapper, "app");
  expect(appDiv.exists()).toBe(true);
});

test("renders the navigation component", () => {
  const wrapper = setup();
  expect(wrapper.find(MainNavigation).length).toBe(1);
});

test("renders the Layout component", () => {
  const wrapper = setup();
  expect(wrapper.find(Layout).length).toBe(1);
});

test("MainNavigation shows zero when context totalFavorites is 0", () => {
  const wrapper = mount(
    <MemoryRouter>
      <FavoritesContext.Provider value={{ totalFavorites: 0 }}>
        <MainNavigation />
      </FavoritesContext.Provider>
    </MemoryRouter>
  );

  const badge = wrapper
    .find("span")
    .filterWhere((n) => n.hasClass("favoritesBadge"));

  expect(badge.exists()).toBe(true);
  expect(badge.text()).toBe("0");
});

test("MainNavigation shows favorites count from context (mounted with Router + mocked context)", () => {
  const wrapper = mount(
    <MemoryRouter>
      <FavoritesContext.Provider value={{ totalFavorites: 42 }}>
        <MainNavigation />
      </FavoritesContext.Provider>
    </MemoryRouter>
  );

  const badge = wrapper
    .find("span")
    .filterWhere((n) => n.hasClass("favoritesBadge"));

  expect(badge.exists()).toBe(true);
  expect(badge.text()).toBe("42");
});


