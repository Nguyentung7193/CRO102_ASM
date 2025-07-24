import React, { useState } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import HomeHeader from '../../compoment/header/HomeHeader';
import ProductHotItem from '../../compoment/Item/ProductHotItem';
import ProductFeatureItem from '../../compoment/Item/ProductFeatureItem';
import SearchBar from '../../compoment/Search/SearchBar';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const dummyHotProducts = [
  { id: '1', title: 'Áo thun nam', image: 'https://via.placeholder.com/100' },
  { id: '2', title: 'Giày thể thao', image: 'https://via.placeholder.com/100' },
  { id: '3', title: 'Túi xách nữ', image: 'https://via.placeholder.com/100' },
];
const dummyFeatureProducts = [
  { id: 'a', title: 'Laptop Dell', image: 'https://via.placeholder.com/100', price: '20.000.000đ' },
  { id: 'b', title: 'iPhone 13', image: 'https://via.placeholder.com/100', price: '18.000.000đ' },
  { id: 'c', title: 'Tai nghe Sony', image: 'https://via.placeholder.com/100', price: '2.500.000đ' },
];

const HomeScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState('');

  return (
    <ScrollView>
      <HomeHeader userName="Tùng Nguyễn" />
      <SearchBar value={search} onChangeText={setSearch} />

      <Text style={{ marginHorizontal: 16, marginVertical: 8, fontSize: 16, fontWeight: '600' }}>
        🔥 Sản phẩm Hot
      </Text>

      <FlatList
        horizontal
        data={dummyHotProducts}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <ProductHotItem image={item.image} title={item.title} />
        )}
      />

      <Text style={{ marginHorizontal: 16, marginVertical: 8, fontSize: 16, fontWeight: '600' }}>
        🌟 Nổi bật
      </Text>

      {dummyFeatureProducts.map((item) => (
        <ProductFeatureItem
          key={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
