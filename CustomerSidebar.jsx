import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for navigation
import './CustomerSidebar.css'; // Import the CSS file for styling
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CustomerSidebar = ({ onSidebarToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start with sidebar open
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation(); // Get the current route

  // Detect screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // Start collapsed on mobile
      } else {
        setIsSidebarOpen(true); // Start expanded on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Notify parent component when sidebar state changes
  useEffect(() => {
    if (onSidebarToggle) {
      onSidebarToggle({
        isOpen: isSidebarOpen,
        isMobile: isMobileView,
        isCollapsed: !isSidebarOpen && !isMobileView
      });
    }
  }, [isSidebarOpen, isMobileView, onSidebarToggle]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Burger Menu for Mobile */}
      {isMobileView && !isSidebarOpen && (
        <button className="burger-menu" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobileView ? 'mobile' : 'desktop'} ${isSidebarOpen ? 'open' : 'closed'} ${!isSidebarOpen && !isMobileView ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {isMobileView && isSidebarOpen && (
            <button className="back-arrow" onClick={toggleSidebar}>
              <ChevronLeftIcon />
            </button>
          )}
          {!isMobileView && (
            <button className="desktop-toggle" onClick={toggleSidebar}>
              {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </button>
          )}
          {(!isMobileView || isSidebarOpen) && (
            <div className="sidebar-title">
              <h2>Customer Portal</h2>
              <p>Your Shopping Experience</p>
            </div>
          )}
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/customer-dashboard" className={`nav-link ${location.pathname === '/customer-dashboard' ? 'active' : ''}`} title="Dashboard">
                <DashboardIcon className="icon" />
                <span className="text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/browse-products" className={`nav-link ${location.pathname === '/browse-products' ? 'active' : ''}`} title="Browse Products">
                <ShoppingCartIcon className="icon" />
                <span className="text">Browse Products</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customer-reviews" className={`nav-link ${location.pathname === '/customer-reviews' ? 'active' : ''}`} title="My Reviews">
                <RateReviewIcon className="icon" />
                <span className="text">My Reviews</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`} title="Favorites">
                <FavoriteIcon className="icon" />
                <span className="text">Favorites</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customer-messages" className={`nav-link ${location.pathname === '/customer-messages' ? 'active' : ''}`} title="Messages">
                <MailIcon className="icon" />
                <span className="text">Messages</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customer-profile" className={`nav-link ${location.pathname === '/customer-profile' ? 'active' : ''}`} title="Profile">
                <PersonIcon className="icon" />
                <span className="text">Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
        {(!isMobileView || isSidebarOpen) && (
          <div className="sidebar-footer">
            <button className="logout-button">
              <LogoutIcon className="icon" /> 
              <span className="text">Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerSidebar;
