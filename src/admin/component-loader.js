import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  CustomLogin: componentLoader.add('CustomLogin', './components/CustomLogin'),
  Dashboard: componentLoader.add('Dashboard', './components/Dashboard'),
};

export { componentLoader, Components };