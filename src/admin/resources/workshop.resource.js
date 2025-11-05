export const workshopResourceOptions = {
  properties: {
    _id: { 
      isVisible: { list: false, show: true, edit: false }
    },
    title: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 1
    },
    type: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 2,
      availableValues: [
        { value: 'BLS', label: 'BLS - Basic Life Support' },
        { value: 'ACLS', label: 'ACLS - Advanced Cardiovascular Life Support' },
        { value: 'BLS & ACLS', label: 'BLS & ACLS - Combined Course' }
      ]
    },
    date: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 3,
      type: 'date'
    },
    startTime: {
      isVisible: { list: true, show: true, edit: true },
      position: 4
    },
    endTime: {
      isVisible: { list: false, show: true, edit: true },
      position: 5
    },
    location: {
      isVisible: { list: true, show: true, edit: true },
      position: 6
    },
    capacity: {
      isVisible: { list: true, show: true, edit: true },
      position: 7
    },
    instructor: {
      isVisible: { list: false, show: true, edit: true },
      position: 8
    },
    status: {
      isVisible: { list: true, show: true, edit: true, filter: true },
      position: 9,
      availableValues: [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    description: {
      isVisible: { list: false, show: true, edit: true },
      type: 'textarea'
    },
    registrationCount: {
      type: 'string',
      isVisible: { list: true, show: false, edit: false },
      position: 10
    },
    createdAt: { 
      isVisible: { list: false, show: true, edit: false }
    },
    updatedAt: { 
      isVisible: { list: false, show: true, edit: false }
    }
  },
  listProperties: [
    'title', 
    'type', 
    'date', 
    'startTime',
    'location',
    'capacity',
    'status',
    'registrationCount'
  ],
  showProperties: [
    '_id',
    'title',
    'type',
    'description',
    'date',
    'startTime',
    'endTime',
    'location',
    'instructor',
    'capacity',
    'status',
    'createdAt',
    'updatedAt'
  ],
  actions: {
    list: {
      after: async (response) => {
        if (response.records) {
          const { WorkshopRegistration } = await import('../../models/workshopRegistration.model.js');
          const recordIds = response.records.map(r => r.id);
          
          const registrationCounts = await Promise.all(
            recordIds.map(async (workshopId) => {
              const total = await WorkshopRegistration.countDocuments({ workshop: workshopId });
              const pending = await WorkshopRegistration.countDocuments({ workshop: workshopId, status: 'pending' });
              const confirmed = await WorkshopRegistration.countDocuments({ workshop: workshopId, status: 'confirmed' });
              
              return {
                id: workshopId,
                text: `Total: ${total} (Pending: ${pending}, Confirmed: ${confirmed})`
              };
            })
          );
          
          const countMap = registrationCounts.reduce((acc, item) => {
            acc[item.id] = item.text;
            return acc;
          }, {});
          
          response.records = response.records.map(record => {
            record.params.registrationCount = countMap[record.id] || 'Total: 0';
            return record;
          });
        }
        return response;
      }
    }
  },
  navigation: { 
    name: 'Workshop Management', 
    icon: 'Calendar' 
  }
};