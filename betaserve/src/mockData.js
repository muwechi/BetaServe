// In-memory data store for Betaserve Estate Professional Service and Management App
// Allows real-time CRUD and state updates during the preview session

export const initialEstates = [
  { id: 'est-1', name: 'Greenwood Crest Estate', address: '12 Emerald Drive, Abuja', zone: 'North-Central', billingPlan: 'Premium', status: 'Active' },
  { id: 'est-2', name: 'Lekki Peninsula Gardens', address: 'Plot 40 Coastal Road, Lagos', zone: 'South-West', billingPlan: 'Standard', status: 'Active' },
  { id: 'est-3', name: 'Oakridge Heights', address: '7 Pinecrest Boulevard, Port Harcourt', zone: 'South-South', billingPlan: 'Premium', status: 'Active' },
  { id: 'est-4', name: 'Pine Valley Estate', address: '88 Silverwood Way, Enugu', zone: 'South-East', billingPlan: 'Basic', status: 'Suspended' }
];

export const initialAdmins = [
  { id: 'adm-1', name: 'Sarah Jenkins', email: 'sarah@greenwood.com', estateId: 'est-1', phone: '+234 803 111 2222', role: 'Estate Admin', status: 'Active' },
  { id: 'adm-2', name: 'David Kalu', email: 'david@lekki.com', estateId: 'est-2', phone: '+234 809 333 4444', role: 'Estate Admin', status: 'Active' },
  { id: 'adm-3', name: 'Tunde Bakare', email: 'tunde@oakridge.com', estateId: 'est-3', phone: '+234 812 555 6666', role: 'Estate Admin', status: 'Active' }
];

export const initialResidents = [
  { id: 'res-1', name: 'John Doe', email: 'john.doe@gmail.com', phone: '+234 802 234 5678', houseNo: 'Block A, Villa 4', estateId: 'est-1', status: 'Active' },
  { id: 'res-2', name: 'Mary Smith', email: 'mary.smith@yahoo.com', phone: '+234 805 987 6543', houseNo: 'Apt 12, Tower B', estateId: 'est-1', status: 'Active' },
  { id: 'res-3', name: 'Chidi Nwosu', email: 'chidi.nwosu@outlook.com', phone: '+234 816 444 5555', houseNo: 'Plot 15, Close F', estateId: 'est-2', status: 'Active' },
  { id: 'res-4', name: 'Fatima Musa', email: 'fatima@musa.net', phone: '+234 901 222 3333', houseNo: 'Duplex 8, Oasis Way', estateId: 'est-2', status: 'Active' }
];

export const initialServiceRequests = [
  {
    id: 'req-1',
    estateId: 'est-1',
    residentName: 'John Doe',
    residentPhone: '+234 802 234 5678',
    houseNo: 'Block A, Villa 4',
    serviceType: 'Plumbing',
    description: 'Leaking pipes underneath the kitchen sink causing pool of water.',
    priority: 'High',
    status: 'Pending',
    assignedTo: '',
    createdAt: '2025-02-24 09:30',
    cost: 15000
  },
  {
    id: 'req-2',
    estateId: 'est-1',
    residentName: 'Mary Smith',
    residentPhone: '+234 805 987 6543',
    houseNo: 'Apt 12, Tower B',
    serviceType: 'Electrical',
    description: 'Power flicker in the guest room and trip-off at the distribution board.',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Musa (Lead Electrician)',
    createdAt: '2025-02-24 10:15',
    cost: 25000
  },
  {
    id: 'req-3',
    estateId: 'est-2',
    residentName: 'Chidi Nwosu',
    residentPhone: '+234 816 444 5555',
    houseNo: 'Plot 15, Close F',
    serviceType: 'HVAC AC Repair',
    description: 'AC compressor makes a loud rattling sound and blows warm air.',
    priority: 'Medium',
    status: 'Completed',
    assignedTo: 'Inverter Tech Ltd',
    createdAt: '2025-02-23 14:00',
    cost: 45000
  },
  {
    id: 'req-4',
    estateId: 'est-1',
    residentName: 'John Doe',
    residentPhone: '+234 802 234 5678',
    houseNo: 'Block A, Villa 4',
    serviceType: 'Waste Disposal',
    description: 'Bulk garden waste removal request.',
    priority: 'Low',
    status: 'Pending',
    assignedTo: '',
    createdAt: '2025-02-24 11:00',
    cost: 8000
  }
];

export const initialVisitorPasses = [
  {
    id: 'pass-1',
    estateId: 'est-1',
    visitorName: 'Alice Johnson',
    hostResident: 'John Doe',
    passCode: 'BS-882190',
    validUntil: '2025-02-24 18:00',
    purpose: 'Social Visit',
    status: 'Checked-In',
    checkInTime: '2025-02-24 11:15',
    checkOutTime: ''
  },
  {
    id: 'pass-2',
    estateId: 'est-1',
    visitorName: 'Robert Dow',
    hostResident: 'Mary Smith',
    passCode: 'BS-401229',
    validUntil: '2025-02-25 12:00',
    purpose: 'Delivery',
    status: 'Issued',
    checkInTime: '',
    checkOutTime: ''
  },
  {
    id: 'pass-3',
    estateId: 'est-2',
    visitorName: 'Emeka Obi',
    hostResident: 'Chidi Nwosu',
    passCode: 'BS-110482',
    validUntil: '2025-02-23 20:00',
    purpose: 'Maintenance',
    status: 'Checked-Out',
    checkInTime: '2025-02-23 15:30',
    checkOutTime: '2025-02-23 18:45'
  }
];

export const initialAnnouncements = [
  {
    id: 'ann-1',
    estateId: 'est-1',
    title: 'Routine Water Treatment Schedule',
    content: 'Please note that the central water treatment plant will undergo maintenance tomorrow from 8:00 AM to 12:00 PM. Expect brief drops in water pressure.',
    category: 'Maintenance',
    date: '2025-02-24'
  },
  {
    id: 'ann-2',
    estateId: 'est-1',
    title: 'New QR Code Gate Access Protocol',
    content: 'Starting next week, visitors must display the 6-digit PIN code generated from Betaserve app at the main gate scanner for seamless entry approval.',
    category: 'Security',
    date: '2025-02-23'
  },
  {
    id: 'ann-3',
    estateId: 'est-2',
    title: 'Estate Annual General Meeting (AGM)',
    content: 'All residents are invited to the Annual General Meeting at the central clubhouse on Saturday at 4 PM. High-priority agenda: security upgrade funding.',
    category: 'General',
    date: '2025-02-22'
  }
];

export const serviceCategories = [
  { name: 'Plumbing', icon: 'wrench', count: 42, activeTechs: 5 },
  { name: 'Electrical', icon: 'zap', count: 58, activeTechs: 7 },
  { name: 'HVAC AC Repair', icon: 'wind', count: 29, activeTechs: 4 },
  { name: 'Waste Disposal', icon: 'trash', count: 64, activeTechs: 3 },
  { name: 'Gardening & Landscaping', icon: 'leaf', count: 18, activeTechs: 2 },
  { name: 'Security & Access Control', icon: 'shield', count: 35, activeTechs: 9 }
];
