// import { useState,  useContext } from "react";
// import "./navbar.scss";
// import { Link } from "react-router-dom";

// import { AuthContext } from "../../context/AuthContext";
// import { useNotificationStore } from "../../lib/notificationStore";

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const fetch = useNotificationStore((state) => state.fetch);
//   const number = useNotificationStore((state) => state.number);

//   if(currentUser) fetch();
//   // const user = true;
//   return (
//     <nav>
//       <div className="left">
//         <a href="/" className="logo">
//           <img src="/logo.png" alt="" />
//           <span className="heading">
//             <span className="real">Real</span>
//             <span className="estate">Estate</span>
//           </span>
//         </a>
//         <a href="/">Home</a>
//         <a href="/">About</a>
//         <a href="/">Contact</a>
//         <a href="/">Agents</a>
//       </div>
//       <div className="right">
//         {currentUser ? (
//           <div className="user">
//             <img
//               src={currentUser.avatar || "/noavatar.jpg"}
//               alt=""/>

//             <span>{currentUser.username}</span>
            
          
//             <Link to="/profile" className="profile">
        
//             {number > 0 && <div className="notification">{number}</div>} 
              
//               <span>Profile</span>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <a href="/login">Sign in</a>
//             <a href="/register" className="register">
//               Sign up
//             </a>
//           </>
//         )}
//         <div className="menuIcon">
//           <img
//             src="/menu.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//         </div>
//         <div className={open ? "menu active" : "menu"}>
//           <a href="/">Home</a>
//           <a href="/">About</a>
//           <a href="/">Contact</a>
//           <a href="/">Agents</a>
//           <a href="/">Sign in</a>
//           <a href="/">Sign up</a>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { useState, useContext } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  // Fetch notifications if user is logged in
  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span className="heading">
            <span className="real">Real</span>
            <span className="estate">Estate</span>
          </span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <Link to="/profile" className="profile-photo">
              <img
                src={currentUser.avatar ||"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt=""
              />
              {number > 0 && <div className="notification">{number}</div>}
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu"
            onClick={() => setMenuOpen((prev) => !prev)} // Toggle menu state
          />
        </div>
        <div className={menuOpen ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
