// // import { Link } from "react-router-dom";
// // const listStyle = "hover:text-blue-400 cursor-pointer";

// // const Navbar = () => {
// //   return (
// //     <nav className='flex justify-between items-center h-[6rem] p-6 bg-[#0c0a0a] text-white sticky top-0 z-50 w-full'>
// //         <h1 className='text-3xl font-bold'>MyWebsite</h1>

// //         <ul className='flex text-xl gap-8'>
// //             <li className={listStyle}><Link to='/'>Home</Link></li>
// //             <li className={listStyle}><Link to='/Product'>Product</Link></li>
// //             <li className={listStyle}><Link to='/Register'>Register</Link></li>
// //             <li className={listStyle}><Link to='/About_Us'>About Us</Link></li>
// //         </ul>
// //     </nav>
// //   )
// // }

// // export default Navbar

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// const listStyle = "hover:text-blue-400 cursor-pointer";

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     setUser(loggedInUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("loggedInUser");
//     setUser(null);
//   };

//   return (
//     <nav className="flex justify-between items-center h-[6rem] p-6 bg-[#0c0a0a] text-white sticky top-0 z-50 w-full">
//       <h1 className="text-3xl font-bold">MyWebsite</h1>

//       <ul className="flex text-xl gap-8">
//         <li className={listStyle}>
//           <Link to="/">Home</Link>
//         </li>
//         <li className={listStyle}>
//           <Link to="/Product">Product</Link>
//         </li>
//         <li className={listStyle}>
//           <Link to="/About_Us">About Us</Link>
//         </li>
//         {!user && (
//           <li className={listStyle}>
//             <Link to="/Register">Register</Link>
//           </li>
//         )}
//         {!user && (
//           <li className={listStyle}>
//             <Link to="/Login">Login</Link>
//           </li>
//         )}
//         {user && (
//           <li className={listStyle} onClick={handleLogout}>
//             Logout
//           </li>
//         )}
//         {user && user.email === "admin@example.com" && (
//           <li className={listStyle}>
//             <Link to="/admin">Admin Panel</Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const listStyle = "hover:text-blue-400 cursor-pointer";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <nav className="flex justify-between items-center h-[6rem] px-6 bg-[#0c0a0a] text-white sticky top-0 z-50 w-full">
      <h1 className="text-3xl font-bold">MyWebsite</h1>

      <ul className="flex items-center text-xl gap-8">
        <li className={listStyle}>
          <Link to="/">Home</Link>
        </li>
        <li className={listStyle}>
          <Link to="/Product">Product</Link>
        </li>
        <li className={listStyle}>
          <Link to="/About_Us">About Us</Link>
        </li>

        {!user && (
          <>
            <li className={listStyle}>
              <Link to="/Register">Register</Link>
            </li>
            <li className={listStyle}>
              <Link to="/Login">Login</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li className="italic text-sm">
              Logged in as <span className="font-semibold">{user.email}</span>
            </li>
            {user.email === "admin@example.com" && (
              <li className={listStyle}>
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-400 text-white"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
