import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Utility function to calculate time remaining until the auction ends
const calculateTimeRemaining = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diffMs = end - now;

  if (diffMs <= 0) return 'Auction Ended';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}D ${hours}H ${minutes}min`;
};

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
          <label>Location</label>
          <input type="text" className="input-field" />
        </div>
        <div className="form-group">
          <label>User Type</label>
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

const AuctionList = ({ auctions }) => {
  const [auctionData, setAuctionData] = useState(() => 
    auctions.map(auction => ({
      ...auction,
      timeRemaining: calculateTimeRemaining(auction.endsIn)
    }))
  );

  useEffect(() => {
    // Update countdown every minute
    const interval = setInterval(() => {
      setAuctionData((prevAuctions) =>
        prevAuctions.map((auction) => ({
          ...auction,
          timeRemaining: calculateTimeRemaining(auction.endsIn),
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fallbackImage = 'https://dummyimage.com/100x100/ccc/fff.png&text=Car+Image';

  if (!auctionData || auctionData.length === 0) {
    return <div className="auction-content">No auctions available.</div>;
  }

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
          {auctionData.map((auction, index) => (
            <tr key={index}>
              <td>
                <img
                  src={auction.image}
                  alt="car"
                  className="auction-image"
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.src = fallbackImage;
                  }}
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
                <div>{auction.timeRemaining}</div>
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
    <div style={height} className="main-content setpassword-Height">
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
  // Auctions state now managed via useState for dynamic updates
  const [auctionsData, setAuctionsData] = useState([
    {
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=100&auto=format&fit=crop',
      product: 'MARUTI GRAND-VITARA-HYBRID-DELTA',
      lot: '#660',
      bid: '₹10,000',
      bids: 0,
      endsIn: '2025-05-30T12:00:00Z',
      location: 'VIJAYAWADA - A.P',
    },
    {
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=100&auto=format&fit=crop',
      product: 'MARUTI GRAND-VITARA-HYBRID-ZETA',
      lot: '#661',
      bid: '₹12,000',
      bids: 2,
      endsIn: '2025-05-31T15:00:00Z', 
      location: 'HYDERABAD - T.S',
    },
  ]);

  // Example: Function to update auctions dynamically (e.g., fetching from API)
  // Call this function to update auction data as needed
  const updateAuctions = (newAuctions) => {
    setAuctionsData(newAuctions);
  };

  return (
    <Router>
      <div className="app-container">
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
            Wish List
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
        <Routes>
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/auctions" element={<AuctionList auctions={auctionsData} />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<ProfileEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

if (typeof window !== 'undefined' && document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
