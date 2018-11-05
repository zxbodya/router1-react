import * as React from 'react';
import { Router } from 'router1';

export const RouterContext = React.createContext<Router<any, any, any> | null>(
  null
);
