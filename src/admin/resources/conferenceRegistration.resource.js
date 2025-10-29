export const conferenceRegistrationResourceOptions = {
  properties: {
    _id: { 
      isVisible: { list: false, show: true, edit: false }
    },
    'userInfo.fullName': {
      isVisible: { list: true, show: true, edit: false, filter: true },
      position: 1
    },
    'userInfo.email': {
      isVisible: { list: true, show: true, edit: false, filter: true },
      position: 2
    },
    'userInfo.phone': {
      isVisible: { list: false, show: true, edit: false }
    },
    'userInfo.medicalSchool': {
      isVisible: { list: false, show: true, edit: false }
    },
    'userInfo.graduationYear': {
      isVisible: { list: false, show: true, edit: false }
    },
    'conferenceInfo.name': {
      isVisible: { list: true, show: true, edit: false, filter: true },
      position: 3
    },
    'conferenceInfo.location': {
      isVisible: { list: true, show: true, edit: false },
      position: 4
    },
    'conferenceInfo.dates': {
      isVisible: { list: false, show: true, edit: false }
    },
    'conferenceInfo.month': {
      isVisible: { list: false, show: true, edit: false }
    },
    'conferenceInfo.modality': {
      isVisible: { list: false, show: true, edit: false }
    },
    'conferenceInfo.brochureLink': {
      isVisible: { list: false, show: true, edit: false }
    },
    registeredAt: { 
      isVisible: { list: true, show: true, edit: false },
      position: 5
    },
    status: { 
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 6,
      availableValues: [
        { value: 'registered', label: 'Registered' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'attended', label: 'Attended' }
      ]
    },
    createdAt: { 
      isVisible: { list: false, show: true, edit: false }
    },
    updatedAt: { 
      isVisible: { list: false, show: true, edit: false }
    },
    userInfo: {
      isVisible: false
    },
    conferenceInfo: {
      isVisible: false
    },
    user: {
      isVisible: false
    },
    conference: {
      isVisible: false
    }
  },
  listProperties: [
    'userInfo.fullName', 
    'userInfo.email', 
    'conferenceInfo.name', 
    'conferenceInfo.location', 
    'status', 
    'registeredAt'
  ],
  showProperties: [
    '_id',
    'userInfo.fullName',
    'userInfo.email',
    'userInfo.phone',
    'userInfo.medicalSchool',
    'userInfo.graduationYear',
    'conferenceInfo.name',
    'conferenceInfo.location',
    'conferenceInfo.dates',
    'conferenceInfo.month',
    'conferenceInfo.modality',
    'conferenceInfo.brochureLink',
    'status', 
    'registeredAt', 
    'createdAt', 
    'updatedAt'
  ],
  navigation: { 
    name: 'Conference Management', 
    icon: 'Calendar' 
  }
};