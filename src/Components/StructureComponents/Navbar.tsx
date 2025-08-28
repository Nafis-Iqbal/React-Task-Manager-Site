import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../Hooks/UtilHooks';
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const logoutG = useLogout();
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  

  return (
    <nav className="relative bg-blue-900 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold ml-3 md:ml-5">
          <Link to="/dashboard" className="hover:text-gray-300">
            Task Manager
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 mr-5 text-xl md:text-2xl">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/tasks" className="hover:text-gray-300">
            Tasks
          </Link>
          <Link to="/projects" className="hover:text-gray-300">
            Projects
          </Link>
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <button onClick={() => {
            logoutG();
          }} className="hover:text-gray-300">
            Logout
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white text-3xl mr-2"
          onClick={() => setIsDropMenuOpen(!isDropMenuOpen)}
        >
          ☰
        </button>

        {isDropMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 bg-gray-100 text-blue-900 text-lg font-semibold rounded-md shadow-lg flex flex-col space-y-4 py-4 pl-4 pr-10 z-50 mobile-menu"
          >
            <Link to="/dashboard" className="hover:text-gray-300 border-b border-gray-700" onClick={() => setIsDropMenuOpen(false)}>Dashboard</Link>
            <Link to="/tasks" className="hover:text-gray-300 border-b border-gray-700" onClick={() => setIsDropMenuOpen(false)}>Tasks</Link>
            <Link to="/projects" className="hover:text-gray-300 border-b border-gray-700" onClick={() => setIsDropMenuOpen(false)}>Projects</Link>
            <Link to="/profile" className="hover:text-gray-300 border-b border-gray-700" onClick={() => setIsDropMenuOpen(false)}>Profile</Link>
            <button onClick={() => { logoutG(); setIsDropMenuOpen(false); }} className="hover:text-gray-300 text-left border-b border-gray-700">Logout</button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
