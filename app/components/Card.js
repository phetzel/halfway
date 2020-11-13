import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';

const Card = ({
    name,
    address, 
    image,
    price,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: image}} />

                <View style={styles.detailsContainer}>
                    <View style={styles.detailsLeft}>
                        <AppText style={styles.name}>{name}</AppText>
                        <AppText style={styles.price}>{price}</AppText>
                    </View>

                    <View style={styles.detailsLeft}>
                        <AppText style={[styles.address, styles.marginBottom]}>
                            {address[0]}
                        </AppText>
                        <AppText style={styles.address}>{address[1]}</AppText>
                    </View>
                </View>
            </View>
            
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
  card: {
      borderRadius: 15,
      backgroundColor: colors.white,
      marginBottom: 20,
      overflow: 'hidden',
  },
  image: {
      height: 200,
      width: '100%',
  },
detailsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  marginBottom: {
    marginBottom: 7,
  },
  name: {
      color: colors.primary,
      fontWeight: "bold",
      marginBottom: 7,
  },
  price: {
      color: colors.green
  }
});

export default Card;