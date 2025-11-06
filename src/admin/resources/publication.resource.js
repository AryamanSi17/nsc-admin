import { Components } from '../component-loader.js';

export const publicationResourceOptions = {
  navigation: {
    name: 'Publications',
    icon: 'BookOpen',
  },
  properties: {
    _id: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
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
    'projects': {
      isVisible: { list: false, filter: false, show: true, edit: true },
      type: 'mixed',
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
    'certificate.key': {
      isVisible: { list: false, filter: false, show: false, edit: false },
    },
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
    'updatedAt'
  ],
  editProperties: ['user', 'userName', 'userEmail', 'teamSize', 'projects', 'status'],
  actions: {
    new: {
      isAccessible: true,
      before: async (request) => {
        if (request.payload && request.payload.projects) {
          const projects = JSON.parse(request.payload.projects);
          request.payload.numberOfProjects = projects.length;
          
          request.payload.projects = projects.map(project => ({
            ...project,
            stage: project.stage || 1,
            stageHistory: [{
              stage: project.stage || 1,
              movedAt: new Date(),
              movedBy: request.context?.currentAdmin?._id
            }]
          }));
        }
        return request;
      },
    },
    edit: {
      isAccessible: true,
      before: async (request) => {
        if (request.payload && request.payload.projects) {
          const projects = JSON.parse(request.payload.projects);
          request.payload.numberOfProjects = projects.length;
        }
        return request;
      },
    },
    delete: {
      isAccessible: true,
    },
    list: {
      isAccessible: true,
    },
    show: {
      isAccessible: true,
    },
  },
};