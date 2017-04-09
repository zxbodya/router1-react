import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export class RouterContext extends Component {
  constructor(props, context) {
    super(props, context);
    this.router = props.router;
  }

  getChildContext() {
    return { router: this.router };
  }

  render() {
    return Children.only(this.props.children);
  }
}

RouterContext.childContextTypes = {
  router: PropTypes.object.isRequired,
};

RouterContext.propTypes = {
  children: PropTypes.element.isRequired,
  router: PropTypes.object.isRequired,
};
