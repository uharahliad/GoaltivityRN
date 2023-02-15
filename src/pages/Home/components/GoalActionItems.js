import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import actionItems from '../../../api/actionItems';
import {useNavigation} from '@react-navigation/native';

const GoalActionItems = ({goal}) => {
  const [week, setWeek] = useState(null);
  const [weekNumber, setWeekNumber] = useState('');
  const [weekStart, setWeekStart] = useState('');
  const [weekEnd, setWeekEnd] = useState('');

  const navigation = useNavigation();

  const handleDeleteActionItem = async action => {
    const deleteActionItem = await actionItems.deleteActionItem(action.id);
    console.log('Item deleted', deleteActionItem);
  };

  useEffect(() => {
    const startDate = new Date(goal.start_date);
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
    if (goal.actionItemsData) {
      const currentWeekActionItems = goal.actionItemsData.filter(
        item =>
          item.week === `Week ${currentWeek < 0 ? 1 : Math.ceil(currentWeek)}`,
      );
      if (currentWeekActionItems.length) {
        setWeek(currentWeekActionItems);
      } else {
        setWeek(null);
      }
    }
  }, [goal]);

  return (
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
                    borderColor: item ? '#8DC63F' : null,
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
                    color={
                      item.status.name === 'To Do'
                        ? '#8DC63F'
                        : item.status.name === 'In Progress'
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
                    {item ? item.name : 'Create weekly action item'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 16,
                      color: '#AAA9A8',
                      width: '80%',
                    }}>
                    {item
                      ? item.status.name.toUpperCase()
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
                    onPress={async () => await handleDeleteActionItem(item)}
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
                  Create weekly action item to move towards reaching your goal
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

export default GoalActionItems;
