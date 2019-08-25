import React, { Component } from 'react';
import ShowTodoDetailComponent from '../../components/ShowTodoDetailComponent';
import EditTodoDetailComponent from '../../components/EditTodoDetailComponent';

import './style.scss';

export default class TodoDetailPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false,
      todo: {
        content: 'todo',
        completed: false,
        id: Date.now()
      }
    };
  }

  componentDidMount () {
    const { list, history, match } = this.props;
    const { id } = match.params;
    if (id === undefined) {
      history.goBack();
      return;
    }
    const todo = list.find(item => item.id === Number(id));
    if (!todo) {
      history.goBack();
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
    const { list, onChangeList } = this.props;
    const { todo } = this.state;
    list.forEach(data => {
      if (data.id === todo.id) {
        data.content = item.content;
        data.completed = item.completed;
      }
    });
    onChangeList(list);
    this.setState({
      isEditing: false
    });
  };

  handleDelete = () => {
    const { list, match, onChangeList, history } = this.props;
    const { id } = match.params;
    const _index = list.findIndex(_ => _.id === Number(id));
    list.splice(_index, 1);
    onChangeList(list);
    history.goBack();
  };

  render () {
    const { isEditing, todo } = this.state;
    return <article className='todo-detail'>
      {
        isEditing ?
          <EditTodoDetailComponent content={todo.content} completed={todo.completed} onCancel={this.handleCancel} onSubmit={this.handleSubmit}/> :
          <ShowTodoDetailComponent onEdit={this.handleEdit} todo={todo} onDelete={this.handleDelete}/>
      }
    </article>;
  }
}
