import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './style.scss';

export default class DeleteTodoModalComponent extends Component {
  constructor (props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount () {
    document.body.appendChild(this.el);
  }

  componentWillUnmount () {
    document.body.removeChild(this.el);
  }

  renderModal = () => {
    return <article className="delete-todo">
      <section className="delete-todo_content">
        <h3 className="nes-text is-error delete-todo_tip">是否确定删除</h3>
        <aside>
          <button type="button" className="nes-btn is-primary" onClick={this.props.onSubmitDelete}>确定</button>
          &nbsp;
          <button type="button" className="nes-btn" onClick={this.props.onCancelDelete}>取消</button>
        </aside>
      </section>
    </article>;
  };

  render () {
    return createPortal(this.renderModal(), this.el);
  }
}

DeleteTodoModalComponent.propTypes = {
  onSubmitDelete: PropTypes.func.isRequired,
  onCancelDelete: PropTypes.func.isRequired
};
