import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Dimensions, Platform, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// funcitonality
import fetcher from '../functionality/axios';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const Scan = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [id, setId] = useState('');
    const [txt, setTxt] = useState('Please provide a qrcode.')

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        if (data.includes('ukk') || data.includes('even')) {
            setScanned(true);
            setTxt(`Booking Id: ${data}`)
            setId(data);
        } else {
            setScanned(false);
            setTxt('Please provide a valid qrcode')
        }
    };

    const permissionInfo = () => {
        if (hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
    }
    useEffect(() => {
        if (scanned) {
            setTxt('Please provide a qrcode.')
            const getBookingData = async (id) => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    const resLogin = await fetcher.get(`/book/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    let res = resLogin.data;
                    if (res?.success) {
                        // console.log(res?.data)
                        navigation.navigate('booking', { data: res?.data });
                    }

                } catch (error) {
                    if (error.response.data) {
                        alert(`${error.response.data.data}`);
                        navigation.navigate('home');
                    }
                }
            }
            getBookingData(id);
        }
    }, [scanned])

    return (
        <View style={styles.container}>
            {
                permissionInfo()
            }
            {
                Platform.OS == 'ios' &&
                <>

                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ width: windowWidth, height: 400 }}
                    >
                    </BarCodeScanner>
                    <Text style={{ marginTop: 10, fontSize: 18, }}>{txt}</Text>
                    {
                        scanned && <ActivityIndicator style={{ marginTop: 10 }} color="#101727" />
                    }
                </>
            }
            {
                Platform.OS == 'android' &&
                <>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={[StyleSheet.absoluteFillObject, styles.barcodeStyling]}
                    >
                        <View style={styles.box}>
                        </View>
                        <Text style={{ marginTop: 15, fontSize: 18, color: '#fff' }}>{txt}</Text>
                        {
                            scanned && <ActivityIndicator style={{ marginTop: 10 }} color="#fff" />
                        }
                    </BarCodeScanner>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f6f33f',
        width: windowWidth,
        // padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodeStyling: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: windowWidth - 69,
        backgroundColor: 'transparent',
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius: 10,
        height: 400
    }
})

export default Scan;