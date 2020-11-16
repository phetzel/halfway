import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import { normalize } from '../util/dimensions';

const Card = ({
    name,
    address, 
    image,
    price,
    onPress
}) => {
    const photoSource = image ? { uri: image } : require('../assets/no-image-found.png');

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image style={styles.image} source={photoSource} />

                <View style={styles.detailsContainer}>
                    <View style={styles.detailsSub}>
                        <AppText style={[styles.name, styles.text]}>{name}</AppText>
                        <AppText style={[styles.price, styles.text]}>{price}</AppText>
                    </View>

                    <View style={[styles.detailsSub, {alignItems: 'flex-end'}]}>
                        <AppText style={[styles.address, styles.marginBottom, styles.text]}>
                            {address[0]}
                        </AppText>
                        <AppText style={[styles.address, styles.text]}>{address[1]}</AppText>
                    </View>
                </View>
            </View>
            
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
  card: {
      borderRadius: normalize(15),
      backgroundColor: colors.white,
      marginBottom: normalize(15),
      overflow: 'hidden',
  },
  image: {
      height: normalize(150),
      width: '100%',
  },
detailsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: normalize(20),
  },
  detailsSub: {
    flex: 1,
    overflow: 'hidden'
  },
  marginBottom: {
    marginBottom: normalize(7),
  },
  name: {
      color: colors.primary,
      fontWeight: "bold",
      marginBottom: normalize(7),
  },
  price: {
      color: colors.green
  },
  text: {
      fontSize: normalize(17)
  }

});

export default Card;