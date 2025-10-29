export const conferenceResourceOptions = {
  properties: {
    _id: { isVisible: { list: false, show: true, edit: false } },
    name: { isVisible: { list: true, show: true, edit: true, filter: true } },
    modality: { isVisible: { list: true, show: true, edit: true, filter: true } },
    location: { isVisible: { list: true, show: true, edit: true, filter: true } },
    month: { isVisible: { list: true, show: true, edit: true, filter: true } },
    dates: { isVisible: { list: true, show: true, edit: true } },
    category: { isVisible: { list: true, show: true, edit: true, filter: true } },
    year: { isVisible: { list: true, show: true, edit: true, filter: true } },
    isActive: { isVisible: { list: true, show: true, edit: true, filter: true } },
    createdAt: { isVisible: { list: true, show: true, edit: false } }
  },
  listProperties: ['name', 'modality', 'location', 'month', 'dates', 'year', 'isActive'],
  navigation: { name: 'Conference Management', icon: 'Calendar' }
};