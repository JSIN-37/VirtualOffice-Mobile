import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimeBox } from '../components/TimeBox';
import { BottomButton } from '../components/BottomButton';
import * as Location from 'expo-location';

import { differenceInSeconds } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';

function HomeStart(props) {
    
    const [workTimer, setWorkTimer] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [greeting, setGreeting] = useState('null');
    const [buttonText, setButtonText] = useState('Start Working!');
    const [buttonColor, setButtonColor] = useState(colors.purpleBright);
    const [buttonTextColor, setButtonTextColor] = useState(colors.white);
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    //setting greeting message
    useEffect(() => {
        const today = new Date();
        const curHr = today.getHours();
        let greetText = '';

        if (curHr < 12) {
            greetText = 'Good Morning!';
        } else if (curHr < 18) {
            greetText = 'Good Afternoon!';
        } else {
            greetText = 'Good Evening!';    
        }
        setGreeting(greetText);
    }, []); 

    //seconds counter
    useEffect(() => {
        const interval = setInterval(() => {
            if (workTimer) {
                setCurrentTime(previousTime => previousTime + 1);

            }
        }, 1000);
        
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [workTimer]);

    //check location before start working
    const startWorkingAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            setErrorMessage('Permission to access location was denied');
            return;
        }
        console.log('here1');
        let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true, timeout: 20000, maximumAge: 6000});
        setLocation(currentLocation);
        console.log(currentLocation);
        setWorkTimer(workTimer => !workTimer); 
        setButtonText(currentText => currentText === 'Start Working!' ? 'Finish Working!' : 'Start Working!');
        setButtonColor(curColor => curColor === colors.purpleBright ? colors.yellowBright : colors.purpleBright);
        setButtonTextColor(curColor => curColor === colors.white ? colors.black : colors.white)
    }

    let text='Waiting...';
    if (errorMessage){
        text = errorMessage;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container} >
            <Text style={styles.greeting}>{greeting}</Text>
            <TouchableOpacity onPress={startWorkingAsync} style={[styles.buttonBody, {backgroundColor: buttonColor}]}>
                <Text style={[ styles.buttonText, {color: buttonTextColor}]}>{text}</Text>
            </TouchableOpacity>
            <TimeBox bgcolor={colors.timeBoxDark} hrs={'00'} mins={'00'}/>
            <BottomButton onPress={() => props.navigation.navigate('Calendar')} text={'My Attendance Report'} textcolor = {colors.black} bgcolor ={colors.purpleLighter}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 26,
        position: 'absolute',
        top: 30,
        left: 30,
    },
    buttonBody: {
        width: 190,
        height: 190,
        borderRadius: 95,
        alignSelf: 'center',
        top: 115,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
    }
})
export default HomeStart;