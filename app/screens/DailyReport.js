import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Localization from 'expo-localization';
import { BottomButton } from '../components/BottomButton';

import colors from '../config/colors';

const DailyReport = (props) => {
    
    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const  shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [day, setDay] = useState(props.navigation.getParam('day', 1));
    const [month, setMonth] = useState(props.navigation.getParam('month', 1));
    const [year, setYear] = useState(props.navigation.getParam('year', 2021));
    const [dateString, setDateString] = useState(props.navigation.getParam('dateString', "2021-01-01"));

    const [checkin, setCheckin] = useState('--');
    const [checkout, setCheckout] = useState('--');
    const [workDuration, setWorkDuration] = useState('--');

    const [workedHours, setWorkedHours] = useState(0);
    const [workedMins, setWorkedMins] = useState(0);
    const [workedSecs, setWorkedSecs] = useState(0);

    const [dayLabelColor, setDayLabelColor] = useState(colors.greyTextArea);
    const [dayLabelText, setDayLabelText] = useState('Off Day');
    const [dayLabelTextColor, setDayLabelTextColor] = useState(colors.black);

    //when the date get changed the daily report should be updated according to the date
    useEffect(() => {
        updateReport();
    }, [dateString])

    //when workedsecs changed update the new work duration string to be displayed in the report card
    useEffect(() => {
        setTimeout(function () {
            let durationString = getDurationString(workedHours, workedMins, workedSecs);
            setWorkDuration(durationString);
        }, 100)
    }, [workedSecs])
    
    //return the necessary data to be displayed in the daily report for the selected date
    const getDailyReport = () => {
        const config = {
            headers: { Authorization: `Bearer ${props.navigation.getParam('userToken')}` },
        };
        axios
        .get("http://35.232.73.124:3040/api/v1/docs/#/User", { date: dateString }, config)
        .then((res) => {
            let data = res.data;
            return data; //data should include check-in & check-out time (in msec), worked hours, worked mins, fullDay (true/false)
        }, (error) => {
            console.log(error);
        });
    };

    const updateReport = () => {
        //const data = getDailyReport();

        //dummy data... till the backend function is developed
        const data = {
            checkin: 1627960036,
            checkout: 1627993736,
            workHours: Math.floor(Math.random() * 10)+1,
            workMins: Math.floor(Math.random() * 60)+1,
            workSecs: Math.floor(Math.random() * 60)+1,
            full_half: Math.floor(Math.random() * 10) > Math.floor(Math.random() * 10)     
        };

        if (data != null){
            let timeDiff = data.checkout - data.checkin;
            calculateHoursMins(timeDiff);
            const checkinString = getTimeString(data.checkin);
            const checkoutString = getTimeString(data.checkout);
            setCheckin(checkinString);
            setCheckout(checkoutString);
            updateDayLabel(data.full_half);
        } else {
            setCheckin('--');
            setCheckout('--');
            setWorkDuration('00:00:00');
            setDayLabelColor(colors.greyTextArea);
            setDayLabelText('Off Day');
            setDayLabelText(colors.black);
        }
    }
    
    //forming time label
    const getTimeString = (sec) => {
        let [hrs, mins, secs] = msecsToLocalTime(sec * 1000);
        let timeLabel = hrs > 11 ? 'PM' : 'AM';
        hrs = hrs > 12 ? hrs - 12 : hrs;
        let timeString = `${hrs.toString().length == 1 ? "0"+hrs : hrs}:${mins} ${timeLabel}`;
        return timeString;
    }

    //forming duration label
    const getDurationString = (hrs, mins, secs) => {
        let duration = `${hrs.toString().length == 1 ? "0"+hrs : hrs}:${mins.toString().length == 1 ? "0"+mins : mins}:${secs.toString().length == 1 ? "0"+secs : secs}`;
        return duration;
    }
    
    //converts msecs to hrs, mins, secs
    const msecsToLocalTime = (time) => {
        let dateStamp = new Date(time);
        let timePortion = dateStamp.toLocaleString('en-US', { timeZone: Localization.timezone }).split(/[ ]+/)[3];
        let timeArray = timePortion.split(':');
        timeArray.map((item)=> parseInt(item, 10));
        return timeArray;
    }

    //calculate the hours and mins worked so far
    const calculateHoursMins = (sec) => {
        let hrs = Math.floor(sec / 60 / 60);
        sec -= hrs * 60 * 60;
        let mins = Math.floor(sec / 60);
        sec -= mins * 60;
        setWorkedHours(hrs);
        setWorkedMins(mins);
        setWorkedSecs(sec);
    }

    //update the full day/ halfday bael when the date changes
    const updateDayLabel = (isFullDay) => {
        if (isFullDay){
            setDayLabelColor(colors.fullday);
            setDayLabelText('Full Day');
            setDayLabelTextColor(colors.white);
        } else {
            setDayLabelColor(colors.halfday);
            setDayLabelText('Half Day');
            setDayLabelTextColor(colors.black);
        }
    }
    
    //View the previous day report
    const prevDate = () => {
        let currentDate = new Date(dateString);
        currentDate.setDate(currentDate.getDate() - 1);
        setDay(currentDate.getDate());
        setMonth(currentDate.getMonth()+1);
        setYear(currentDate.getFullYear());
        setDateString(currentDate.toISOString().split('T')[0]);
    }

    //View the next day report
    const nextDate = () => {
        let currentDate = new Date(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
        setDay(currentDate.getDate());
        setMonth(currentDate.getMonth()+1);
        setYear(currentDate.getFullYear());
        setDateString(currentDate.toISOString().split('T')[0]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Daily Report</Text>
            <View style={styles.reportCard}>
                <View style={styles.cardTop}>
                    <Text style={styles.topDate}>{`${day.toString().length == 1 ? "0"+day : day}`} {months[month-1]}, {year}</Text>
                    <View style={[styles.dayLabel, {backgroundColor: dayLabelColor}]}>
                        <Text style={{color: dayLabelTextColor}}>{dayLabelText}</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Check-In</Text>
                        <Text style={styles.info}>{checkin}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Check-Out</Text>
                        <Text style={styles.info}>{checkout}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Work Duration</Text>
                        <Text style={styles.info}>{workDuration}</Text>
                    </View>
                </View>
                <View style={styles.dateChangeBox}>
                    <TouchableOpacity style={styles.moveButton} onPress = {prevDate}>
                        <Icon name='chevron-left'
                            type='feather'
                            color={colors.purpleDark}
                        />
                    </TouchableOpacity>
                    <Text style={styles.bottomDate}>{`${day.toString().length == 1 ? "0"+day : day}`} {shortMonths[month-1]}, {year}</Text>
                    <TouchableOpacity style={styles.moveButton} onPress = {nextDate}>
                        <Icon name='chevron-right'
                            type='feather'
                            color={colors.purpleDark}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <BottomButton onPress={() => props.navigation.navigate('Home')} text={'Back to Home'} textcolor = {colors.white} bgcolor ={colors.purpleDull}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    topText: {
        fontSize: 24,
        fontWeight: 'bold',
        top: 5,
        alignSelf: 'center',
        color: colors.black
    },
    reportCard: {
        top: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 15,
        borderWidth: 2,
        height: 400,
        borderColor: colors.purpleBright,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomColor: colors.greyTextArea,
        borderBottomWidth: 2,
        paddingBottom: 10,
    },
    topDate:{
        fontSize: 18,
        position: 'absolute',
        top: 5,
        left: 5,
        fontWeight: 'bold',
    },
    dayLabel: {
        margin: 2,
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
    },
    infoCard: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 15,
    },
    infoLabel: {
        fontSize: 16,
        position: 'absolute',
        left: 0,    
    },
    info: {
        fontSize: 16,
    },
    dateChangeBox: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    bottomDate: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    moveButton: {
        backgroundColor: colors.greyTextArea,
        height: 70,
        width: 50,
        borderRadius: 5,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default DailyReport;