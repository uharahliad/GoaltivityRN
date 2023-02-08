/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Alert,
  Linking,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from './src/pages/Chat';
import ChatRoom from './src/pages/ChatRoom';
import Group from './src/pages/Group';
import GroupItem from './src/pages/GroupItem';
import Home from './src/pages/Home';
import SignIn from './src/pages/SignIn';
import Tracker from './src/pages/Tracker';
import AddGoalItem from './src/pages/AddGoalItem';
import Welcome from './src/pages/Welcome';
import SignUp from './src/pages/SignUp';
import ForgotPassword from './src/pages/ForgotPassword';
import Survey from './src/pages/Survey';
import AddModal from './src/components/modals/AddModal';
import AddActionItem from './src/pages/AddActionItem';
import EditActionItem from './src/pages/EditActionItem';
import EditGoalItem from './src/pages/EditGoal';
import MemberProfile from './src/pages/MemberProfile';
import UserProfile from './src/pages/UserProfile';
import EditProfile from './src/pages/EditProfile';
import ChangePassword from './src/pages/ChangePassword';
import EmailVerification from './src/pages/EmailVerification';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setSignIn} from './src/redux/reducers/signInSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from './src/api/auth';
import {Appbar, Menu, Dialog, Portal, Provider} from 'react-native-paper';
import users from './src/api/users';

import goals from './src/api/goals';

const Stack = createNativeStackNavigator();
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

function CustomNavigationBar({navigation}) {
  const route = useRoute();
  const [visible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const dispatch = useDispatch();

  const showDialog = () => setDeleteVisible(true);
  const hideDialog = () => setDeleteVisible(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const deleteAccount = async () => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    const deleteAcc = await users.deleteUser(userData.token, userData.id);
    if (deleteAcc.status === 200) {
      hideDialog();
      await EncryptedStorage.clear();
      dispatch(setSignIn(false));
    } else {
      hideDialog();
      Alert.alert('Cannot delete your account now');
    }
  };
  return route.name === 'UserProfile' ? (
    <Provider>
    <Appbar.Header style={{justifyContent: 'space-between'}}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <View>
        <Portal>
          <Dialog visible={deleteVisible} onDismiss={hideDialog}>
            <Dialog.Title>
              Are you sure you want to delete your account
            </Dialog.Title>
            <Dialog.Actions style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={deleteAccount}>
                <Text style={{color: '#1D2E54', fontSize: 16, lineHeight: 24}}>
                  Yes
                </Text>
              </TouchableOpacity>
              <View style={{width: 40}} />
              <TouchableOpacity onPress={hideDialog}>
                <Text style={{color: '#1D2E54', fontSize: 16, lineHeight: 24}}>
                  No
                </Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action onPress={openMenu} icon="dots-vertical" />}>
        <Menu.Item
          onPress={async () => {
            closeMenu();
            const userData = JSON.parse(await EncryptedStorage.getItem('user'));
            navigation.navigate('EditProfile', {user: userData});
          }}
          title="Edit Profile"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('ChangePassword');
          }}
          title="Change Password"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            showDialog();
          }}
          title="Delete Account"
        />
        <Menu.Item
          onPress={async () => {
            await EncryptedStorage.clear();
            dispatch(setSignIn(false));
          }}
          title="Log Out"
        />
      </Menu>
    </Appbar.Header>
    </Provider>
  ) : (
    <Appbar.Header style={{justifyContent: 'space-between'}}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
    </Appbar.Header>
  );
}

const Blue = () => <View style={{flex: 1, backgroundColor: 'transparent'}} />;

const TabNavigation = () => {
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
              source={require('./assets/PlusButton.png')}
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

const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  useEffect(() => {
    const getUser = async () => {
      // await EncryptedStorage.clear();
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      if (userData) {
        const validateToken = await auth.ValidateToken(userData.token);
        if (validateToken.status !== 200) {
          await EncryptedStorage.clear();
        } else {
          dispatch(setSignIn(!!userData));
        }
      }
    };
    getUser();
  }, [dispatch]);

  const config = {
    screens: {
      EmailVerification: {
        path: 'verify/:token',
        parse: {
          token: token => `${token}`,
        },
      },
    },
  };

  const linking = {
    prefixes: ['goaltivity://', 'https://goaltivity.com'],
    config,
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}>
        {isSignedIn ? (
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="Tab"
              component={TabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Modal"
              component={AddModal}
              options={{
                presentation: 'transparentModal',
                animationEnabled: true,
                // cardOverlayEnabled: true,
                animationTypeForReplace: 'pop',
                headerShown: false,
                contentStyle: {backgroundColor: '#40404040'},
              }}
            />
            <Stack.Screen name="AddGoalItem" component={AddGoalItem} />
            <Stack.Screen name="AddActionItem" component={AddActionItem} />
            <Stack.Screen name="EditActionItem" component={EditActionItem} />
            <Stack.Screen name="EditGoalItem" component={EditGoalItem} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="GroupItem" component={GroupItem} />
            <Stack.Screen name="MemberProfile" component={MemberProfile} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Survey" component={Survey} />
            <Stack.Screen
              name="EmailVerification"
              component={EmailVerification}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
