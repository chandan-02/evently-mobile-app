import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

const BookingInfo = ({ route, navigation }) => {
    const { data } = route.params;
    console.log(data)
    return (
        <View style={styles.container}>

            <Pressable style={styles.header} onPress={() => navigation.navigate('home')}>
                <Ionicons name='arrow-back' size={28} color='#101727' />
                <Text style={styles.headerText}>Go back</Text>
            </Pressable>

            <Ionicons name='md-checkmark-circle' size={128} color='#45B182' style={{ marginTop: 37, }} />
            <View style={styles.main}>

                <View style={styles.tab}>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Event
                    </Text>
                    <Text style={{ flex: 2 }}>{data?.eventid?.title}</Text>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Booking Id
                    </Text>
                    <Text style={{ flex: 2 }}>{data?.bookingid}</Text>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Payment Id
                    </Text>
                    <Text style={{ flex: 2 }}>{data?.paymentid}</Text>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Name
                    </Text>
                    <Text style={{ flex: 2 }}>{data?.customerid?.name}</Text>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Contact No
                    </Text>
                    <Text style={{ flex: 2 }}>
                        {data?.customerid?.mobile}
                    </Text>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Email
                    </Text>
                    <Text style={{ flex: 2 }}>{data?.customerid?.email}</Text>
                </View>

                <View style={styles.tab}>
                    <Text style={styles.txt}>
                        Seats
                    </Text>
                    <Text style={{ flex: 2 }}>{data?.seats}</Text>
                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Constants.statusBarHeight + 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        width: windowWidth,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 15
    },
    headerText: {
        color: '#101727',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 15

    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        width: windowWidth,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        paddingVertical: 12,
        borderBottomColor: '#EFEFEF'
    },
    main: {
        // paddingTop: 20,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        flex: 1.1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#101727'
    }
})
export default BookingInfo;