import  { Component } from 'react'

import * as signalR from '@aspnet/signalr';

class Notification{
  constructor() {
    this.apiUrl = 'http://103.76.181.203:5000/chat';
    this.hubConnection =  new signalR.HubConnectionBuilder()
    .withUrl(this.apiUrl)
    .configureLogging(signalR.LogLevel.Trace)
    .build();
    this.hubConnection.start()
    .then(() => console.log('Connection started!'))
    .catch(err => console.log('Error while establishing connection :('));
  }

  Server() {
      this.hubConnection.on('sendToAll', (nick, receivedMessage) => {
        const text = `${nick}: ${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
  }

  Client() {
    this.state.hubConnection
      .invoke('sendToAll', this.state.nick, this.state.message)
      .catch(err => console.error(err));
       this.setState({message: ''});
  }
}

export default Notification
