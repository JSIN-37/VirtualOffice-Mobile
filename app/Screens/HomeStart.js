import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Platform, StyleSheet, StatusBar, Button, AppState, TouchableOpacity } from 'react-native';
import { TimeBox } from '../components/TimeBox';
import { BottomButton } from '../components/BottomButton';
import { differenceInSeconds } from 'date-fns';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import colors from '../config/colors';


function HomeStart(props) {
    
    const [timer, setTimer] = useState(false);
    const [currrentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer) {
                setCurrentTime(currrentTime+1);
            }
        }, 1000);
        
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.greeting}>Good Morning!</Text>
            <TouchableOpacity onPress={(timer) => setTimer(!timer)} style={[styles.buttonBody, {backgroundColor: colors.purpleBright}]}>
                <Text style={[ styles.buttonText, {color: colors.white}]}>Start Working!</Text>
            </TouchableOpacity>
            <TimeBox bgcolor={colors.timeBoxDark} hrs={'00'} mins={'00'} secs={'00'}/>
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
export default HomeStart;