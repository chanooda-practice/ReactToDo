import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../atoms/atoms";

interface IForm {
  toDo: string;
}

const formValid = {
  required: { value: true, message: "please write toDo." },
};

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  localStorage.setItem("toDoList", JSON.stringify(toDos));
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", formValid)}
        type="text"
        placeholder="Write a to do."
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
