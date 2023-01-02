import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import accountabilityGroups from '../../api/accountabilityGroups';
import Icon from 'react-native-vector-icons/MaterialIcons';
import users from '../../api/users';
import {Avatar} from 'react-native-paper';

const GroupItem = ({navigation, route}) => {
  const {group} = route.params;
  const [usersInfo, setUsersInfo] = useState([]);

  useEffect(() => {
    const getUsersById = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      const usersData = await Promise.all(
        group.users[0].map(async item => {
          const data = await users.getUsersById(userData.token, item.userId);
          return data.data;
        }),
      );
      setUsersInfo(usersData);
    };
    getUsersById();
  }, [group]);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#1D2E54',
            marginTop: 10,
          }}>
          {group.group.name}
        </Text>
        <Text>{group.users[0].length} members</Text>
        <View
          style={{
            height: 80,
            width: 80,
            alignItems: 'center',
            borderRadius: 50,
            marginTop: 15,
          }}>
          {group.group.icon ? (
            <Image
              source={{uri: group.group.icon}}
              style={{width: 70, height: 70, borderRadius: 50}}
            />
          ) : (
            <Icon
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              name="group"
              size={70}
            />
          )}
          <View style={{width: 200, marginTop: 15, alignItems: 'center'}}>
            <Text
              style={{
                color: '#1D2E54',
                fontSize: 12,
                lineHeight: 16,
              }}>
              12-Week Goals Completed 0
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon style={{alignSelf: 'center'}} name="date-range" size={17} />
              <Text
                style={{
                  marginLeft: 1,
                  color: '#797776',
                  fontSize: 11,
                  lineHeight: 16,
                  textAlign: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                Created: {new Date(group.group.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 2.5}}>
        <FlatList
          data={usersInfo}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MemberProfile', {
                  user: item,
                })
              }
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                width: '90%',
                height: 100,
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
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                      width: '90%',
                      padding: 3,
                      flexDirection: 'row',
                    }}>
                    {item.avatar.length ? (
                      <Avatar.Image
                        source={{uri: item.avatar[0].publicUrl}}
                        size={45}
                      />
                    ) : (
                      <Avatar.Text
                        label={
                          item.firstName
                            ? item.firstName[0]
                            : '' + item.lastName
                            ? item.lastName[0]
                            : ''
                        }
                        size={45}
                      />
                    )}
                    <View style={{marginLeft: 3, flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                          color: '#1F1C1B',
                        }}>
                        {item.firstName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                          color: '#1F1C1B',
                          marginLeft: 4,
                        }}>
                        {item.lastName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '90%',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 16,
                        color: '#3C3939',
                        marginLeft: 7,
                      }}>
                      {item.bio}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    padding: 10,
                    marginRight: 5,
                  }}>
                  <Icon color="#797776" name="emoji-events" size={23} />
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                      color: '#797776',
                      marginLeft: 3,
                    }}>
                    0
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default GroupItem;
