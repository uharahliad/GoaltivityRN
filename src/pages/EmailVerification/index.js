import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import auth from '../../api/auth';

const EmailVerification = ({navigation, route}) => {
  const {token} = route.params;
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const getVerify = async () => {
      const res = await auth.verifyEmail({token});
      console.log(res, '//////////////');
      if (res.status === 200) {
        setVerified(true);
      }
    };
    getVerify();
  }, []);

  return verified ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 24,
          lineHeight: 32,
          fontWeight: '400',
          color: '#1D2E54',
        }}>
        Email Verified
      </Text>
    </View>
  ) : (
    <ActivityIndicator
      size="large"
      color="#1D2E54"
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  );
};

export default EmailVerification;
