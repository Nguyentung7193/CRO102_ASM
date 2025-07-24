import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  userName: string;
  onPressNotification?: () => void;
  onPressCart?: () => void;
};

const HomeHeader = ({ userName, onPressNotification, onPressCart }: Props) => {
  return (
    <View style={styles.container}>
      {/* LEFT: Avatar + Text */}
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2024/11/mixcollage-04-nov-2024-10-28-am-4723.jpg' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>Xin chào,</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
      </View>

      {/* RIGHT: Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onPressNotification}>
          <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCart}>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: '#888',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 16,
  },
});
