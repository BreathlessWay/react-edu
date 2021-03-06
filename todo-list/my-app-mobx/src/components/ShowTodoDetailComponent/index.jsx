import React from 'react';

import './style.scss';

const ShowTodoDetailComponent = ({ todo, onEdit, onDelete }) => {
  return <section className="todo-detail_show">
    <h3 className="nes-text is-primary todo-detail_show-title">
      待办事项：<span className={`nes-text todo-detail_show-status ${todo.completed ? 'is-success' : 'is-warning'}`}>({todo.completed ? '已完成' : '未完成'})</span>
    </h3>
    <p className="todo-detail_show-content">{todo.content}</p>
    <aside className="todo-detail_show-btn">
      <button type="button" className="nes-btn is-primary" onClick={onEdit}>编辑</button>
      <button type="button" className="nes-btn is-error" onClick={onDelete}>删除</button>
    </aside>
  </section>;
};

export default ShowTodoDetailComponent;
