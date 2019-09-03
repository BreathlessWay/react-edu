import React from 'react';
import { withRouter } from 'react-router-dom';

import { TodoListContext } from '../../context';

import './style.scss';

const TodoListComponent = (props) => {
  const { current, history } = props;

  return <TodoListContext.Consumer>
    {
      ({ list, onChangeTodo }) => {
        if (!list || !list.length) {
          return <section className='nes-text is-disabled text-center empty-data'>暂无数据</section>;
        }

        let showList = list;

        if (current === 'completed') {
          showList = list.filter(item => item.completed);
        }

        if (current === 'uncompleted') {
          showList = list.filter(item => !item.completed);
        }

        return <>
          {props.children}
          <ul className='todo-list_content'>
            {props.renderTitle}
            {
              showList.map(todo => <li className='todo-list_item' key={todo.id}>
                <p className='todo-list_item-detail' onClick={() => {
                  history.push(`/detail/${todo.id}`);
                }}>{todo.content}</p>
                <label className='todo-list_item-completed'>
                  {/*
              待办事项的完成状态是一个checkbox，受控组件，有checked属性表示是否完成，当点击改变完成状态时，使用props传入的回调函数onChange， 向父组件传递点击的待办事项的id和待办事项的完成状态，在父组件中更新待办事项的状态
            */}
                  <input type="checkbox" className='todo-list_item-checkbox nes-checkbox' checked={todo.completed} onChange={() => onChangeTodo({ id: todo.id, completed: !todo.completed, content: todo.content })}/>
                  <span/>
                </label>
              </li>)
            }
          </ul>
        </>;
      }
    }
  </TodoListContext.Consumer>;
};

export default withRouter(TodoListComponent);
