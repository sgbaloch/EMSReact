import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import DatePicker from 'react-native-date-picker'

export default ViewAttendSearch = ({ navigation }) => {

    const [empId, onChangeEmpId] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);

    return (
        <View style={
            {
                paddingHorizontal: 20,
                paddingVertical: 12,
                flex: 1,
                backgroundColor: colors.white
            }}>
            <View style={styles.card}>
                <Text style={{ fontWeight: 'bold', color: colors.primary }}>
                    Please enter details
                </Text>
                <View style={[styles.inputWrapper, { marginTop: 18 }]}>
                    <TextInput
                        onChangeText={onChangeEmpId}
                        placeholder="Employee ID"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <Text style={{ marginTop: 18 }}>
                    For the period
                </Text>
                <Text style={{ color: colors.textGrey, marginTop: 10 }}>
                    From
                </Text>
                <TouchableOpacity onPress={() => setStartOpen(true)}>
                    <View style={[styles.dateContainer, { marginTop: 8 }]}>
                        <Text>{startDate.toDateString()}</Text>
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={startOpen}
                    date={startDate}
                    mode='date'
                    onConfirm={(date) => {
                        setStartOpen(false)
                        setStartDate(date)
                    }}
                    onCancel={() => {
                        setStartOpen(false)
                    }}
                />
                <Text style={{ color: colors.textGrey, marginTop: 8 }}>
                    To
                </Text>
                <TouchableOpacity onPress={() => setEndOpen(true)}>
                    <View style={[styles.dateContainer, { marginTop: 8 }]}>
                        <Text>{endDate.toDateString()}</Text>
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={endOpen}
                    date={endDate}
                    mode='date'
                    onConfirm={(date) => {
                        setEndOpen(false);
                        setEndDate(date);
                        if (!(+date > +startDate)) {

                            setEndDate(new Date())
                            if (Platform.OS === 'android') {
                                ToastAndroid.show('End date cannot be less than start date', ToastAndroid.LONG)
                            } else {
                                Alert.alert("Employee added succesfully!");
                            }
                        }

                    }}
                    onCancel={() => {
                        setEndOpen(false);
                    }}
                />
                <TouchableOpacity onPress={() => onButtonPress(empId, startDate, endDate)}>
                    <LinearGradient colors={['#3b5998', '#3b5998', '#3b5998']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>View Attendance</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );

    function onButtonPress(id, stDate, enDate) {

        if (id === '') {

            if (Platform.OS === 'android') {
                ToastAndroid.show('Please enter employee ID', ToastAndroid.LONG)
            } else {
                Alert.alert("Employee added succesfully!");
            }
        }
        else {
            navigation.navigate('ViewAttendance', {

                id: id,
                startDate: stDate.toDateString(),
                endDate: enDate.toDateString()
            });
        }

    }
}

const styles = StyleSheet.create({

    card: {
        width: '100%',

        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 18
    },
    inputWrapper: {
        flexDirection: 'row',
        marginTop: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    textInput: {
        flex: 1,
        color: '#05375a',
        paddingVertical: 2,
        fontSize: 14
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: colors.price,
        borderRadius: 10,
        padding: 6
    },
    linearGradient: {
        height: 42,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginTop: 30,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        alignSelf: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
})