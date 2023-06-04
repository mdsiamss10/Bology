export type PostItemProps = {
  id: string;
  title: string;
  createdAt?: string;
  isInDashboard?: boolean;
  isInCommentPage?: boolean;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: {
    createdAt?: string;
    id: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
