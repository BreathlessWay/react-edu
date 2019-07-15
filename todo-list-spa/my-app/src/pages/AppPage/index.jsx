import React from 'react';
// 从react-router-dom中引入BrowserRouter和Route
// BrowserRouter是最外层的包裹组件, 对Router接口的实现. 使得页面和浏览器的history保持一致.
// BrowserRouter对应的是html5的history, HashRouter对应的是hashhistory, 这两个最直观的区别是HashRouter在url上会有#, BrowserRouter不会有, 但是在点击到内页时刷新页面如果BrowserRouter没有在后台做路由映射, 就会出现404
// 关于路由映射在开发环境中create-react-app中已经做了处理, 是在webpack-dev-server中新增相应配置项, 而线上环境则需要在服务器上做处理, 可以参考vue-router的介绍https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 引入刚刚新建的HomePage组件
import HomePage from '../HomePage';
import TodoDetailPage from '../TodoDetailPage';
import NotFoundPage from '../NotFoundPage';

import './style.scss';

// 创建简单函数式组件
const AppPage = () => {
// BrowserRouter包裹住所有的路由组件
  return <BrowserRouter>
    {/*
  每个Route都对应一个路由页面, 主页需要添加exact字段, 做精确匹配
    path	location.pathname	exact	matches?
    /one	/one/two	        true	no
    /one	/one/two	        false	yes
  当exact为true时, 只会匹配到/one这个路径的页面
  当exact为false时会同时匹配到/one和/one/two两个页面
  在extra为false的情况下当打开/one/two路径时, 页面上会同时展示/one和/one/two两个页面的内容
  path就是页面的路由地址
  component就是对于路由地址所渲染的页面组件
  除了component外还有render和children
  */}
    <Switch>
      <Route path="/" exact component={HomePage}/>
      <Route path="/detail/:id" component={TodoDetailPage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>;
};

export default AppPage;
