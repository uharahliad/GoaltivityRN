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
import {getIconColor} from '../../../helpers';
import {useSelector} from 'react-redux';

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
  const {length, actionItems} = route.params;
  const goal = useSelector(state => state.goals.selectedGoal);
  const [weeks, setWeeks] = useState(null);
  const [pressed, setPressed] = useState({details: true, items: false});
  const [startDate, setStartDate] = useState(new Date(goal.start_date));
  const [endDate, setEndDate] = useState(new Date(goal.end_date));
  const [dateOpen, setDateOpen] = useState(false);
  const [value, setValue] = useState(goal.category.id);
  const [criteria, setCriteria] = useState('');
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
          value: el.id,
        }));

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
    (async () => {
      try {
        const criteriaData = await successCriteria.getCriteriaItemsByGoalId(
          goal.id,
        );
        console.log('DD', criteriaData.data.rows.map);
        setCriteriaItems(criteriaData.data.rows.map(el => el.name));
      } catch (e) {
        console.log('Error fetching criterias: ', e);
      }
    })();
  }, [goal.id]);

  const onSubmit = async data => {
    try {
      await goals.updateGoal(goal.id, {
        data: {
          name: data.goalName,
          // status: `${slider}`,
          category: value,
          author: goal.author.id,
          award: data.award,
          reason: data.reason,
          start_date: startDate,
          end_date: endDate,
        },
        id: goal.id,
      });

      navigation.navigate('Home');
    } catch (e) {
      console.log(e.response);
      Alert.alert(e.message);
    }
  };
  const onSubmitEditing = () => {
    if (criteria) {
      setCriteriaItems(prevState => [...prevState, criteria]);
      setCriteria('');
    } else {
      Alert.alert('Cannot add emtpy value');
    }
  };
  const removeCriteria = data => {
    setCriteriaItems(prevState => prevState.filter(el => el !== data));
  };
  const handleDelete = async () => {
    try {
      await goals.deleteGoal(goal.id);
      // navigation.navigate('Home');
    } catch (e) {
      console.log('Error deleting goal', e.response);
    }
  };

  const handleDeleteActionItem = async action => {
    // const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    // const deleteActionItem = await actionItems.deleteActionItem(action.id);
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
                            placeholderTextColor={'#797776'}
                            underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                            activeUnderlineColor="#797776"
                            mode="flat"
                            onChangeText={text => props.field.onChange(text)}
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
                    Category
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
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingHorizontal: 10,
                    }}>
                    {!!criteriaItems &&
                      criteriaItems.map((item, i) => (
                        <View
                          key={i}
                          style={{
                            marginLeft: 10,
                            marginTop: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'lightgrey',
                            borderRadius: 5,
                            padding: 4,
                          }}>
                          <Text>{item}</Text>
                          <TouchableOpacity
                            onPress={() => removeCriteria(item)}>
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
                    textColor={'#1F1C1B'}
                    theme={'light'}
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
                    .map(week => ({
                      ...week,
                      actionItems: goal.actionItemsData.filter(
                        action => action.week === week.value,
                      ),
                    }))
                    .map(weeklyItem =>
                      weeklyItem.actionItems.length ? (
                        <View key={weeklyItem.value}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              style={{
                                padding: 10,
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
                          <View>
                            {weeklyItem.actionItems.map(item => (
                              // <View key={item.id}>
                              <TouchableOpacity
                                key={item.id}
                                onPress={() =>
                                  navigation.navigate('EditActionItem', {
                                    actionItem: item,
                                    goal,
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
                                  marginBottom: 8,
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
                                      borderColor:
                                        item.status.name !== 'In Progress'
                                          ? '#8DC63F'
                                          : '#FFFFFF',
                                      backgroundColor:
                                        item.status.name === 'Done'
                                          ? '#8DC63F'
                                          : item.status.name === 'In Progress'
                                          ? '#FB9623'
                                          : 'white',
                                      borderRadius: 10,
                                      width: 40,
                                      height: 40,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      name={item ? 'flag' : 'info'}
                                      size={26}
                                      color={getIconColor(item.status.name)}
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
                                      item.status.name === 'Done'
                                        ? '#8DC63F'
                                        : item.status.name === 'In Progress'
                                        ? '#FB9623'
                                        : 'white',
                                    borderRadius: 16,
                                    marginRight: 12,
                                  }}>
                                  {item.status.name === 'Done' ? (
                                    <Icon
                                      name="check"
                                      color="white"
                                      size={20}
                                    />
                                  ) : item.status.name === 'In Progress' ? (
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
                              // </View>
                            ))}
                          </View>
                        </View>
                      ) : null,
                    )}
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
