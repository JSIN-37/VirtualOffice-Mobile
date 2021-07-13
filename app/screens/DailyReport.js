import React from 'react';
import { Pressable } from 'react-native';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { runOnJS } from 'react-native-reanimated';
import { BottomButton } from '../components/BottomButton';

import colors from '../config/colors';

const DailyReport = (props) => {
    
    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const  shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = props.navigation.getParam('day', '01');
    const month = props.navigation.getParam('month', '01');
    const year = props.navigation.getParam('year', '2021');

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Daily Report</Text>
            <View style={styles.reportCard}>
                <View style={styles.cardTop}>
                    <Text style={styles.topDate}>{day} {months[month-1]}, {year}</Text>
                    <View style={[styles.dayLabel, {backgroundColor: (day === 8) ? colors.halfday : colors.fullday}]}>
                        <Text style={{color: (day === 8) ? colors.black : colors.white}}>{(day === 8) ? 'Half Day' : 'Full Day'}</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Check-In</Text>
                        <Text style={styles.info}>{(day === 8) ? '08:30 AM' : '08:10 AM'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Check-Out</Text>
                        <Text style={styles.info}>{(day === 8) ? '01.45 PM' : '05:15 PM'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Work Duration</Text>
                        <Text style={styles.info}>{(day === 8) ? '05:15:38' : '09:05:12'}</Text>
                    </View>
                </View>
                <View style={styles.dateChangeBox}>
                    <TouchableOpacity style={styles.moveButton}>
                        <Icon name='chevron-left'
                            type='feather'
                            color={colors.purpleDark}
                        />
                    </TouchableOpacity>
                    <Text style={styles.bottomDate}>{day} {shortMonths[month-1]}, {year}</Text>
                    <TouchableOpacity style={styles.moveButton}>
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