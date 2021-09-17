import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';

const WorkDone = (props) => {
    return (
        <View style={styles.circleRing}>
            <View>
                <Text style={styles.middleText}>
                    Done
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name='check-circle'
                    type='feather'
                    color={colors.fullday}
                    size = {32}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circleRing: {
        width: 190,
        height: 190,
        borderRadius: 95,
        borderWidth: 5,
        borderColor: colors.fullday, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleText: {
        color: colors.fullday,
        fontSize: 32,
        fontWeight: 'bold'
    },
    iconContainer: {
        padding: 5,
    }
})

export { WorkDone };