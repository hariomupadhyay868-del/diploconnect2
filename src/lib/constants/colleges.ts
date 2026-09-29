export interface CollegeData {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  city: string;
  established: number;
  type: string;
  logo: string;
  banner: string;
  about: string;
  website: string;
  branches: string[];
  studentCount: number;
  address: string;
}

export interface BranchData {
  id: string;
  code: string;
  name: string;
  category: string;
  icon: string;
}

export const BIHAR_COLLEGES: CollegeData[] = [
  {
    id: 'gp-patna-7',
    name: 'Government Polytechnic Patna-7',
    code: 'GPP7',
    state: 'BR',
    district: 'Patna',
    city: 'Patna',
    established: 1954,
    type: 'Government',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    about: 'Government Polytechnic Patna-7 is one of the premier polytechnic institutes in Bihar under SBTE Bihar and Department of Science, Technology and Technical Education, Govt. of Bihar.',
    website: 'http://gpp7.ac.in',
    branches: ['CSE', 'IT', 'EE', 'ECE', 'ME', 'CE'],
    studentCount: 1240,
    address: 'Gulzarbagh, Patna, Bihar - 800007'
  },
  {
    id: 'gp-muzaffarpur',
    name: 'Government Polytechnic Muzaffarpur',
    code: 'GPM',
    state: 'BR',
    district: 'Muzaffarpur',
    city: 'Muzaffarpur',
    established: 1950,
    type: 'Government',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    about: 'Leading diploma engineering college offering technical courses with state-of-the-art laboratory facilities in North Bihar.',
    website: 'http://gpmuzaffarpur.ac.in',
    branches: ['CSE', 'EE', 'ECE', 'ME', 'CE'],
    studentCount: 980,
    address: 'Kacchi Sarai, Muzaffarpur, Bihar - 842001'
  },
  {
    id: 'gp-bhagalpur',
    name: 'Government Polytechnic Bhagalpur',
    code: 'GPB',
    state: 'BR',
    district: 'Bhagalpur',
    city: 'Bhagalpur',
    established: 1955,
    type: 'Government',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    about: 'Renowned polytechnic college located in the Silk City Bhagalpur, producing top technical talent in Eastern Bihar.',
    website: 'http://gpbhagalpur.org',
    branches: ['CSE', 'IT', 'EE', 'ME', 'CE', 'TEXT'],
    studentCount: 1100,
    address: 'Barari, Bhagalpur, Bihar - 812003'
  },
  {
    id: 'gp-gaya',
    name: 'Government Polytechnic Gaya',
    code: 'GPG',
    state: 'BR',
    district: 'Gaya',
    city: 'Gaya',
    established: 1960,
    type: 'Government',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    about: 'Providing high-quality diploma technical education with focus on skill development, civil and electrical engineering expertise.',
    website: 'http://gpgaya.ac.in',
    branches: ['CSE', 'EE', 'ECE', 'ME', 'CE'],
    studentCount: 890,
    address: 'Bypass Road, Gaya, Bihar - 823001'
  },
  {
    id: 'gp-siwan',
    name: 'Government Polytechnic Siwan',
    code: 'GPS',
    state: 'BR',
    district: 'Siwan',
    city: 'Siwan',
    established: 2017,
    type: 'Government',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    about: 'Government Polytechnic Siwan is a rapidly growing technical institute equipped with modern computer labs and mechanical workshops.',
    website: 'http://gpsiwan.org.in',
    branches: ['CSE', 'EE', 'ECE', 'ME', 'CE'],
    studentCount: 750,
    address: 'Baghra, Siwan, Bihar - 841226'
  },
  {
    id: 'wgp-patna',
    name: "Women's Polytechnic Patna",
    code: 'WGPP',
    state: 'BR',
    district: 'Patna',
    city: 'Patna',
    established: 1980,
    type: 'Government (Women Only)',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    about: 'Empowering women engineers in Bihar with specialized diploma education in Computer Science, Modern Office Management, Electronics, and IT.',
    website: 'http://wgppatna.org',
    branches: ['CSE', 'IT', 'ECE', 'EE'],
    studentCount: 650,
    address: 'Phulwari Sharif, Patna, Bihar - 801505'
  }
];

export const DIPLOMA_BRANCHES: BranchData[] = [
  { id: 'CSE', code: 'CSE', name: 'Computer Science & Engineering', category: 'Technology', icon: 'Laptop' },
  { id: 'IT', code: 'IT', name: 'Information Technology', category: 'Technology', icon: 'Code' },
  { id: 'EE', code: 'EE', name: 'Electrical Engineering', category: 'Electrical', icon: 'Zap' },
  { id: 'ECE', code: 'ECE', name: 'Electronics & Communication Engineering', category: 'Electronics', icon: 'Cpu' },
  { id: 'ME', code: 'ME', name: 'Mechanical Engineering', category: 'Mechanical', icon: 'Settings' },
  { id: 'CE', code: 'CE', name: 'Civil Engineering', category: 'Civil', icon: 'Building' },
  { id: 'AE', code: 'AE', name: 'Automobile Engineering', category: 'Mechanical', icon: 'Truck' }
];

export const SEMESTERS_LIST = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  'Passed Out / Alumni'
];

export const SKILLS_CATALOG = [
  'Java', 'Python', 'C', 'C++', 'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'SQL', 'MySQL', 'MongoDB',
  'AutoCAD', 'SolidWorks', 'MATLAB', 'CATIA', 'STAAD Pro', 'Revit', 'Surveying',
  'Circuit Design', 'Arduino', 'Raspberry Pi', 'Embedded Systems', 'PLC & SCADA',
  'Communication', 'Leadership', 'Problem Solving', 'Project Management', 'Git & GitHub'
];
