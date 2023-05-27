import React from 'react';
import { createRoot } from "react-dom/client"

function Client() {
  return (
    <div>
      Client
    </div>
  );
}

const app = createRoot(document.body as HTMLElement)
app.render(<Client />)