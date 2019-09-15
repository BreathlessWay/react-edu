import React, { Component } from 'react';

import './style.scss';

export default class ErrorBoundaryComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError (error) {
    console.log({error});
    return { error: true };
  }

  componentDidCatch (error, errorInfo) {
    console.error({error, errorInfo});
  }

  render () {
    if (this.state.error) {
      // 你可以自定义降级后的 UI 并渲染
      return <section className='text-center'>
        <p className="nes-balloon from-left nes-pointer nes-text is-error">
          组件渲染发生错误
        </p>
      </section>;
    }

    return this.props.children;
  }
}
