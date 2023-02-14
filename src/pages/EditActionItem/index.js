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
} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import actionItems from '../../api/actionItems';
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

// const weeks = [
//   'Week 1',
//   'Week 2',
//   'Week 3',
//   'Week 4',
//   'Week 5',
//   'Week 6',
//   'Week 7',
//   'Week 8',
//   'Week 9',
//   'Week 10',
//   'Week 11',
//   'Week 12',
// ];

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const EditActionItem = ({navigation, route}) => {
  const {actionItem, goal} = route.params;
  const [openStatus, setOpenStatus] = useState(false);
  const showModal = () => setOpenStatus(true);
  const hideModal = () => {
    setOpenStatus(false);
    navigation.navigate('Home');
  };
  const [statusValue, setStatusValue] = useState(actionItem.status.id);
  const [statuses, setStatuses] = useState([]);
  const [goalsValue, setGoalsValue] = useState(goal.id);
  const [weekValue, setWeekValue] = useState(actionItem.week);
  const [weeks, setWeeks] = useState([
    {
      label: 'Week 1',
      value: 'Week 1',
    },
    {
      label: 'Week 2',
      value: 'Week 2',
    },
    {
      label: 'Week 3',
      value: 'Week 3',
    },
    {
      label: 'Week 4',
      value: 'Week 4',
    },
    {
      label: 'Week 5',
      value: 'Week 5',
    },
    {
      label: 'Week 6',
      value: 'Week 6',
    },
    {
      label: 'Week 7',
      value: 'Week 7',
    },
    {
      label: 'Week 8',
      value: 'Week 8',
    },
    {
      label: 'Week 9',
      value: 'Week 9',
    },
    {
      label: 'Week 10',
      value: 'Week 10',
    },
    {
      label: 'Week 11',
      value: 'Week 11',
    },
    {
      label: 'Week 12',
      value: 'Week 12',
    },
  ]);

  const goalsData = useSelector(state => state.goals.goalsData);
  const [goalsSelect, setGoalsSelect] = useState([]);

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      actionItem: actionItem.name,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await actionItems.getStatuses();
        const statusData = res.data.rows.map(el => ({
          label: el.name,
          value: el.id,
        }));

        setStatuses(statusData);
      } catch (e) {
        console.log('Error fetch status: ', e);
      }
    })();
  }, []);

  useEffect(() => {
    if (goalsData) {
      const goalsSelectData = goalsData.map(item => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setGoalsSelect(goalsSelectData);
    }
  }, [goalsData]);

  useEffect(() => {
    reset({actionItem: actionItem.name});
  }, [reset, actionItem]);

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
        label: `Week 1: ${weeksTimes[0].start} - ${weeksTimes[0].end}`,
        value: 'Week 1',
      },
      {
        label: `Week 2: ${weeksTimes[1].start} - ${weeksTimes[1].end}`,
        value: 'Week 2',
      },
      {
        label: `Week 3: ${weeksTimes[2].start} - ${weeksTimes[2].end}`,
        value: 'Week 3',
      },
      {
        label: `Week 4: ${weeksTimes[3].start} - ${weeksTimes[3].end}`,
        value: 'Week 4',
      },
      {
        label: `Week 5: ${weeksTimes[4].start} - ${weeksTimes[4].end}`,
        value: 'Week 5',
      },
      {
        label: `Week 6: ${weeksTimes[5].start} - ${weeksTimes[5].end}`,
        value: 'Week 6',
      },
      {
        label: `Week 7: ${weeksTimes[6].start} - ${weeksTimes[6].end}`,
        value: 'Week 7',
      },
      {
        label: `Week 8: ${weeksTimes[7].start} - ${weeksTimes[7].end}`,
        value: 'Week 8',
      },
      {
        label: `Week 9: ${weeksTimes[8].start} - ${weeksTimes[8].end}`,
        value: 'Week 9',
      },
      {
        label: `Week 10: ${weeksTimes[9].start} - ${weeksTimes[9].end}`,
        value: 'Week 10',
      },
      {
        label: `Week 11: ${weeksTimes[10].start} - ${weeksTimes[10].end}`,
        value: 'Week 11',
      },
      {
        label: `Week 12: ${weeksTimes[11].start} - ${weeksTimes[11].end}`,
        value: 'Week 12',
      },
    ]);
  }, [goal]);

  const onSubmit = async data => {
    try {
      await actionItems.updateActionItem(
        {
          goal: goalsValue,
          name: data.actionItem,
          week: weekValue,
          status: statusValue,
        },
        actionItem.id,
      );

      if (statuses.find(el => el.value === statusValue).label === 'Done') {
        showModal();
      } else {
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }
  };

  const handleDelete = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deleteActionItem = await actionItems.deleteActionItem(actionItem.id);
    navigation.navigate('Home');
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
              Edit Weekly Action Item
            </Text>
            <SizedBox height={20} />
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                top: 50,
              }}>
              <SizedBox height={30} />
              <Text
                style={{
                  marginLeft: 23,
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#1F1C1B',
                  fontWeight: '400',
                  marginBottom: 10,
                }}>
                Weekly Action Item
              </Text>
              <Pressable onPress={target => target.current?.focus()}>
                <View>
                  <Controller
                    control={control}
                    name="actionItem"
                    rules={{required: true}}
                    render={props => (
                      <TextInput
                        {...props}
                        value={props.field.value}
                        // label="Action Item"
                        placeholder="Type Item Name"
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
              <SizedBox height={30} />
              <Text
                style={{
                  marginLeft: 23,
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#1F1C1B',
                  fontWeight: '400',
                  marginBottom: 10,
                }}>
                12-Week goal
              </Text>
              {goalsValue && goalsSelect.length ? (
                <Picker
                  selectedValue={goalsValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setGoalsValue(itemValue)
                  }
                  style={{
                    backgroundColor:
                      '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                    borderColor: '#1D2E54',
                    borderRadius: 4,
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  {goalsSelect.length &&
                    goalsSelect.map((item, i) => (
                      <Picker.Item
                        color="#797776"
                        key={i}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                </Picker>
              ) : null}
              <SizedBox height={30} />
              <Text
                style={{
                  marginLeft: 23,
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#1F1C1B',
                  fontWeight: '400',
                  marginBottom: 10,
                }}>
                Week
              </Text>
              {weekValue && weeks.length ? (
                <Picker
                  selectedValue={weekValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setWeekValue(itemValue)
                  }
                  style={{
                    backgroundColor:
                      '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                    borderColor: '#1D2E54',
                    borderRadius: 4,
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  {weeks.length &&
                    weeks.map((item, i) => (
                      <Picker.Item
                        color="#797776"
                        key={i}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                </Picker>
              ) : null}
              <SizedBox height={30} />
              <Text
                style={{
                  marginLeft: 23,
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#1F1C1B',
                  fontWeight: '400',
                  marginBottom: 10,
                }}>
                Set Status
              </Text>
              {statusValue && statuses.length ? (
                <Picker
                  selectedValue={statusValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setStatusValue(itemValue)
                  }
                  style={{
                    backgroundColor:
                      '0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF',
                    borderColor: '#1D2E54',
                    borderRadius: 4,
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  {statuses.length &&
                    statuses.map((item, i) => (
                      <Picker.Item
                        color="#797776"
                        key={i}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                </Picker>
              ) : null}
              <SizedBox height={40} />
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Edit</Text>
                </View>
              </TouchableOpacity>
              <SizedBox height={100} />
              <Portal>
                <Modal
                  visible={openStatus}
                  onDismiss={hideModal}
                  contentContainerStyle={{
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    height: '45%',
                    width: '80%',
                    padding: 20,
                    borderRadius: 16,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#8DC63F',
                      borderRadius: 16,
                      marginRight: 12,
                    }}>
                    <Icon name="check" color="white" size={20} />
                  </View>
                  <SizedBox height={20} />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      lineHeight: 32,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    Well Done!
                  </Text>
                  <SizedBox height={40} />
                  <Text style={{color: 'black', fontSize: 14, lineHeight: 20}}>
                    You’ve completed weekly action item. This brings you a step
                    closer to achieveing your 12-Week goal. Create another
                    weekly action item and continue working on your goal.
                  </Text>
                </Modal>
              </Portal>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default EditActionItem;
