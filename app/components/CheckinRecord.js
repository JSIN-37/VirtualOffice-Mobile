import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';

import colors from '../config/colors';

const CheckinRecord = (props) => {
    return (
        <View style={[styles.box, {backgroundColor: props.boxColor}]}>
            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Check-In</Text>
                    <Text style={styles.info}>{props.checkin}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Check-Out</Text>
                    <Text style={styles.info}>{props.checkout}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Work Duration</Text>
                    <Text style={styles.info}>{props.workDuration}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: Math.floor(Dimensions.get('window').width*0.8),
        paddingHorizontal: 20,
        paddingTop: 10,
        height: 120,
        borderRadius: 15,
        elevation: 3,
    },
    infoCard: {
        paddingHorizontal: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 6,
    },
    infoLabel: {
        fontSize: 16,
        position: 'absolute',
        left: 0,    
        color: colors.white,
    },
    info: {
        fontSize: 16,
        color: colors.white,
    },  
})

export { CheckinRecord };