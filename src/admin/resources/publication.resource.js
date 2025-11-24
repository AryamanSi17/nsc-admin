import { Components } from '../component-loader.js';

export const publicationResourceOptions = {
  navigation: {
    name: 'Publications',
    icon: 'BookOpen',
  },

  properties: {
    _id: { isVisible: { list: true, filter: true, show: true, edit: false } },

    user: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      reference: 'User',
    },

    userName: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },

    userEmail: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },

    teamSize: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },

    numberOfProjects: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },

    projects: {
      isVisible: { list: false, filter: false, show: true, edit: true },
      type: 'mixed',
      isArray: true,
    },

    'projects.name': {
      isVisible: { list: false, filter: false, show: true, edit: true },
    },

    'projects.stage': {
      isVisible: { list: false, filter: false, show: true, edit: true },
      availableValues: [
        { value: 1, label: 'Stage 1' },
        { value: 2, label: 'Stage 2' },
        { value: 3, label: 'Stage 3' },
        { value: 4, label: 'Stage 4' },
        { value: 5, label: 'Stage 5' },
        { value: 6, label: 'Stage 6' },
        { value: 7, label: 'Stage 7' },
        { value: 8, label: 'Stage 8' },
        { value: 9, label: 'Stage 9-12' },
        { value: 10, label: 'Stage 13-16' },
        { value: 11, label: 'Stage 17-20' },
      ],
    },

    'projects.stageHistory': {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },

    status: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      availableValues: [
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },

    'certificate.url': {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },

    'certificate.key': { isVisible: false },

    'certificate.uploadedAt': {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },

    'certificate.uploadedBy': {
      isVisible: { list: false, filter: false, show: true, edit: false },
      reference: 'User',
    },

    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },

    updatedAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
  },

  listProperties: ['_id', 'userName', 'userEmail', 'teamSize', 'numberOfProjects', 'status', 'createdAt'],
  filterProperties: ['userName', 'userEmail', 'status', 'teamSize', 'createdAt'],

  showProperties: [
    '_id',
    'user',
    'userName',
    'userEmail',
    'teamSize',
    'numberOfProjects',
    'projects',
    'status',
    'certificate.url',
    'certificate.uploadedAt',
    'certificate.uploadedBy',
    'createdAt',
    'updatedAt',
  ],

  editProperties: ['user', 'userName', 'userEmail', 'teamSize', 'projects', 'status'],

  actions: {
    new: {
      isAccessible: true,
      before: async (request) => {
        return rebuildProjects(request);
      },
    },

    edit: {
      isAccessible: true,
      before: async (request) => {
        return rebuildProjects(request);
      },
    },

    delete: { isAccessible: true },
    list: { isAccessible: true },
    show: { isAccessible: true },
  },
};

/* --------------------------------------------------------
   Helper to rebuild nested "projects" from flat payload
--------------------------------------------------------- */
function rebuildProjects(request) {
  if (!request.payload) return request;

  const payload = request.payload;

  // Detect flat keys like: projects.0.name
  const flatKeys = Object.keys(payload).filter((k) => k.startsWith('projects.'));

  if (flatKeys.length === 0) return request;

  const projects = [];

  flatKeys.forEach((key) => {
    const [, index, field] = key.split('.');
    if (!projects[index]) projects[index] = {};
    projects[index][field] = payload[key];
  });

  // Clean projects array
  request.payload.projects = projects.map((p) => {
    const stage = parseInt(p.stage) || 1;

    return {
      name: p.name,
      stage,
      stageHistory: [
        {
          stage,
          movedAt: new Date(),
          movedBy: request.context?.currentAdmin?._id,
        },
      ],
    };
  });

  request.payload.numberOfProjects = projects.length;

  return request;
}
