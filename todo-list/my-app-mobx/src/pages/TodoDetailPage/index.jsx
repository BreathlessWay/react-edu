import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ShowTodoDetailComponent from '../../components/ShowTodoDetailComponent';
import EditTodoDetailComponent from '../../components/EditTodoDetailComponent';

import './style.scss';

@inject('store')
@observer
class TodoDetailPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  componentDidMount () {
    const { history, match, store } = this.props;
    const { list } = store.todo;
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
    const { match, store } = this.props;
    const { changeTodo } = store.todo;
    const { id } = match.params;
    changeTodo({
      id: Number(id),
      ...item
    });
    this.setState({
      isEditing: false
    });
  };

  handleDelete = () => {
    const { match, history, store } = this.props;
    const { deleteTodo } = store.todo;
    const { id } = match.params;
    deleteTodo(id);
    history.goBack();
  };

  render () {
    const { isEditing } = this.state;
    const { match, store } = this.props;
    const { list } = store.todo;
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

export default TodoDetailPage
