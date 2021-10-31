import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../assets/colors/colors';

export default Home = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={styles.title}>
                <View>
                    <Text style={styles.titleText}>EAS React</Text>
                </View>     
            </View>
            <View style={styles.body}>
                <View style={styles.bodyRow1}> 
                    <TouchableOpacity onPress={() => navigation.navigate('AddEmployee')}>
                    <View style={styles.cell}>
                        <Image source={require('../assets/images/employee.png')} style={styles.cellImage}/>
                        <Text style={{marginTop:10, fontWeight: '600'}}>Add new employee</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Employees')}>
                    <View style={styles.cell}>
                        <Image source={require('../assets/images/employees.png')} style={styles.cellImage}/>
                        <Text style={{marginTop:10, fontWeight: '600'}}>View employee list</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyRow2}> 
                    <TouchableOpacity onPress={() => navigation.navigate('ViewAttendSearch')}>
                    <View style={styles.cell}>
                        <Image source={require('../assets/images/attendance.png')} style={styles.cellImage}/>
                        <Text style={{marginTop:10, fontWeight: '600'}}>View attendance</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Salary')}>
                    <View style={styles.cell}>
                        <Image source={require('../assets/images/salary2.png')} style={styles.cellImage}/>
                        <Text style={{marginTop:10, fontWeight: '600'}}>Calculate Salary</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
      );
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
    },

    title: {
        backgroundColor: Colors.primary,
        height: '30%',
        borderBottomStartRadius: 28,
        borderBottomEndRadius: 28,
        justifyContent: 'center'
    },
    body: {
        flex: 1,
    },

    titleText:{
        width: 300,
        alignSelf: 'center',
        fontSize: 25,
        textAlign: 'center',
        flexDirection: 'column-reverse',
        color: Colors.white,
    },
    bodyRow1: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-evenly',
        marginHorizontal: 10,
    },
    bodyRow2: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
        marginHorizontal: 10,
    },
    cell:{
        width:160,
        height:160,
        backgroundColor: Colors.white,
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems:'center'
    },
    cellImage:{
        width: 52,
        height: 52,
    }
});