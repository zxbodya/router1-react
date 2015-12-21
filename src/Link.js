import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';

class Link extends Component {
  render() {
    const {href, route, params, hash, className, activeClassName, onClick: onClickOriginal, target} = this.props;
    const {router} = this.context;

    if (!router) {
      console.error('No router in context');

      return React.createElement(
        'a',
        Object.assign({href: href, onClickOriginal}, this.props),
        this.props.children
      );
    }

    let url;
    let onClick;
    let isActive;

    if (href) {
      url = href;
      isActive = false; // todo: parse url and chack if it is active
    } else {
      url = router.createUrl(route, params, hash);
      isActive = router.isActive(route, params);
    }

    onClick = (event)=> {
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
        router.navigateToUrl(url);
      }
    };

    const props = Object.assign(
      {},
      this.props, {
        href: url,
        onClick,
      },
      {className: classnames(className || '', {[activeClassName || 'active']: isActive && activeClassName})}
    );
    return React.createElement(
      'a',
      props,
      props.children
    );
  }
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
};

Link.contextTypes = {
  router: PropTypes.object,
};

export default Link;
