import React, { PropTypes } from 'react';
import classnames from 'classnames';

// todo: subscribe for route changes
export function ActivateWrap(props, context) {
  const { component, activeClass, route, params, className } = props;

  const { router } = context;

  if (!router) {
    console.error('No router in context');

    return React.createElement(
      component,
      props
    );
  }

  // todo: by href
  const isActive = router.isActive(route, params);
  const componentProps = Object.assign(
    {},
    props,
    { className: classnames(className || '', { [activeClass || 'active']: isActive }) }
  );
  return React.createElement(
    component,
    componentProps,
    props.children
  );
}

ActivateWrap.propTypes = {
  component: PropTypes.any.isRequired,
  activeClass: PropTypes.string,
  className: PropTypes.string,
  route: PropTypes.string,
  href: PropTypes.string,
  params: PropTypes.object,
  children: PropTypes.any,
};

ActivateWrap.contextTypes = {
  router: PropTypes.object,
};

export default ActivateWrap;
