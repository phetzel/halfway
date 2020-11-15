import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import colors from '../config/colors';
import DollarButton from './DollarButton.js';
import { normalize } from '../util/dimensions';

const DollarPicker = (props) => {
    const priceArr = [{ id: '1' },{ id: '2' },{ id: '3' },{ id: '4' }];

    return (
        <View>
            <FlatList 
                contentContainerStyle={styles.picker}
                data={priceArr}
                keyExtractor={price => price.id}
                renderItem={({ item }) => (
                    <DollarButton id={item.id} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.light,
    borderRadius: normalize(25),
    flexDirection: 'row',
    marginVertical: normalize(10),
    overflow: 'hidden',
    width: normalize(280)
  }
});

export default DollarPicker;





