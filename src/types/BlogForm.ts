type BlogFormType = {
  title: string;
  body: string;
  published: boolean;
  image: File | null;
  errors: {
    title: string;
    body: string;
    image: string;
  };
};

export default BlogFormType;
