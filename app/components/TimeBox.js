import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const TimeBox = (props) => {
    return (
        <View style={styles.outerBox}>
            <View style={styles.innerBox}>
                <Text style={styles.timeMain}>{props.hrs}</Text>
                <Text style={styles.tinyText}>hrs</Text>
            </View>
            <View style={styles.innerBox}>
                <Text style={styles.timeMain}>:</Text>
            </View>
            <View style={styles.innerBox}>
                <Text style={styles.timeMain}>{props.mins}</Text>
                <Text style={styles.tinyText}>mins</Text>
            </View>
            <View style={styles.secsBoxOut}>
                <View style={styles.secsBoxIn}>
                    <Text style={styles.timeSecs}>{props.secs}</Text>
                </View>
            </View>
        </View>        
    )
}

const styles = StyleSheet.create({
    outerBox: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', 
    },
    innerBox: {
        alignItems: "center",
        paddingHorizontal: 5,
    },
    timeMain: {
        fontSize: 56,
        fontWeight: 'bold',
    },
    timeSecs: {
        fontSize: 24,
        color: colors.greyText,
    },
    secsBoxOut: {
        justifyContent: 'center',
    },
    secsBoxIn: {
        height: 35,
        justifyContent: 'flex-end',
    },
    tinyText: {
        color: colors.greyText,
        fontSize: 16,
    }
})

export { TimeBox };

