import React from 'react';

const NotFoundPage = ({ history }) => {
  return <section>
    <h2>404 Not Found</h2>
    <button type="button" className="nes-btn is-primary" onClick={() => history.replace('/')}>返回</button>
  </section>;
};

export default NotFoundPage;
