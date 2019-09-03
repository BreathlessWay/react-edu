import React, { Component } from 'react';
import ShowTodoDetailComponent from '../../components/ShowTodoDetailComponent';
import EditTodoDetailComponent from '../../components/EditTodoDetailComponent';

import './style.scss';
import { TodoListContext } from '../../context';

export default class TodoDetailPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  static contextType = TodoListContext;

  componentDidMount () {
    const { history, match } = this.props;
    const { list } = this.context;
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
    const { onChangeTodo } = this.context;
    const { match } = this.props;
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
    const { match, history } = this.props;
    const { id } = match.params;
    const { onDeleteTodo } = this.context;
    onDeleteTodo(id);
    history.goBack();
  };

  render () {
    const { isEditing } = this.state;
    const { list } = this.context;
    const { match } = this.props;
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
