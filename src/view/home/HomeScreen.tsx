import React, { useState } from 'react';
import { ScrollView, Text, FlatList, StyleSheet, View } from 'react-native';
import HomeHeader from '../../compoment/header/HomeHeader';
import ProductHotItem from '../../compoment/Item/ProductHotItem';
import ProductFeatureItem from '../../compoment/Item/ProductFeatureItem';
import SearchBar from '../../compoment/Search/SearchBar';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const dummyHotProducts = [
  { id: '1', title: 'Áo thun nam', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '2', title: 'Giày thể thao', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '3', title: 'Túi xách nữ', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '4', title: 'Đồng hồ thông minh', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '5', title: 'Sách học tiếng Anh', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '6', title: 'Balo thời trang', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '7', title: 'Mũ lưỡi trai', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '8', title: 'Áo khoác nam', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '9', title: 'Quần jeans nữ', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '10', title: 'Giày cao gót', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '11', title: 'Đồng hồ Casio', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '12', title: 'Sách học lập trình', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
  { id: '13', title: 'Bộ đồ chơi Lego', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png' },
];
const dummyFeatureProducts = [
  { id: 'a', title: 'Laptop Dell', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '20.000.000đ' },
  { id: 'b', title: 'iPhone 13', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '18.000.000đ' },
  { id: 'c', title: 'Tai nghe Sony', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '2.500.000đ' },
  { id: 'd', title: 'Máy ảnh Canon', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '15.000.000đ' },
  { id: 'e', title: 'Smartwatch Samsung', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '5.000.000đ' },
  { id: 'f', title: 'Balo thời trang', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.200.000đ' },
  { id: 'g', title: 'Áo khoác nam', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '800.000đ' },
  { id: 'h', title: 'Quần jeans nữ', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '600.000đ' },
  { id: 'i', title: 'Giày cao gót', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.500.000đ' },
  { id: 'j', title: 'Đồng hồ Casio', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '3.000.000đ' },
  { id: 'k', title: 'Sách học tiếng Anh', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '200.000đ' },
  { id: 'l', title: 'Bộ đồ chơi Lego', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.000.000đ' },
  { id: 'm', title: 'Máy xay sinh tố', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '700.000đ' },
  { id: 'n', title: 'Bộ nồi inox', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.800.000đ' },
  { id: 'o', title: 'Bàn phím cơ', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.200.000đ' },
  { id: 'p', title: 'Chuột gaming', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '800.000đ' },
  { id: 'q', title: 'Loa Bluetooth', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.500.000đ' },
  { id: 'r', title: 'Máy lọc không khí', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '2.000.000đ' },
  { id: 's', title: 'Bộ dụng cụ làm bếp', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.000.000đ' },
  { id: 't', title: 'Gối cao su non', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '300.000đ' },
  { id: 'u', title: 'Thảm tập yoga', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '400.000đ' },
  { id: 'v', title: 'Bình giữ nhiệt', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '250.000đ' },
  { id: 'w', title: 'Bộ cọ trang điểm', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '150.000đ' },
  { id: 'x', title: 'Son môi', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '200.000đ' },
  { id: 'y', title: 'Kem chống nắng', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '300.000đ' },
  { id: 'z', title: 'Nước hoa nam', image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/genshin-impact-raiden-shogun-boss-fight-feature.jpg', price: '1.500.000đ' },
];

const HomeScreen = ({navigation}: Props) => {
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
        data={dummyHotProducts}
        keyExtractor={(item) => item.id}
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
        {dummyFeatureProducts.map((item) => (
          <ProductFeatureItem
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
          />
        ))}
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
