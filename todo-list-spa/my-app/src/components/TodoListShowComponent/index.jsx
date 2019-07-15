import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const TodoListShowComponent = (props) => {
  const { todoList, currentFilter, onChangeTodo } = props;

  // 使用filter遍历todoList, 根据不同的currentFilter, 来决定返回, 生成一个新的数组, 也就是我们筛选出来的结果
  const filterTodoList = todoList.filter(todo => {
    if (currentFilter === 'all') {
      return todo;
    }
    if (currentFilter === 'complete') {
      return todo.complete;
    }
    if (currentFilter === 'uncomplete') {
      return !todo.complete;
    }
    return null;
  });

  return <>
    <h5 className='todo-list_title nes-text is-success'>待办列表</h5>
    <ul className='todo-list_content'>
      <li className='todo-list_header'>
        <span className='nes-text is-primary'>待办事项</span>
        <span className='nes-text is-primary'>是否完成</span>
      </li>
      {/*
        我们用map循环这个数组, 渲染整个待办列表, 和上面一样循环和变量要在{}内
        依次设置key content checked
        对于onChange事件我们通过使用一个箭头函数, 对处理函数handleChangeTodo传参, 传入循环项item, 一样也可以写成this.handleChangeTodo.bind(this, item)
        不能直接写成this.handleChangeTodo(item)
        */}
      {
        filterTodoList.map(item => <li className='todo-list_item' key={item.id}>
          <p className='todo-list_item-detail'>
            <Link to={`/detail/${item.id}`}>{item.content}</Link>
          </p>
          <label className='todo-list_item-complete'>
            <input type="checkbox" checked={item.complete} onChange={() => onChangeTodo(item)} className='todo-list_item-checkbox nes-checkbox'/>
            <span/>
          </label>
        </li>)
      }
    </ul>
  </>;
};

TodoListShowComponent.propTypes = {
  todoList: PropTypes.array.isRequired,
  currentFilter: PropTypes.oneOf(['all', 'complete', 'uncomplete']).isRequired,
  onChangeTodo: PropTypes.func.isRequired
};

export default TodoListShowComponent;
