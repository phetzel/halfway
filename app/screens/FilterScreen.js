import React, { useContext, useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import DollarPicker from '../components/DollarPicker';
import FilterContext from '../context/filter_context';
import Screen from '../components/Screen';

const FilterScreen = ({ navigation }) => {
    const { filter, setFilter } = useContext(FilterContext);
    const { category, open } = filter;
    const [newCategory, setNewCategory] = useState(category);
    const [isOpen, setIsOpen] = useState(open);

    console.log(filter);

    const handleSubmit = () => {
        let obj = Object.assign({}, filter);
        obj['category'] = newCategory;
        obj['open'] = isOpen;
        setFilter(obj);

        navigation.navigate("Results");
    }

    return (
        <Screen style={styles.container}>
            <View style={styles.details}>
                <View>
                    <AppText style={styles.label}>Category</AppText>
                    <AppTextInput
                        autoCorrect={false}
                        onChangeText={text => setNewCategory(text)}
                        value={newCategory} 
                        placeholder='Bar, Italian, Etc'
                    />
                </View>

                <View>
                    <AppText style={styles.label}>Price</AppText>
                    <DollarPicker />
                </View>

                <View>
                    <AppText style={styles.label}>Open Now</AppText>
                    <Switch value={isOpen} onValueChange={newValue => setIsOpen(newValue)}  style={styles.switch}/>
                </View>
            </View>

            <View style={styles.bottomButton}>
                <AppButton
                    color="secondary"
                    onPress={handleSubmit}
                    title="Back" 
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    bottomButton: {
        bottom: 0,
        padding: 10,
        paddingBottom: 50,
        position: 'absolute',
        width: '100%'
    },
    details: {
        flex: .8,
        justifyContent: 'space-around',
        padding: 20,
        paddingBottom: 100
    },
    label: {
        color: colors.third,
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    switch: {
        alignSelf: 'center',
        transform:[{ scaleX: 1.3 }, { scaleY: 1.3 }]
    }
});

export default FilterScreen;