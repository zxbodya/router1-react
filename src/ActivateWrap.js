import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// todo: subscribe for route changes
export function ActivateWrap(props, context) {
  const { component, activeClassName, route, params, className, ...otherProps } = props;

  const { router } = context;

  if (!router) {
    console.error('No router in context');

    return React.createElement(
      component,
      {
        className,
        ...otherProps,
      }
    );
  }

  // todo: by href
  const isActive = router.isActive(route, params);
  const componentProps = {
    className: classnames(className, isActive && (activeClassName || 'active')),
    ...otherProps,
  };
  return React.createElement(
    component,
    componentProps,
    props.children
  );
}

ActivateWrap.propTypes = {
  component: PropTypes.any.isRequired,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  route: PropTypes.string,
  href: PropTypes.string,
  params: PropTypes.object,
  children: PropTypes.any,
};

ActivateWrap.contextTypes = {
  router: PropTypes.object,
};
