import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Alert } from 'react-native';
import { TimeBox } from '../components/TimeBox';
import { BottomButton } from '../components/BottomButton';
import * as Location from 'expo-location';
import { ProgressBar, Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';

function HomeStart(props) {
    
    const [working, setWorking] = useState(false);
    const [lastKnowDate, setLastKnowDate] = useState();
    const [startTime, setStartTime] = useState(0);
    const [finishTime, setFinishTime] = useState(0);
    const [workedHours, setWorkedHours] = useState(0);
    const [workedMins, setWorkedMins] = useState(0);
    const [workedSecs, setWorkedSecs] = useState(0);
    const [fullDay, setFullDay] = useState(false);
    const [checkoutHappened, setCheckoutHappened] = useState(false);
    const [greeting, setGreeting] = useState('null');
    const [buttonText, setButtonText] = useState('Start Working!');
    const [buttonColor, setButtonColor] = useState(colors.purpleBright);
    const [buttonTextColor, setButtonTextColor] = useState(colors.white);
    const [location, setLocation] = useState(null);
    const [locationText, setLocationText] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [progressColor, setProgressColor] = useState(colors.greyText);
    const [progressRate, setProgressRate] = useState(0);

    const todayShift = {
        checkin: "",
        checkout: "",
        workHours: 10,
        workMins: 45,
        fullDay: true,
    }
    //const todayShift = getTodayData();

    //Send data to the backend after log the check-out
    const sendTodayData = (finishTime) => {
        axios
        .post("http://35.232.73.124:3040/api/v1/docs/#/User", {
            checkin: startTime,
            checkout: finishTime,
            workHours: workedHours,
            workMins: workedMins,
            workSecs: workedSecs,
            fullDay: fullDay, 
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    };

    //Get the response from the backend whether the person has logged a check-in/check-out today
    const getTodayData = () => {
        axios
        .get("http://35.232.73.124:3040/api/v1/docs/#/User")
        .then((res) => {
            let data = res.data;
            return data; //data should include check-in time, check-out time, if the person has already done a check-in/check-out today
        }, (error) => {
            console.log(error);
        });
    };
    
    useEffect(() => {
        checkGreeting();
        checkStartWorking();
    }, []); 

    //setting greeting message
    const checkGreeting = () => {
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
    }

    //getting the work start time (if started) when the app is opened
    useEffect(() => {
        if (working) {
            setButtonText('Finish Working!');
            setButtonColor(colors.yellowBright);
            setButtonTextColor(colors.black);
        } else {            
            setButtonText('Start Working!');
            setButtonColor(colors.purpleBright);
            setButtonTextColor(colors.white);
        }
    }, [working]);
    
    /* useEffect(() => {
        console.log(location);
        let text = '';
        if (errorMessage){
            text = errorMessage;
        } else if (location) {
            text = JSON.stringify(location);
        }
        setLocationText(text);
    }, [location]) */

    //update work duration
    useEffect(() => {
        const interval = setInterval(() => {
            if (working) {
                let diff = new Date().getTime() - startTime;
                console.log(diff);
                calculateHoursMins(diff);
                updateProgress(diff);
            }
        }, 1000);
        
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [working, startTime]);

    //calculate work progress
    const updateProgress = (msec) => {
        let progress;
        let workedTime = msec;
        if (workedTime < 36000){
            progress = workedTime / 36000; //10*60*60 (Assuming full time -> 10 hours)
        }else{
            progress = 1;
        }
        setProgressRate(progress);
        changeProgressBarColor(progress);
    }

    //change the progress bar color based on the work progress
    const changeProgressBarColor = (progress) => {
        let color;
        if (progress == 0){
            color = colors.greyText;
        } else if (progress < 0.2) {
            color = colors.danger;
        } else if (progress < 0.5){
            color = colors.orange;
        } else if (progress < 0.75) {
            color = colors.halfday;
        } else if (progress < 0.95){
            color = colors.lightGreen;
        } else {
            color = colors.fullday;
        }
        setProgressColor(color);
    }

    //calculate the hours and mins worked so far
    const calculateHoursMins = (msec) => {
        let hrs= Math.floor(msec / 1000 / 60 / 60);
        msec -= hrs * 1000 * 60 * 60;
        let mins = Math.floor(msec / 1000 / 60);
        msec -= mins * 1000 * 60;
        let secs = Math.floor(msec / 1000);
        msec -= secs * 1000;
        setWorkedHours(hrs);
        setWorkedMins(mins);
        setWorkedSecs(secs);
    }

    //update the state of work if the check-in happened today
    async function checkStartWorking () {
        try {
            let stateToday = await isStartWorkingToday();
            if (stateToday){
                let checkin = await getCheckInTime();
                console.log(checkin);
                setStartTime(checkin);
                setWorking(true);
            } else if (todayShift != null) {
                setCheckoutHappened(true);
            }
        } catch (error) {
            console.log('Check start working error');
        }
    }

    //check whether a check-in happened today
    async function isStartWorkingToday () {
        try {
            let lastDate = await getLastKnownDate();
            if (lastDate){
                return true;
            }
            console.log('is working?');
            return false;
        } catch (error) {
            console.log('Check start working error');
        }
    }

    //store the date in async storage when start working (to avaid check-in twice in the same day.)
    async function rememberKnownDate () {
        try {
            await AsyncStorage.setItem('last-known-date', JSON.stringify(new Date().toDateString()));
            console.log('remember date');
        } catch (error) {
            console.log('Remember known date error');
        }
    }

    //get last known working date
    async function getLastKnownDate () {
        try {
            let lastDate = await AsyncStorage.getItem('last-known-date');
            return lastDate != null ? JSON.parse(lastDate) : null;
        } catch (error) {
            console.log('Last known date error');
        }
    }

    //Save start time in async storage
    async function rememberCheckInTime (time) {
        try {
          await AsyncStorage.setItem('check-in-time', JSON.stringify(time));
          console.log('remember');
        } catch (error) {
          console.log('Remember checkin time error');
        }
    };

    //get last known check-in time
    async function getCheckInTime () {
        try {
            let checkin = await AsyncStorage.getItem('check-in-time');
            return checkin != null ? JSON.parse(checkin) : 0;
        } catch (error) {
            console.log('Get checkin time error');
        }
    }

    //Reset start time and last known date in asyc storage when finish working
    async function resetWork () {
        try {
          await AsyncStorage.removeItem('check-in-time');
          await AsyncStorage.removeItem('last-known-date');
        } catch (error) {
          console.log('Reset start time error');
        }
    };

    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          working ? 
            "Once you confirm you cannot change your check-out time again." 
          :
            "Once you confirm you cannot change your check-in time again.",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                workStateChange();
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    const workStateChange = () => {
        if (!working){
            startWorkingAsync();
        }else{
            stopWorkingAsync();
        }
    }

    const startWorkingAsync = async () => {
        setButtonText('Waiting...');
        let { status } = await Location.requestForegroundPermissionsAsync(); //ask permissions to get access the user location
        if (status !== 'granted'){
            setErrorMessage('Permission to access location was denied');
            return;
        }
        console.log('here1');
        /* let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true, timeout: 20000, maximumAge: 6000});
        setLocation(currentLocation); */
        setWorking(true); 
        setStartTime(new Date().getTime());
        rememberCheckInTime(new Date().getTime());
        rememberKnownDate();
    }

    const stopWorkingAsync = async () => {
        setButtonText('Waiting...');
        let { status } = await Location.requestForegroundPermissionsAsync(); //ask permissions to get access the user location
        if (status !== 'granted'){
            setErrorMessage('Permission to access location was denied');
            return;
        }
        console.log('here1');
        /* let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true, timeout: 20000, maximumAge: 6000});
        setLocation(currentLocation);
        console.log(currentLocation); */
        setFullDay(workedHours < 10 ? false : true);
        setWorking(false); 
        setFinishTime(new Date().getTime());
//        sendTodayData(new Date().getTime());
        resetWork();
    }

    return (
        <View style={styles.container} >
            <View style={styles.rowContainer}>
                <Text style={styles.greeting}>{greeting}</Text>
            </View>
            <View style={[styles.rowContainer, {justifyContent: 'center'}]}>
                <TouchableOpacity onPress={showConfirmDialog} style={[styles.buttonBody, {backgroundColor: buttonColor}]}>
                    <Text style={[ styles.buttonText, {color: buttonTextColor}]}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowContainer, {justifyContent: 'center'}]}>
                {working ? (
                <ProgressBar style={styles.progress} 
                    borderRadius={30} 
                    duration={1000} 
                    progress={progressRate} 
                    color={progressColor} 
                />) : null}      
            </View>
            <TimeBox hrs = {`${workedHours.toString().length === 1 ? "0"+workedHours : workedHours}`} 
            mins = {`${workedMins.toString().length === 1 ? "0"+workedMins : workedMins}`}
            secs = {` ${workedSecs.toString().length === 1 ? "0"+workedSecs : workedSecs}`}
            />
            <BottomButton onPress={() => props.navigation.navigate('Calendar', {userToken: props.navigation.getParam('userToken')})} text={'My Attendance Report'} textcolor = {colors.black} bgcolor ={colors.purpleLighter}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 30,
        width: '100%',
    },
    greeting: {
        fontSize: 26,
    },
    buttonBody: {
        width: 190,
        height: 190,
        borderRadius: 95,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    progress: {
        borderRadius: 10,
        height: 15,
        width: Dimensions.get('window').width - 70,
    }
})
export default HomeStart;