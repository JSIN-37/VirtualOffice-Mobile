import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const TimeBox = (props) => {
    return (
        <View style={styles.outerBox}> 
        <View style={[styles.innerBox, {backgroundColor: props.bgcolor}]}>
        <Text style={styles.number}>{props.hrs}</Text>
            <Text style={styles.tinyText}>hrs</Text>
        </View>
        <View style={[styles.innerBox,  {backgroundColor: props.bgcolor}]}>
        <Text style={styles.number}>{props.mins}</Text>
        <Text style={styles.tinyText}>mins</Text>       
        </View>
        <View style={[styles.innerBox,  {backgroundColor: props.bgcolor}]}>
        <Text style={styles.number}>{props.secs}</Text>
        <Text style={styles.tinyText}>secs</Text>
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    outerBox: {
        position: 'absolute',
        bottom: 215,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    innerBox: {
        width: 77,
        height: 77,
        elevation: 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tinyText: {
        color: colors.white,
        fontSize: 12,
    },
    number: {
        color: colors.white,
        fontSize: 26,
    }
})

export { TimeBox };

