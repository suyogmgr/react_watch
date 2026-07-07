import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartKey } from "../utils/cartKey";

const listStyle = "hover:text-blue-400 cursor-pointer";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  useEffect(() => {
    const update = () => {
      const cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
      setCartCount(cart.reduce((s, i) => s + i.quantity, 0));
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("cart-updated", update);
    return () => { window.removeEventListener("storage", update); window.removeEventListener("cart-updated", update); };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <nav className="flex justify-between items-center h-[6rem] px-6 bg-[#0c0a0a] text-white sticky top-0 z-50 w-full">
      <h1 className="text-3xl font-bold">E-Watches</h1>

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
          <li className={listStyle}>
            <Link to="/Cart" className="relative inline-flex items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount > 9 ? '9+' : cartCount}</span>}
            </Link>
          </li>

          {!user && (
          <li className={listStyle}>
            <Link to="/Login">Login</Link>
          </li>
        )}

        {user && (
          <>
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
