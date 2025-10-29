import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { User, CV, Conference, ConferenceRegistration } from '../models/index.js';
import { userResourceOptions } from './resources/user.resource.js';
import { cvResourceOptions } from './resources/cv.resource.js';
import { conferenceResourceOptions } from './resources/conference.resource.js';
import { conferenceRegistrationResourceOptions } from './resources/conferenceRegistration.resource.js';
import { componentLoader, Components } from './component-loader.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

export const createAdminJS = () => {
  return new AdminJS({
    resources: [
      { resource: User, options: userResourceOptions },
      { resource: CV, options: cvResourceOptions },
      { resource: Conference, options: conferenceResourceOptions },
      { resource: ConferenceRegistration, options: conferenceRegistrationResourceOptions }
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'NextSteps Admin CV Portal',
      softwareBrothers: false,
      logo: false,
      theme: {
        colors: {
          primary100: '#04445E',
          primary80: '#169AB4',
          primary60: '#1aaac9',
          primary40: '#5bc4d9',
          primary20: '#a8e0eb'
        }
      }
    },
    componentLoader,
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
  });
};

export { Components };