import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const TimeBox = (props) => {
    return (
        <View style={[styles.outerBox, {backgroundColor: props.bgcolor}]}> 
        <View style={styles.innerBox}>
        <Text style={styles.number}>{props.hrs}</Text>
            <Text style={styles.tinyText}>hrs</Text>
        </View>
        <View style={styles.innerBox}>
        <Text style={styles.number}>:</Text>      
        </View>
        <View style={styles.innerBox}>
        <Text style={styles.number}>{props.mins}</Text>
        <Text style={styles.tinyText}>mins</Text>       
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    outerBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '45%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerBox: {
        alignItems: "center",
        top: 30,
        paddingHorizontal: 10,
    },
    tinyText: {
        color: colors.white,
        fontSize: 16,
    },
    number: {
        color: colors.white,
        fontSize: 54,
    }
})

export { TimeBox };

