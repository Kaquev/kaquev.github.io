import home from './component/home.js';
import login from './component/login.js';
import error from './component/error.js';
import newAccount from './component/newaccount.js';

const routes = [
  { path: '/', component: home },
  { path: '/error', component: error },
  { path: '/login', component: login },
  { path: '/new_account', component: newAccount},
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);