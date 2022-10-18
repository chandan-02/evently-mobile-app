import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const fetcher = axios.create({
    baseURL: 'https://evently-backend-api.herokuapp.com/api/v1', //dev
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
    },
});

export default fetcher;