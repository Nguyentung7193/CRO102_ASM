import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  image: string;
  title: string;
  onPress?: () => void;
};

const ProductHotItem = ({ image, title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ProductHotItem;

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
});
