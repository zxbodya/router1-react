import * as React from 'react';
import { Context } from 'react';
import { Router } from 'router1';

export const RouterContext: Context<
  Router<any, any, any>
> = React.createContext(null);
