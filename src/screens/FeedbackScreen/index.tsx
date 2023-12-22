import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import styles from './styles';
import {InputComponent} from 'components';
import {Box, Button} from 'native-base';
import {isEmailValid} from 'utils/validation';
import {showSuccessMsg} from 'utils/flashMessage';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);

  const validateEmailText = (text: string) => {
    setEmailVerified(isEmailValid(text));
    setEmail(text);
  };

  const isFormVerified = emailVerified && name.length > 0;

  const onSubmit = async () => {
    AsyncStorage.setItem('Rating', JSON.stringify({name, email, rating}));
    showSuccessMsg('Thanks for submitting feedback');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <InputComponent
          marginTop={5}
          placeholder={'Name'}
          autoCapitalize={'words'}
          autoComplete={'name'}
          value={name}
          onChangeText={setName}
        />
        <InputComponent
          marginTop={5}
          placeholder={'Email'}
          autoCapitalize={'none'}
          autoComplete={'email'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={validateEmailText}
        />
        <Box alignItems="center" top={12}>
          <Text style={styles.rateUsText}>{'Rate us'}</Text>
          <AirbnbRating
            showRating={false}
            starContainerStyle={styles.ratingContainer}
            count={5}
            defaultRating={0}
            size={35}
            onFinishRating={setRating}
          />
        </Box>
        <Box alignItems="center" top={20}>
          <Button
            disabled={!isFormVerified}
            w={'100%'}
            backgroundColor={isFormVerified ? '#009491' : '#09142515'}
            onPress={onSubmit}>
            Submit
          </Button>
        </Box>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
