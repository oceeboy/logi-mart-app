import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '../../../components/shared';
import { THEME } from '../../../constants/theme';
import { getAllProduct, ProductDataProps } from '../../../services/products';

const HomePage = () => {
  const [data, setData] = useState<ProductDataProps[]>([]);

  const productData = async () => {
    const myProduct: ProductDataProps[] = await getAllProduct();
    setData(myProduct);
  };

  useEffect(() => {
    productData();
  }, []); // Empty dependency array to run only on component mount

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Home Page</Text>
        {data ? (
          data.map((item, index) => (
            <View key={index}>
              <Text size="body2">{item.name}</Text>
              <Text size="body3"> {item.price} </Text>
            </View>
          ))
        ) : (
          <Text>Loading...</Text> // Handle loading state
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
});
