// components/PostFeed.js - Updated with Comments Support
import React from 'react';
import PostCard from './PostCard';

const PostFeed = ({ 
  posts, 
  likedPosts, 
  expandedComments,
  currentUser,
  onLike, 
  onToggleComments,
  onAddComment
}) => {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🐾</div>
        <h2>No stories yet!</h2>
        <p>Be the first to share a pet story in the community.</p>
      </div>
    );
  }

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isLiked={likedPosts.has(post.id)}
          showComments={expandedComments.has(post.id)}
          currentUser={currentUser}
          onLike={() => onLike(post.id)}
          onToggleComments={() => onToggleComments(post.id)}
          onAddComment={(commentText) => onAddComment(post.id, commentText)}
        />
      ))}
    </div>
  );
};

export default PostFeed;