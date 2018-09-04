import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export function Link(props, context) {
  const {
    href,
    route,
    params,
    hash,
    className,
    activeClassName,
    onClick: onClickOriginal,
    target,
    state,
    ...otherProps
  } = props;

  const { router } = context;

  if (!router) {
    // eslint-disable-next-line no-console
    console.error('No router in context');

    return React.createElement('a', {
      href,
      onClick: onClickOriginal,
      className,
      target,
      ...otherProps,
    });
  }

  let url;
  let isActive;

  if (href) {
    url = href;
    isActive = false; // todo: parse url and chack if it is active
  } else {
    url = router.createUrl(route, params, hash);
    isActive = activeClassName && router.isActive(route, params);
  }

  const onClick = event => {
    if (onClickOriginal) onClickOriginal(event);

    if (!event.defaultPrevented) {
      if (
        target || // if target is set
        // or it was not left mouse button click
        event.button !== 0 ||
        // or if one modifier keys was pressed, let browser to handle it
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      )
        return;

      event.preventDefault();
      router.navigateToUrl(url, state);
    }
  };

  const linkProps = {
    href: url,
    onClick,
    target,
    ...otherProps,
    className: classnames(className, isActive && activeClassName),
  };

  return React.createElement('a', linkProps, props.children);
}

Link.propTypes = {
  onClick: PropTypes.func,
  target: PropTypes.string,
  route: PropTypes.string,
  href: PropTypes.string,
  params: PropTypes.object,
  hash: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  state: PropTypes.object,
};

Link.contextTypes = {
  router: PropTypes.object,
};
