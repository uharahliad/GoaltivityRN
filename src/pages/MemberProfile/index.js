import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import accountabilityGroups from '../../api/accountabilityGroups';
import Icon from 'react-native-vector-icons/MaterialIcons';
import users from '../../api/users';
import {Avatar, ProgressBar} from 'react-native-paper';
import goals from '../../api/goals';
import actionItems from '../../api/actionItems';

const MemberProfile = ({navigation, route}) => {
  const {user} = route.params;
  const [usersInfo, setUsersInfo] = useState([]);
  const [goalsData, setGoalsData] = useState([]);
  const [actionItemsData, setActionItemsData] = useState([]);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const getData = async () => {
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      const allGoals = await goals.getGoals(userData.token, user.id);
      const allActionItems = await Promise.all(
        allGoals.data.rows.map(async item => {
          const actionItem = await actionItems.getActionItems(
            userData.token,
            item.id,
          );
          return actionItem.data.rows;
        }),
      );
      setGoalsData(allGoals.data.rows);
      setActionItemsData(allActionItems);
    };
    getData();
  }, []);

  useEffect(() => {
    if (user !== null) {
      const first = user.firstName ? user.firstName[0] : '';
      const last = user.lastName ? user.lastName[0] : '';
      setLabel(first + last);
    }
  }, [user]);

  //   useEffect(() => {
  //     const getUsersById = async () => {
  //       const userData = JSON.parse(await EncryptedStorage.getItem('user'));
  //       const usersData = await Promise.all(
  //         group.users[0].map(async item => {
  //           const data = await users.getUsersById(userData.token, item.userId);
  //           return data.data;
  //         }),
  //       );
  //       setUsersInfo(usersData);
  //     };
  //     getUsersById();
  //   }, [group]);

  // const onPress = async () => {
  //   const userData = JSON.parse(await EncryptedStorage.getItem('user'));
  //   await accountabilityGroups.createAccountabilityGroup(
  //     {data: {name: 'AllUsersGroup'}},
  //     userData.token,
  //   );
  // };

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
          {user.firstName}
        </Text>
        <View
          style={{
            height: 80,
            width: 80,
            alignItems: 'center',
            borderRadius: 50,
            marginTop: 15,
          }}>
          {user.avatar.length ? (
            <Avatar.Image source={{uri: user.avatar[0].publicUrl}} size={70} />
          ) : (
            <Avatar.Text label={label} size={70} />
          )}

          {/* <View
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
          </View> */}
          <View style={{width: 200, marginTop: 15, alignItems: 'center'}}>
            <Text
              style={{
                color: '#1D2E54',
                fontSize: 12,
                lineHeight: 16,
              }}>
              {user.bio}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2.5}}>
        <ScrollView>
          {goalsData ? (
            goalsData.map(goal => (
              <View
                key={goal.id}
                style={{
                  width: '90%',
                  marginTop: 10,
                  padding: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  borderRadius: 16,
                }}>
                <Text style={{marginTop: 10}}>{goal.name}</Text>
                <View
                  style={{
                    marginTop: 10,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ProgressBar
                    style={{
                      alignSelf: 'center',
                      width: Dimensions.get('screen').width * 0.7,
                      height: 5,
                    }}
                    progress={Number(goal.status) * 0.01}
                    color={'#1FC3EA'}
                  />
                  <Text style={{marginLeft: 10}}>{goal.status}%</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
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
              </View>
            ))
          ) : (
            <Text>no goals</Text>
          )}
        </ScrollView>
        {/* <FlatList
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
                    {item.avatar ? (
                      <Image
                        defaultSource={require('../../../assets/PlusButton.png')}
                        // source={{uri: item.avatar}}
                        style={{width: 45, height: 45, borderRadius: 50}}
                      />
                    ) : (
                      <Icon name="person" size={45} />
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
        /> */}
      </View>
    </View>
  );
};

export default MemberProfile;
