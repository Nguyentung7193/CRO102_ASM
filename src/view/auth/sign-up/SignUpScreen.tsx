import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/StackNavigator';
import CustomInput from '../../../compoment/Input/ CustomInput';
import CustomButton from '../../../compoment/Button/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng ký Anime Shop</Text>
      <View style={styles.form}>
        <CustomInput
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomInput
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <CustomButton
          title="Đăng ký"
          onPress={() => {/* Xử lý đăng ký */}}
        />
        <Text style={styles.signinText}>
          Đã có tài khoản?{' '}
          <Text style={styles.signinLink} onPress={() => navigation.navigate('SignInScreen')}>
            Đăng nhập ngay
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
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
    borderWidth: 2,
    borderColor: '#b39ddb',
  },
  title: {
    fontSize: 26,
    color: '#372655ff',
    fontWeight: 'bold',
    marginBottom: 24,
    fontFamily: 'Avenir',
    textAlign: 'center',
    letterSpacing: 1,
  },
  form: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#22203a',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#7c43bd',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  signinText: {
    color: '#b39ddb',
    marginTop: 18,
    fontSize: 15,
    textAlign: 'center',
  },
  signinLink: {
    color: '#7c43bd',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});