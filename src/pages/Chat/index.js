import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import accountabilityGroups from '../../api/accountabilityGroups';
import auth from '../../api/auth';
import {TwilioService} from '../../api/twilioService';
import {useDispatch} from 'react-redux';
import {setNewChannels} from '../../redux/reducers/channelSlice';
import {Client} from '@twilio/conversations';
import {Appbar, Avatar} from 'react-native-paper';

const Chat = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccountabilityGroups = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      setUser(userData.email);
      return await accountabilityGroups.getAccountabilityGroups(userData.token);
    };
    getAccountabilityGroups().then(allGroups => {
      if (allGroups.data.length) {
        setGroups(allGroups.data);
      } else {
        Alert.alert('You have no groups');
      }
    });
  }, []);

  return (
    <View>
      <FlatList
        data={groups}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '90%',
              height: 70,
              alignSelf: 'center',
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}
            onPress={() =>
              navigation.navigate('ChatRoom', {
                name: item.group.name,
                identity: user,
                users: item.users[0],
              })
            }>
            <View style={{flexDirection: 'row', marginLeft: 15}}>
              <Avatar.Text label="CR" size={40} />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#3C3939',
                  marginLeft: 10,
                }}>
                {item.group.name} Chat
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Chat;
