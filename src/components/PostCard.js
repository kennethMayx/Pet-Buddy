// components/PostCard.js - Updated with Comments System
import React, { useState } from 'react';
import { Heart, MessageCircle, MapPin, Calendar, Send } from 'lucide-react';
import { getStatusColor } from '../utils/helpers';

const PostCard = ({ 
  post, 
  isLiked, 
  showComments,
  currentUser,
  onLike, 
  onToggleComments,
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment(e);
    }
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="user-info">
          <div className="user-avatar">
            {post.user.avatar}
          </div>
          <div>
            <p className="user-name">{post.user.name}</p>
            <p className="post-time">
              <Calendar size={12} />
              {post.timestamp}
            </p>
          </div>
        </div>
        <span className={`adoption-status ${getStatusColor(post.adoptionStatus)}`}>
          {post.adoptionStatus}
        </span>
      </div>

      {/* Pet Image */}
      {post.image && (
        <img 
          src={post.image} 
          alt={post.petName}
          className="post-image"
        />
      )}

      {/* Post Content */}
      <div className="post-content">
        <div className="pet-info">
          <h3 className="pet-name">{post.petName}</h3>
          <div className="pet-details">
            <span>🐕 {post.petType}</span>
            {post.breed && <span>• {post.breed}</span>}
            {post.age && <span>• {post.age}</span>}
          </div>
          {post.adoptionSite && (
            <p className="adoption-site">
              <MapPin size={14} />
              {post.adoptionSite}
            </p>
          )}
        </div>

        <p className="pet-story">{post.story}</p>

        {/* Actions */}
        <div className="post-actions">
          <div className="action-buttons">
            <button 
              onClick={onLike}
              className={`action-btn ${isLiked ? 'liked' : ''}`}
            >
              <Heart 
                size={18} 
                fill={isLiked ? 'currentColor' : 'none'} 
              />
              {post.likes}
            </button>
            <button 
              onClick={onToggleComments}
              className={`action-btn ${showComments ? 'active' : ''}`}
            >
              <MessageCircle size={18} />
              {post.commentCount || 0}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="comments-section">
            <div className="comments-divider"></div>
            
            {/* Existing Comments */}
            {post.commentsData && post.commentsData.length > 0 && (
              <div className="comments-list">
                {post.commentsData.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-avatar">
                      {comment.user.avatar}
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.user.name}</span>
                        <span className="comment-time">{comment.timestamp}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Comment */}
            <div className="add-comment">
              <div className="comment-avatar">
                {currentUser.avatar}
              </div>
              <div className="comment-input-container">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write a comment..."
                  className="comment-input"
                  rows="1"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="comment-submit"
                  title="Send comment"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;