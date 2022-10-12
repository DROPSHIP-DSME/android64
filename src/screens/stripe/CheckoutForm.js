import React, { useState, useEffect } from "react";
import { Text, View,TextInput,
 ImageBackground,Image,
 ScrollView,TouchableOpacity,
 Alert,  StatusBar,
 KeyboardAvoidingView,
 Platform,Keyboard, NativeModules, Picker, Button, Switch, Screen} from 'react-native';
import tw from 'twrnc';
import {
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';

const Checkoutform = () => {

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentIntent, setpaymentIntent] = useState('');
  const [ephemeralKey, setephemeralKey] = useState('');
  const [customer, setcustomer] = useState('');

  
  // const [publishableKey, setpublishableKey] = useState('');

  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://161.35.123.125/api/stripe/mobile-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson.data);
      setpaymentIntent(responseJson.data.paymentIntent);
      setephemeralKey(responseJson.data.ephemeralKey);
      setcustomer(responseJson.data.customer);
      // setpublishableKey(responseJson.data.publishableKey);
    })
    .catch(e => Alert.alert(e.message));

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => { 
    const {
      publishableKey = "pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa",
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();
    
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      currencyCode: "USD",
      style: "alwaysLight",
      merchantDisplayName: "anything",
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  


  return (
    <View style={tw.style('top-50')}>
      <Button disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
    </View>
  );
}

export default Checkoutform
