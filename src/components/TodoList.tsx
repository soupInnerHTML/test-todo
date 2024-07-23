import React, {useState} from 'react';
import TodoItem from './TodoItem';
import {todosStore} from "../store/Todo";
import {EditTodoPopup} from "./EditTodoPopup";
import {AddTodoForm} from "./AddTodoForm";
import {observer} from "mobx-react-lite";

export const TodoList = observer(() => {
  const [currentEditingTodoId, setCurrentEditingTodoId] = useState<string | null>(null)

  return (
    <div className="todo-list">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodoForm />
      {
        (todosStore.isFetching || todosStore.isDeleting || todosStore.isEditing) &&
        <p className={'text-1xl text-center'}>Loading...</p>
      }
      {todosStore.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={id => todosStore.toggleComplete(id)}
          deleteTodo={id => todosStore.deleteTodo(id)}
          setCurrentEditingTodoId={setCurrentEditingTodoId}
        />
      ))}
      <EditTodoPopup
        currentEditingTodoId={currentEditingTodoId}
        closePopup={() => setCurrentEditingTodoId(null)}
      />
    </div>
  );
});
