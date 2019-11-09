import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx'

import AppPage from './pages/AppPage';

import './index.scss';

configure({
  enforceActions: 'observed'
});

ReactDOM.render(<AppPage name="todo-list"/>, document.getElementById('root'));

