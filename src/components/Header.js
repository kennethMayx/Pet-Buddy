// components/Header.js - Updated with Authentication
import React, { useState, useRef, useEffect } from 'react';
import { Plus, User, LogOut, LogIn } from 'lucide-react';

const Header = ({ currentUser, onNewPost, onOpenAuth, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          🐾 Pet Buddy
        </h1>
        
        <div className="header-actions">
          {currentUser ? (
            <>
              {/* New Post Button */}
              <button 
                onClick={onNewPost}
                className="new-post-btn"
              >
                <Plus size={20} />
                Share Story
              </button>
              
              {/* User Menu */}
              <div className="user-menu-container" ref={menuRef}>
                <button 
                  onClick={handleUserMenuToggle}
                  className="user-menu-trigger"
                >
                  <span className="user-avatar">{currentUser.avatar}</span>
                  <span className="user-name">{currentUser.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-menu-dropdown">
                    <div className="user-menu-header">
                      <div className="user-info">
                        <span className="user-avatar-large">{currentUser.avatar}</span>
                        <div>
                          <p className="user-name-large">{currentUser.name}</p>
                          <p className="user-email">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="user-menu-divider"></div>
                    <button 
                      onClick={handleLogout}
                      className="user-menu-item logout-btn"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Guest Actions */}
              <button 
                onClick={() => onOpenAuth('login')}
                className="auth-btn login-btn"
              >
                <LogIn size={18} />
                Login
              </button>
              <button 
                onClick={() => onOpenAuth('signup')}
                className="auth-btn signup-btn"
              >
                <User size={18} />
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;