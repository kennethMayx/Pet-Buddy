// data/mockData.js - Updated with Comments Data
export const mockPostsWithComments = [
  {
    id: 1,
    user: { name: 'Sarah Johnson', avatar: '👩‍🦰' },
    petName: 'Bella',
    petType: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    adoptionStatus: 'Available',
    adoptionSite: 'Happy Paws Rescue',
    story: 'Meet Bella! This sweet girl loves playing fetch and cuddles. She was found as a stray but has so much love to give. Looking for a forever family who enjoys outdoor adventures!',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
    likes: 24,
    commentCount: 3,
    commentsData: [
      {
        id: 101,
        user: { name: 'Emily Davis', avatar: '👩' },
        text: 'What a beautiful dog! I hope she finds her forever home soon. ❤️',
        timestamp: '1 hour ago'
      },
      {
        id: 102,
        user: { name: 'James Wilson', avatar: '👨‍🦱' },
        text: 'My Golden Retriever was a rescue too. Best decision I ever made! Bella looks like such a sweetheart.',
        timestamp: '45 minutes ago'
      },
      {
        id: 103,
        user: { name: 'Maria Garcia', avatar: '👩‍🦳' },
        text: 'Is she good with kids? I have two young children and we\'ve been looking for a family dog.',
        timestamp: '30 minutes ago'
      }
    ],
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    user: { name: 'Mike Chen', avatar: '👨' },
    petName: 'Whiskers',
    petType: 'Cat',
    breed: 'Tabby Mix',
    age: '1 year',
    adoptionStatus: 'Adopted',
    adoptionSite: 'City Animal Shelter',
    story: 'Update on Whiskers! He found his forever home last week and is doing amazing. Thank you to everyone who shared his story. He\'s now the king of his new castle! 🏰',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
    likes: 156,
    commentCount: 5,
    commentsData: [
      {
        id: 201,
        user: { name: 'Lisa Thompson', avatar: '👩‍🦰' },
        text: 'So happy for Whiskers! Thank you for the update. 😸',
        timestamp: '12 hours ago'
      },
      {
        id: 202,
        user: { name: 'David Kim', avatar: '👨‍💼' },
        text: 'This made my day! Love seeing success stories like this.',
        timestamp: '10 hours ago'
      },
      {
        id: 203,
        user: { name: 'Anna Rodriguez', avatar: '👩‍🎓' },
        text: 'Aww, he looks so happy and comfortable in his new home!',
        timestamp: '8 hours ago'
      },
      {
        id: 204,
        user: { name: 'Tom Johnson', avatar: '👨‍🦲' },
        text: 'We adopted from the same shelter last year. They do amazing work!',
        timestamp: '6 hours ago'
      },
      {
        id: 205,
        user: { name: 'Sophie Lee', avatar: '👩‍🦱' },
        text: 'King Whiskers! 👑 Love the update posts, they give me hope for all shelter animals.',
        timestamp: '4 hours ago'
      }
    ],
    timestamp: '1 day ago'
  }
];

export const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export const adoptionStatuses = [
  'Available for Adoption',
  'Adopted', 
  'Not for Adoption'
];