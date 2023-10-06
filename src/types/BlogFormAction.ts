import SubmitFormError from "./SubmitFormError";

type BlogFormAction =
  | { type: "update_title"; payload: { value: string } }
  | { type: "update_body"; payload: { value: string } }
  | { type: "toggle_published"; payload: { checked: boolean } }
  | { type: "update_image"; payload: { file: File | null } }
  | { type: "submit_form_errors"; payload: { errors: SubmitFormError[] } };

export default BlogFormAction;
