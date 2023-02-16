import React from 'react';
import Home from '../pages/Home';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tracker from '../pages/Tracker';
import Group from '../pages/Group';
import Chat from '../pages/Chat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const PlusButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{top: -5, justifyContent: 'center', alignItems: 'center'}}
      onPress={onPress}>
      <View style={{width: 70, height: 70}}>{children}</View>
    </TouchableOpacity>
  );
};

const Blue = () => <View style={{flex: 1, backgroundColor: 'transparent'}} />;

const TabNav = () => {
  return (
    <Tab.Navigator
      mode="modal"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="home"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Challenge"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="military-tech"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Challenge
              </Text>
            </View>
          ),
        }}
        component={Tracker}
      />
      <Tab.Screen
        name="+"
        component={Blue}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/PlusButton.png')}
              style={{width: 65, height: 65}}
            />
          ),
          tabBarButton: props => <PlusButton {...props} />,
          tabBarShowLabel: false,
        }}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('Modal', {openModal: true});
          },
        })}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="group"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Group
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="chat"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Chat
              </Text>
            </View>
          ),
        }}
        component={Chat}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
