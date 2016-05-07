import React, { PropTypes } from 'react';
import classnames from 'classnames';

export function Link(props, context) {
  const { href, route, params, hash, className, activeClassName, onClick: onClickOriginal, target, state } = props;
  const { router } = context;

  if (!router) {
    console.error('No router in context');

    return React.createElement(
      'a',
      Object.assign({ href, onClickOriginal }, props),
      this.props.children
    );
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

  const onClick = (event) => {
    if (onClickOriginal) onClickOriginal(event);

    if (!event.defaultPrevented) {
      if (
        // if target is set
      target
      // or it was not left mouse button click
      || event.button !== 0
      // or if one modifier keys was pressed
      || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
      // let browser to handle it
      ) return;

      event.preventDefault();
      router.navigateToUrl(url, state);
    }
  };

  const linkProps = Object.assign(
    {},
    props, {
      href: url,
      onClick,
    },
    { className: classnames(className || '', { [activeClassName]: isActive }) }
  );
  return React.createElement(
    'a',
    linkProps,
    props.children
  );
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
