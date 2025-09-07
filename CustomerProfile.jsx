import React, { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import './CustomerProfile.css';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const CustomerProfile = () => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    isMobile: false,
    isCollapsed: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Customer',
    email: 'loaejohnpersonal@gmail.com',
    phoneNumber: '+63 912 345 6789',
    address: '123 Main Street, Makati City',
    bio: 'Love discovering unique products from local MSMEs!'
  });

  const handleSidebarToggle = (state) => {
    setSidebarState(state);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Handle save profile logic here
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const statsData = [
    { label: 'Reviews Given', value: '18' },
    { label: 'Favorite MSMEs', value: '7' }
  ];

  const accountSettings = [
    { 
      title: 'Change Password', 
      icon: <SecurityIcon />, 
      action: () => console.log('Change password'),
      color: '#007bff'
    },
    { 
      title: 'Privacy Settings', 
      icon: <PrivacyTipIcon />, 
      action: () => console.log('Privacy settings'),
      color: '#007bff'
    },
    { 
      title: 'Notification Preferences', 
      icon: <NotificationsIcon />, 
      action: () => console.log('Notification preferences'),
      color: '#007bff'
    },
    { 
      title: 'Delete Account', 
      icon: <DeleteIcon />, 
      action: () => console.log('Delete account'),
      color: '#dc3545'
    }
  ];

  return (
    <div className="dashboard-container">
      <CustomerSidebar onSidebarToggle={handleSidebarToggle} />
      <div className={`dashboard-content ${sidebarState.isOpen && !sidebarState.isMobile ? 'sidebar-open' : ''} ${sidebarState.isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            <EditIcon />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-content">
          {/* Personal Information Section */}
          <div className="profile-section personal-info">
            <div className="section-header">
              <h2>Personal Information</h2>
            </div>
            
            <div className="profile-card">
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  <PersonIcon className="avatar-icon" />
                </div>
                <div className="profile-basic-info">
                  <h3>{profileData.fullName}</h3>
                  <p>{profileData.email}</p>
                  <span className="user-type">Customer</span>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-row">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{profileData.fullName}</span>
                  )}
                </div>

                <div className="detail-row">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>

                <div className="detail-row">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{profileData.phoneNumber}</span>
                  )}
                </div>

                <div className="detail-row">
                  <label>Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{profileData.address}</span>
                  )}
                </div>

                <div className="detail-row">
                  <label>Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="edit-textarea"
                      rows="3"
                    />
                  ) : (
                    <span>{profileData.bio}</span>
                  )}
                </div>

                {isEditing && (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="profile-section statistics">
            <div className="section-header">
              <h2>Statistics</h2>
            </div>
            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="profile-section account-settings">
            <div className="section-header">
              <h2>Account Settings</h2>
            </div>
            <div className="settings-grid">
              {accountSettings.map((setting, index) => (
                <div 
                  key={index} 
                  className={`setting-card ${setting.color === '#dc3545' ? 'danger' : ''}`}
                  onClick={setting.action}
                >
                  <div className="setting-icon" style={{ color: setting.color }}>
                    {setting.icon}
                  </div>
                  <div className="setting-title">{setting.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
