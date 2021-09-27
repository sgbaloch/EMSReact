import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';

export default ViewAttendSearch = ({ navigation }) => {

    return (
        <View style={
            {
                paddingHorizontal: 20,
                paddingVertical: 12,
                flex:1,
                backgroundColor:colors.white
            }}>
            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', color:colors.primary}}>
                    Please enter details
                </Text>
                <View style={[styles.inputWrapper, {marginTop:18}]}>
                    <TextInput
                        placeholder="Employee ID"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {

                        }]}
                        autoCapitalize="none"
                    />
                </View>
                <Text style={{marginTop: 18}}>
                    For the period
                </Text>
                <Text style={{color:colors.textGrey, marginTop:10}}>
                    From
                </Text>
                <View style={[styles.dateContainer, {marginTop:8}]}>
                    <Text>Select Start Date</Text>
                </View>
                <Text style={{color:colors.textGrey, marginTop:8}}>
                    To
                </Text>
                <View style={[styles.dateContainer, {marginTop:8}]}>
                    <Text>Select End Date</Text>
                </View>
                <TouchableOpacity>
                    <LinearGradient colors={['#3b5998', '#3b5998', '#3b5998']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>View Attendance</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        width: '100%',
        
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical:18,
        paddingHorizontal:18
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
    dateContainer:{
        borderWidth:1,
        borderColor:colors.price,
        borderRadius:10,
        padding:6
    },
    linearGradient: {
        height: 42,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginTop: 30,
        justifyContent:'center'
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