import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';

const UserProfile = ({navigation, route}) => {
  const user = useSelector(state => state.auth.user);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (user !== null) {
      const first = user.firstName ? user.firstName[0] : '';
      const last = user.lastName ? user.lastName[0] : '';
      setLabel(first + last);
    }
  }, [user]);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {user !== null ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            paddingVertical: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <View
              style={{
                height: 80,
                width: 80,
                alignItems: 'center',
                borderRadius: 50,
                marginTop: 15,
                marginLeft: 15,
              }}>
              {user.avatar && user.avatar.length ? (
                <Avatar.Image source={{uri: user.avatar[0].publicUrl}} />
              ) : (
                <Avatar.Text
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  label={label}
                  size={70}
                />
              )}
            </View>
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#1D2E54',
                  marginTop: 10,
                }}>
                {user.firstName} {user.lastName}
              </Text>
              <Text
                style={{
                  color: '#1D2E54',
                  fontSize: 12,
                  lineHeight: 16,
                }}>
                {user.email}
              </Text>
              <Text
                style={{
                  color: '#1D2E54',
                  fontSize: 12,
                  lineHeight: 16,
                }}>
                {user.phoneNumber ? user.phoneNumber : 'Set your phone number'}
              </Text>
            </View>
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              padding: 10,
              fontSize: 16,
              lineHeight: 24,
              color: '#797776',
              marginLeft: 10,
            }}>
            Short Bio
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              padding: 10,
              fontSize: 14,
              lineHeight: 20,
              color: '#1F1C1B',
              marginLeft: 10,
            }}>
            {user.bio ? user.bio : 'no bio information'}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default UserProfile;
