// import React, { useState } from 'react';
// import { FaBars } from 'react-icons/fa';
// import { AiOutlineClose } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import SidebarData from './SidebarData';
// import { IconContext } from 'react-icons';
// import styled from 'styled-components';
// import { useAuth } from '../../Context/AuthContext'; // Make sure to import useAuth if it's not already imported
// import ProfileMenu from '../Profile/ProfileMenu';

// function Navbar() {
//   const [sidebar, setSidebar] = useState(false);
//   const [submenu, setSubmenu] = useState(false);
//   const { user } = useAuth(); // Assuming useAuth is correctly implemented and returns user object
//   const sidebarData = SidebarData(); // Call SidebarData to get the array

//   const showSidebar = () => setSidebar(!sidebar);
//   const showSubmenu = () => setSubmenu(!submenu);

//   const filteredSidebarData = sidebarData.filter(item => {
//     if (item.role === 'all') return true;
//     if (Array.isArray(item.role) && item.role.includes(user.role)) return true; // Check for array roles
//     if (item.role === user.role) return true; // Single role match
//     return false;
//   });

//   return (
//     <Wrapper>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <div className='navbar'>
//           <Link to='#' className='menu-bars'>
//             <FaBars onClick={showSidebar} />
//           </Link>
//           <ProfileMenu />
//         </div>
//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items'>
//             <li className='navbar-toggle' onClick={showSidebar}>
//               <Link to='#' className='menu-bars'>
//                 <AiOutlineClose />
//               </Link>
//             </li>
//             {filteredSidebarData.map((item, index) => (
//               <li
//                 key={index}
//                 className={item.cName}
//                 onMouseEnter={item.submenu ? showSubmenu : null}
//                 onMouseLeave={item.submenu ? showSubmenu : null}
//               >
//                 <Link to={item.path}>
//                   {item.icon}
//                   <span>{item.title}</span>
//                 </Link>
//                 {item.submenu && submenu && (
//                   <ul className='nav-submenu'>
//                     {item.submenu.filter(subItem => {
//                       if (subItem.role === 'all') return true;
//                       if (Array.isArray(subItem.role) && subItem.role.includes(user.role)) return true; // Check for array roles
//                       if (subItem.role === user.role) return true; // Single role match
//                       return false;
//                     }).map((subItem, subIndex) => (
//                       <li key={subIndex} className='nav-subtext'>
//                         <Link to={subItem.path}>
//                           <span>{subItem.title}</span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </Wrapper>
//   );
// }
// const Wrapper = styled.section`
//   .navbar {
//     background-color: #0c1d31;
//     height: 60px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     z-index: 1000;
//   }

//   .menu-bars {
//     margin-left: rem;
//     font-size: 2rem;
//     background: none;
//   }

//   .nav-menu {
//     background-color: #0c1d31;
//     width: 190px;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     position: fixed;
//     top: 0;
//     left: -100%;
//     transition: 850ms;
//     z-index: 1000;
//   }

//   .nav-menu.active {
//     left: 0;
//     transition: 350ms;
//   }

//   .nav-text {
//     display: flex;
//     justify-content: start;
//     align-items: center;
//     padding: 8px 0 8px 0px;
//     list-style: none;
//     height: 60px;
//     position: relative;
//   }

//   .nav-text a {
//     text-decoration: none;
//     color: #f5f5f5;
//     font-size: 18px;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     padding: 0 10px;
//     border-radius: 4px;
//   }

//   .nav-text a:hover {
//     background-color: #28394c;
//   }

//   .nav-menu-items {
//     width: 100%;
//   }

//   .navbar-toggle {
//     background-color: #0c1d31;
//     width: 100%;
//     height: 80px;
//     display: flex;
//     justify-content: start;
//     align-items: center;
//   }

//   span {
//     margin-left: 16px;
//   }

//   .nav-submenu {
//     background-color: #0c1a2a;
//     position: absolute;
//     left: 100%;
//     top: 0;
//     width: 170px;
//     display: none;
//     flex-direction: column;
//     padding-left: 0;
//     z-index: 2000;
//   }

//   .nav-text:hover .nav-submenu {
//     display: flex;
//   }

//   .nav-submenu .nav-subtext {
//     padding: 10px 1;
//     list-style: none;
//   }

//   .nav-subtext a {
//     color: #fff;
//     text-decoration: none;
//     padding: 8px 16px;
//     display: flex;
//     align-items: center;
//   }

//   .nav-subtext a:hover {
//     background-color: #28394c;
//   }
// `;

// export default Navbar;








import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SidebarData from './SidebarData';
import { IconContext } from 'react-icons';
import styled from 'styled-components';
import { useAuth } from '../../Context/AuthContext';
import ProfileMenu from '../Profile/ProfileMenu';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useAuth();
  const sidebarData = SidebarData();

  const showSidebar = () => setSidebar(!sidebar);

  const filteredSidebarData = sidebarData.filter(item => {
    if (item.role === 'all') return true;
    if (Array.isArray(item.role) && item.role.includes(user.role)) return true;
    if (item.role === user.role) return true;
    return false;
  });

  return (
    <Wrapper>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaBars onClick={showSidebar} />
          </Link>
          <ProfileMenu />
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {filteredSidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
                {item.submenu && (
                  <ul className='nav-submenu'>
                    {item.submenu.filter(subItem => {
                      if (subItem.role === 'all') return true;
                      if (Array.isArray(subItem.role) && subItem.role.includes(user.role)) return true;
                      if (subItem.role === user.role) return true;
                      return false;
                    }).map((subItem, subIndex) => (
                      <li key={subIndex} className='nav-subtext'>
                        <Link to={subItem.path}>
                          <span>{subItem.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .navbar {
    background-color: #0c1d31;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
  }

  .menu-bars {
    margin-left:1rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: #0c1d31;
    width: 190px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    z-index: 1000;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 0px;
    list-style: none;
    height: 60px;
    position: relative;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #28394c;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #0c1d31;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }

  .nav-submenu {
    background-color: #0c1a2a;
    position: absolute;
    left: 100%;
    top: 0;
    width: 170px;
    display: none;
    flex-direction: column;
    padding-left: 0;
    z-index: 2000;
  }

  .nav-text:hover .nav-submenu {
    display: flex;
  }

  .nav-submenu .nav-subtext {
    padding: 10px 1;
    list-style: none;
  }

  .nav-subtext a {
    color: #fff;
    text-decoration: none;
    padding: 8px 16px;
    display: flex;
    align-items: center;
  }

  .nav-subtext a:hover {
    background-color: #28394c;
  }
`;

export default Navbar;



