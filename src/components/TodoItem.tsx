import React, {FC, useMemo} from 'react';
import {Todo} from "../types";
import dayjs from "dayjs";
import cs from 'classnames'

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  setCurrentEditingTodoId: (id: string) => void
}

const TodoItem: FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, setCurrentEditingTodoId }) => {
  const date = useMemo(() => (
    dayjs.unix(todo.createdAt).format('DD.MM.YYYY HH:mm')
  ), [todo.createdAt]);
  const withCompleted = (classes: string = '') => (
    cs({"line-through": todo.completed}, classes)
  )
  return (
    <div className={'todo-item'}>
      <div className="flex justify-between items-center">
        <div className={'flex gap-2.5 items-center'}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <p className={withCompleted()}>
            {todo.title}
          </p>
        </div>
        <div className={'todo-item__button-wrapper'}>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="todo-item__button todo-item__button--delete"
          >
            Delete
          </button>
          <button
            onClick={() => setCurrentEditingTodoId(todo.id)}
            className="todo-item__button  todo-item__button--edit"
          >
            Edit
          </button>
        </div>
      </div>
      <p className={withCompleted('todo-item__text--secondary')}>
        {todo.description}
      </p>
      <p className={withCompleted('todo-item__text--secondary mt-2')}>
        {date}
      </p>
    </div>
  );
};

export default TodoItem;
