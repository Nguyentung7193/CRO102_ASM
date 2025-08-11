import React, { useCallback, useState } from 'react';
import { ScrollView, Text, FlatList, StyleSheet, View } from 'react-native';
import HomeHeader from '../../compoment/header/HomeHeader';
import ProductHotItem from '../../compoment/Item/ProductHotItem';
import ProductFeatureItem from '../../compoment/Item/ProductFeatureItem';
import SearchBar from '../../compoment/Search/SearchBar';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hook';
import { useFocusEffect } from '@react-navigation/native';
import { getListProduct } from '../../action/product/productAction';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const HomeScreen = ({navigation}: Props) => {
    const listProduct = useAppSelector(state => state.product.listProducts);
    const dispatch = useAppDispatch();
        useFocusEffect(
          useCallback(() => {
            dispatch(getListProduct());
          }, [dispatch]),
        );
  const [search, setSearch] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <HomeHeader userName="Tùng Nguyễn" />
      <SearchBar value={search} onChangeText={setSearch} />

      <Text style={styles.sectionTitle}>
        🔥 Sản phẩm Hot
      </Text>

      <FlatList
        horizontal
        data={listProduct}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hotList}
        renderItem={({ item }) => (
          <ProductHotItem image={item.image} title={item.title} />
        )}
      />

      <Text style={styles.sectionTitle}>
        🌟 Nổi bật
      </Text>

      <View style={styles.featureList}>
        <FlatList
          data={listProduct}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductFeatureItem
              product={item}
              onPress={() => navigation.navigate('ProductDetailScreen', { id: item.id.toString() })}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginVertical: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c43bd',
    letterSpacing: 0.5,
  },
  hotList: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  featureList: {
    paddingHorizontal: 8,
    gap: 8,
  },
});
