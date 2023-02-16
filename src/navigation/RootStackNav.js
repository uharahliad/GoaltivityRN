import React from 'react';
import AddModal from '../components/modals/AddModal';
import AddGoalItem from '../pages/AddGoalItem';
import AddActionItem from '../pages/AddActionItem';
import EditActionItem from '../pages/EditActionItem';
import EditGoalItem from '../pages/EditGoal';
import ChatRoom from '../pages/ChatRoom';
import GroupItem from '../pages/GroupItem';
import MemberProfile from '../pages/MemberProfile';
import UserProfile from '../pages/UserProfile';
import EditProfile from '../pages/EditProfile';
import ChangePassword from '../pages/ChangePassword';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Survey from '../pages/Survey';
import EmailVerification from '../pages/EmailVerification';
import TabNav from './TabNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StackCustomHeader from './headers/StackCustomHeader';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const RootStackNav = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <StackCustomHeader {...props} />,
      }}>
      {user ? (
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Tab"
            component={TabNav}
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
  );
};

export default RootStackNav;
