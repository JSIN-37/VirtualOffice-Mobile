import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimeBox } from '../components/TimeBox';
import { BottomButton } from '../components/BottomButton';
import { differenceInSeconds } from 'date-fns';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import colors from '../config/colors';


function HomeStart(props) {
    
    const [workTimer, setWorkTimer] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [buttonText, setButtonText] = useState('Start Working!');
    const [buttonColor, setButtonColor] = useState(colors.purpleBright);
    const [buttonTextColor, setButtonTextColor] = useState(colors.white);

    useEffect(() => {
        const interval = setInterval(() => {
            if (workTimer) {
                setCurrentTime(previousTime => previousTime + 1);

            }
        }, 1000);
        
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [workTimer]);

    /* _bootstrapAsync = async () => {
        const userToken = await props.navigation.getParam('userToken', '');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }; */

    return (
        <View style={styles.container} >
            <Text style={styles.greeting}>Good Morning!</Text>
            <TouchableOpacity onPress={() => {
                    setWorkTimer(workTimer => !workTimer); 
                    setButtonText(currentText => currentText === 'Start Working!' ? 'Finish Working!' : 'Start Working!');
                    setButtonColor(curColor => curColor === colors.purpleBright ? colors.yellowBright : colors.purpleBright);
                    setButtonTextColor(curColor => curColor === colors.white ? colors.black : colors.white)
                }} style={[styles.buttonBody, {backgroundColor: buttonColor}]}>
                <Text style={[ styles.buttonText, {color: buttonTextColor}]}>{buttonText}</Text>
            </TouchableOpacity>
            <TimeBox bgcolor={colors.timeBoxDark} hrs={'00'} mins={'00'} secs={currentTime.toString().length == 1 ? '0'+currentTime.toString() : currentTime}/>
            <BottomButton onPress={() => props.navigation.navigate('Calendar')} text={'My Attendance Report'} textcolor = {colors.black} bgcolor ={colors.purpleLighter}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
        position: 'absolute',
        top: 30,
        left: 30,
    },
    buttonBody: {
        width: 190,
        height: 190,
        borderRadius: 95,
        alignSelf: 'center',
        top: 110,
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