import React, { useContext, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import defaultFilter from '../context/default_filter';
import { normalize } from '../util/dimensions';
import FilterContext from '../context/filter_context';

const WelcomeScreen = ({ navigation }) => {
    const { filter, setFilter } = useContext(FilterContext);

    useFocusEffect(() => {
        setFilter(defaultFilter);
    });


    return (
        <ImageBackground
        blurRadius={10}
            source={require("../assets/background.jpg")}
            style={styles.background}
        >
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/logo.png')} 
                    style={styles.logo}/>
                <AppText style={styles.tagline}>Lets Meet Halfway</AppText>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    onPress={() => navigation.navigate("AddressInput1")}
                    title="Get Started" />
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
  background: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
      height: '100%'
  },
  buttonContainer: {
    marginBottom: normalize(30),
    padding: normalize(20),
    width: '100%',
  },
  logo: {
      height: normalize(125),
      width: normalize(125)
  },
  logoContainer: {
      alignItems: 'center',
      position: 'absolute',
      top: normalize(110),
  },
  tagline: {
      color: colors.primary,
      fontSize: normalize(20),
      fontWeight: 'bold',
      padding: normalize(15),
      top: normalize(-30)
    }
});

export default WelcomeScreen;