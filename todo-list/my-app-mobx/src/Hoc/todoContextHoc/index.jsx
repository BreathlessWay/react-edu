import React, { Component } from 'react';
import { TodoListContext } from '../../context';

const todoContextHoc = (Children) => {
  return class WrapComponent extends Component {

    static contextType = TodoListContext;

    render () {
      const { props, context } = this;
      return <Children {...props} {...context}/>;
    }
  };
};

export default todoContextHoc;
