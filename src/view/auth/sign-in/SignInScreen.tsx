import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { RootStackParamList } from '../../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomInput from '../../../compoment/Input/ CustomInput';
import CustomButton from '../../../compoment/Button/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

const SignInScreen = ({navigation} : Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng nhập Anime Shop</Text>
      <View style={styles.form}>
        <CustomInput
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton
          title="Đăng nhập"
          onPress={() => {navigation.navigate('Main')}}
        />
        <Text style={styles.signupText}>
          Chưa có tài khoản?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUpScreen')}>
            Đăng ký ngay
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18122B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 20,
    borderRadius: 55,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    color: '#b39ddb',
    fontWeight: 'bold',
    marginBottom: 24,
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  signupText: {
    color: '#b39ddb',
    marginTop: 18,
    fontSize: 15,
    textAlign: 'center',
  },
  signupLink: {
    color: '#7c43bd',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});