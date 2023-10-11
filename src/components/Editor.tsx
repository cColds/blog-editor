import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";
import Placeholder from "@tiptap/extension-placeholder";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit,
  Placeholder.configure({ placeholder: "Tell your story" }),
];

type EditorType = {
  content: string;
  editable: boolean;
  onEditorChange: (data: string) => void;
};

const Editor = ({ content, editable, onEditorChange }: EditorType) => {
  const editor = useEditor({
    editable,
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] prose bg-white rounded prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-2.5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onEditorChange(html);
    },
  });

  return (
    <>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
