import React from 'react';
import { Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  images: string[];
}

const ProductImageCarousel: React.FC<Props> = ({ images }) => {
  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ProductImageCarousel;

const styles = StyleSheet.create({
  image: {
    width,
    height: 300,
  },
});
