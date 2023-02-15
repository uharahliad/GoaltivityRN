import React, {useCallback, useEffect, useState, useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PercentageCircle from 'react-native-percentage-circle';
import {useDispatch, useSelector} from 'react-redux';
import {getGoals} from '../../redux/thunks/goals';
import GoalActionItems from './components/GoalActionItems';
import {setSelectedGoal} from '../../redux/reducers/goalsSlice';

const Home = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const goalsData = useSelector(state => state.goals.goalsData);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slidesRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) {
        dispatch(getGoals());
      }

      return () => {
        isActive = false;
      };
    }, [dispatch]),
  );

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      console.log('Refreshed');
    });
    return focusHandler;
  }, [navigation]);

  const ScrollNext = () => {
    if (index < goalsData.length - 1) {
      slidesRef.current.scrollToIndex({index: index + 1});
    }
  };

  const ScrollBefore = () => {
    if (index <= goalsData.length - 1) {
      slidesRef.current.scrollToIndex({index: index - 1});
    }
  };

  const onUpdatePress = goal => {
    dispatch(setSelectedGoal(goal.id));
    navigation.navigate('EditGoalItem', {
      actionItems: goal.actionItems,
      goal,
      length: goalsData.length,
    });
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#79DBF2',
          justifyContent: 'space-between',
        }}>
        <View style={{position: 'absolute', top: 10, left: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={{flexDirection: 'row'}}>
            <Icon name="person-outline" size={30} color="#1D2E54" />
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 22,
                lineHeight: 28,
                fontWeight: '500',
                color: '#1D2E54',
              }}>
              Hello, {user !== null ? user.firstName : null}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            flexDirection: 'row',
          }}>
          <Icon name="emoji-events" size={30} color="#1D2E54" />
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 16,
              lineHeight: 24,
              fontWeight: '500',
              color: '#1D2E54',
              marginLeft: 10,
            }}>
            0
          </Text>
        </View>
      </View>
      <View style={{flex: 2, backgroundColor: '#F5F5F5'}} />
      {goalsData !== undefined && goalsData.length !== 0 ? (
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width * 0.85,
            height: Dimensions.get('screen').height * 0.3,
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 16,
            top: 70,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled={false}
            bounces={false}
            data={goalsData}
            keyExtractor={item => item.id}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            ref={slidesRef}
            renderItem={({item}) => (
              <View
                style={{
                  // alignSelf: 'center',
                  width: Dimensions.get('screen').width * 0.85,
                  height: Dimensions.get('screen').height * 0.22,
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={goalsData.length === 1 || index === 0}
                      style={{alignSelf: 'center'}}
                      onPress={ScrollBefore}>
                      <Icon
                        name="navigate-before"
                        size={23}
                        color={
                          goalsData.length === 1 || index === 0
                            ? 'lightgrey'
                            : 'grey'
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          lineHeight: 26,
                          fontSize: 20,
                          fontWeight: '400',
                          color: '#1D2E54',
                        }}>
                        {item.name}
                      </Text>
                      <TouchableOpacity onPress={() => onUpdatePress(item)}>
                        <Text
                          style={{
                            textAlign: 'center',
                            lineHeight: 20,
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#797776',
                          }}>
                          Tap to update progress
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <View
                        style={{
                          height: Dimensions.get('screen').height * 0.15,
                          width: Dimensions.get('screen').width * 0.55,
                          alignItems: 'center',
                          // backgroundColor: 'red',
                        }}>
                        <PercentageCircle
                          radius={Dimensions.get('screen').height * 0.07}
                          percent={Number(item.status)}
                          borderWidth={4}
                          color="#859DD6"
                          bgcolor="#E1E7F5">
                          <Icon name="emoji-events" size={50} color="#E1E7F5" />
                          <Text style={{fontSize: 10}}>{item.status}%</Text>
                        </PercentageCircle>
                      </View>
                    </View>
                    <View style={{alignSelf: 'center', marginTop: 5}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon name="outlined-flag" size={15} />
                        <Text
                          style={{
                            textAlign: 'center',
                            lineHeight: 16,
                            fontSize: 11,
                            fontWeight: '500',
                            color: '#797776',
                          }}>
                          {' '}
                          Weekly Action Items Completed{' '}
                          {!!goalsData[index]?.actionItemsData?.length
                            ? `${
                                goalsData[index].actionItemsData.filter(
                                  el => el.status.name === 'Done',
                                ).length
                              }/${goalsData[index].actionItemsData.length}`
                            : '0/0'}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          marginTop: 5,
                        }}>
                        <Icon name="date-range" size={15} />
                        <Text
                          style={{
                            textAlign: 'center',
                            lineHeight: 16,
                            fontSize: 11,
                            fontWeight: '500',
                            color: '#797776',
                          }}>
                          {' '}
                          {new Date(item.end_date).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={
                        goalsData.length === 1 || index === goalsData.length - 1
                      }
                      style={{alignSelf: 'center'}}
                      onPress={ScrollNext}>
                      <Icon
                        name="navigate-next"
                        size={23}
                        color={
                          goalsData.length === 1 ||
                          index === goalsData.length - 1
                            ? 'lightgrey'
                            : 'grey'
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width * 0.85,
            height: Dimensions.get('screen').height * 0.3,
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 16,
            top: 70,
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
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    // marginTop: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      lineHeight: 26,
                      fontSize: 20,
                      fontWeight: '400',
                      color: '#1D2E54',
                    }}>
                    No Goals Yet
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      height: Dimensions.get('screen').height * 0.15,
                      width: Dimensions.get('screen').width * 0.55,
                      alignItems: 'center',
                    }}>
                    <PercentageCircle
                      radius={Dimensions.get('screen').height * 0.07}
                      percent={0}
                      borderWidth={5}
                      color="#859DD6"
                      bgcolor="#E1E7F5">
                      <Icon name="emoji-events" size={50} color="#E1E7F5" />
                    </PercentageCircle>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {goalsData[index] ? <GoalActionItems goal={goalsData[index]} /> : null}
    </View>
  );
};

export default Home;
