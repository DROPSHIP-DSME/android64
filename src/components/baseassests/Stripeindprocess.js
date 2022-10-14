import React, { useState, useCallback, useEffect } from "react";
import { Text, View,TextInput,
    Image,  SafeAreaView,
    ScrollView, TouchableOpacity,
    Alert, Linking,
    KeyboardAvoidingView,
    Platform, Keyboard, NativeModules, Button,Dimensions } from 'react-native';
import tw from 'twrnc';
import Logobase from './Logobase';

const Stripeindprocess = () => {
    
    const [firstName, setfirstName] = useState("Aushie");
    const [lastName, setlastName] = useState("Robinson");
    const [line1, setLine1] = useState("598 Virginia Street");
    const [line2, setLine2] = useState("Apartment 2234");
    const [city, setCity] = useState("New York");
    const [email, setEmail] = useState("sally.west@dropship.com");
    const [zipCode, setZipcode] = useState("14624");
    const [phone, setPhone] = useState("0000000000");
    const [refreshUrl, setrefreshUrl] = useState("https://example.com");
    const [returnUrl, setreturnUrl] = useState("https://example.com");
 
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(JSON.stringify(data));
    const supportedURL = data;

    useEffect(() => {
        const response = fetch(`http://161.35.123.125/api/stripe/account/express-account/individual` , { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, line1, line2, city, email, zipCode, phone, refreshUrl, returnUrl }),
         })
        .then(response => response.json())
        .then((responseJson) => {
            console.log(responseJson.data.url);
            setData(responseJson.data.url);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);


    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, [url]);

        return (
            <View
              type="button"
              style={tw.style('bottom-1 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
            >
              <TouchableOpacity style={tw.style('h-15 w-10/11 justify-center items-center')} onPress={handlePress}>
                <Text style={tw.style('text-lg text-white')}>Create Stripe Account</Text>
              </TouchableOpacity>
            </View>
          );
    };


    return (
      
        <View>
            <OpenURLButton url={supportedURL}>Checkout</OpenURLButton>
        </View>
    
    );
    
}
   export default Stripeindprocess;