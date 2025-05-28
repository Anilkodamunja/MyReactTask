import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

const ProfileEdit = () => { 
  const Width = {
    width: '100%'
  };
  return (
    <div className="main-content">
      <h2 className="section-title">EDIT PROFILE</h2>
      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="input-field" />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="input-field" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>email address</label>
          <input type="email" className="input-field" />
        </div>
        <div className="form-group">
          <label>password</label>
          <input type="password" className="input-field" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>LOCATION</label>
          <input type="text" className="input-field" />
        </div>
        <div className="form-group">
          <label>USER TYPE</label>
          <select style={Width} className="input-field">
            <option>User</option>
            <option>Dealer</option>
            <option>Finance</option>
            <option>Bank</option>
          </select>
        </div>
      </div>
      <button className="update-button">Updated Profile</button>
    </div>
  );
};

const AuctionList = () => {
  const auctions = [
    {
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=100&auto=format&fit=crop', // BMW car (example car image)
      product: 'MARUTI GRAND-VITARA-HYBRID-DELTA',
      lot: '#660',
      bid: '₹10,000',
      bids: 0,
      endsIn: 'MS-JACKSON Auction in 4D 4H 49min',
      location: 'VIJAYAWADA - A.P',
    },
    {
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=100&auto=format&fit=crop', // Another car image
      product: 'MARUTI GRAND-VITARA-HYBRID-DELTA',
      lot: '#660',
      bid: '₹10,000',
      bids: 0,
      endsIn: 'MS-JACKSON Auction in 4D 4H 49min',
      location: 'VIJAYAWADA - A.P',
    },
  ];

  // Fallback image URL in case the primary URL fails
  const fallbackImage = 'https://dummyimage.com/100x100/ccc/fff.png&text=Car+Image';

  return (
    <div className="auction-content">
      <table className="auction-table">
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>Auction Product</th>
            <th>Current Bid</th>
            <th>No of Bids</th>
            <th>ENDS In</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction, index) => (
            <tr key={index}>
              <td>
                <img
                  src={auction.image}
                  alt="car"
                  className="auction-image"
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.src = fallbackImage;
                  }} // Log error and set fallback
                />
              </td>
              <td>
                <div>{auction.product}</div>
                <div>Lot {auction.lot}</div>
                <div className="action-links">
                  <span className="wishlist">⭐ Wish List</span>
                  <span>🔗</span>
                </div>
              </td>
              <td>{auction.bid}</td>
              <td>{auction.bids}</td>
              <td>
                <div>{auction.endsIn}</div>
                <div className="location">
                  <span>🌍</span>
                  <span>{auction.location}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ChangePassword = () => {
  const height = {
    height: '286px'
  };
  return (
    <div style={height} className="main-content">
      <h2 className="section-title">Change password</h2>
      <div className="form-row">
        <div className="form-group">
          <label>current password</label>
          <input type="password" className="input-field" />
        </div>
        <div className="form-group">
          <label>New password</label>
          <input type="password" className="input-field" />
        </div>
      </div>
      <div className="form-group half-width">
        <label>confirm password</label>
        <input type="password" className="input-field" />
      </div>
      <button className="update-button">Updated Profile</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3 className="sidebar-title">Swipe auctions</h3>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive || window.location.pathname === '/' ? 'sidebar-button active' : 'sidebar-button'
            }
          >
            Edit profile
          </NavLink>
          <NavLink
            to="/auctions"
            className={({ isActive }) => (isActive ? 'sidebar-button active' : 'sidebar-button')}
          >
            Whish List
          </NavLink>
          <NavLink
            to="/change-password"
            className={({ isActive }) => (isActive ? 'sidebar-button active' : 'sidebar-button')}
          >
            confirm password
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? 'sidebar-button active' : 'sidebar-button')}
          >
            Logout
          </NavLink>
        </div>

        {/* Main Content */}
        <Routes>
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<ProfileEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

// Render the App component only in the browser environment
if (typeof window !== 'undefined' && document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
