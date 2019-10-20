import React, { Component } from 'react';
import ShowTodoDetailComponent from '../../components/ShowTodoDetailComponent';
import EditTodoDetailComponent from '../../components/EditTodoDetailComponent';

import todoContextHoc from '../../Hoc/todoContextHoc';

import './style.scss';

class TodoDetailPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  componentDidMount () {
    const { history, match, list } = this.props;
    const { id } = match.params;
    if (id === undefined) {
      history.goBack();
      return;
    }
    const todo = list.find(item => item.id === Number(id));
    if (!todo) {
      history.goBack();
    }
  }

  handleEdit = () => {
    this.setState({
      isEditing: true
    });
  };

  handleCancel = () => {
    this.setState({
      isEditing: false
    });
  };

  handleSubmit = (item) => {
    const { match, onChangeTodo } = this.props;
    const { id } = match.params;
    onChangeTodo({
      id: Number(id),
      ...item
    });
    this.setState({
      isEditing: false
    });
  };

  handleDelete = () => {
    const { match, history, onDeleteTodo } = this.props;
    const { id } = match.params;
    onDeleteTodo(id);
    history.goBack();
  };

  render () {
    const { isEditing } = this.state;
    const { match, list } = this.props;
    const { id } = match.params;

    const todo = list.find(item => item.id === Number(id));

    return todo ? <article className='todo-detail'>
      {
        isEditing ?
          <EditTodoDetailComponent content={todo.content} completed={todo.completed} onCancel={this.handleCancel} onSubmit={this.handleSubmit}/> :
          <ShowTodoDetailComponent onEdit={this.handleEdit} todo={todo} onDelete={this.handleDelete}/>
      }
    </article> : null;
  }
}

export default todoContextHoc(TodoDetailPage);
