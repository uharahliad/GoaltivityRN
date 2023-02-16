import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import users from '../../api/users';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Appbar, Dialog, Menu, Portal, Provider} from 'react-native-paper';
import {logout} from '../../redux/thunks/auth';
import {clearUser} from '../../redux/reducers/authSlice';

const ConditionalWrapper = ({children}) => {
  return Platform.OS === 'ios' ? <Provider>{children}</Provider> : children;
};

const StackCustomHeader = ({navigation}) => {
  const route = useRoute();
  const [visible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const showDialog = () => setDeleteVisible(true);
  const hideDialog = () => setDeleteVisible(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const deleteAccount = async () => {
    try {
      await users.deleteUser(user.id);
      dispatch(clearUser());
      hideDialog();
      await EncryptedStorage.clear();
    } catch (e) {
      console.log('Error', e.response);
      hideDialog();
      Alert.alert('Cannot delete your account now');
    }
  };
  return route.name === 'UserProfile' ? (
    <ConditionalWrapper>
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
                  <Text
                    style={{color: '#1D2E54', fontSize: 16, lineHeight: 24}}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <View style={{width: 40}} />
                <TouchableOpacity onPress={hideDialog}>
                  <Text
                    style={{color: '#1D2E54', fontSize: 16, lineHeight: 24}}>
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
              // const userData = JSON.parse(
              //   await EncryptedStorage.getItem('user'),
              // );
              navigation.navigate('EditProfile');
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
              dispatch(logout());
            }}
            title="Log Out"
          />
        </Menu>
      </Appbar.Header>
    </ConditionalWrapper>
  ) : (
    <Appbar.Header style={{justifyContent: 'space-between'}}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
    </Appbar.Header>
  );
};

export default StackCustomHeader;
