import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Platform, AlertIOS, ToastAndroid } from 'react-native';
import Colors from '../assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import firestore, { firebase } from '@react-native-firebase/firestore';


export default AddEmployee = ({ navigation }) => {

    const [fName, onChangefName] = React.useState(null);
    const [lName, onChangelName] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [designation, onChangeDesignation] = React.useState(null);
    const [contact, onChangeContact] = React.useState(null);
    const [payRate, onChangePayRate] = React.useState(null);
    const [address, onChangeAddress] = React.useState(null);

    return (
        <View style={{ padding: 18 }}>
            <View style={styles.wrapper}>
                <Text style={styles.textHeading}>Employee Registration</Text>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={[styles.inputWrapper, { marginEnd: 8, flex: 1 }]}>
                        <TextInput
                            onChangeText={onChangefName}
                            placeholder="First Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {

                            }]}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={[styles.inputWrapper, { marginStart: 8, flex: 1 }]}>

                        <TextInput
                            onChangeText={onChangelName}
                            placeholder="Last Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {

                            }]}
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <View style={[styles.inputWrapper, { marginTop: 18 }]}>
                    <TextInput
                        onChangeText={onChangeEmail}
                        keyboardType='email-address'
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <View style={[styles.inputWrapper, { marginTop: 18 }]}>
                    <TextInput
                        onChangeText={onChangeContact}
                        keyboardType='phone-pad'
                        placeholder="Contact number"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <View style={[styles.inputWrapper, { marginTop: 18 }]}>
                    <TextInput
                        onChangeText={onChangeAddress}
                        placeholder="Address"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <View style={[styles.inputWrapper, { marginTop: 18 }]}>
                    <TextInput
                        onChangeText={onChangeDesignation}
                        placeholder="Designation"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <View style={[styles.inputWrapper, { marginTop: 18 }]}>
                    <TextInput
                        onChangeText={onChangePayRate}
                        keyboardType='decimal-pad'
                        placeholder="Hourly pay rate"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity onPress={() => registerEmployee()}>
                    <LinearGradient colors={['#3b5998', '#3b5998', '#3b5998']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>Add Employee</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    );

    async function registerEmployee() {

        var lastDoc = firestore().collection('employees').orderBy('dateCreated', 'desc').limit(1).get();
        console.log((await lastDoc).docs[0].id);
        var lastDocId = (await lastDoc).docs[0].id;
        lastDocId++;
    
        var timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
    
        await firestore()
            .collection('employees')
            .doc(lastDocId.toString())
            .set({
                firstName: fName,
                lastName: lName,
                address:address,
                email:email,
                contact:contact,
                designation:designation,
                payRate:payRate,
                dateCreated:timeStamp
            })
            .then(() => {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Employee added succesfully!', ToastAndroid.LONG)
                  } else {
                    AlertIOS.alert('Employee added successfully!');
                  }
            });
            
    }
}

const styles = StyleSheet.create({

    wrapper: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        elevation: 2,
        paddingVertical: 12,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    textHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    inputWrapper: {
        flexDirection: 'row',
        marginTop: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        color: '#05375a',
        paddingVertical: 2,
        fontSize: 14
    },
    linearGradient: {
        height: 42,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginTop: 60,
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