import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Platform, StyleSheet, StatusBar, Button, AppState } from 'react-native';
import { MiddleButton } from '../components/MiddleButton';
import { TimeBox } from '../components/TimeBox';
import { BottomButton } from '../components/BottomButton';
import { differenceInSeconds } from 'date-fns';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import colors from '../config/colors';


function HomeStart(props) {
    /* const appState = useRef(AppState.currentState);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);
        return () => AppState.removeEventListener("change", handleAppStateChange);
    }, []);

    const handleAppStateChange = async (nextAppState) => {
        if (appState.current.match(/inactive|background/) &&
            nextAppState === "active") {
            // We just became active again: recalculate elapsed time based 
            // on what we stored in AsyncStorage when we started.
            const elapsed = await getElapsedTime();
            // Update the elapsed seconds state
            setElapsed(elapsed);
        }
        appState.current = nextAppState;
    };

    const getElapsedTime = async () => {
        const startTime = await AsyncStorage.getItem("@start_time");
        const now = new Date();
        return differenceInSeconds(now, Date.parse(startTime));
    };

    const recordStartTime = async () => {
        const now = new Date();
        await AsyncStorage.setItem("@start_time", now.toISOString());
    }; */

    return (
        <View style={styles.container} >
            <Text style={styles.greeting}>Good Morning!</Text>
            <MiddleButton text={'Start Working'} textcolor = {colors.white} bgcolor ={colors.purpleBright}/>
            <TimeBox bgcolor={colors.timeBoxDark}/>
            <BottomButton text={'My Attendance Report'} textcolor = {colors.black} bgcolor ={colors.purpleLighter}/>
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
    }
})
export default HomeStart;