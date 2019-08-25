import React, { Component } from 'react';

import './style.scss';

export default class EditTodoDetailComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: props.content,
      completed: props.completed
    };
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  };

  handleChangeComplete = () => {
    const { completed } = this.state;
    this.setState({
      completed: !completed
    });

  };

  render () {
    const { content, completed } = this.state,
      { onCancel, onSubmit } = this.props;
    return <section className="todo-detail_edit">
      <div className="nes-field">
        <label htmlFor="name_field" className="nes-text is-success todo-detail_edit-title">待办事项</label>
        <input type="text" id="name_field" className="nes-input todo-detail_edit-input" value={content} onChange={this.handleChange}/>
      </div>
      <label className="todo-detail_edit-checkbox">
        <input type="checkbox" className="nes-checkbox" checked={completed} onChange={this.handleChangeComplete}/>
        <span>是否完成</span>
      </label>
      <aside className="todo-detail_edit-btn">
        <button type="button" className="nes-btn is-primary" onClick={() => onSubmit({
          content, completed
        })}>提交
        </button>
        <button type="button" className="nes-btn" onClick={onCancel}>取消</button>
      </aside>
    </section>;
  }
}

EditTodoDetailComponent.defaultProps = {
  content: '',
  completed: false,
  onSubmit: () => {},
  onCancel: () => {}
};

