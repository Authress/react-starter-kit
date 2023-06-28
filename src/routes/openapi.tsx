import 'openapi-explorer';
import type { FunctionComponent } from 'react';
import React from 'react';

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

const ApiExplorer: FunctionComponent = () => {
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