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
      list: defaultTodoList.list
    };
  }

  handleChangeList = (todo) => {
    const { list } = this.state;
    list.forEach(_ => {
      if (_.id === todo.id) {
        _.completed = todo.completed;
        _.content = todo.content;
      }
    });
    this.setState({
      list
    });
  };

  handleAddTodo = (todo) => {
    const { list } = this.state;
    list.push(todo);
    this.setState({
      list
    });
  };

  handleDeleteTodo = (id) => {
    const { list } = this.state;
    const index = list.findIndex(_ => _.id === id);
    list.splice(index, 1);
    this.setState({
      list
    });
  };

  render () {
    const value = {
      list: this.state.list,
      onAddTodo: this.handleAddTodo,
      onChangeTodo: this.handleChangeList,
      onDeleteTodo: this.handleDeleteTodo
    };
    return <TodoListContext.Provider value={value}>
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
