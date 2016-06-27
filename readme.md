## Router1 React

Components to use [https://github.com/zxbodya/router1](router1) library in react js application.
 
### RouterContext

Used to pass `router` context variable into components when rendering.

can be used as following: 

```JSX

// router - router1 instance
// renderApp - function that will render your app virtual dom
 
ReactDOM.render(
  <RouterContext
    router={router}
    render={renderApp}/>,
  appElement
);
```

### Link
 
Used to generate links with router1, will handle user clicks and can highlight active links.

```JSX
<Link route="contact" activeClassName="active" params={{routeParam: "value"}}>Contact</Link>
```
Also you can pass additional state data(to be used later when handling route change) using optional data param:
 

```JSX
<Link
  route="contact"
  activeClassName="active"
  params={{routeParam: "value"}}
  state={{ noscroll: true }}
>
  Contact
</Link>
```
### ActivateWrap

Similar to `Link` it can be used to highlight some block when route is active.

For example, when you need to add `active` class to `li` instead of link:

```JSX
<ActivateWrap route="contact" activeClassName="active" params={{routeParam: "value"}} component="li">
  <Link route="contact" params={{routeParam: "value"}}>Contact</Link>
</ActivateWrap>
```

### Example

Complete example with react.js https://github.com/zxbodya/router1-app-template
