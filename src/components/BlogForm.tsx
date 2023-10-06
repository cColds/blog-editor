import BlogFormType from "../types/BlogForm";
import BlogFormAction from "../types/BlogFormAction";
import CircleSpinner from "./CircleSpinner";

type BlogFormArgs = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  operation: "CREATE" | "EDIT";
  closeModal?: () => void;
  state: BlogFormType;
  dispatch: React.Dispatch<BlogFormAction>;
};

function BlogForm({
  handleSubmit,
  isLoading,
  operation,
  closeModal,
  state,
  dispatch,
}: BlogFormArgs) {
  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-3"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-1.5">
        Title
        <input
          type="text"
          name="title"
          placeholder="e.g. Clean Code Architecture"
          value={state.title}
          onChange={(e) =>
            dispatch({
              type: "update_title",
              payload: { value: e.target.value },
            })
          }
          required
        />
      </label>
      {state.errors.title && (
        <p className="text-sm text-red-600 first-letter:uppercase">
          {state.errors.title}
        </p>
      )}

      <label className="flex flex-col gap-1.5">
        Body
        <textarea
          name="body"
          placeholder="Once upon a time..."
          rows={4}
          value={state.body}
          onChange={(e) =>
            dispatch({
              type: "update_body",
              payload: { value: e.target.value },
            })
          }
          required
        ></textarea>
      </label>
      {state.errors.body && (
        <p className="text-sm text-red-600 first-letter:uppercase">
          {state.errors.body}
        </p>
      )}

      <label className="flex gap-2.5">
        Published?
        <input
          type="checkbox"
          title="Published?"
          className="scale-125"
          checked={state.published}
          onChange={() =>
            dispatch({
              type: "toggle_published",
              payload: { checked: state.published },
            })
          }
        />
      </label>

      <label className="flex flex-col gap-2.5">
        Cover
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files && e.target.files[0]);
            const file = e.target.files ? e.target.files[0] : null;

            dispatch({ type: "update_image", payload: { file } });
          }}
          className="w-full p-0 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 
            file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold 
            file:text-violet-700 hover:file:bg-violet-100"
          title="image"
          name="image"
          accept="image/avif, image/jpeg, image/png, image/webp"
          required
        />
      </label>
      {state.errors.image && (
        <p className="text-sm text-red-600 first-letter:uppercase">
          {state.errors.image}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-4">
        <div className="ml-auto flex gap-2 text-sm">
          {operation === "EDIT" && (
            <button className="bg-transparent" onClick={closeModal}>
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center border-0 bg-red-800 font-semibold transition ease-in-out hover:bg-red-900 disabled:opacity-80"
          >
            {isLoading && <CircleSpinner />}
            {operation === "EDIT" ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default BlogForm;
