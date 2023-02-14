import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import actionItems from '../../api/actionItems';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PercentageCircle from 'react-native-percentage-circle';
import {useDispatch, useSelector} from 'react-redux';
import {getGoals} from '../../redux/thunks/goals';

const Home = ({navigation}) => {
  // const [goalsData, setGoalsData] = useState([]);
  const [week, setWeek] = useState(null);
  const [weekNumber, setWeekNumber] = useState('');
  const [weekStart, setWeekStart] = useState('');
  const [weekEnd, setWeekEnd] = useState('');
  const [actionItemsData, setActionItemsData] = useState([]);
  const [expanded, setExpanded] = useState(true);
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
      // const getData = async () => {
      //   try {
      //     const allGoals = await goals.getGoals(user.id);
      //
      //     console.log('AAll goals', allGoals.data.rows);
      //
      //     // const allActionItems = await Promise.all(
      //     //   allGoals.data.rows.map(async item => {
      //     //     const actionItem = await actionItems.getActionItems(item.id);
      //     //     return actionItem.data.rows;
      //     //   }),
      //     // );
      //     // setActionItemsData(allActionItems);
      //   } catch (e) {
      //     console.log('Error home', e);
      //   }
      // };
      // getData();
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

  useEffect(() => {
    if (goalsData[index]) {
      const startDate = new Date(goalsData[index].start_date);
      const daysToStartDateSunday = 7 - (startDate.getDay() + 1);
      const oneDay = 86400000;
      const startDateSunday = new Date(
        startDate.getTime() + daysToStartDateSunday * oneDay,
      );
      const now = new Date();
      const currentWeek =
        (now.getTime() - startDateSunday.getTime()) / oneDay / 7;
      setWeekStart(startDateSunday);
      setWeekEnd(new Date(startDateSunday.getTime() + 6 * oneDay));
      setWeekNumber(`Week ${currentWeek < 0 ? 1 : Math.ceil(currentWeek)}`);
      if (actionItemsData[index]) {
        const currentWeekActionItems = actionItemsData[index].filter(
          item =>
            item.week ===
            `Week ${currentWeek < 0 ? 1 : Math.ceil(currentWeek)}`,
        );
        if (currentWeekActionItems.length) {
          setWeek(currentWeekActionItems);
        } else {
          setWeek(null);
        }
      }
    }
  }, [index, goalsData, actionItemsData]);

  const ScrollBefore = () => {
    if (index <= goalsData.length - 1) {
      slidesRef.current.scrollToIndex({index: index - 1});
    }
  };

  const handleDeleteActionItem = async action => {
    const deleteActionItem = await actionItems.deleteActionItem(action.id);
  };

  console.log(actionItemsData);

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
                      disabled={
                        goalsData.length === 1 || index === 0 ? true : false
                      }
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditGoalItem', {
                            actionItems: [...actionItemsData]
                              .filter(
                                actionItemData => actionItemData.length > 0,
                              )
                              .filter(
                                actionItemData =>
                                  item.id === actionItemData[0].goalId,
                              ),
                            goal: item,
                            length: goalsData.length,
                          })
                        }>
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
                          {actionItemsData.length
                            ? `${
                                [...actionItemsData][index]
                                  // .filter(
                                  //   actionItemData => actionItemData.length > 0,
                                  // )
                                  .filter(
                                    actionItemData =>
                                      item.id === actionItemData.goalId &&
                                      actionItemData.status === 'done',
                                  ).length
                              }/${
                                [...actionItemsData][index]
                                  // .filter(
                                  //   actionItemData => actionItemData.length > 0,
                                  // )
                                  .filter(
                                    actionItemData =>
                                      item.id === actionItemData.goalId,
                                  ).length
                              }`
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
                          ? true
                          : false
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
      {
        actionItemsData !== undefined && goalsData.length !== 0 ? (
          <>
            <Text
              style={{
                position: 'absolute',
                top: 350,
                alignSelf: 'center',
                fontSize: 22,
                lineHeight: 28,
                fontWeight: '500',
                color: '#1F1C1B',
              }}>
              {weekNumber}
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: 375,
                alignSelf: 'center',
                fontSize: 11,
                lineHeight: 16,
                fontWeight: '500',
                color: '#797776',
              }}>
              {week
                ? `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
                : null}
            </Text>
            <ScrollView
              style={{
                position: 'absolute',
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height,
                // backgroundColor: 'white',
                // alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 16,
                top: 400,
              }}>
              {week !== null ? (
                week.map((item, i) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('EditActionItem', {
                        actionItem: item,
                        goal: goalsData[index],
                      })
                    }
                    style={{
                      alignSelf: 'center',
                      width: '90%',
                      height: 70,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      justifyContent: 'space-between',
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
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: item !== null ? '#8DC63F' : null,
                          backgroundColor:
                            item.status === 'done'
                              ? '#8DC63F'
                              : item.status === 'inProgress'
                              ? '#FB9623'
                              : 'white',
                          borderRadius: 10,
                          width: 40,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          name={item !== null ? 'flag' : 'info'}
                          size={26}
                          color={
                            item.status === 'toDo'
                              ? '#8DC63F'
                              : item.status === 'inProgress'
                              ? '#FB9623'
                              : 'white'
                          }
                        />
                      </View>
                      <View style={{marginLeft: 7, alignSelf: 'center'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            lineHeight: 20,
                            color: '#3C3939',
                            fontWeight: '500',
                          }}>
                          {item !== null
                            ? item.name
                            : 'Create weekly action item'}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            lineHeight: 16,
                            color: '#AAA9A8',
                            width: '80%',
                          }}>
                          {item !== null
                            ? null
                            : 'Create weekly action item to move towards reaching your goal'}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 25,
                        width: 25,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                          item.status === 'done'
                            ? '#8DC63F'
                            : item.status === 'inProgress'
                            ? '#FB9623'
                            : 'white',
                        borderRadius: 16,
                        marginRight: 12,
                      }}>
                      {item.status === 'done' ? (
                        <Icon name="check" color="white" size={20} />
                      ) : item.status === 'inProgress' ? (
                        <Icon
                          onPress={async () =>
                            await handleDeleteActionItem(item)
                          }
                          name="close"
                          color="white"
                          size={20}
                        />
                      ) : (
                        <Icon name="radio-button-unchecked" size={23} />
                      )}
                    </View>
                    {/* <Icon
                    style={{alignSelf: 'center'}}
                    name="radio-button-unchecked"
                    size={30}
                  /> */}
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddActionItem')}
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    height: 70,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    justifyContent: 'space-between',
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
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        borderWidth: 0.5,
                        borderColor: 'red',
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon name="info" size={26} color="red" />
                    </View>
                    <View style={{marginLeft: 7, alignSelf: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                          color: '#3C3939',
                          fontWeight: '500',
                        }}>
                        Create weekly action item
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 16,
                          color: '#AAA9A8',
                          width: '80%',
                        }}>
                        Create weekly action item to move towards reaching your
                        goal
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </>
        ) : null
        // (
        //   <View
        //     style={{
        //       position: 'absolute',
        //       width: Dimensions.get('screen').width * 0.85,
        //       height: Dimensions.get('screen').height * 0.22,
        //       alignItems: 'center',
        //       backgroundColor: 'white',
        //       alignSelf: 'center',
        //       borderRadius: 16,
        //       top: 400,
        //       shadowColor: '#000',
        //       shadowOffset: {
        //         width: 0,
        //         height: 1,
        //       },
        //       shadowOpacity: 0.22,
        //       shadowRadius: 2.22,
        //       elevation: 3,
        //     }}>
        //     <View
        //       style={{
        //         flex: 1,
        //         alignSelf: 'center',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         backgroundColor: 'white',
        //       }}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //         }}>
        //         <View>
        //           <View
        //             style={{
        //               alignSelf: 'center',
        //               justifyContent: 'flex-start',
        //               // marginTop: 10,
        //             }}>
        //             <Text
        //               style={{
        //                 textAlign: 'center',
        //                 lineHeight: 26,
        //                 fontSize: 20,
        //                 fontWeight: '400',
        //                 color: '#1D2E54',
        //               }}>
        //               No Action Items Yet
        //             </Text>
        //           </View>
        //           <View
        //             style={{
        //               flexDirection: 'row',
        //               justifyContent: 'space-between',
        //               marginTop: 20,
        //             }}>
        //             <View
        //               style={{
        //                 height: Dimensions.get('screen').height * 0.15,
        //                 width: Dimensions.get('screen').width * 0.55,
        //                 alignItems: 'center',
        //               }}>
        //               <PercentageCircle
        //                 radius={Dimensions.get('screen').height * 0.07}
        //                 percent={0}
        //                 borderWidth={5}
        //                 color="#859DD6"
        //                 bgcolor="#E1E7F5">
        //                 <Icon name="emoji-events" size={50} color="#E1E7F5" />
        //               </PercentageCircle>
        //             </View>
        //           </View>
        //         </View>
        //       </View>
        //     </View>
        //   </View>
        // )
      }
    </View>
  );
};

export default Home;
