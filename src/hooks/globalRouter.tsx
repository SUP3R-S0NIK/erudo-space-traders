import {NavigateFunction} from 'react-router-dom';

/**
 * The `globalRouter` variable.
 *
 * @typedef {Object} GlobalRouter
 * @property {NavigateFunction|null} navigate - A function used for navigation.
 */
const globalRouter = {navigate: null} as {
    navigate: null | NavigateFunction;
};

export default globalRouter;
