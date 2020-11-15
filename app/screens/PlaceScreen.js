import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { normalize } from '../util/dimensions';

const PlaceScreen = ({ navigation, route }) => {
    const { image_url, location, categories, display_phone, price, rating, name } = route.params;

    let stars = [];
    while (stars.length < rating) {
        stars.push('star');
    }


    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Image 
                    source={{ uri: image_url }}
                    style={styles.image}
                />

                <View style={styles.detailsContainer}>
                    <AppText style={styles.name}>{name}</AppText>

                    <View style={styles.priceRating}>
                        <View style={styles.starsContainer}>
                            {
                                stars.map((star, idx) => (
                                    <MaterialCommunityIcons key={idx} name="star" size={30} color={colors.gold} />
                                ))
                            }
                        </View>

                        <View style={styles.price}>
                            <AppText style={styles.price}>{price}</AppText>
                        </View>
                    </View>

                    <View style={styles.subContainer}>
                        <AppText style={styles.label}>Categories</AppText>
                        {
                            categories.map((cat, idx) => (
                                <AppText style={styles.detail} key={idx}>{cat.title}</AppText>
                            ))
                        }
                    </View>

                    <View style={styles.subContainer}>
                        <AppText style={styles.label}>Address</AppText>
                        <AppText style={styles.detail}>{location.display_address[0]}</AppText>
                        <AppText style={styles.detail}>{location.display_address[1]}</AppText>
                    </View>

                    <View style={styles.subContainer}>
                        <AppText style={styles.label}>Phone Number</AppText>
                        <AppText style={styles.detail}>{display_phone}</AppText>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomButton}>
                <AppButton
                    color="secondary"
                    onPress={() => navigation.navigate("Results")}
                    title="Back" 
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    bottomButton: {
        backgroundColor: colors.white,
        bottom: 0,
        padding: normalize(10),
        paddingBottom: normalize(20),
        position: 'absolute',
        width: '100%'
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    detail: {
        marginLeft: normalize(20),
    },
    detailsContainer: {
        padding: normalize(20),
        paddingBottom: normalize(200),
    },
    label: {
        fontSize: normalize(22),
        color: colors.third,
    },
    image: {
        height: normalize(230),
        width: '100%'
    },
    name: {
        fontSize: normalize(23),
        fontWeight: "500",
    },
    price: {
        color: colors.green,
        fontSize: normalize(22),
        fontWeight: 'bold',
        marginRight: normalize(20)
    },
    priceRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: normalize(10)
  },
  starsContainer: {
    flexDirection: 'row',
  }
});

export default PlaceScreen;