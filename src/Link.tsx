import cx from 'classnames';
import * as PropTypes from 'prop-types';
import { Validator } from 'prop-types';
import * as React from 'react';
import { MouseEventHandler, ReactNode } from 'react';
import { RouteParams } from 'router1';
import { RouterContext } from './RouterContext';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  route?: string;
  params?: RouteParams;
  hash?: string;
  className?: string;
  activeClassName?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  state?: object;
  children?: ReactNode;
}

export class Link extends React.Component<LinkProps> {
  public static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    route: PropTypes.string,
    href: PropTypes.string,
    params: PropTypes.object as Validator<RouteParams>,
    hash: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    state: PropTypes.object,
  };

  public static contextType = RouterContext;

  public render() {
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
    } = this.props;

    const router = this.context;

    if (!router) {
      // tslint:disable-next-line no-console
      console.error('No router in context');

      return (
        <a
          href={href}
          onClick={onClickOriginal}
          className={className}
          target={target}
          {...otherProps}
        />
      );
    }

    let url: string;
    let isActive;

    if (href) {
      url = href;
      isActive = false; // todo: parse url and check if it is active
    } else {
      url = router.createUrl(route, params, hash);
      isActive = activeClassName && router.isActive(route, params);
    }

    const onClick: MouseEventHandler<HTMLAnchorElement> = event => {
      if (onClickOriginal) {
        onClickOriginal(event);
      }

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
        ) {
          return;
        }

        event.preventDefault();
        router.navigateToUrl(url, state);
      }
    };

    return (
      <a
        href={url}
        onClick={onClick}
        target={target}
        {...otherProps}
        className={cx(className, isActive && activeClassName)}
      >
        {this.props.children}
      </a>
    );
  }
}
