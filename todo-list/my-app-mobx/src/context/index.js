import { createContext } from 'react';

export const defaultTodoList = {
  list: [
    {
      content: '待办1',
      completed: false,
      id: 0
    },
    {
      content: '待办2',
      completed: true,
      id: 1
    }
  ],
  onAddTodo: () => {},
  onChangeTodo: () => {},
  onDeleteTodo: () => {}
};

export const TodoListContext = createContext(defaultTodoList);
