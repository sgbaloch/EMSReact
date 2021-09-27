import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator  } from 'react-native';
import Colors from '../assets/colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import firestore from '@react-native-firebase/firestore';

function EmployeesList() {

    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('employees')
            .onSnapshot(querySnapshot => {
                const employees = [];

                querySnapshot.forEach(documentSnapshot => {
                    employees.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setEmployees(employees);
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
            data={employees}
            renderItem={({ item }) => (
                <View>
                    <View style={styles.listItem}>
                        <View style={styles.image}>
                            <Image source={require('../assets/images/employee.png')}
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%'
                                }} />
                        </View>
                        <View style={styles.nameSection}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.firstName}</Text>
                                <Text>{item.designation}</Text>
                            </View>
                            <Image style={{ width: 12, height: 12 }} source={require('../assets/images/menu.png')} />
                        </View>

                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: colors.textLight }}></View>
                </View>
            )}
        />
    );
}

const ListItem = (props) => {
    return (
        <View>
            <View style={styles.listItem}>
                <View style={styles.image}>
                    <Image source={require('../assets/images/employee.png')}
                        style={{
                            flex: 1,
                            width: '100%',
                            height: '100%'
                        }} />
                </View>
                <View style={styles.nameSection}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                        <Text>{props.designation}</Text>
                    </View>
                    <Image style={{ width: 12, height: 12 }} source={require('../assets/images/menu.png')} />
                </View>

            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: colors.textLight }}></View>
        </View>
    );
}

export default Employees = ({ navigation }) => {

    return (
        <View style={
            {
                backgroundColor: colors.white,
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 18
            }}>

            {EmployeesList()}
            {/* <ListItem name="Sarfaraz Ghaffar" designation="Android developer" />
            <ListItem name="Anthony Anthony" designation="Web developer" />
            <ListItem name="Michelle Michelle" designation="Graphics designer" />

            <ListItem name="Sarfaraz Ghaffar" designation="Android developer" />
            <ListItem name="Anthony Anthony" designation="Web developer" />
            <ListItem name="Michelle Michelle" designation="Graphics designer" /> */}

        </View>
    );
}

const styles = StyleSheet.create({

    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,

    },
    image: {
        width: 60,
        height: 60,
        padding: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.price
    },
    nameSection: {
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        paddingHorizontal: 8,
        alignItems: 'center'
    }
})