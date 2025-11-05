export const workshopRegistrationResourceOptions = {
  properties: {
    _id: {
      isVisible: { list: false, show: true, edit: false }
    },
    workshop: {
      isVisible: { list: true, show: true, edit: false, filter: true },
      position: 1
    },
    user: {
      isVisible: { list: true, show: true, edit: false, filter: true },
      position: 2
    },
    status: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 3,
      availableValues: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'rejected', label: 'Rejected' }
      ]
    },
    registeredAt: {
      isVisible: { list: true, show: true, edit: false },
      position: 4,
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
    confirmedBy: {
      isVisible: { list: false, show: true, edit: false }
    },
    rejectedBy: {
      isVisible: { list: false, show: true, edit: false }
    },
    'certificate.url': {
      isVisible: { list: false, show: true, edit: false },
      type: 'string',
      position: 10
    },
    'certificate.uploadedAt': {
      isVisible: { list: false, show: true, edit: false },
      type: 'datetime',
      position: 11
    },
    'certificate.uploadedBy': {
      isVisible: { list: false, show: true, edit: false },
      position: 12
    },
    createdAt: {
      isVisible: { list: false, show: true, edit: false }
    },
    updatedAt: {
      isVisible: { list: false, show: true, edit: false }
    }
  },
  listProperties: ['workshop', 'user', 'status', 'registeredAt'],
  showProperties: [
    '_id',
    'workshop',
    'user',
    'status',
    'registeredAt',
    'confirmedAt',
    'rejectedAt',
    'certificate.url',
    'certificate.uploadedAt',
    'certificate.uploadedBy',
    'confirmedBy',
    'rejectedBy',
    'createdAt',
    'updatedAt'
  ],
  actions: {
    list: {
      before: async (request) => {
        return request;
      },
      after: async (response, request, context) => {
        if (response.records) {
          const { WorkshopRegistration } = await import('../../models/workshopRegistration.model.js');
          
          const recordIds = response.records.map(r => r.id);
          const registrations = await WorkshopRegistration.find({ _id: { $in: recordIds } })
            .populate('workshop', 'title type')
            .populate('user', 'firstName lastName email fullName')
            .lean();

          const registrationMap = registrations.reduce((acc, reg) => {
            acc[reg._id.toString()] = reg;
            return acc;
          }, {});
          
          response.records = response.records.map(record => {
            const registration = registrationMap[record.id];
            if (registration) {
              if (registration.workshop) {
                record.params.workshop = `${registration.workshop.title} (${registration.workshop.type})`;
              }
              if (registration.user) {
                const userName = registration.user.fullName || 
                                `${registration.user.firstName} ${registration.user.lastName}`;
                record.params.user = `${userName} (${registration.user.email})`;
              }
            }
            return record;
          });
        }
        return response;
      }
    },
    show: {
      before: async (request) => {
        return request;
      },
      after: async (response, request, context) => {
        if (response.record) {
          const { WorkshopRegistration } = await import('../../models/workshopRegistration.model.js');
          
          const registration = await WorkshopRegistration.findById(response.record.id)
            .populate('workshop', 'title type date location')
            .populate('user', 'firstName lastName email fullName')
            .populate('confirmedBy', 'firstName lastName')
            .populate('rejectedBy', 'firstName lastName')
            .lean();
          
          if (registration) {
            if (registration.workshop) {
              response.record.params.workshop = `${registration.workshop.title} (${registration.workshop.type}) - ${new Date(registration.workshop.date).toLocaleDateString()}`;
            }
            if (registration.user) {
              const userName = registration.user.fullName || 
                              `${registration.user.firstName} ${registration.user.lastName}`;
              response.record.params.user = `${userName} (${registration.user.email})`;
            }
            if (registration.confirmedBy) {
              response.record.params.confirmedBy = `${registration.confirmedBy.firstName} ${registration.confirmedBy.lastName}`;
            }
            if (registration.rejectedBy) {
              response.record.params.rejectedBy = `${registration.rejectedBy.firstName} ${registration.rejectedBy.lastName}`;
            }
          }
        }
        return response;
      }
    },
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
          }
        }
        return request;
      },
      after: async (response, request, context) => {
        if (response.record && request.payload.status) {
          const registrationId = response.record.id;
          const { WorkshopRegistration } = await import('../../models/workshopRegistration.model.js');
          const { User } = await import('../../models/user.model.js');
          
          const registration = await WorkshopRegistration.findById(registrationId);
          
          if (registration) {
            await User.updateOne(
              { _id: registration.user, 'workshopRegistrations.workshop': registration.workshop },
              { 
                $set: { 
                  'workshopRegistrations.$.status': request.payload.status,
                  'workshopRegistrations.$.confirmedAt': request.payload.confirmedAt || null,
                  'workshopRegistrations.$.rejectedAt': request.payload.rejectedAt || null
                } 
              }
            );
          }
        }
        return response;
      }
    }
  },
  navigation: {
    name: 'Workshop Management',
    icon: 'UserCheck'
  }
};