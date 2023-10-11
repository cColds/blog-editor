type SubmitFormError = {
  type: string;
  value: string;
  msg: string;
  path: "title" | "body" | "image" | "description";
  location: string;
};

export default SubmitFormError;
