import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react';
import {todosStore} from "../store/Todo";
import {observer} from "mobx-react-lite";
import cs from "classnames";

interface EditTodoPopupProps {
  closePopup: () => void;
  currentEditingTodoId: string | null
}

export const EditTodoPopup: FC<EditTodoPopupProps> = observer(({currentEditingTodoId, closePopup}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const currentEditingTodo = useMemo(() => (
    todosStore.todos.find(({id}) => id === currentEditingTodoId)
  ), [currentEditingTodoId]);

  const isSame = title === currentEditingTodo?.title && description === currentEditingTodo?.description

  useEffect(() => {
    if(currentEditingTodo?.title) {
      setTitle(currentEditingTodo.title)
    }
    if(currentEditingTodo?.description) {
      setDescription(currentEditingTodo.description)
    }
  }, [currentEditingTodo?.title, currentEditingTodo?.description])

  const editTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await todosStore.editTodo(currentEditingTodoId!, {title, description})
    closePopup();
  }

  return currentEditingTodoId ? (
      <div className="edit-popup">
        <div className="edit-popup__container">
          <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
          <form onSubmit={editTodo}>
            <input
              type="text"
              disabled={todosStore.isEditing}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="todo-list__field"
              placeholder="Title"
            />

            <textarea
              disabled={todosStore.isEditing}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="message"
              rows={4}
              className="todo-list__field todo-list__description"
              placeholder="Description"
            />

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closePopup}
                className={cs('btn todo-list__close w-1/2 mr-2')}
              >
                Close
              </button>
              <button
                disabled={isSame || todosStore.isEditing}
                type="submit"
                className={'btn w-1/2'}
              >
                {todosStore.isEditing ? 'Loading...' : 'Edit'}
              </button>
            </div>
          </form>
        </div>
      </div>
  ) : null;
});
