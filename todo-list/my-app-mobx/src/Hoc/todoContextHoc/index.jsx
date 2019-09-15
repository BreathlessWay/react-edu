import React, { Component } from 'react';
import { TodoListContext } from '../../context';

const getDisplayName = (Children) => {
  return Children.displayName || Children.name || 'Children';
};

const todoContextHoc = (Children) => {
  return class WrapComponent extends Component {

    static contextType = TodoListContext;

    static displayName = `WrapComponent(${getDisplayName(Children)})`;

    render () {
      console.log(getDisplayName(Children));
      const { props, context } = this;
      return <Children {...props} {...context}/>;
    }
  };
};

export default todoContextHoc;
