// App.js - Updated with Authentication System
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostFeed from './components/PostFeed';
import NewPostModal from './components/NewPostModal';
import AuthModal from './components/AuthModal';
import { mockPostsWithComments } from './data/mockData';
import { mockUsers } from './data/mockUsers';
import './styles/App.css';

const App = () => {
  const [posts, setPosts] = useState(mockPostsWithComments);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());

  // Check for saved user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('petBuddyUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user session
  const saveUserSession = (user) => {
    localStorage.setItem('petBuddyUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  // Handle login
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      saveUserSession(userWithoutPassword);
      setShowAuth(false);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  // Handle signup
  const handleSignup = (userData) => {
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
      joinDate: new Date().toISOString(),
      avatar: getRandomAvatar()
    };

    setUsers([...users, newUser]);
    
    // Auto login after signup
    const { password: _, ...userWithoutPassword } = newUser;
    saveUserSession(userWithoutPassword);
    setShowAuth(false);
    return { success: true };
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('petBuddyUser');
    setCurrentUser(null);
    setLikedPosts(new Set());
    setExpandedComments(new Set());
  };

  // Get random avatar for new users
  const getRandomAvatar = () => {
    const avatars = ['👤', '👩', '👨', '👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦲', '👩‍🦱', '👨‍💼', '👩‍🎓'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const handleLike = (postId) => {
    if (!currentUser) {
      setShowAuth(true);
      setAuthMode('login');
      return;
    }

    const newLikedPosts = new Set(likedPosts);
    const isLiked = newLikedPosts.has(postId);
    
    if (isLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    
    setLikedPosts(newLikedPosts);
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleToggleComments = (postId) => {
    if (!currentUser) {
      setShowAuth(true);
      setAuthMode('login');
      return;
    }

    const newExpandedComments = new Set(expandedComments);
    
    if (newExpandedComments.has(postId)) {
      newExpandedComments.delete(postId);
    } else {
      newExpandedComments.add(postId);
    }
    
    setExpandedComments(newExpandedComments);
  };

  const handleAddComment = (postId, commentText) => {
    if (!currentUser || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: currentUser,
      text: commentText,
      timestamp: 'Just now'
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            commentsData: [...(post.commentsData || []), newComment],
            commentCount: (post.commentCount || 0) + 1
          }
        : post
    ));
  };

  const handleCreatePost = (newPostData) => {
    if (!currentUser) return;

    const post = {
      id: Date.now(),
      user: currentUser,
      ...newPostData,
      likes: 0,
      commentCount: 0,
      commentsData: [],
      timestamp: 'Just now'
    };
    
    setPosts([post, ...posts]);
    setShowNewPost(false);
  };

  const handleOpenNewPost = () => {
    if (!currentUser) {
      setShowAuth(true);
      setAuthMode('login');
      return;
    }
    setShowNewPost(true);
  };

  const handleCloseNewPost = () => {
    setShowNewPost(false);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="app">
      <Header 
        currentUser={currentUser}
        onNewPost={handleOpenNewPost}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        <PostFeed 
          posts={posts} 
          likedPosts={likedPosts} 
          expandedComments={expandedComments}
          currentUser={currentUser}
          onLike={handleLike}
          onToggleComments={handleToggleComments}
          onAddComment={handleAddComment}
        />
        
        {showNewPost && currentUser && (
          <NewPostModal 
            onClose={handleCloseNewPost}
            onSubmit={handleCreatePost}
          />
        )}

        {showAuth && (
          <AuthModal 
            mode={authMode}
            onClose={handleCloseAuth}
            onLogin={handleLogin}
            onSignup={handleSignup}
            onSwitchMode={handleSwitchAuthMode}
          />
        )}
      </main>
    </div>
  );
};

export default App;