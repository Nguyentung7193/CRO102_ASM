/* eslint-disable react/self-closing-comp */
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  deleteProduct,
  getListProduct,
  updateProduct,
} from '../../action/product/productAction';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { Product } from '../../reducers/product/productReducer';
import ProductFeatureItem from '../../compoment/Item/ProductFeatureItem';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductListScreen'>;

const ProductListScreen = ({ navigation }: Props) => {
  const listProduct = useAppSelector(state => state.product.listProducts);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);
  useFocusEffect(
    useCallback(() => {
      dispatch(getListProduct());
    }, [dispatch]),
  );
  const handleAddProduct = () => {
    navigation.navigate('ProductAddScreen');
  };
  const handleUpdateProduct = (product: Product) => {
    setEditProduct(product);
    setVisible(true);
  };
  const handleDeleteProduct = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(deleteProduct(id));
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
        Product List
      </Text>
      <FlatList
        data={listProduct}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductFeatureItem
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', {
                id: item.id.toString(),
              })
            }
            onedit={handleUpdateProduct}
            ondelete={handleDeleteProduct}
          />
        )}
      />
      <Button title="Add" onPress={handleAddProduct} />
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>
            Edit Product
          </Text>
          {editProduct && (
            <>
              <TextInput
                style={styles.input}
                value={editProduct.title}
                placeholder="Title"
                onChangeText={text =>
                  setEditProduct({ ...editProduct, title: text })
                }
              />
              <TextInput
                style={styles.input}
                value={editProduct.description}
                placeholder="Description"
                onChangeText={text =>
                  setEditProduct({ ...editProduct, description: text })
                }
              />
              <TextInput
                style={styles.input}
                value={editProduct.price.toString()}
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={text =>
                  setEditProduct({ ...editProduct, price: parseFloat(text) })
                }
              />
              <TextInput
                style={styles.input}
                value={editProduct.image}
                placeholder="Image URL"
                onChangeText={text =>
                  setEditProduct({ ...editProduct, image: text })
                }
              />
              <View
                style={styles.button}
                onTouchEnd={() => {
                  if (editProduct) {
                    dispatch(updateProduct(editProduct));
                    setVisible(false);
                  }
                  setVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Update Product</Text>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
