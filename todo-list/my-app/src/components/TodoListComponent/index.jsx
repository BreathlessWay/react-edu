import React from 'react';

const TodoListComponent = (props) => {
  const { content } = props;
  return <>
    <h5 className='todo-list_title nes-text is-success'>待办列表</h5>
    <ul className='todo-list_content'>
      <li className='todo-list_header'>
        <span className='nes-text is-primary'>待办事项</span>
        <span className='nes-text is-primary'>是否完成</span>
      </li>
      <li className='todo-list_item'>
        <p className='todo-list_item-detail'>{content}</p>
        <div className='todo-list_item-complete'>
          <input type="checkbox" className='todo-list_item-checkbox nes-checkbox'/>
          <span/>
        </div>
      </li>
    </ul>
  </>;
};

export default TodoListComponent;
