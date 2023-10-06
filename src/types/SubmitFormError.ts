type SubmitFormError = {
  type: string;
  value: string;
  msg: string;
  path: "title" | "body" | "image";
  location: string;
};

export default SubmitFormError;
