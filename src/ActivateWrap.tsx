import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { SFC } from 'react';
import { ComponentClass } from 'react';
import { ReactNode } from 'react';
import { RouteParams } from 'router1';
import { RouterContext } from './RouterContext';

interface ActiveWrapProps {
  // todo: ?
  // href?: string;
  component: SFC<any> | ComponentClass<any> | string;
  route?: string;
  params?: RouteParams;
  className?: string;
  activeClassName?: string;
  children?: ReactNode;
}

// todo: subscribe for route changes
export class ActivateWrap extends React.Component<ActiveWrapProps> {
  public static propTypes = {
    // href: PropTypes.string,
    route: PropTypes.string,
    params: PropTypes.object,
    component: PropTypes.any.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    children: PropTypes.any,
  };

  public static contextType = RouterContext;

  public render() {
    const {
      component: WrappedComponent,
      activeClassName,
      route,
      params,
      className,
      ...otherProps
    } = this.props;
    const router = this.context;
    if (!router) {
      // tslint:disable-next-line no-console
      console.error('No router in context');

      return <WrappedComponent className={className} {...otherProps} />;
    }
    const isActive = router.isActive(route, params);
    const componentProps = {
      className: classnames(
        className,
        isActive && (activeClassName || 'active')
      ),
      ...otherProps,
    };
    return React.createElement(
      WrappedComponent,
      componentProps,
      this.props.children
    );
  }
}
