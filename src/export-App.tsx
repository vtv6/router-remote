import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { createBridgeComponent } from '@module-federation/bridge-react';
console.log('remote 1', React.version)
console.log('remote 1 dom', ReactDOM.version)
export const provider = createBridgeComponent({
  rootComponent: App,
});

export default provider;
