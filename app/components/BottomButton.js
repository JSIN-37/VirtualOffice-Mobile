import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomButton = (props) => {
    return (
        <TouchableOpacity style={[styles.buttonBody, {backgroundColor: props.bgcolor}]}>
            <Text style={[ styles.buttonText, {color: props.textcolor}]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        width: '70%',
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 32,
        elevation: 3,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
    }
})

export { BottomButton };