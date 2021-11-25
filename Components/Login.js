import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Platform, AlertIOS, ToastAndroid } from 'react-native';
import Colors from '../assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import firestore, { firebase } from '@react-native-firebase/firestore';

var nav;
export default Login = ({ navigation }) => {

    nav = navigation;
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image source={require('../assets/images/logo2.png')} style={{ width: 90, height: 90 }} />
                <Text style={{ color: colors.white, fontSize: 18 }}>
                    Employee Attendance System
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={[styles.bodyText, { marginTop: 40 }]}>Email</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require('../assets/images/email.png')} style={styles.icons} />
                    <TextInput
                        onChangeText={onChangeEmail}
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: Colors.textDark
                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <Text style={[styles.bodyText, { marginTop: 20 }]}>Password</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require('../assets/images/password.png')} style={styles.icons} />
                    <TextInput
                        onChangeText={onChangePassword}
                        placeholder="Your Password"
                        secureTextEntry={true}
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: Colors.textDark
                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity onPress={() => loginUser(email, password)}>
                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.linearGradient, {
                        borderColor: '#3b5998', borderWidth: 1,
                        marginTop: 15
                    }]}>
                    <Text style={[styles.buttonText, { color: Colors.black, textAlign: 'center', color: '#009387' }]}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

async function loginUser(userEmail, userPassword) {

    if (!userEmail || userEmail === '') {

        if (Platform.OS === 'android') {
            ToastAndroid.show('Please enter a valid email address!', ToastAndroid.LONG)
        } else {
            AlertIOS.alert('Please enter a valid email address!');
        }
    }
    else if (!userPassword || userPassword === '') {

        if (Platform.OS === 'android') {
            ToastAndroid.show('Please enter password', ToastAndroid.LONG)
        } else {
            AlertIOS.alert('Please enter password');
        }
    }

    else if (await isUserVerified(userEmail, userPassword)) {

        nav.navigate('Home');
    }
    else {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Invalid email or password!', ToastAndroid.LONG)
        } else {
            AlertIOS.alert('Invalid email or password!');
        }
    }
}

async function isUserVerified(e, p) {

    var isValid = false;
    await firestore().collection('admins').where('email', '==', e).get()
        .then(querySnapshot => {

            if (querySnapshot.size !== 0) {

                var pass = querySnapshot.docs[0].get('password').toString();
                if (pass === p) {

                    isValid = true;
                }
                else {

                    isValid = false;
                }
            }

        });

    return isValid;

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    title: {
        height: '38%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 25,
    },
    bodyText: {
        color: colors.textColor1,
        fontSize: 18
    },
    emailWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.textInputBorder,
        paddingBottom: 0,
        alignItems: 'center'
    },
    icons: {
        width: 20,
        height: 20,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        paddingVertical: 2,
        fontSize: 14
    },
    passWrapper: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 0,
        alignItems: 'center'
    },
    linearGradient: {
        height: 42,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginTop: 50
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});