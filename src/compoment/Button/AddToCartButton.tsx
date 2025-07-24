// src/components/AddToCartButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

interface Props {
  productId: string;
}

const AddToCartButton: React.FC<Props> = ({ productId }) => {
  const handleAddToCart = () => {
    // TODO: Call your API or context state here
    Alert.alert('Đã thêm vào giỏ hàng', `Sản phẩm ID: ${productId}`);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
      <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
    </TouchableOpacity>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2E86DE',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
