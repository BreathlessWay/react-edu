import React, { Component, lazy, Suspense } from 'react';
// 从react-router-dom中引入BrowserRouter和Route
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import SuspenseLoading from '../../components/SuspenseLoading';

import { TodoListContext, defaultTodoList } from '../../context';

import './style.scss';

const HomePage = lazy(() => import(/* webpackChunkName: "HomePage" */ '../HomePage'));
const TodoDetailPage = lazy(() => import(/* webpackChunkName: "TodoDetailPage" */ '../TodoDetailPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ '../NotFoundPage'));

export default class AppPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: {
        list: defaultTodoList.list,
        onAddTodo: this.handleAddTodo,
        onChangeTodo: this.handleChangeList,
        onDeleteTodo: this.handleDeleteTodo
      }
    };
  }

  handleChangeList = (item) => {
    const { todo } = this.state;
    const { list } = todo;
    list.forEach(_ => {
      if (_.id === item.id) {
        _.completed = item.completed;
        _.content = item.content;
      }
    });
    this.setState({
      todo
    });
  };

  handleAddTodo = (item) => {
    const { todo } = this.state;
    todo.list.push(item);
    this.setState({
      todo
    });
  };

  handleDeleteTodo = (id) => {
    const { todo } = this.state;
    const { list } = todo;
    const index = list.findIndex(_ => _.id === Number(id));
    list.splice(index, 1);
    this.setState({
      todo
    });
  };

  render () {
    return <TodoListContext.Provider value={this.state.todo}>
      <BrowserRouter>
        <Suspense fallback={<SuspenseLoading/>}>
          <article>
            <nav className='nav-wrap'>
              <Link to={'/'} replace={true}>待办首页</Link>
            </nav>
            <Switch>
              {/*HomePage和TodoDetailPage通过Route的render挂载到路由中，并且必须将路由相关的props手动传入组件*/}
              <Route path="/" exact component={HomePage}/>
              <Route path="/detail/:id" component={TodoDetailPage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </article>
        </Suspense>
      </BrowserRouter>
    </TodoListContext.Provider>;
  }
}
