import React, { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import './CustomerReview.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const reviewsData = [
  {
    id: 1,
    productName: "Sample Product 1",
    rating: 5,
    review: "Great product! Really satisfied with the quality and delivery time.",
    date: "2 days ago",
    productImage: null
  },
  {
    id: 2,
    productName: "Sample Product 2", 
    rating: 5,
    review: "Great product! Really satisfied with the quality and delivery time.",
    date: "3 days ago",
    productImage: null
  },
  {
    id: 3,
    productName: "Sample Product 3",
    rating: 5,
    review: "Great product! Really satisfied with the quality and delivery time.",
    date: "5 days ago",
    productImage: null
  }
];

const CustomerReview = () => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    isMobile: false,
    isCollapsed: false
  });

  const handleSidebarToggle = (state) => {
    setSidebarState(state);
  };

  const getContentClass = () => {
    if (sidebarState.isMobile) {
      return 'dashboard-content mobile';
    }
    return sidebarState.isOpen ? 'dashboard-content sidebar-open' : 'dashboard-content sidebar-collapsed';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        {index < rating ? <StarIcon /> : <StarBorderIcon />}
      </span>
    ));
  };

  return (
    <div className="dashboard-container">
      <CustomerSidebar onSidebarToggle={handleSidebarToggle} />
      <div className={getContentClass()}>
        <div className="customer-header">
          <div className="customer-profile">
            <div className="profile-avatar">
              <span>J</span>
            </div>
            <div className="profile-info">
              <h2>John Customer</h2>
              <p>Customer</p>
            </div>
          </div>
          <div className="notification-icon">
            <span className="notification-badge">1</span>
            <span>J</span>
          </div>
        </div>

        <div className="reviews-container">
          <div className="page-header">
            <h1>My Reviews & Ratings</h1>
          </div>

          <div className="reviews-list">
            {reviewsData.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="product-info">
                    <div className="product-image">
                      {/* Placeholder for product image */}
                      <div className="image-placeholder"></div>
                    </div>
                    <div className="product-details">
                      <h3>{review.productName}</h3>
                      <div className="rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="review-date">
                    {review.date}
                  </div>
                </div>
                <div className="review-content">
                  <p>"{review.review}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
