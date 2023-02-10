import React, {useState} from 'react';
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
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import auth from '../../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../redux/reducers/signInSlice';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#1D2E54',
      borderRadius: 100,
      height: 48,
      justifyContent: 'center',
    },
    disabledButton: {
      alignItems: 'center',
      backgroundColor: 'lightgrey',
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
    disabledButtonTitle: {
      color: 'grey',
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
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
      color: 'black',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
    },
    textButton: {
      color: 'black',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    title: {
      color: '#1D2E54',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
    loginButtonText: {
      color: '#8DC63F',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    // logo: {
    //   position: 'absolute',
    //   top: 20,
    //   left: 10,
    // },
  });
}

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const ChangePassword = ({navigation}) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const {control, handleSubmit, formState, getValues, reset} = useForm({
    // defaultValues: {
    //   email: '',
    // },
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      console.log('SUBMIT DATA: ', data);
    } catch (e) {
      console.log(e, e.code);
      Alert.alert('Invalid credentials, try again');
    }
  };

  const styles = useStyles();

  const isActive =
    getValues('old_password')?.length >= 6 &&
    getValues('new_password')?.length >= 6;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <Text style={styles.title}>Want to change your password?</Text>

            <SizedBox height={30} />

            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="old_password"
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={props => (
                    <TextInput
                      {...props}
                      label="Old Password"
                      placeholder="Password must be 6 characters long"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      onChangeText={text => props.field.onChange(text)}
                      secureTextEntry
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      textContentType="password"
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
            </Pressable>
            {formState.errors.old_password?.message && (
              <Text style={{marginLeft: 15, color: 'red'}}>
                {formState.errors.old_password.message}
              </Text>
            )}

            <SizedBox height={30} />

            <Pressable onPress={target => target.current?.focus()}>
              <View>
                <Controller
                  control={control}
                  name="new_password"
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={props => (
                    <TextInput
                      {...props}
                      label="New Password"
                      placeholder="Password must be 6 characters long"
                      placeholderTextColor="#1D2E54"
                      autoCapitalize="none"
                      autoCompleteType="password"
                      autoCorrect={false}
                      onChangeText={text => props.field.onChange(text)}
                      secureTextEntry
                      underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                      activeUnderlineColor="#1D2E54"
                      mode="flat"
                      textContentType="password"
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
            </Pressable>
            {formState.errors.new_password?.message && (
              <Text style={{marginLeft: 15, color: 'red'}}>
                {formState.errors.new_password.message}
              </Text>
            )}

            <SizedBox height={250} />

            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View style={isActive ? styles.button : styles.disabledButton}>
                <Text
                  style={
                    isActive ? styles.buttonTitle : styles.disabledButtonTitle
                  }>
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
