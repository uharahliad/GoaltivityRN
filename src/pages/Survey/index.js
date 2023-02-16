import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TypeformEmbed from 'react-native-typeform-embed';
import {useDispatch, useSelector} from 'react-redux';
import {getMe} from '../../redux/thunks/auth';

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
      // paddingHorizontal: 16,
      // paddingVertical: 32,
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
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
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
      fontSize: 32,
      //   fontWeight: '700',
      lineHeight: 44,
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

const Survey = ({navigation, route}) => {
  const [link, setLink] = useState('');
  const email = route.params.email;
  const dispatch = useDispatch();

  const styles = useStyles();

  useEffect(() => {
    if (email) {
      setLink(`https://upw1dt0t8rq.typeform.com/to/MztHIo9Z#email=${email}`);
    }
  }, [email]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <TypeformEmbed
              // useWebView2={true}
              url={link}
              onSubmit={() => dispatch(getMe())}
              hidden={{email: 'john@example.com'}}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Survey;
