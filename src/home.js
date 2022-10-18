import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {

    return (
        <>
            <View style={{
                backgroundColor: '#fff', alignItems: 'flex-end',
                marginTop: Constants.statusBarHeight, paddingRight: 20,
                paddingTop: 10,
            }}>
                <TouchableOpacity
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        navigation.dispatch(
                            StackActions.replace('login')
                        );
                    }}>
                    <Ionicons name='log-out-outline' size={28} color='#101727' />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>

                <Image
                    style={styles.illus}
                    source={require('../assets/illus.jpg')}
                />

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('scan')}>
                    <Text style={{ color: '#fff', paddingHorizontal: 20 }}>Scan Ticket</Text>
                </TouchableOpacity>


            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:- Constants.statusBarHeight
    },
    btn: {
        backgroundColor: '#101727',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 5
    },
    illus: {
        height: windowWidth - 69,
        width: windowWidth - 69
    }
});
