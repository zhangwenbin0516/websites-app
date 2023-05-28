import { renderToPipeableStream } from 'react-dom/server';

function Server(ctx: any, assets: string[]) {
  console.log(ctx, assets)
  return (
    <div>
      Server
    </div>
  );
}

export default Server;
