import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms/atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const copyToDos = [...oldToDos];
      copyToDos.splice(targetIndex, 1, newToDo);
      return copyToDos;
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const copyToDos = [...oldToDos];
      copyToDos.splice(targetIndex, 1);
      return copyToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={onDelete}>X</button>
    </li>
  );
}

export default ToDo;
