import * as React from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import Colors from '../assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';

export default Login = ({navigation}) => {

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Image source={require('../assets/images/logo2.png')} style={{width:90, height:90}}/>
                <Text style={{color: colors.white, fontSize:18}}>
                    Employee Attendance System
                </Text>
            </View>
            <View style={styles.body}>
                <Text style={[styles.bodyText, {marginTop: 40}]}>Email</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require('../assets/images/email.png')} style={styles.icons}/>
                    <TextInput 
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: Colors.textDark
                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <Text style={[styles.bodyText, {marginTop: 20}]}>Password</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require('../assets/images/password.png')} style={styles.icons}/>
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: Colors.textDark
                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AddEmployee')}
                    style={[styles.linearGradient, {borderColor: '#3b5998', borderWidth:1,
                    marginTop: 15}]}>
                    <Text style={[styles.buttonText,{color: Colors.black, textAlign: 'center', color: '#009387'}]}>
                        Register
                    </Text> 
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: Colors.primary,
    },
    title:{
        height: '38%',
        justifyContent: 'center',
        alignItems:'center'
    },
    body:{
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 25,
    },
    bodyText:{
        color: '#05375a',
        fontSize: 18
    },
    emailWrapper:{
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 0,
        alignItems: 'center'
    },
    icons:{
        width:20,
        height:20,
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