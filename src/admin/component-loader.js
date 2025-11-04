import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  CustomLogin: componentLoader.add('CustomLogin', './components/CustomLogin'),
  CustomText: componentLoader.add('CustomText', './components/CustomText'),
  Dashboard: componentLoader.add('Dashboard', './components/Dashboard'),
  WorkshopRegistrations: componentLoader.add('WorkshopRegistrations', './components/WorkshopRegistrations'),
};

export { componentLoader, Components };