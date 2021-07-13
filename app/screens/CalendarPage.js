import React from 'react';
import { Calendar } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { BottomButton } from '../components/BottomButton';
import colors from '../config/colors';

const CalendarPage = (props) => {
    
    const fullday = {key: 'fullday', color: 'black', selectedColor: 'black'};
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Attendance Reports</Text>
            <Calendar
            style={styles.calendar}

            theme={{
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#fff244',
                todayTextColor: colors.white,
                todayBackgroundColor: colors.today,
                dayTextColor: colors.black,
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: colors.black,
                textDayFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14
            }}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
                props.navigation.navigate('Report', { 
                    day: day.day,
                    month: day.month,
                    year: day.year,
                    dateString: day.dateString,
                });
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
                console.log('month changed', month);
            }}
            renderArrow={(direction) => direction === 'left' ? 
                <Icon name='chevron-left'
                type='feather'
                color={colors.purpleDark}
                /> : <Icon
                name='chevron-right'
                type='feather'
                color={colors.purpleDark}
                />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}            
            markingType={'custom'}
            markedDates={{
                '2021-07-01': {customStyles: {
                    container: {
                    backgroundColor: colors.fullday,
                    },
                    text: {
                    color: colors.white,
                    fontWeight: 'bold'
                    }
                }},
                '2021-07-02': {customStyles: {
                    container: {
                    backgroundColor: colors.fullday,
                    },
                    text: {
                    color: colors.white,
                    fontWeight: 'bold'
                    }
                }},
                '2021-07-06': {customStyles: {
                    container: {
                    backgroundColor: colors.fullday,
                    },
                    text: {
                    color: colors.white,
                    fontWeight: 'bold'
                    }
                }},
                '2021-07-07': {customStyles: {
                    container: {
                    backgroundColor: colors.fullday,
                    },
                    text: {
                    color: colors.white,
                    fontWeight: 'bold'
                    }
                }},
                '2021-07-08': {customStyles: {
                    container: {
                    backgroundColor: colors.halfday,
                    },
                    text: {
                    color: colors.black,
                    fontWeight: 'bold'
                    }
                }},
                '2021-07-09': {customStyles: {
                    container: {
                    backgroundColor: colors.fullday,
                    },
                    text: {
                    color: colors.white,
                    fontWeight: 'bold'
                    }
                }},
            }}
            />
            <Text style={styles.workedDays}>Worked 06 days in July</Text>
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
    calendar: {
        borderWidth: 1,
        borderColor: colors.greyTextArea,
        height: 370,
        borderRadius: 8,
        top: 20,
    },
    workedDays: {
        top: 40,
        left: 10,
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default CalendarPage;
