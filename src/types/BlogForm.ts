type BlogFormType = {
  title: string;
  description: string;
  body: string;
  published: boolean;
  image: File | null;
  errors: {
    title: string;
    description: string;
    body: string;
    image: string;
  };
};

export default BlogFormType;
