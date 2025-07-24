// src/components/ProfileOptionItem.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  label: string;
  icon: string;
  onPress: () => void;
}

const ProfileOptionItem: React.FC<Props> = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} size={20} color="#333" />
      <Text style={styles.label}>{label}</Text>
      <Icon name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );
};

export default ProfileOptionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
  },
});
