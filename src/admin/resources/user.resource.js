export const userResourceOptions = {
  properties: {
    _id: { isVisible: { list: false, show: true, edit: false } },
    fullName: { isVisible: { list: true, show: true, edit: true, filter: true } },
    email: { isVisible: { list: true, show: true, edit: true, filter: true } },
    phone: { isVisible: { list: true, show: true, edit: true } },
    medicalSchool: { isVisible: { list: true, show: true, edit: true, filter: true } },
    graduationYear: { isVisible: { list: true, show: true, edit: true, filter: true } },
    password: { isVisible: { list: false, show: false, edit: true }, type: 'password' },
    'hipaaAgreement.isSigned': { isVisible: { list: true, show: true, edit: true, filter: true } },
    'hipaaAgreement.signedAt': { isVisible: { list: false, show: true, edit: false } },
    'hipaaAgreement.ipAddress': { isVisible: { list: false, show: true, edit: false } },
    createdAt: { isVisible: { list: true, show: true, edit: false, filter: true } },
    updatedAt: { isVisible: { list: false, show: true, edit: false } },
    conferenceRegistrations: { isVisible: { list: false, show: true, edit: false } }
  },
  listProperties: ['fullName', 'email', 'phone', 'medicalSchool', 'graduationYear', 'hipaaAgreement.isSigned', 'createdAt'],
  navigation: { name: 'User Management', icon: 'User' }
};