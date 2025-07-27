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
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '199.000đ',
    category: 'Áo',
  },
  {
    id: '2',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '299.000đ',
    category: 'Quần',
  },
  {
    id: '3',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '599.000đ',
    category: 'Giày',
  },
  {
    id: '4',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '399.000đ',
    category: 'Túi',
  },
  {
    id: '5',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '149.000đ',
    category: 'Phụ kiện',
  },
  {
    id: '6',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '249.000đ',
    category: 'Áo',
  },
  {
    id: '7',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '199.000đ',
    category: 'Quần',
  },
  {
    id: '8',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '499.000đ',
    category: 'Giày',
  },
  {
    id: '9',
    title: 'Áo',
    image: 'https://file.hstatic.net/200000722513/article/gearvn-cung-menh-nao-manh-cho-raiden-shogun-genshin-impact-1_402b38e8848f4b0c963a3f8efe1813d8_master.jpg',
    price: '699.000đ',
    category: 'Túi',
  },
  {
    id: '10',
    title: 'Áo',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '299.000đ',
    category: 'Phụ kiện',
  },
  {
    id: '11',
    title: 'Quần',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '199.000đ',
    category: 'Áo',
  },
  {
    id: '12',
    title: 'Quần',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '399.000đ',
    category: 'Quần',
  },
  {
    id: '13',
    title: 'Quần',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '599.000đ',
    category: 'Giày',
  },
  {
    id: '14',
    title: 'Quần',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '499.000đ',
    category: 'Túi',
  },
  {
    id: '15',
    title: 'Quần',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '249.000đ',
    category: 'Phụ kiện',
  },
  {
    id: '16',
    title: 'Giày',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '199.000đ',
    category: 'Áo',
  },
  {
    id: '17',
    title: 'Giày',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '299.000đ',
    category: 'Quần',
  },
  {
    id: '18',
    title: 'Giày',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '599.000đ',
    category: 'Giày',
  },
  {
    id: '19',
    title: 'Giày',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '399.000đ',
    category: 'Túi',
  },
  {
    id: '20',
    title: 'Giày',
    image: 'https://4kwallpapers.com/images/wallpapers/raiden-shogun-2732x2732-21381.jpg',
    price: '149.000đ',
    category: 'Phụ kiện',
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
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 8 }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 50 }}>
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
            style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ffffffff' }}
            indicatorStyle={{ backgroundColor: '#7c43bd', height: 3, borderRadius: 2 }}
            tabStyle={{ width: 'auto', paddingHorizontal: 16 }}
            activeColor="#7c43bd"
            inactiveColor="#b39ddb"
            labelStyle={{
              fontWeight: '600',
              fontSize: 15,
              letterSpacing: 0.2,
            }}
          />
        )}
      />
    </View>
  );
};

export default ProductScreen;
