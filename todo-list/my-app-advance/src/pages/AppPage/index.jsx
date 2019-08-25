import React, { Component, lazy, Suspense } from 'react';
// 从react-router-dom中引入BrowserRouter和Route
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SuspenseLoading from '../../components/SuspenseLoading';

import './style.scss';

const HomePage = lazy(() => import(/* webpackChunkName: "HomePage" */ '../HomePage'));
const TodoDetailPage = lazy(() => import(/* webpackChunkName: "TodoDetailPage" */ '../TodoDetailPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ '../NotFoundPage'));

export default class AppPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {
          content: '待办1',
          completed: false,
          id: 0
        },
        {
          content: '待办2',
          completed: true,
          id: 1
        }
      ]
    };
  }

  handleChangeList = (list) => {
    this.setState({
      list
    });
  };

  render () {
    const { list } = this.state;
    return <BrowserRouter>
      <Route render={({ location, history }) => {
        const { pathname } = location;
        return <Suspense fallback={<SuspenseLoading/>}>
          <article>
            <nav className='nav-wrap'>
            <span onClick={() => {
              // 只有当不是首页时点击回到首页
              if (pathname !== '/') {
                history.replace('/');
              }
            }}>待办首页</span>
            </nav>
            <Switch>
              {/*HomePage和TodoDetailPage通过Route的render挂载到路由中，并且必须将路由相关的props手动传入组件*/}
              <Route path="/" exact render={(props) => <HomePage {...props} list={list} onChangeList={this.handleChangeList}/>}/>
              <Route path="/detail/:id" component={props => <TodoDetailPage {...props} list={list} onChangeList={this.handleChangeList}/>}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </article>
        </Suspense>;
      }}/>
    </BrowserRouter>;
  }
}
