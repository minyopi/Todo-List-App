interface FormValue {
  title: string;
  content: string;
}

interface TodoFormProps {
  formValue: FormValue;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TodoFormInputs: React.FC<TodoFormProps> = ({ formValue, onChangeTitle, onChangeContent }) => {
  return (
    <>
      {/* Title */}
      <div>
        title:
        <input type="text" value={formValue.title} onChange={onChangeTitle} />
      </div>

      {/* Content */}
      <div>
        content:
        <textarea value={formValue.content} onChange={onChangeContent} />
      </div>
    </>
  );
};

export default TodoFormInputs;
