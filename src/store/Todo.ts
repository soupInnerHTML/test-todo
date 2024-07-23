import {computed, flow, makeObservable, observable} from "mobx";
import {Todo, TodoStatus} from "../types";
import api, {apiPath} from "../api";
import {AxiosResponse} from "axios";

class TodosStore {
  @observable todos: Todo[] = [];
  @observable status: TodoStatus = TodoStatus.fetching

  @computed get isAdding() {
    return this.status === TodoStatus.adding
  }
  @computed get isFetching() {
    return this.status === TodoStatus.fetching
  }
  @computed get isDeleting() {
    return this.status === TodoStatus.deleting
  }
  @computed get isDone() {
    return this.status === TodoStatus.done
  }
  @computed get isError() {
    return this.status === TodoStatus.error
  }
  @computed get isEditing() {
    return this.status === TodoStatus.editing
  }

  @flow *fetchTodos(this: TodosStore) {
    try {
      const response: AxiosResponse<Todo[]> = yield api.get(apiPath.todos + '?sortBy=createdAt&order=desc');
      this.todos = response.data;
      this.status = TodoStatus.done;
    }
    catch (e) {
      alert('Failed to fetch todos')
      this.status = TodoStatus.error
    }
  }

  @flow *deleteTodo(todoId: string) {
    try {
      this.status = TodoStatus.deleting;
      yield api.delete(apiPath.todos + todoId)
      this.fetchTodos()
    }
    catch (e) {
      alert('Failed to delete todo')
      this.status = TodoStatus.error
    }
  }

  @flow *addTodo(todo: Partial<Todo>) {
    try {
      this.status = TodoStatus.adding;
      yield api.post(apiPath.todos, todo)
      this.fetchTodos()
    }
    catch (e) {
      alert('Failed to add todo')
      this.status = TodoStatus.error
    }
  }

  @flow *editTodo(todoId: string, todo: Partial<Todo>) {
    try {
      this.status = TodoStatus.editing;
      yield api.put(apiPath.todos + todoId, todo)
      this.fetchTodos()
    }
    catch (e) {
      alert('Failed to edit todo')
      this.status = TodoStatus.error
    }
  }

  @flow *toggleComplete(todoId: string) {
    const target = this.todos.find(({id}) => todoId === id);
    yield this.editTodo(todoId, {
      completed: !target!.completed
    })
  }

  constructor() {
    makeObservable(this)
    this.fetchTodos()
  }
}

export const todosStore = new TodosStore()
