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
      position: 10,
      components: {
        show: {
          component: 'CertificateUrl'
        }
      }
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
    uploadCertificate: {
      actionType: 'record',
      icon: 'Upload',
      label: 'Upload Certificate',
      component: false,
      handler: async (request, response, context) => {
        const { record, currentAdmin } = context;
        
        if (request.method === 'post') {
          const { certificate } = request.payload || {};
          
          if (!certificate) {
            return {
              record: record.toJSON(currentAdmin),
              notice: {
                message: 'Please select a certificate file',
                type: 'error',
              },
            };
          }

          try {
            // Handle file upload
            const formData = new FormData();
            formData.append('certificate', certificate);

            const uploadResponse = await fetch(
              `http://localhost:5000/api/workshops/registrations/${record.id()}/certificate`,
              {
                method: 'POST',
                body: formData,
                headers: {
                  'Authorization': `Bearer ${currentAdmin.token}`,
                },
              }
            );

            const data = await uploadResponse.json();

            if (data.success) {
              return {
                record: record.toJSON(currentAdmin),
                notice: {
                  message: 'Certificate uploaded successfully!',
                  type: 'success',
                },
                redirectUrl: context.h.recordActionUrl({
                  resourceId: context.resource.id(),
                  recordId: record.id(),
                  actionName: 'show',
                }),
              };
            } else {
              return {
                record: record.toJSON(currentAdmin),
                notice: {
                  message: data.message || 'Failed to upload certificate',
                  type: 'error',
                },
              };
            }
          } catch (error) {
            return {
              record: record.toJSON(currentAdmin),
              notice: {
                message: 'Error uploading certificate',
                type: 'error',
              },
            };
          }
        }

        return {
          record: record.toJSON(currentAdmin),
        };
      },
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
    name: 'Workshop Registrations',
    icon: 'UserCheck'
  }
};