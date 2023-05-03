import { Server, ServerOptions } from 'socket.io';
import { ExternalSocketIoAdapter } from './external-set-socket-io-adapter';

export class CustomSocketIoAdapter extends ExternalSocketIoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;

    // server.use((socket, next) => {
    //   socket.handshake.address = getAddress(socket);

    //   next();
    // });

    return server;
  }
}
