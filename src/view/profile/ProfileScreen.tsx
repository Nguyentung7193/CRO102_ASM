// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileOptionItem from '../../compoment/Item/ProfileOptionItem';
import ProfileHeader from '../../compoment/header/ProfileHeader';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen = ({navigation}: Props) => {
  const handleLogout = () => {
    navigation.replace('SignInScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        avatarUrl="https://i.pravatar.cc/150?img=3"
        name="Nguyễn Xuân Tùng"
        email="nguyentung260310@gmail.com"
      />

      <View style={styles.optionContainer}>
        <ProfileOptionItem label="Đơn hàng của tôi" icon="shopping-bag" onPress={() => {navigation.navigate('OrderHistoryScreen')}} />
        <ProfileOptionItem label="Địa chỉ giao hàng" icon="map-pin" onPress={() => {}} />
        <ProfileOptionItem label="Cài đặt tài khoản" icon="settings" onPress={() => {}} />
        <ProfileOptionItem label="Đăng xuất" icon="log-out" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  optionContainer: {
    padding: 16,
  },
});
