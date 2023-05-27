import React from 'react'
import { createRoot, hydrateRoot } from "react-dom/client"

function Main() {
  return (
    <div>
      Main
    </div>
  );
}

const app = createRoot(document.body as HTMLElement)
app.render(<Main />)