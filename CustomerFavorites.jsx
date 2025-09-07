import React, { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import './CustomerFavorites.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import StoreIcon from '@mui/icons-material/Store';

const favoriteProducts = [
  {
    id: 1,
    name: "Artisan Coffee Beans",
    store: "Mountain Brew Coffee",
    price: "₱450",
    rating: 4.8,
    image: null,
    inStock: true,
    description: "Premium roasted coffee beans from Benguet highlands"
  },
  {
    id: 2,
    name: "Handwoven Bag",
    store: "Traditional Weavers",
    price: "₱850",
    rating: 4.9,
    image: null,
    inStock: true,
    description: "Beautiful handwoven bag made from indigenous materials"
  },
  {
    id: 3,
    name: "Buko Pie",
    store: "Maria's Bakery",
    price: "₱280",
    rating: 4.7,
    image: null,
    inStock: false,
    description: "Delicious coconut pie made with fresh ingredients"
  },
  {
    id: 4,
    name: "Banana Chips",
    store: "Island Crafts",
    price: "₱120",
    rating: 4.6,
    image: null,
    inStock: true,
    description: "Crispy banana chips from fresh local bananas"
  }
];

const followedStores = [
  {
    id: 1,
    name: "Maria's Bakery",
    category: "Food & Beverages",
    location: "Laguna",
    followers: 234,
    products: 15,
    rating: 4.8,
    isFollowing: true,
    description: "Traditional Filipino baked goods and pastries"
  },
  {
    id: 2,
    name: "Mountain Brew Coffee",
    category: "Food & Beverages", 
    location: "Benguet",
    followers: 189,
    products: 8,
    rating: 4.9,
    isFollowing: true,
    description: "Premium coffee from the mountains of Cordillera"
  },
  {
    id: 3,
    name: "Traditional Weavers",
    category: "Clothing & Accessories",
    location: "Ilocos",
    followers: 156,
    products: 22,
    rating: 4.7,
    isFollowing: true,
    description: "Handwoven textiles and traditional crafts"
  }
];

const CustomerFavorites = () => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    isMobile: false,
    isCollapsed: false
  });
  const [activeTab, setActiveTab] = useState('products');

  const handleSidebarToggle = (state) => {
    setSidebarState(state);
  };

  const getContentClass = () => {
    if (sidebarState.isMobile) {
      return 'dashboard-content mobile';
    }
    return sidebarState.isOpen ? 'dashboard-content sidebar-open' : 'dashboard-content sidebar-collapsed';
  };

  const toggleFavorite = (productId) => {
    // Handle favorite toggle logic here
    console.log('Toggle favorite for product:', productId);
  };

  const toggleFollow = (storeId) => {
    // Handle follow toggle logic here
    console.log('Toggle follow for store:', storeId);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} className={index < Math.floor(rating) ? 'star filled' : 'star empty'} />
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

        <div className="favorites-container">
          <div className="page-header">
            <h1>My Favorites</h1>
            <p>Your favorite products and followed MSME stores</p>
          </div>

          <div className="tabs-section">
            <button 
              className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <FavoriteIcon className="tab-icon" />
              Favorite Products ({favoriteProducts.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'stores' ? 'active' : ''}`}
              onClick={() => setActiveTab('stores')}
            >
              <StoreIcon className="tab-icon" />
              Followed Stores ({followedStores.length})
            </button>
          </div>

          <div className="content-section">
            {activeTab === 'products' && (
              <div className="products-grid">
                {favoriteProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <div className="image-placeholder">
                        <StoreIcon />
                      </div>
                      <button 
                        className="favorite-btn active"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <FavoriteIcon />
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="store-name">{product.store}</p>
                      <div className="product-rating">
                        {renderStars(product.rating)}
                        <span className="rating-text">({product.rating})</span>
                      </div>
                      <p className="product-description">{product.description}</p>
                      <div className="product-footer">
                        <div className="price-section">
                          <span className="price">{product.price}</span>
                          <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'stores' && (
              <div className="stores-grid">
                {followedStores.map((store) => (
                  <div key={store.id} className="store-card">
                    <div className="store-header">
                      <div className="store-avatar">
                        <StoreIcon />
                      </div>
                      <div className="store-info">
                        <h3>{store.name}</h3>
                        <p className="store-category">{store.category}</p>
                        <div className="store-location">
                          <LocationOnIcon className="location-icon" />
                          <span>{store.location}</span>
                        </div>
                      </div>
                      <button 
                        className={`follow-btn ${store.isFollowing ? 'following' : ''}`}
                        onClick={() => toggleFollow(store.id)}
                      >
                        <FollowTheSignsIcon />
                        {store.isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>
                    <div className="store-description">
                      <p>{store.description}</p>
                    </div>
                    <div className="store-stats">
                      <div className="stat">
                        <span className="stat-value">{store.products}</span>
                        <span className="stat-label">Products</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{store.followers}</span>
                        <span className="stat-label">Followers</span>
                      </div>
                      <div className="stat">
                        <div className="rating">
                          <StarIcon className="star filled" />
                          <span className="stat-value">{store.rating}</span>
                        </div>
                        <span className="stat-label">Rating</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFavorites;
