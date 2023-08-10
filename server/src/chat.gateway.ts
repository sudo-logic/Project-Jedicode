import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private userSocketMap: { [key: string]: string } = {};
  private userRoomMap: { [key: string]: string } = {};

  async handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  getAllConnectedClients(roomId: string) {
    return Array.from(this.server.sockets.adapter.rooms.get(roomId) || []).map(
      (socketId) => {
        return {
          socketId,
          username: this.userSocketMap[socketId],
        };
      },
    );
  }

  @SubscribeMessage('join')
  async onJoin(socket: Socket, data: { roomId: string; username: string }) {
    this.userSocketMap[socket.id] = data.username;
    this.userRoomMap[socket.id] = data.roomId;
    socket.join(data.roomId);
    const clients = this.getAllConnectedClients(data.roomId);
    this.server.to(data.roomId).emit('joined', {
      clients,
      username: data.username,
      socketId: socket.id,
    });
  }

  async handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
    const username = this.userSocketMap[socket.id];
    const roomId = this.userRoomMap[socket.id];
    delete this.userSocketMap[socket.id];
    delete this.userRoomMap[socket.id];
    this.server.to(roomId).emit('disconnected', {
      socketId: socket.id,
      username,
    });
    socket.leave(roomId);
  }
}
