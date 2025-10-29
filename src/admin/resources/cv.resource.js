export const cvResourceOptions = {
  properties: {
    _id: { isVisible: { list: false, show: true, edit: false } },
    userId: { isVisible: { list: true, show: true, edit: true, filter: true } },
    'basicDetails.fullName': { isVisible: { list: true, show: true, edit: true, filter: true } },
    'basicDetails.email': { isVisible: { list: true, show: true, edit: true, filter: true } },
    'basicDetails.phone': { isVisible: { list: true, show: true, edit: true } },
    'basicDetails.medicalSchool': { isVisible: { list: true, show: true, edit: true } },
    isComplete: { isVisible: { list: true, show: true, edit: true, filter: true } },
    createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
    updatedAt: { isVisible: { list: false, show: true, edit: false } }
  },
  listProperties: ['basicDetails.fullName', 'basicDetails.email', 'basicDetails.phone', 'isComplete', 'createdAt'],
  navigation: { name: 'CV Management', icon: 'FileText' }
};