import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import colors from '../assets/colors/colors';

export default ViewAttendance = ({ route, navigation }) => {

    const { id, startDate, endDate } = route.params;

    return (
        <View style={styles.wrapper}>
            <View style={styles.titleWrapper}>
                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={styles.image}>
                        <Image source={require('../assets/images/employee.png')}
                            style={{
                                flex: 1,
                                width: '100%',
                                height: '100%'
                            }} />
                    </View>
                    {getEmployeeName(id)}
                </View>
                <View style={{ flex: 2, flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold' }}>Emp ID: {id}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 12, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>
                    For the period: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </Text>
            </View>
            {attendanceList(id, new Date(startDate), new Date(endDate))}
        </View>
    );
}

function getEmployeeName(empID) {

    const [empName, setEmpName] = useState('');
    const [designation, setDesignation] = useState('');

    useEffect(() => {
        const subscriber = firestore()
            .collection('employees')
            .doc(empID)
            .onSnapshot(documentSnapshot => {

                if (documentSnapshot.exists) {

                    var emName = documentSnapshot.get('firstName') + ' ' + documentSnapshot.get('lastName');
                    setEmpName(emName);

                    var desig = documentSnapshot.get('designation');
                    setDesignation(desig);
                }
            });


        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    return (
        <View style={{ alignSelf: 'center', marginStart: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{empName}</Text>
            <Text>{designation}</Text>
        </View>

    );
}

function attendanceList(id, stDate, enDate) {

    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('attendance')
            .where('timeIn', '>=', stDate)
            .where('timeIn', '<=', enDate)
            .where('empId', '==', +id)
            .onSnapshot(querySnapshot => {
                const attendList = [];

                querySnapshot.forEach(documentSnapshot => {
                    attendList.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setAttendance(attendList);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <FlatList
            ListHeaderComponent={header()}
            data={attendance}
            renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listText}>{timeStampToLocaleDateStr(item.timeIn)}</Text>
                    <Text style={styles.listText}>{timeStampToLocaleTimeStr(item.timeIn)}</Text>
                    <Text style={styles.listText}>{timeStampToLocaleTimeStr(item.timeOut)}</Text>
                    <Text style={styles.listText}>{getHoursWorked(item.timeIn, item.timeOut)}</Text>
                </View>
            )}
            ListFooterComponent={footer(getTotalHours(attendance))}
        />
    )

    function getTotalHours(attList) {

        var totalHours = 0;

        attList.forEach(element => {

            var timeIn = new firebase.firestore
                .Timestamp(element.timeIn.seconds, element.timeIn.nanoseconds).toDate();
            var timeOut = new firebase.firestore
                .Timestamp(element.timeOut.seconds, element.timeOut.nanoseconds).toDate();

            var hours = Math.abs(timeOut - timeIn) / 3600000;

            totalHours = totalHours + hours;
        });

        var hourStr = Math.floor(totalHours);

        var minuteStr = ((totalHours % 1).toFixed(2) * 60).toString();

        if (hourStr.length < 2) {

            hourStr = '0' + hourStr;
        }

        if (minuteStr.length < 2) {

            minuteStr = '0' + minuteStr;
        }

        return hourStr + ':' + minuteStr;
    }
}

function timeStampToLocaleDateStr(stamp) {

    return new firebase.firestore.Timestamp(stamp.seconds, stamp.nanoseconds).toDate().toLocaleDateString();
}

function timeStampToLocaleTimeStr(stamp) {

    return new firebase.firestore.Timestamp(stamp.seconds, stamp.nanoseconds).toDate().toLocaleTimeString();
}

function getHoursWorked(tmIn, tmOut) {

    var timeIn = new firebase.firestore.Timestamp(tmIn.seconds, tmIn.nanoseconds).toDate();
    var timeOut = new firebase.firestore.Timestamp(tmOut.seconds, tmOut.nanoseconds).toDate();
    var hours = Math.abs(timeOut - timeIn) / 3600000;
    var minutes = (hours % 1).toFixed(2) * 60;

    var hourStr = Math.floor(hours).toString();

    if (hourStr.length < 2) {

        hourStr = '0' + hourStr;
    }

    var minuteStr = minutes.toString();

    if (minuteStr.length < 2) {

        minuteStr = '0' + minuteStr;
    }

    return hourStr + ':' + minuteStr;
}

function header() {

    return (
        <View style={{ flexDirection: 'row', backgroundColor: colors.primary }}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Time In</Text>
            <Text style={styles.headerText}>Time Out</Text>
            <Text style={styles.headerText}>Hours</Text>
        </View>
    )
}

function footer(totalHours) {

    return (

        <View style={{ flexDirection: 'row', marginVertical: 5, borderTopWidth: 1, borderBottomWidth: 1 }}>

            <Text style={{ flex: 3, textAlign: 'right', fontWeight: 'bold' }}>
                Total Hours Worked
            </Text>

            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>
                {totalHours}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
        padding: 18,
        backgroundColor: colors.white
    },
    headerText: {

        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.white,
        marginVertical: 2
    },
    listText: {

        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        marginVertical: 5
    },
    titleWrapper: {

        flexDirection: 'row'
    },
    image: {
        width: 54,
        height: 54,
        padding: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.price
    }
})