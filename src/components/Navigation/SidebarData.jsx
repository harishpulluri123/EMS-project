// import React from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import { BsPersonFill } from 'react-icons/bs';

// const SidebarData = () => [
//   {
//     title: 'Home',
//     path: '/',
//     icon: <AiIcons.AiFillHome />,
//     cName: 'nav-text',
//     role: 'all', // Visible to all roles
//   },
//   {
//     title: 'Me',
//     icon: <BsPersonFill />,
//     cName: 'nav-text',
//     role: 'all', // Visible to all roles
//     submenu: [
//       {
//         title: 'Leave',
//         cName: 'nav-subtext',
//         role: 'Employee', // Visible to Employee and HR roles
//         path: '/emp/leaves'
//       },
//       {
//         title: 'Announcement',
//         cName: 'nav-subtext',
//         path: '/all/announcement',
//         role: 'all', // Visible to all roles
//       },
//       {
//         title: 'Attendance',
//         path: '/all/attendance/login',
//         cName: 'nav-subtext',
//         role: 'all', // Visible to all roles
//       },
//       {
//         title: 'Profile Update',
//         path: '/',
//         cName: 'nav-subtext',
//         role: 'Admin', // Visible to Admin only
//       }
//     ]
//   },
//   {
//     title: 'Inbox',
//     path: '/inbox',
//     icon: <IoIcons.IoIosPaper />,
//     cName: 'nav-text',
//     role: 'all' // Visible to admin only
//   },
//   {
//     title: 'Team',
//     path: '/',
//     icon: <IoIcons.IoMdPeople />,
//     cName: 'nav-text',
//     role: 'all' // Visible to admin only
//   },
//   {
//     title: 'Messages',
//     path: '/',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: 'nav-text',
//     role: 'all' // Visible to admin only
//   },
//   {
//     title: 'Org',
//     icon: <FaIcons.FaBuilding />,
//     cName: 'nav-text',
//     role: 'all', // Visible to HR only
//     submenu: [
//       {
//         title: 'HR Register',
//         cName: 'nav-subtext',
//         path: '/admin/hr-register',
//         role: 'Admin' // Visible to Admin only
//       },
//       {
//         title: 'HR Dashboard',
//         cName: 'nav-subtext',
//         path: '/hr',
//         role: 'HR' // Visible to HR only
//       },
//       {
//         title: 'Dashboard',
//         cName: 'nav-subtext',
//         path: '/emp/add-edu',
//         role: ['HR', 'Employee'] // Visible to HR and Employee
//       },
//       {
//         title: 'Employee',
//         cName: 'nav-subtext',
//         path: '/all-user',
//         role: 'all' // Visible to HR only
//       },
//       {
//         title: 'Documents',
//         cName: 'nav-subtext',
//         path: '/emp/add-doc',
//         role: ['HR', 'Employee'] // Visible to HR and Employee
//       }
//     ]
//   },
//   {
//     title: 'HR',
//     path: '/hr/add-emp',
//     // icon: <AiIcons.AiFillHome />,
//     cName: 'nav-text',
//     role: 'HR', // Visible to HR only
//     submenu: [
//       {
//         title: 'Add Employee',
//         cName: 'nav-subtext',
//         path: '/hr/add-emp',
//         role: 'HR'
//       }
//     ]
//   },
//   {
//     title: 'Support',
//     path: '/support',
//     icon: <IoIcons.IoMdHelpCircle />,
//     cName: 'nav-text',
//     role: 'all' // Visible to all roles
//   }
// ];

// export default SidebarData;






import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { BsPersonFill } from 'react-icons/bs';

const SidebarData = () => [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    role: 'all',
  },
  {
    title: 'Me',
    icon: <BsPersonFill />,
    cName: 'nav-text',
    role: 'all',
    submenu: [
      {
        title: 'Leave',
        cName: 'nav-subtext',
        role: 'Employee',
        path: '/emp/leaves'
      },
      {
        title: 'Attendance',
        path: '/all/attendance/login',
        cName: 'nav-subtext',
        role: 'all',
      },
      {
        title: 'Announcement',
        cName: 'nav-subtext',
        path: '/all/announcement',
        role: 'all',
      },
      {
        title: 'Profile Update',
        path: '/',
        cName: 'nav-subtext',
        role: 'Admin',
      }
    ]
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    role: 'all'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    role: 'all'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    role: 'all'
  },
  {
    title: 'Org',
    icon: <FaIcons.FaBuilding />,
    cName: 'nav-text',
    role: 'all',
    submenu: [
      {
        title: 'HR Register',
        cName: 'nav-subtext',
        path: '/admin/hr-register',
        role: 'Admin'
      },
      {
        title: 'HR Dashboard',
        cName: 'nav-subtext',
        path: '/hr',
        role: 'HR'
      },
      {
        title: 'Dashboard',
        cName: 'nav-subtext',
        path: '/emp/add-edu',
        role: ['HR', 'Employee']
      },
      {
        title: 'Employee',
        cName: 'nav-subtext',
        path: '/all-user',
        role: 'all'
      },
      {
        title: 'Documents',
        cName: 'nav-subtext',
        path: '/emp/add-doc',
        role: ['HR', 'Employee']
      }
    ]
  },
  {
    title: 'HR',
    path: '/hr/add-emp',
    cName: 'nav-text',
    role: 'HR',
    submenu: [
      {
        title: 'Add Employee',
        cName: 'nav-subtext',
        path: '/hr/add-emp',
        role: 'HR'
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    role: 'all'
  }
];

export default SidebarData;
