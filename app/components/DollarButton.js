import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import FilterContext from '../context/filter_context';

const DollarButton = ({ id }) => {
    const { filter, setFilter } = useContext(FilterContext);
    const { price } = filter;

    const displayDollars = () => {
        const dollarArray = [];

        let i = 0;
        while(i < id) {
            dollarArray.push('$');
            i++;
        }

        return dollarArray.join('');
    }

    const priceIncluded = () => price.includes(id.toString());

    const bgColor = priceIncluded() ? "primary" : "light";
    
    const handleClick= () => {
        let newPrice = price;

        if (priceIncluded()) {
            newPrice = newPrice.filter( p => p != id.toString());
        } else {
            newPrice.push(id.toString());
        }

        let obj = Object.assign({}, filter);
        obj['price'] = newPrice;
        setFilter(obj);
    } 


    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[bgColor] }]}
            onPress={handleClick}
        >
            <AppText style={styles.text}>{displayDollars()}</AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
      flex: 1,
      padding: 8,
      alignItems: 'center',
      width: 70
  },
  text: {
      color: colors.green,
      fontSize: 20,
      fontWeight: 'bold',
  }
});

export default DollarButton;