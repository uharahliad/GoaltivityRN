import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Alert, View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {TwilioService} from '../../api/twilioService';
import auth from '../../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Client} from 'twilio-chat';
import {useDispatch} from 'react-redux';

function ChatRoom({route}) {
  const {name, identity, users} = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();

  const setChannelEvents = useCallback(channel => {
    chatClientChannel.current = channel;
    chatClientChannel.current.on('messageAdded', message => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      const {giftedId, author} = message.attributes;
      if (giftedId) {
        setMessages(prevMessages => {
          if (prevMessages.some(({_id}) => _id === giftedId)) {
            return prevMessages.map(m => (m._id === giftedId ? newMessage : m));
          }
          return [newMessage, ...prevMessages];
        });
      }
    });
    return chatClientChannel.current;
  }, []);

  useEffect(() => {
    setCurrentUser(users.filter(user => user.email === identity));
    auth
      .getTwilioToken(identity)
      .then(({data}) => TwilioService.getInstance().getChatClient(data.jwt))
      .then(client => client.getChannelByUniqueName(name))
      .then(channel => setChannelEvents(channel))
      .then(currentChannel => currentChannel.getMessages())
      .then(paginator => {
        chatMessagesPaginator.current = paginator;
        // paginator.items.map(message => message.remove());
        const newMessages = TwilioService.getInstance().parseMessages(
          paginator.items,
        );
        setMessages(newMessages);
      })
      .catch(err => console.log({message: err.message, type: 'danger'}))
      .finally(() => setLoading(false));
  }, [name, identity, setChannelEvents, users]);

  const onSend = useCallback((newMessages = []) => {
    const attributes = {
      giftedId: newMessages[0]._id,
      name: newMessages[0].user.name,
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    chatClientChannel.current?.sendMessage(
      newMessages[0].text,
      JSON.stringify(attributes),
    );
  }, []);

  return (
    <View style={styles.screen}>
      {loading && currentUser === null ? (
        <ActivityIndicator />
      ) : (
        <GiftedChat
          renderUsernameOnMessage={true}
          messagesContainerStyle={styles.messageContainer}
          messages={messages}
          renderAvatarOnTop
          onSend={messages => onSend(messages)}
          user={{
            _id: identity,
            name: currentUser[0].firstName,
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    backgroundColor: 'lightgrey',
  },
});

export default ChatRoom;
