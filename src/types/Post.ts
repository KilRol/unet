type Post = {
  id: string;
  author: string;
  date: number;
  content: string;
  comments: Post[];
  likes: string[]
};

export default Post;
