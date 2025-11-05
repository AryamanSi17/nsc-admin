import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { User } from '../models/user.model.js';
import { CV } from '../models/cv.model.js';
import { Conference } from '../models/conference.model.js';
import { ConferenceRegistration } from '../models/conferenceRegistration.model.js';
import { Workshop } from '../models/workshop.model.js';
import { WorkshopRegistration } from '../models/workshopRegistration.model.js';
import { userResourceOptions } from './resources/user.resource.js';
import { cvResourceOptions } from './resources/cv.resource.js';
import { conferenceResourceOptions } from './resources/conference.resource.js';
import { conferenceRegistrationResourceOptions } from './resources/conferenceRegistration.resource.js';
import { workshopResourceOptions } from './resources/workshop.resource.js';
import { workshopRegistrationResourceOptions } from './resources/workshopRegistration.resource.js';
import { EmrTrainingRegistration } from '../models/emrTrainingRegistration.model.js';
import { emrTrainingRegistrationResourceOptions } from './resources/emrTrainingRegistration.resource.js';

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
      { resource: ConferenceRegistration, options: conferenceRegistrationResourceOptions },
      { resource: Workshop, options: workshopResourceOptions },
      { resource: WorkshopRegistration, options: workshopRegistrationResourceOptions },
      { resource: EmrTrainingRegistration, options: emrTrainingRegistrationResourceOptions }
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
    assets: {
      styles: ['/admin-custom.css']
    },
    componentLoader,
    loginPath: '/admin/login',
    logoutPath: '/admin/logout'
  });
};

export { Components };