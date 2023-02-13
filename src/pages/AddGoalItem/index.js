import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import goals from '../../api/goals';
import goalCategories from '../../api/goalCategories';
import successCriteria from '../../api/successCriteria';
import {useDispatch, useSelector} from 'react-redux';
import {setSignIn} from '../../redux/reducers/signInSlice';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {current} from '@reduxjs/toolkit';
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
    placeholderColor: {
      color: '#1C1B1F',
    },
  });
}

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const AddGoalItem = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [criteria, setCriteria] = useState('');
  const [criteriaItems, setCriteriaItems] = useState([]);
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const {control, handleSubmit, formState, getValues} = useForm({
    defaultValues: {
      goalName: '',
      reason: '',
      award: '',
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
    if (startDate) {
      const copyDate = new Date(startDate.getTime());
      setEndDate(new Date(copyDate.setDate(copyDate.getDate() + 90)));
    }
  }, [startDate]);

  const onSubmit = async data => {
    try {
      console.log({
        author: user.id,
        name: data.goalName,
        category: value, //category id
        award: data.award,
        reason: data.reason,
        start_date: startDate,
        end_date: endDate,
      });

      const newGoal = await goals.createGoal({
        data: {
          author: user.id,
          name: data.goalName,
          category: value, //category id
          award: data.award,
          reason: data.reason,
          start_date: startDate,
          end_date: endDate,
        },
      });
      console.log('Created new goal', newGoal);
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error', e);
      Alert.alert(e.message);
    }
  };
  const onSubmitEditing = () => {
    if (criteria) {
      setCriteriaItems(current => [
        ...current,
        {successCriteria: criteria, value: criteria},
      ]);
      setCriteria('');
    } else {
      Alert.alert('Cannot add emtpy value');
    }
  };
  const handleClick = data => {
    setCriteriaItems(current =>
      current.filter(obj => {
        return obj.value !== data.value;
      }),
    );
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
              onPress={() => navigation.navigate('Home')}
              style={{position: 'absolute', top: 10, right: 10}}>
              <Icon name="close" size={23} />
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
              Create 12-Week Goal
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                top: 60,
              }}>
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
              <Pressable onPress={target => target.current?.focus()}>
                <View>
                  <Controller
                    control={control}
                    name="goalName"
                    rules={{required: true}}
                    render={props => (
                      <TextInput
                        {...props}
                        // label="Goal Name"
                        placeholder="Type Goal Name"
                        placeholderTextColor={styles.placeholderColor}
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
                          color: '#1F1C1B',
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
                      placeholderTextColor={styles.placeholderColor}
                      autoCapitalize="none"
                      autoCompleteType="firstName"
                      autoCorrect={false}
                      keyboardType="email-address"
                      // underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      // activeUnderlineColor="#797776"
                      // mode="outlined"
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
                        color: '#1F1C1B',
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
                <SizedBox height={20} />
                <Pressable onPress={target => target.current?.focus()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
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
                      placeholderTextColor={styles.placeholderColor}
                      autoCapitalize="none"
                      autoCompleteType="secondName"
                      autoCorrect={false}
                      keyboardType="numeric"
                      // underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      // activeUnderlineColor="#797776"
                      mode="flat"
                      textContentType="username"
                      style={{
                        fontSize: 16,
                        lineHeight: 24,
                        marginLeft: 10,
                        // backgroundColor:
                        //   '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                        // borderColor: '#1D2E54',
                        // borderRadius: 4,
                        width: 120,
                        color: '#1F1C1B',
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
                onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
                style={{
                  backgroundColor:
                    '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                  borderColor: '#1D2E54',
                  borderRadius: 4,
                  width: '90%',
                  alignSelf: 'center',
                }}>
                {items &&
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

              {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                mode="BADGE"
                max={1}
              /> */}
              {/* <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="category"
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={props => (
                    <TextInput
                      {...props}
                      label="Category"
                      placeholder="Select Category"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      onChangeText={text => props.field.onChange(text)}
                      textContentType="username"
                      style={{
                        backgroundColor:
                          '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                        borderColor: '#1D2E54',
                        borderRadius: 8,
                      }}
                    />
                  )}
                />
              </View>
            </Pressable> */}
              <Pressable onPress={target => target.current?.focus()}>
                <View>
                  <Controller
                    control={control}
                    rules={{required: true}}
                    name="reason"
                    render={props => (
                      <TextInput
                        {...props}
                        // label="I must complete this goal..."
                        placeholder="I must complete this goal..."
                        placeholderTextColor={styles.placeholderColor}
                        autoCapitalize="none"
                        // autoCompleteType="password"
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
                          color: '#1F1C1B',
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
                    placeholderTextColor={styles.placeholderColor}
                    autoCapitalize="none"
                    // autoCompleteType="password"
                    autoCorrect={false}
                    onChangeText={text => setCriteria(text)}
                    underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                    activeUnderlineColor="#797776"
                    mode="flat"
                    value={criteria}
                    onSubmitEditing={() => onSubmitEditing()}
                    textContentType="password"
                    style={{
                      backgroundColor:
                        '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                      borderColor: '#1D2E54',
                      borderRadius: 4,
                      width: '90%',
                      alignSelf: 'center',
                      padding: 10,
                      color: '#1F1C1B',
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
                      <TouchableOpacity onPress={() => handleClick(item)}>
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
                        // label="Award for completing this goal"
                        placeholder="I will go on the vacation..."
                        placeholderTextColor={styles.placeholderColor}
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
                          color: '#1F1C1B',
                        }}
                      />
                    )}
                  />
                </View>
              </Pressable>
              <SizedBox height={20} />

              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Create</Text>
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
              <SizedBox height={100} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default AddGoalItem;
