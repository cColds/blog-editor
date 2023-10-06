import BlogFormAction from "../../types/BlogFormAction";

type BlogFormState = {
  title: string;
  body: string;
  published: boolean;
  image: File | null;
  errors: { title: string; body: string; image: string };
};

const blogFormReducer = (state: BlogFormState, action: BlogFormAction) => {
  switch (action.type) {
    case "update_title": {
      const updatedState = { ...state, title: action.payload.value };
      const errorMsg = action.payload.value ? "" : "Title cannot be empty";

      updatedState.errors.title = errorMsg;

      return updatedState;
    }
    case "update_body": {
      const updatedState = { ...state, body: action.payload.value };
      const errorMsg = action.payload.value ? "" : "Body cannot be empty";

      updatedState.errors.body = errorMsg;

      return updatedState;
    }
    case "toggle_published":
      return { ...state, published: !action.payload.checked };
    case "update_image": {
      const file = action.payload.file;
      const updatedState = { ...state, image: file };
      let errorMsg = "";

      if (!file) {
        errorMsg = "Image is required";
      } else if (file && !file.name.match(/\.(jpg|jpeg|png|avif|webp)$/i)) {
        errorMsg = "File extension must be .webp, .png, .jpg/jpeg, or .avif";
      }

      updatedState.errors.image = errorMsg;
      return updatedState;
    }
    case "submit_form_errors": {
      const { errors } = action.payload;
      const copy = { ...state };

      errors.forEach((err) => {
        const errName = err.path;
        copy.errors[errName] = err.msg;
      });

      return copy;
    }

    default:
      throw Error(`Unknown action: ${action}`);
  }
};

export default blogFormReducer;
