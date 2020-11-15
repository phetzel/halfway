import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from '../config/styles';
import { normalize } from '../util/dimensions';

const AppTextInput = ({ icon, width = "100%", ...otherProps }) => {
    return (
        <View style={[styles.container, { width }]}>
            {icon && (
            <MaterialCommunityIcons
                name={icon}
                size={20}
                color={defaultStyles.colors.medium}
                style={styles.icon}
            />
            )}
            <TextInput
                placeholderTextColor={defaultStyles.colors.medium}
                style={defaultStyles.text}
                {...otherProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: normalize(25),
        flexDirection: 'row',
        padding: normalize(15),
        marginVertical: normalize(10),
    },
    icon: {
        marginRight: normalize(10),
    },
});

export default AppTextInput;