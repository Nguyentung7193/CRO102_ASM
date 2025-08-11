/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { useAppDispatch } from '../../hook';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { add1Product } from '../../action/product/productAction';
type Props = NativeStackScreenProps<RootStackParamList, 'ProductAddScreen'>;
const ProductAddScreen = ({navigation}: Props) => {
      const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(), // Temporary ID, should be replaced with a real ID from the backend
            title,
            description,
            price: parseFloat(price),
            image,
        };
        dispatch(add1Product(newProduct));
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
      <Text>ProductAddScreen</Text>
        <TextInput style={styles.input} value={title} placeholder='Title' onChangeText={setTitle}/>
        <TextInput style={styles.input} value={description} placeholder='Description' onChangeText={setDescription}/>
        <TextInput style={styles.input} value={price} placeholder='Price' keyboardType='numeric' onChangeText={setPrice}/>
        <TextInput style={styles.input} value={image} placeholder='Image URL' onChangeText={setImage}/>
        <View style={styles.button} onTouchEnd={handleAddProduct}>
            <Text style={styles.buttonText}>Add Product</Text>
        </View>
        <View style={styles.button} onTouchEnd={() => navigation.goBack()}></View>
    </View>
  )
}

export default ProductAddScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})