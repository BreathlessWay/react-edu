import React, { Component } from 'react';
import ShowTodoDetailComponent from '../../components/ShowTodoDetailComponent';
import EditTodoDetailComponent from '../../components/EditTodoDetailComponent';
import DeleteTodoModalComponent from '../../components/DeleteTodoModalComponent';

import './style.scss';

export default class TodoDetailPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false,
      isDeleting: false,
      todo: {
        content: 'todo',
        complete: false,
        id: Date.now()
      }
    };
  }

  componentDidMount () {
    const { id } = this.props.match.params, { todoList } = window;
    if (!id) {
      this.props.history.replace({ pathname: '/' });
      return;
    }
    const todo = todoList.find(item => item.id === Number(id));
    if (!todo) {
      this.props.history.replace({ pathname: '/' });
      return;
    }

    this.setState({
      todo
    });
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
    const { todo } = this.state;
    window.todoList.forEach(data => {
      if (data.id === todo.id) {
        data.content = item.content;
        data.complete = item.complete;
      }
    });
    this.setState({
      isEditing: false,
      todo: { ...todo, ...item }
    });
  };

  handleDelete = () => {
    this.setState({
      isDeleting: true
    });
  };

  handleCancelDelete = () => {
    this.setState({
      isDeleting: false
    });
  };

  handleSubmitDelete = () => {
    this.props.history.replace('/');
  };

  render () {
    const { isEditing, todo, isDeleting } = this.state;
    return <article className='todo-detail'>
      {
        isEditing ?
          <EditTodoDetailComponent content={todo.content} complete={todo.complete} onCancel={this.handleCancel} onSubmit={this.handleSubmit}/> :
          <ShowTodoDetailComponent onEdit={this.handleEdit} todo={todo} onDelete={this.handleDelete}/>
      }
      {
        isDeleting && <DeleteTodoModalComponent onCancelDelete={this.handleCancelDelete} onSubmitDelete={this.handleSubmitDelete}/>
      }
    </article>;
  }
}
