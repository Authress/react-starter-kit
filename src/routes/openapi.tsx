import 'openapi-explorer';
import { reactEventListener } from '../../../../openapi-explorer/dist/es/react.js'
import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';

interface OpenApiExplorerProps {
  collapse?: boolean;
  table?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'openapi-explorer': OpenApiExplorerProps
    }
  }
}

const requestFunction = (...args) => {
  console.log('API Request:', args);
  return true;
}

const ApiExplorer: FunctionComponent = () => { 
  reactEventListener({ useEffect }, 'request', requestFunction);
  return (
    <openapi-explorer
      collapse table
      use-path-in-nav-bar
      enable-console={false}
      show-authentication={false}
      show-server-selection={false}
      spec-url='https://api.authress.io'
    />
  );
};

export default ApiExplorer;