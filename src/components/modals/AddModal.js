import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import goals from '../../api/goals';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
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
      paddingHorizontal: 16,
      paddingVertical: 32,
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

const AddModal = ({navigation}) => {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const getGoals = async () => {
      try {
        // const userData = JSON.parse(await EncryptedStorage.getItem('token'));
        const goalsData = await goals.getGoals(user.id);
        setData(goalsData.data.rows);
      } catch (e) {
        console.log('Error Add modal: ', e);
      }
    };
    getGoals();
  }, [user]);

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        bottom: 0,
        height: 300,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          marginTop: 50,
          height: 250,
          //   borderWidth: 1,
          //   borderColor: 'black',
        }}>
        <View
          style={{
            backgroundColor: '#8D9191',
            position: 'absolute',
            bottom: 280,
            width: 32,
            height: 4,
            borderRadius: 20,
            alignSelf: 'center',
            opacity: 0.4,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: 230,
            alignSelf: 'center',
            fontSize: 16,
            lineHeight: 24,
            color: '#1D2E54',
            fontWeight: '500',
          }}>
          Create new
        </Text>
        {data && data.length > 0 ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: '#1D2E54',
              borderRadius: 100,
              height: 48,
              width: '90%',
              justifyContent: 'center',
              marginTop: 60,
            }}
            onPress={() => navigation.navigate('AddActionItem')}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 20,
              }}>
              Weekly action item
            </Text>
          </TouchableOpacity>
        ) : null}
        {data && data.length > 0 ? (
          <Text style={{alignSelf: 'center', marginTop: 20}}>or</Text>
        ) : null}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: data && data.length > 0 ? '#E1E7F5' : '#1D2E54',
            borderRadius: 100,
            height: 48,
            width: '90%',
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() => navigation.navigate('AddGoalItem')}>
          <Text
            style={{
              color: data && data.length > 0 ? '#1D2E54' : '#FFFFFF',
              fontSize: 14,
              fontWeight: '500',
              lineHeight: 20,
            }}>
            {data && data.length > 0 ? null : 'Create'} 12 week goal
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AddModal;
