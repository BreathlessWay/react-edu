import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx'

import './index.scss';

configure({
  enforceActions: 'observed'
})

import AppPage from './pages/AppPage';

ReactDOM.render(<AppPage name="todo-list"/>, document.getElementById('root'));

