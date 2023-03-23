import React from 'react';
import ReactDOM from "react-dom";
import singleSpaReact from 'single-spa-react';

import PageComponent from './components/index'

const domElementGetter: any = () => {
  return document.body as HTMLElement
}

console.log(window)
const app = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: PageComponent,
  domElementGetter
})

export default { mount: app.mount, bootstrap: app.bootstrap, unmount: app.unmount };