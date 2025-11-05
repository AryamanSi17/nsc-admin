import { EmrTrainingRegistration } from '../../models/emrTrainingRegistration.model.js';

export const emrTrainingRegistrationResourceOptions = {
  properties: {
    _id: {
      isVisible: { list: false, show: true, edit: false }
    },
    user: {
      isVisible: { list: true, show: true, edit: false, filter: true },
      position: 1
    },
    month: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 2
    },
    date: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 3
    },
    year: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 4
    },
    sessionTime: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 5
    },
    status: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 6,
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
      position: 7,
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
      isVisible: { list: false, show: true, edit: false }
    },
    rejectedBy: {
      isVisible: { list: false, show: true, edit: false }
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
    'certificate.url': {
      isVisible: { list: false, show: true, edit: false }
    },
    'certificate.uploadedAt': {
      isVisible: { list: false, show: true, edit: false },
      type: 'datetime'
    },
    'certificate.uploadedBy': {
      isVisible: { list: false, show: true, edit: false }
    },
    createdAt: {
      isVisible: { list: false, show: true, edit: false }
    },
    updatedAt: {
      isVisible: { list: false, show: true, edit: false }
    }
  },
  listProperties: ['user', 'month', 'date', 'year', 'status', 'sessionTime', 'attendanceMarked'],
  showProperties: [
    '_id',
    'user',
    'month',
    'date',
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
    'certificate.url',
    'certificate.uploadedAt',
    'certificate.uploadedBy',
    'confirmedBy',
    'rejectedBy',
    'createdAt',
    'updatedAt'
  ],
  actions: {
    new: {
      isAccessible: false
    },
    delete: {
      isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'
    },
    edit: {
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
        return request;
      }
    }
  },
  navigation: {
    name: 'EMR Training',
    icon: 'Calendar'
  }
};
