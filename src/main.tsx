import React from "react";
import { render } from "react-dom";

import HelloWorld from "./components/index";

const App: React.FC = () => {
  return <div>
    123123123123123
    <HelloWorld />
  </div>
}


render(<App />, document.body as HTMLElement)