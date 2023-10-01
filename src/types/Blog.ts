type BlogType = {
  _id: string;
  imgUrl: string;
  title: string;
  body: string;
  author: { _id: string; username: string };
  formatDate: string;
  formatDateTitle: string;
  comments: {
    formatDate: string;
    formatDateTitle: string;
    email: string;
    message: string;
    name: string;
    _id: string;
  }[];
  published: boolean;
};

export default BlogType;
