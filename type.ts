export type PostItemProps = {
  id?: string | undefined;
  title?: string | undefined;
  createdAt?: string | undefined;
  isInDashboard?: boolean | undefined;
  isInCommentPage?: boolean | undefined;
  user?: {
    email?: string;
    id?: string;
    image?: string;
    name?: string;
  };
  comments?: {
    createdAt?: string;
    id: string;
    postId: string;
    comment: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
