import React, {useState, useEffect} from 'react';
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
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import auth from '../../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../redux/reducers/signInSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Appbar, Avatar} from 'react-native-paper';
import users from '../../api/users';

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
      fontWeight: '510',
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

const categories = [
  'Career/Business',
  'Family & Relationships',
  'Personal Growth',
  'Health',
  'Recreation/Leisure',
];

const SizedBox = ({height, width}) => {
  return <View style={{height, width}} />;
};

const EditProfile = ({navigation, route}) => {
  const {user} = route.params;
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [label, setLabel] = useState('');
  const dispatch = useDispatch();

  const {control, handleSubmit, formState, reset} = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      bio: user.bio,
    },
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      bio: user.bio,
    });
  }, [
    reset,
    user.firstName,
    user.lastName,
    user.phoneNumber,
    user.email,
    user.bio,
  ]);

  useEffect(() => {
    if (user !== null) {
      const first = user.firstName ? user.firstName[0] : '';
      const last = user.lastName ? user.lastName[0] : '';
      setLabel(first + last);
    }
  }, [user]);

  const onSubmit = async data => {
    const userData = JSON.parse(await EncryptedStorage.getItem('user'));
    console.log(data, 1111111);
    // const pictureData = new FormData();
    // pictureData.append('file', image.assets[0]);
    const update = await users.updateUser(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        bio: data.bio,
        avatar: image ? image.assets[0].uri : '',
      },
      userData.token,
      userData.email,
    );
    const newUserData = {
      ...userData,
      firstName: update.data.firstName,
      lastName: update.data.lastName,
      phoneNumber: update.data.phoneNumber,
      email: update.data.email,
      bio: update.data.bio,
      avatar: [{publicUrl: update.data.image}],
    };
    await EncryptedStorage.setItem('user', JSON.stringify(newUserData));
    navigation.navigate('Home');
  };
  const loadImage = async () => {
    const newImage = await launchImageLibrary();
    if (newImage.assets.length) {
      setImage(newImage);
    }
  };
  console.log(user);
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <ScrollView>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', top: 10, right: 10}}>
                <Icon name="close" size={20} />
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
                Edit 12-Week Goal
              </Text>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  top: 60,
                }}>
                <SizedBox height={20} />
                {image ? (
                  <TouchableOpacity
                    onPress={loadImage}
                    style={{alignSelf: 'center'}}>
                    <Avatar.Image source={{uri: image.assets[0].uri}} />
                  </TouchableOpacity>
                ) : user.avatar && user.avatar.length ? (
                  <TouchableOpacity
                    onPress={loadImage}
                    style={{alignSelf: 'center'}}>
                    <Avatar.Image source={{uri: user.avatar[0].publicUrl}} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={loadImage}
                    style={{alignSelf: 'center'}}>
                    <Avatar.Text label={label} />
                  </TouchableOpacity>
                )}
                <SizedBox height={20} />
                <Text
                  style={{
                    marginLeft: 23,
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1F1C1B',
                    fontWeight: '400',
                    marginBottom: 8,
                  }}>
                  First Name
                </Text>
                <Pressable onPress={target => target.current?.focus()}>
                  <View>
                    <Controller
                      control={control}
                      name="firstName"
                      // rules={{required: true}}
                      render={props => (
                        <TextInput
                          {...props}
                          value={props.field.value}
                          //   label="First Name"
                          placeholder="Add Name"
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
                <SizedBox height={20} />
                <Text
                  style={{
                    marginLeft: 23,
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1F1C1B',
                    fontWeight: '400',
                    marginBottom: 8,
                  }}>
                  Last Name
                </Text>
                <Pressable onPress={target => target.current?.focus()}>
                  <View>
                    <Controller
                      control={control}
                      name="lastName"
                      // rules={{required: true}}
                      render={props => (
                        <TextInput
                          {...props}
                          value={props.field.value}
                          //   label="Last Name"
                          placeholder="Add Last Name"
                          placeholderTextColor="#1D2E54"
                          autoCapitalize="none"
                          autoCompleteType="firstName"
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
                <SizedBox height={20} />
                <Text
                  style={{
                    marginLeft: 23,
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1F1C1B',
                    fontWeight: '400',
                    marginBottom: 8,
                  }}>
                  Phone Number
                </Text>
                <Pressable onPress={target => target.current?.focus()}>
                  <View>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      //   rules={{
                      //     required: true,
                      //     pattern: {
                      //       value:
                      //         /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                      //       message: 'Wrong format',
                      //     },
                      //   }}
                      render={props => (
                        <TextInput
                          {...props}
                          value={props.field.value}
                          //   label="Phone Number"
                          placeholder="Add Phone"
                          placeholderTextColor="#1D2E54"
                          autoCapitalize="none"
                          autoCompleteType="secondName"
                          autoCorrect={false}
                          keyboardType="numeric"
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
                <SizedBox height={10} />
                {formState.errors.phoneNumber?.message && (
                  <Text style={{marginLeft: 15, color: 'red'}}>
                    {formState.errors.phoneNumber.message}
                  </Text>
                )}
                <SizedBox height={10} />
                <Text
                  style={{
                    marginLeft: 23,
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1F1C1B',
                    fontWeight: '400',
                    marginBottom: 8,
                  }}>
                  Email
                </Text>
                <Pressable onPress={target => target.current?.focus()}>
                  <View>
                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        // required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      }}
                      render={props => (
                        <TextInput
                          {...props}
                          value={props.field.value}
                          //   label="Email Address"
                          placeholder="Add Email Address"
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
                <SizedBox height={10} />
                {formState.errors.email?.message && (
                  <Text style={{marginLeft: 15, color: 'red'}}>
                    {formState.errors.email.message}
                  </Text>
                )}
                <SizedBox height={10} />
                <Text
                  style={{
                    marginLeft: 23,
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#1F1C1B',
                    fontWeight: '400',
                    marginBottom: 8,
                  }}>
                  Short Bio
                </Text>
                <Pressable onPress={target => target.current?.focus()}>
                  <View>
                    <Controller
                      control={control}
                      //   rules={{required: true, minLength: 6}}
                      name="bio"
                      render={props => (
                        <TextInput
                          {...props}
                          value={props.field.value}
                          //   label="Password"
                          placeholder="I am ready to do this..."
                          placeholderTextColor="#1D2E54"
                          autoCapitalize="none"
                          autoCompleteType="bio"
                          autoCorrect={false}
                          onChangeText={text => props.field.onChange(text)}
                          underlineColor="0deg,rgba(56, 92, 169, 0.05), rgba(56, 92, 169, 0.05)), #FAFCFF"
                          activeUnderlineColor="#1D2E54"
                          mode="flat"
                          textContentType="password"
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
                <SizedBox height={10} />
                {formState.errors.password?.message && (
                  <Text style={{marginLeft: 15, color: 'red'}}>
                    {formState.errors.password.message}
                  </Text>
                )}

                <SizedBox height={20} />

                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>
                <SizedBox height={100} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;
