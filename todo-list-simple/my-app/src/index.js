// 所有的react文件都要引入React
import React from 'react';
// 引入react-dom这个模块
import ReactDOM from 'react-dom';
// 引入样式
import './index.scss';
// 引入刚刚创建的AppPage组件
import AppPage from './pages/AppPage';

// pwa相关
import * as serviceWorker from './serviceWorker';

// 使用react-dom模块中的render方法, 将组件挂载到页面上, 挂载到root元素下, 也就是public/index.html这个react项目的页面模板文件中<div id='root'></div>
// render方法接受三个参数, 第一个为react组件, 第二个为页面元素, 比如这里的document.getElementById('root'), 第三个为可选参数callback, 该回调函数将在组件被渲染或更新之后被执行。
ReactDOM.render(<AppPage />, document.getElementById('root'));

// pwa相关
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
