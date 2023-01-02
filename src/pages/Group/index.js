import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import accountabilityGroups from '../../api/accountabilityGroups';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from 'react-native-paper';

const Group = ({navigation}) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getAccountabilityGroups = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      return await accountabilityGroups.getAccountabilityGroups(userData.token);
    };
    getAccountabilityGroups().then(allGroups => {
      setGroups(allGroups.data);
    });
  }, []);

  console.log(groups);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1}}>
        <FlatList
          data={groups}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('GroupItem', {group: item})}
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                width: '90%',
                height: 120,
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
                style={{
                  marginTop: 10,
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#BCBEC0',
                  width: '90%',
                  padding: 3,
                  flexDirection: 'row',
                }}>
                <Icon name="groups" size={45} />
                <View style={{marginLeft: 3}}>
                  <Text
                    style={{fontSize: 14, lineHeight: 20, color: '#1F1C1B'}}>
                    {item.group.name}
                  </Text>
                  <Text
                    style={{fontSize: 12, lineHeight: 16, color: '#797776'}}>
                    {item.users[0] ? item.users[0].length : 0} members
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  width: '90%',
                  padding: 3,
                  marginTop: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{alignSelf: 'center'}}
                    name="outlined-flag"
                    size={13}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      lineHeight: 16,
                      color: '#797776',
                      marginLeft: 2,
                    }}>
                    Weekly Action Items Completed:
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{alignSelf: 'center'}}
                    name="emoji-events"
                    size={13}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      lineHeight: 16,
                      color: '#797776',
                      marginLeft: 2,
                    }}>
                    12-Week Goal Completed:
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

export default Group;
