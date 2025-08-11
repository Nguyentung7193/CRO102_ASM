/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductFeatureItem from '../../compoment/Item/ProductFeatureItem';
import SearchBar from '../../compoment/Search/SearchBar';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getListProduct } from '../../action/product/productAction';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

const categories = ['Tất cả', 'Áo', 'Quần', 'Giày', 'Túi', 'Phụ kiện'];

type Props = NativeStackScreenProps<RootStackParamList, 'ProductListScreen'>;

const ProductScreen = ({ navigation }: Props) => {
  const layout = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();

  // Lấy danh sách sản phẩm từ redux
  const listProducts = useAppSelector(state => state.product.listProducts);

  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);

  const [routes] = useState(
    categories.map((c) => ({ key: c.toLowerCase(), title: c })),
  );

  const getFilteredProducts = (category: string) => {
    let filtered =
      category === 'Tất cả'
        ? listProducts
        : listProducts.filter(p => p.category === category);

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
            product={item}
            // Nếu muốn chuyển sang màn chi tiết:
            // onPress={() => navigation.navigate('ProductDetailScreen', { id: item.id })}
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

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          backgroundColor: '#7c43bd',
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        onPress={() => navigation.navigate('ProductAddScreen')}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductScreen;
