export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface Post {
  _id: string;
  content: string;
  image?: string;
  createdAt: string;
  user: User;
  likes: string[];
  comments: Comment[];
}

export interface Notification {
  _id: string;
  from: {
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  to: string;
  type: "like" | "comment" | "follow";
  post?: {
    _id: string;
    content: string;
    image?: string;
  };
  comment?: {
    _id: string;
    content: string;
  };
  createdAt: string;
}

export interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  onComment: (postId: Post) => void;
  isLiked?: boolean;
  currentUser: User;
}

export interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

export interface NotificationCardProps {
  notification: Notification;
  onDelete: (notificationId: string) => void;
}
