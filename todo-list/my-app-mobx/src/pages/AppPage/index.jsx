import React, { Component, lazy, Suspense } from 'react';

import { Provider } from 'mobx-react';
// 从react-router-dom中引入BrowserRouter和Route
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import SuspenseLoading from '../../components/SuspenseLoading';
import ErrorBoundaryComponent from '../../components/ErrorBoundaryComponent';

import store from '../../store';

import './style.scss';

const HomePage = lazy(() => import(/* webpackChunkName: "HomePage" */ '../HomePage'));
const TodoDetailPage = lazy(() => import(/* webpackChunkName: "TodoDetailPage" */ '../TodoDetailPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ '../NotFoundPage'));

export default class AppPage extends Component {
  render () {
    return <ErrorBoundaryComponent>
      <Provider store={store}>
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
      </Provider>
    </ErrorBoundaryComponent>;
  }
}
