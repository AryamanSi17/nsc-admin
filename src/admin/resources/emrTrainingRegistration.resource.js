import { EmrTrainingRegistration } from '../../models/emrTrainingRegistration.model.js';
import uploadFeature from '@adminjs/upload';
import { componentLoader } from '../component-loader.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificateFeature = uploadFeature({
  componentLoader,
  provider: {
    aws: {
      region: process.env.AWS_REGION,
      bucket: process.env.S3_BUCKET_NAME,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
  properties: {
    key: 'certificate.key',
    bucket: 'certificate.bucket',
    mimeType: 'certificate.mimeType',
    size: 'certificate.size',
    filename: 'certificate.filename',
  },
  validation: {
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 5242880,
  },
});

export const emrTrainingRegistrationResourceOptions = {
  properties: {
    _id: {
      isVisible: { list: false, show: true, edit: false }
    },
    user: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      reference: 'User',
      position: 1
    },
    month: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 2,
      availableValues: [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }
      ]
    },
    year: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 3
    },
    sessionTime: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 4
    },
    status: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 5,
      availableValues: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    registeredAt: {
      isVisible: { list: true, show: true, edit: false },
      position: 6,
      type: 'datetime'
    },
    confirmedAt: {
      isVisible: { list: false, show: true, edit: false },
      type: 'datetime'
    },
    rejectedAt: {
      isVisible: { list: false, show: true, edit: false },
      type: 'datetime'
    },
    completedAt: {
      isVisible: { list: false, show: true, edit: false },
      type: 'datetime'
    },
    confirmedBy: {
      isVisible: { list: false, show: true, edit: false },
      reference: 'User'
    },
    rejectedBy: {
      isVisible: { list: false, show: true, edit: false },
      reference: 'User'
    },
    rejectionReason: {
      isVisible: { list: false, show: true, edit: true }
    },
    zoomLink: {
      isVisible: { list: false, show: true, edit: true }
    },
    adminNotes: {
      isVisible: { list: false, show: true, edit: true }
    },
    attendanceMarked: {
      isVisible: { list: true, show: true, edit: true },
      type: 'boolean'
    },
    'certificate.key': {
      isVisible: { list: false, show: false, edit: false }
    },
    'certificate.bucket': {
      isVisible: { list: false, show: false, edit: false }
    },
    'certificate.mimeType': {
      isVisible: { list: false, show: false, edit: false }
    },
    'certificate.size': {
      isVisible: { list: false, show: false, edit: false }
    },
    'certificate.filename': {
      isVisible: { list: false, show: false, edit: false }
    },
    'certificate.uploadedAt': {
      isVisible: { list: false, show: true, edit: false },
      type: 'datetime'
    },
    'certificate.uploadedBy': {
      isVisible: { list: false, show: true, edit: false },
      reference: 'User'
    },
    createdAt: {
      isVisible: { list: false, show: true, edit: false }
    },
    updatedAt: {
      isVisible: { list: false, show: true, edit: false }
    }
  },
  listProperties: ['user', 'month', 'year', 'status', 'sessionTime', 'attendanceMarked'],
  filterProperties: ['user', 'month', 'year', 'status', 'sessionTime'],
  showProperties: [
    '_id',
    'user',
    'month',
    'year',
    'sessionTime',
    'status',
    'registeredAt',
    'confirmedAt',
    'rejectedAt',
    'completedAt',
    'rejectionReason',
    'zoomLink',
    'adminNotes',
    'attendanceMarked',
    'certificate.key',
    'certificate.uploadedAt',
    'certificate.uploadedBy',
    'confirmedBy',
    'rejectedBy',
    'createdAt',
    'updatedAt'
  ],
  editProperties: ['user', 'month', 'year', 'sessionTime', 'status', 'zoomLink', 'adminNotes', 'attendanceMarked', 'rejectionReason'],
  actions: {
    new: {
      isAccessible: true,
      before: async (request, context) => {
        if (request.payload) {
          if (!request.payload.status) {
            request.payload.status = 'pending';
          }
          if (!request.payload.registeredAt) {
            request.payload.registeredAt = new Date();
          }
          if (!request.payload.year) {
            request.payload.year = new Date().getFullYear();
          }
          if (!request.payload.month) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            request.payload.month = months[new Date().getMonth()];
          }
          if (!request.payload.sessionTime) {
            request.payload.sessionTime = '2:00 PM - 5:00 PM';
          }
          if (!request.payload.attendanceMarked) {
            request.payload.attendanceMarked = false;
          }
        }
        return request;
      }
    },
    delete: {
      isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'
    },
    edit: {
      isAccessible: true,
      before: async (request, context) => {
        if (request.payload && request.payload.status) {
          const currentDate = new Date();
          const adminId = context.currentAdmin?._id;
          
          if (request.payload.status === 'confirmed') {
            request.payload.confirmedAt = currentDate;
            request.payload.rejectedAt = null;
            request.payload.confirmedBy = adminId;
          } else if (request.payload.status === 'rejected') {
            request.payload.rejectedAt = currentDate;
            request.payload.confirmedAt = null;
            request.payload.rejectedBy = adminId;
          } else if (request.payload.status === 'completed') {
            request.payload.completedAt = currentDate;
          }
        }
        if (request.payload && request.payload['certificate.key']) {
          request.payload['certificate.uploadedAt'] = new Date();
          request.payload['certificate.uploadedBy'] = context.currentAdmin?._id;
          request.payload['certificate.url'] = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${request.payload['certificate.key']}`;
        }
        return request;
      }
    },
    list: { isAccessible: true },
    show: { isAccessible: true }
  },
  navigation: {
    name: 'EMR Training',
    icon: 'Calendar'
  }
};

export const emrTrainingRegistrationResource = {
  resource: EmrTrainingRegistration,
  options: emrTrainingRegistrationResourceOptions,
  features: [certificateFeature],
};