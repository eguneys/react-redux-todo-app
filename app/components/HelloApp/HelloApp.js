import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(({ mainStore }) => ({ mainStore }))
class HelloApp extends React.Component {
  render() {
    const {mainStore, dispatch} = this.props;

    return (
      <div>
        <h2>Hello world!</h2>
      </div>
    );
  }
}

export default HelloApp;
