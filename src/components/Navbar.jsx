import { Link } from "react-router-dom";
const listStyle = "hover:text-blue-400 cursor-pointer";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-[6rem] p-6 bg-[#0c0a0a] text-white fixed top-0 z-50 w-full'>
        <h1 className='text-3xl font-bold'>MyWebsite</h1>

        <ul className='flex text-xl gap-8'>
            <li className={listStyle}><Link to='/'>Home</Link></li>
            <li className={listStyle}><Link to=''>Blog</Link></li>
            <li className={listStyle}><Link to=''>Product</Link></li>
            <li className={listStyle}><Link to=''>About Us</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar