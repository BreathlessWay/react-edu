import React from 'react';

import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import './style.scss';

const TodoListComponent = (props) => {
  const { history, renderTitle, children, store } = props;
  const { showTodoList, currentTypeCount, changeTodo } = store.todo;
  if (!currentTypeCount) {
    return <section className='nes-text is-disabled text-center empty-data'>暂无数据</section>;
  }

  return <>
    {children}
    <ul className='todo-list_content'>
      {renderTitle}
      {
        showTodoList.map(todo => <li className='todo-list_item' key={todo.id}>
          <p className='todo-list_item-detail' onClick={() => {
            history.push(`/detail/${todo.id}`);
          }}>{todo.content}</p>
          <label className='todo-list_item-completed'>
            {/*
              待办事项的完成状态是一个checkbox，受控组件，有checked属性表示是否完成，当点击改变完成状态时，使用props传入的回调函数onChange， 向父组件传递点击的待办事项的id和待办事项的完成状态，在父组件中更新待办事项的状态
            */}
            <input type="checkbox" className='todo-list_item-checkbox nes-checkbox' checked={todo.completed} onChange={() => changeTodo({ id: todo.id, completed: !todo.completed, content: todo.content })}/>
            <span/>
          </label>
        </li>)
      }
    </ul>
  </>;
};

export default withRouter(inject('store')(observer(TodoListComponent)));
