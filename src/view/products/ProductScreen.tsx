/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, useWindowDimensions, FlatList, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductFeatureItem from '../../compoment/Item/ProductFeatureItem';
import SearchBar from '../../compoment/Search/SearchBar';

type Product = {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
};

// Fake data
const allProducts: Product[] = [
  {
    id: '1',
    title: 'Áo thun nam',
    image: 'https://via.placeholder.com/100',
    price: '199.000đ',
    category: 'Áo',
  },
  {
    id: '2',
    title: 'Quần jean',
    image: 'https://via.placeholder.com/100',
    price: '299.000đ',
    category: 'Quần',
  },
  {
    id: '3',
    title: 'Giày thể thao',
    image: 'https://via.placeholder.com/100',
    price: '599.000đ',
    category: 'Giày',
  },
  {
    id: '4',
    title: 'Túi đeo chéo',
    image: 'https://via.placeholder.com/100',
    price: '399.000đ',
    category: 'Túi',
  },
  {
    id: '5',
    title: 'Mũ lưỡi trai',
    image: 'https://via.placeholder.com/100',
    price: '149.000đ',
    category: 'Phụ kiện',
  },
  {
    id: '6',
    title: 'Áo sơ mi',
    image: 'https://via.placeholder.com/100',
    price: '249.000đ',
    category: 'Áo',
  },
];

const categories = ['Tất cả', 'Áo', 'Quần', 'Giày', 'Túi', 'Phụ kiện'];

const ProductScreen = () => {
  const layout = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

  const [routes] = useState(
    categories.map((c, i) => ({ key: c.toLowerCase(), title: c })),
  );

  const getFilteredProducts = (category: string) => {
    let filtered =
      category === 'Tất cả'
        ? allProducts
        : allProducts.filter(p => p.category === category);

    if (searchText.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return filtered;
  };

  const renderScene = ({
    route,
  }: {
    route: { key: string; title: string };
  }) => {
    const data = getFilteredProducts(route.title);

    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductFeatureItem
            image={item.image}
            title={item.title}
            price={item.price}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SearchBar value={searchText} onChangeText={setSearchText} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            style={{ backgroundColor: '#fff' }}
            indicatorStyle={{ backgroundColor: '#007bff' }}
            tabStyle={{ width: 'auto', paddingHorizontal: 12 }}
            // getLabelText={({ route }) => route.title}
            // labelStyle={{ fontWeight: '500' }}
            activeColor="#007bff"
            inactiveColor="#000"
          />
        )}
      />
    </View>
  );
};

export default ProductScreen;
