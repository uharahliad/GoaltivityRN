import {Client} from 'twilio-chat';

export class TwilioService {
  static serviceInstance;
  static chatClient;

  // create a single service instance
  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  // use chat client if don't have instance, create a new chat client
  async getChatClient(twilioToken) {
    if (!TwilioService.chatClient && !twilioToken) {
      throw new Error('Twilio token is null or undefined');
    }
    if (!TwilioService.chatClient && twilioToken) {
      return Client.create(twilioToken).then(client => {
        TwilioService.chatClient = client;
        return TwilioService.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  // manage our token expiration
  addTokenListener(getToken) {
    if (!TwilioService.chatClient) {
      throw new Error('Twilio client is null or undefined');
    }
    TwilioService.chatClient.on('tokenAboutToExpire', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });

    TwilioService.chatClient.on('tokenExpired', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });
    return TwilioService.chatClient;
  }

  // gracefully shutting down library instance.
  clientShutdown() {
    TwilioService.chatClient?.shutdown();
    TwilioService.chatClient = null;
  }
  parseChannels(channels) {
    return channels.map(this.parseChannel);
  }

  parseChannel(channel) {
    return {
      id: channel.sid,
      name: channel.friendlyName,
      createdAt: channel.dateCreated,
      updatedAt: channel.dateUpdated,
      lastMessageTime:
        channel.lastMessage?.dateCreated ??
        channel.dateUpdated ??
        channel.dateCreated,
    };
  }

  parseMessages(messages) {
    return messages.map(this.parseMessage).reverse();
  }

  parseMessage(message) {
    let name = 'user';
    if (typeof message.attributes === 'string') {
      name = JSON.parse(message.attributes).name;
    }
    return {
      _id: message.sid,
      text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: name,
      },
      received: true,
    };
  }
}
