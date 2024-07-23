import React, {FC, FormEvent, useState} from 'react';
import {todosStore} from "../store/Todo";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";

export const AddTodoForm: FC = observer(() => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    todosStore.addTodo({
      completed: false,
      createdAt: dayjs().unix(),
      title,
      description
    })
  };
  return (
    <form className="mb-5" onSubmit={addTodo}>
      <input
        disabled={todosStore.isAdding}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-list__field"
        placeholder="Title"
      />
      <textarea
        disabled={todosStore.isAdding}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="message"
        rows={4}
        className="todo-list__field todo-list__description"
        placeholder="Description"
      />
      <button
        disabled={todosStore.isAdding || !title}
        type={'submit'}
        className={"btn mt-2 w-full"}
      >
        <span>{todosStore.isAdding ? 'Loading...' : 'Add'}</span>
      </button>
    </form>
  );
});
