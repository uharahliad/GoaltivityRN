import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Controller, useForm} from 'react-hook-form';
import goals from '../../api/goals';
import goalCategories from '../../api/goalCategories';
import successCriteria from '../../api/successCriteria';
import EncryptedStorage from 'react-native-encrypted-storage';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      alignSelf: 'center',
      width: '90%',
      backgroundColor: '#1D2E54',
      borderRadius: 100,
      height: 48,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      // paddingHorizontal: 16,
      // paddingVertical: 32,
      backgroundColor: '#F0F3FA',
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
    },
    form: {
      alignItems: 'center',
      //   backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },
    root: {
      backgroundColor: 'white',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#1D2E54',
      flex: 1,
    },
    title: {
      color: '#1D2E54',
      fontSize: 32,
      //   fontWeight: '700',
      lineHeight: 44,
    },
  });
}

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const EditGoalItem = ({navigation, route}) => {
  const {goal, length, actionItems} = route.params;
  const [weeks, setWeeks] = useState(null);
  const [pressed, setPressed] = useState({details: true, items: false});
  const [startDate, setStartDate] = useState(new Date(goal.start_date));
  const [endDate, setEndDate] = useState(new Date(goal.end_date));
  const [dateOpen, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([goal.category.name] || []);
  const [criteria, setCriteria] = useState('');
  const [dataCriteria, setDataCriteria] = useState(null);
  const [criteriaItems, setCriteriaItems] = useState([]);
  const [slider, setSlider] = useState(Number(goal.status));
  const [items, setItems] = useState([]);

  const {control, handleSubmit, formState, getValues, reset} = useForm({
    defaultValues: {
      goalName: goal.name,
      reason: goal.reason,
      award: goal.award,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await goalCategories.getGoalCategories();
        const data = res.data.rows.map(el => ({
          label: el.name,
          value: el.name,
        }));
        console.log(111, data);
        setItems(data);
      } catch (error) {
        console.log('Error goals: ', error);
      }
    })();
  }, []);

  useEffect(() => {
    reset({goalName: goal.name, reason: goal.reason, award: goal.award});
  }, [reset, goal.name, goal.reason, goal.award]);

  useEffect(() => {
    if (startDate) {
      const copyDate = new Date(startDate.getTime());
      setEndDate(new Date(copyDate.setDate(copyDate.getDate() + 90)));
    }
  }, [startDate]);

  useEffect(() => {
    const startDate = new Date(goal.start_date);
    const daysToStartDateSunday = 7 - (startDate.getDay() + 1);
    const oneDay = 86400000;
    const startDateSunday = new Date(
      startDate.getTime() + daysToStartDateSunday * oneDay,
    );
    const weeksTimes = [];
    for (let i = 0; i < 12; i++) {
      const startWeekDate = new Date(
        startDateSunday.getTime() + i * oneDay * 7,
      );
      const endWeekDate = new Date(startWeekDate.getTime() + oneDay * 6);
      weeksTimes.push({
        start: startWeekDate.toLocaleDateString(),
        end: endWeekDate.toLocaleDateString(),
      });
    }
    setWeeks([
      {
        label: `${weeksTimes[0].start} - ${weeksTimes[0].end}`,
        value: 'Week 1',
      },
      {
        label: `${weeksTimes[1].start} - ${weeksTimes[1].end}`,
        value: 'Week 2',
      },
      {
        label: `${weeksTimes[2].start} - ${weeksTimes[2].end}`,
        value: 'Week 3',
      },
      {
        label: `${weeksTimes[3].start} - ${weeksTimes[3].end}`,
        value: 'Week 4',
      },
      {
        label: `${weeksTimes[4].start} - ${weeksTimes[4].end}`,
        value: 'Week 5',
      },
      {
        label: `${weeksTimes[5].start} - ${weeksTimes[5].end}`,
        value: 'Week 6',
      },
      {
        label: `${weeksTimes[6].start} - ${weeksTimes[6].end}`,
        value: 'Week 7',
      },
      {
        label: `${weeksTimes[7].start} - ${weeksTimes[7].end}`,
        value: 'Week 8',
      },
      {
        label: `${weeksTimes[8].start} - ${weeksTimes[8].end}`,
        value: 'Week 9',
      },
      {
        label: `${weeksTimes[9].start} - ${weeksTimes[9].end}`,
        value: 'Week 10',
      },
      {
        label: `${weeksTimes[10].start} - ${weeksTimes[10].end}`,
        value: 'Week 11',
      },
      {
        label: `${weeksTimes[11].start} - ${weeksTimes[11].end}`,
        value: 'Week 12',
      },
    ]);
  }, [goal]);

  useEffect(() => {
    const getCriteria = async () => {
      const token = await EncryptedStorage.getItem('token');
      const criteriaData = await successCriteria.getSuccessCriteriaItemByGoalId(
        token,
        goal.id,
      );
      setDataCriteria(criteriaData.data);
      setCriteriaItems(
        criteriaData.data.map(item => {
          return {successCriteria: item.name, value: item.name};
        }),
      );
    };
    getCriteria();
  }, []);

  const onSubmit = async data => {
    const currentUser = JSON.parse(await EncryptedStorage.getItem('user'));
    try {
      const updateGoal = await goals.updateGoal(
        {
          data: {
            name: data.goalName,
            status: `${slider}`,
            goalCategory: {name: value[0]},
            author: currentUser.email,
            award: data.award,
            reason: data.reason,
            startDate,
            endDate,
          },
        },
        currentUser.token,
        goal.id,
      );
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }
  };
  const onSubmitEditing = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    if (criteria) {
      const newSuccessCriteria =
        await successCriteria.createSuccessCriteriaItem(
          {criteria, goal: goal.id},
          userData.token,
        );
      setCriteriaItems(current => [
        ...current,
        {successCriteria: criteria, value: criteria},
      ]);
      setCriteria('');
    } else {
      Alert.alert('Cannot add emtpy value');
    }
  };
  const handleClick = async data => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deletedItem = [...dataCriteria].filter(
      item => item.name === data.value,
    );
    const deleteSuccessCriteria = await successCriteria.deleteSuccessCriteria(
      userData.token,
      deletedItem[0].id,
    );
    setCriteriaItems(current =>
      current.filter(obj => {
        return obj.value !== data.value;
      }),
    );
  };
  const handleDelete = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deleteGoal = await goals.deleteGoal(userData.token, goal.id);
    navigation.navigate('Home');
  };

  const handleDeleteActionItem = async action => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deleteActionItem = await actionItems.deleteActionItem(action.id);
  };
  const styles = useStyles();

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <ScrollView>
            <TouchableOpacity
              disabled={length === 1}
              onPress={handleDelete}
              style={{position: 'absolute', top: 10, right: 10}}>
              <Icon name="delete" size={20} />
            </TouchableOpacity>
            <Text
              style={{
                top: 40,
                left: 10,
                fontSize: 24,
                lineHeight: 32,
                fontWeight: '400',
                color: '#1D2E54',
              }}>
              Edit 12-Week Goal
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                top: 60,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Slider
                  value={0} //slider value
                  step={10}
                  onValueChange={setSlider}
                  style={{width: '90%', height: 40}}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#3E64B6"
                  maximumTrackTintColor="#E1E7F5"
                  thumbTintColor="#3E64B6"
                />
                <Text>{slider}%</Text>
              </View>
              <SizedBox height={10} />
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    width: '45%',
                    height: 30,
                    borderBottomColor: 'black',
                    borderBottomWidth: pressed.details ? 3 : 1,
                  }}
                  onPress={() => setPressed({details: true, items: false})}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: pressed.details ? '#1D2E54' : '#797776',
                    }}>
                    Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '45%',
                    height: 30,
                    borderBottomColor: 'black',
                    borderBottomWidth: pressed.items ? 3 : 1,
                    // borderWidth: 1,
                    // borderColor: 'black',
                  }}
                  onPress={() => setPressed({details: false, items: true})}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: pressed.items ? '#1D2E54' : '#797776',
                    }}>
                    Weekly Action Items
                  </Text>
                </TouchableOpacity>
              </View>
              <SizedBox height={20} />
              {pressed.details ? (
                <>
                  <Text
                    style={{
                      marginLeft: 23,
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#1F1C1B',
                      fontWeight: '400',
                      marginBottom: 8,
                    }}>
                    Goal Name
                  </Text>
                  <Pressable onPress={target => target.current?.focus()}>
                    <View>
                      <Controller
                        control={control}
                        name="goalName"
                        rules={{required: true}}
                        render={props => (
                          <TextInput
                            {...props}
                            value={props.field.value}
                            // label="Goal Name"
                            placeholder="Goal Name"
                            placeholderTextColor="#797776"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            autoCorrect={false}
                            keyboardType="email-address"
                            underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                            activeUnderlineColor="#797776"
                            mode="flat"
                            onChangeText={text => props.field.onChange(text)}
                            textContentType="username"
                            style={{
                              backgroundColor:
                                '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                              borderColor: '#1D2E54',
                              borderRadius: 4,
                              width: '90%',
                              alignSelf: 'center',
                              padding: 10,
                            }}
                          />
                        )}
                      />
                    </View>
                  </Pressable>
                  <SizedBox height={20} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Pressable onPress={target => target.current?.focus()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'space-around',
                          alignItems: 'center',
                          backgroundColor:
                            '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                          borderRadius: 4,
                          marginLeft: 13,
                        }}>
                        <TextInput
                          value={startDate.toLocaleDateString()}
                          editable={false}
                          // label="Start Date"
                          placeholder="Add Start Date"
                          placeholderTextColor="#1D2E54"
                          autoCapitalize="none"
                          autoCompleteType="firstName"
                          autoCorrect={false}
                          keyboardType="email-address"
                          // underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                          // activeUnderlineColor="#1D2E54"
                          // mode="flat"
                          onChange={e => setStartDate(e.target.value)}
                          textContentType="date"
                          style={{
                            fontSize: 16,
                            lineHeight: 24,
                            marginLeft: 10,
                            // backgroundColor:
                            //   '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                            // borderColor: '#1D2E54',
                            width: 120,
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => setDateOpen(true)}
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginRight: 10,
                          }}>
                          <Icon name="date-range" size={30} />
                        </TouchableOpacity>
                      </View>
                    </Pressable>
                    <Pressable onPress={target => target.current?.focus()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'space-around',
                          alignItems: 'center',
                          backgroundColor:
                            '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                          borderRadius: 4,
                          marginRight: 13,
                        }}>
                        <TextInput
                          value={
                            endDate !== null ? endDate.toLocaleDateString() : ''
                          }
                          editable={false}
                          // label="End Date"
                          placeholder="Add End Date"
                          placeholderTextColor="#1D2E54"
                          autoCapitalize="none"
                          autoCompleteType="secondName"
                          autoCorrect={false}
                          keyboardType="numeric"
                          // underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                          // activeUnderlineColor="#1D2E54"
                          // mode="flat"
                          textContentType="username"
                          style={{
                            fontSize: 16,
                            lineHeight: 24,
                            marginLeft: 10,
                            // backgroundColor:
                            //   '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                            // borderColor: '#1D2E54',
                            width: 120,
                          }}
                        />
                        <TouchableOpacity
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginRight: 10,
                          }}>
                          <Icon name="date-range" size={30} />
                        </TouchableOpacity>
                      </View>
                    </Pressable>
                  </View>
                  <SizedBox height={20} />
                  <Text
                    style={{
                      marginLeft: 23,
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#1F1C1B',
                      fontWeight: '400',
                      marginBottom: 8,
                    }}>
                    Goal Name
                  </Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) =>
                      setValue(itemValue)
                    }
                    style={{
                      backgroundColor:
                        '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                      borderColor: '#1D2E54',
                      borderRadius: 4,
                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    {items.length > 0 &&
                      items.map((item, i) => (
                        <Picker.Item
                          color="#797776"
                          key={i}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                  </Picker>
                  <SizedBox height={20} />
                  <Text
                    style={{
                      marginLeft: 23,
                      marginBottom: 8,
                      fontSize: 22,
                      lineHeight: 28,
                      fontWeight: '500',
                      color: '#3C3939',
                    }}>
                    Why must I complete this goal?
                  </Text>
                  <Pressable onPress={target => target.current?.focus()}>
                    <View>
                      <Controller
                        control={control}
                        rules={{required: true}}
                        name="reason"
                        render={props => (
                          <TextInput
                            {...props}
                            value={props.field.value}
                            // label="I must complete this goal..."
                            placeholder="I must complete this goal..."
                            placeholderTextColor="#797776"
                            autoCapitalize="none"
                            autoCompleteType="password"
                            autoCorrect={false}
                            onChangeText={text => props.field.onChange(text)}
                            underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                            activeUnderlineColor="#797776"
                            mode="flat"
                            textContentType="password"
                            style={{
                              backgroundColor:
                                '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                              borderColor: '#1D2E54',
                              borderRadius: 4,
                              width: '90%',
                              alignSelf: 'center',
                              padding: 10,
                            }}
                          />
                        )}
                      />
                    </View>
                  </Pressable>

                  <SizedBox height={20} />
                  <Text
                    style={{
                      marginLeft: 23,
                      marginBottom: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#1F1C1B',
                      fontWeight: '400',
                    }}>
                    {'Success Criteria(optional)'}
                  </Text>
                  <Pressable onPress={target => target.current?.focus()}>
                    <View>
                      <TextInput
                        // label="Success Criteria"
                        placeholder="Set Success Criteria"
                        placeholderTextColor="#797776"
                        autoCapitalize="none"
                        autoCompleteType="password"
                        autoCorrect={false}
                        onChangeText={text => setCriteria(text)}
                        underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                        activeUnderlineColor="#797776"
                        mode="flat"
                        value={criteria}
                        onSubmitEditing={async () => await onSubmitEditing()}
                        textContentType="password"
                        style={{
                          backgroundColor:
                            '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                          borderColor: '#1D2E54',
                          borderRadius: 4,
                          width: '90%',
                          alignSelf: 'center',
                          padding: 10,
                        }}
                      />
                    </View>
                  </Pressable>
                  <SizedBox height={5} />
                  <View style={{flexDirection: 'row'}}>
                    {!!criteriaItems &&
                      criteriaItems.map((item, i) => (
                        <View
                          key={i}
                          style={{
                            marginLeft: 10,
                            flexDirection: 'row',
                            backgroundColor: 'lightgrey',
                            borderRadius: 5,
                            alignItems: 'center',
                          }}>
                          <Text>{item.value}</Text>
                          <TouchableOpacity
                            onPress={async () => await handleClick(item)}>
                            <Icon name="close" size={23} />
                          </TouchableOpacity>
                        </View>
                      ))}
                  </View>
                  <SizedBox height={20} />
                  <Text
                    style={{
                      marginLeft: 23,
                      marginBottom: 8,
                      fontSize: 22,
                      lineHeight: 28,
                      fontWeight: '500',
                      color: '#1F1C1B',
                    }}>
                    Award for completing this goal
                  </Text>
                  <Pressable onPress={target => target.current?.focus()}>
                    <View>
                      <Controller
                        control={control}
                        rules={{required: true}}
                        name="award"
                        render={props => (
                          <TextInput
                            {...props}
                            value={props.field.value}
                            // label="Award for completing this goal"
                            placeholder="I will go on the vacation..."
                            placeholderTextColor="#797776"
                            autoCapitalize="none"
                            autoCompleteType="password"
                            autoCorrect={false}
                            onChangeText={text => props.field.onChange(text)}
                            underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                            activeUnderlineColor="#797776"
                            mode="flat"
                            textContentType="password"
                            style={{
                              backgroundColor:
                                '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                              borderColor: '#1D2E54',
                              borderRadius: 4,
                              width: '90%',
                              alignSelf: 'center',
                              padding: 10,
                            }}
                          />
                        )}
                      />
                    </View>
                  </Pressable>
                  <SizedBox height={40} />

                  <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <View style={styles.button}>
                      <Text style={styles.buttonTitle}>Edit</Text>
                    </View>
                  </TouchableOpacity>
                  <DatePicker
                    mode="date"
                    modal
                    open={dateOpen}
                    date={startDate}
                    onDateChange={setStartDate}
                    onConfirm={date => {
                      setDateOpen(false);
                      setStartDate(date);
                    }}
                    onCancel={() => {
                      setDateOpen(false);
                    }}
                  />
                  <SizedBox height={80} />
                </>
              ) : (
                <ScrollView style={{height: Dimensions.get('screen').height}}>
                  {weeks
                    .filter(week => {
                      return actionItems.find(item => {
                        if (item.length) {
                          return item.find(inner => inner.week === week.value);
                        }
                      });
                    })
                    .map(weeklyItem => (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              padding: 10,
                              marginLeft: 10,
                              fontWeight: '500',
                              fontSize: 16,
                              lineHeight: 24,
                              color: '#1F1C1B',
                            }}>
                            {weeklyItem.value}
                          </Text>
                          <Text
                            style={{
                              alignSelf: 'center',
                              padding: 10,
                              marginLeft: 10,
                              fontWeight: '500',
                              fontSize: 11,
                              lineHeight: 16,
                              color: '#797776',
                            }}>
                            {weeklyItem.label}
                          </Text>
                        </View>
                        {actionItems
                          .filter(item => item.length)
                          .filter(
                            (actionItemData, i) => {
                              return actionItemData
                                .filter(item => goal.id === item.goalId)
                                .filter(item => {
                                  return weeklyItem.value === item.week;
                                });
                            },
                            // goal.id === actionItemData[i].goalId &&
                            // actionItemData[i].week === weeklyItem.value,
                          )[0]
                          .filter(item => weeklyItem.value === item.week)
                          .map((item, i) => (
                            <View key={item.id}>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('EditActionItem', {
                                    actionItem: item,
                                    goal: goal,
                                  })
                                }
                                style={{
                                  height: 50,
                                  width: '90%',
                                  // alignItems: 'center',
                                  alignSelf: 'center',
                                  borderWidth: 1,
                                  borderColor: 'grey',
                                  borderRadius: 12,
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <View
                                    style={{
                                      height: 25,
                                      width: 25,
                                      alignSelf: 'center',
                                      alignItems: 'center',
                                      borderColor:
                                        item.status === 'toDo'
                                          ? '#8DC63F'
                                          : null,
                                      borderWidth:
                                        item.status === 'toDo' ? 1 : 0,
                                      backgroundColor:
                                        item.status === 'done'
                                          ? '#8DC63F'
                                          : item.status === 'inProgress'
                                          ? '#FB9623'
                                          : 'white',
                                      borderRadius: 8,
                                      marginLeft: 12,
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      name="flag"
                                      color={
                                        item.status === 'toDo'
                                          ? '#8DC63F'
                                          : item.status === 'inProgress'
                                          ? '#FB9623'
                                          : 'white'
                                      }
                                      size={16}
                                    />
                                  </View>
                                  <Text
                                    style={{
                                      alignSelf: 'center',
                                      marginLeft: 8,
                                      color: '#3C3939',
                                    }}>
                                    {item.name}
                                  </Text>
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
                                    <Icon
                                      name="check"
                                      color="white"
                                      size={20}
                                    />
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
                                    <Icon
                                      name="radio-button-unchecked"
                                      size={23}
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                            </View>
                          ))}
                      </>
                    ))}
                  {/* {actionItems
                      .filter(item => item.length)
                      .filter(
                        actionItemData => goal.id === actionItemData[0].goalId,
                      )
                      .map(item => (
                        <View key={item[0].id}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                padding: 10,
                                marginLeft: 10,
                                fontWeight: '500',
                                fontSize: 16,
                                lineHeight: 24,
                                color: '#1F1C1B',
                              }}>
                              {item[0].week}
                            </Text>
                            <Text
                              style={{
                                alignSelf: 'center',
                                padding: 10,
                                marginLeft: 10,
                                fontWeight: '500',
                                fontSize: 11,
                                lineHeight: 16,
                                color: '#797776',
                              }}>
                              {
                                weeks.find(
                                  weekItem => weekItem.value === item[0].week,
                                ).label
                              }
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('EditActionItem', {
                                actionItem: item[0],
                                goal: goal,
                              })
                            }
                            style={{
                              height: 65,
                              width: '90%',
                              // alignItems: 'center',
                              alignSelf: 'center',
                              borderWidth: 1,
                              borderColor: 'grey',
                              borderRadius: 12,
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  height: 25,
                                  width: 25,
                                  alignSelf: 'center',
                                  alignItems: 'center',
                                  borderColor:
                                    item[0].status === 'toDo'
                                      ? '#8DC63F'
                                      : null,
                                  borderWidth:
                                    item[0].status === 'toDo' ? 1 : 0,
                                  backgroundColor:
                                    item[0].status === 'Done'
                                      ? '#8DC63F'
                                      : item[0].status === 'inProgress'
                                      ? '#FB9623'
                                      : 'white',
                                  borderRadius: 8,
                                  marginLeft: 12,
                                  justifyContent: 'center',
                                }}>
                                <Icon
                                  name="flag"
                                  color={
                                    item[0].status === 'toDo'
                                      ? '#8DC63F'
                                      : item[0].status === 'inProgress'
                                      ? 'white'
                                      : '#FB9623'
                                  }
                                  size={16}
                                />
                              </View>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  marginLeft: 8,
                                  color: '#3C3939',
                                }}>
                                {item[0].name}
                              </Text>
                            </View>
                            <View
                              style={{
                                height: 25,
                                width: 25,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  item[0].status === 'Done'
                                    ? '#8DC63F'
                                    : item[0].status === 'inProgress'
                                    ? '#FB9623'
                                    : 'white',
                                borderRadius: 16,
                                marginRight: 12,
                              }}>
                              {item[0].status === 'Done' ? (
                                <Icon name="check" color="white" size={20} />
                              ) : item[0].status === 'inProgress' ? (
                                <Icon
                                  onPress={async () =>
                                    await handleDeleteActionItem(item[0])
                                  }
                                  name="close"
                                  color="white"
                                  size={20}
                                />
                              ) : (
                                <Icon name="radio-button-unchecked" size={20} />
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))} */}
                </ScrollView>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default EditGoalItem;
