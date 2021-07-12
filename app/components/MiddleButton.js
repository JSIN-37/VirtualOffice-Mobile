import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

const MiddleButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.buttonBody, {backgroundColor: props.bgcolor}]}>
            <Text style={[ styles.buttonText, {color: props.textcolor}]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        width: 190,
        height: 190,
        borderRadius: 95,
        alignSelf: 'center',
        position: 'absolute',
        top: 130,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {

        fontSize: 22,
        fontWeight: 'bold',
    }
})

export { MiddleButton };



