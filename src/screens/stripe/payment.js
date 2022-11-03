import React, { useState, useEffect } from 'react';
import { Text, View,TextInput,
 ImageBackground,Image,
 ScrollView,TouchableOpacity,
 Alert,  StatusBar,
 KeyboardAvoidingView,
 Platform,Keyboard, NativeModules, Picker, Button, Switch, Screen} from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';
import { useStripe } from '@stripe/stripe-react-native';
import styles from '../common/styles';
import tw from 'twrnc';
import Largebutton from '../../components/dropshipbutton/Largebutton';
import Logobase from '../../components/baseassests/Logobase';
import Paymentvector from '../../components/baseassests/Paymentvector';


// const stripePromise = loadStripe('pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa');

const Payment = () => {

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentIntent, setpaymentIntent] = useState('');
  const [ephemeralKey, setephemeralKey] = useState('');
  // const [customer, setcustomer] = useState('');

  const finalAmount = 17000;
  const customer = "cus_MarHAmfDbApr9b";
  const email = "cd@dropship.com";

  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://161.35.123.125/api/stripe/mobile-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'receiptEmail':email, 'amount':finalAmount, 'stripeCustomerId':customer }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson.data);
      // setpaymentIntent(responseJson.data.paymentIntent);
      // setephemeralKey(responseJson.data.ephemeralKey);
      // setcustomer(responseJson.data.customer);
      // setpublishableKey(responseJson.data.publishableKey);
    })
    .catch(e => Alert.alert(e.message));

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const openPaymentSheet = async () => {
    if (!paymentIntent) {
      return;
    }
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  
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
      merchantDisplayName: "anything",
      style: 'automatic',
      returnURL: 'stripe-example://stripe-redirect',
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true, // use test environment
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  


  return (
    <View style={tw.style('top-50')}>
     

      <Button variant="primary" disabled={!loading} title="Checkout" onPress={openPaymentSheet} />

 
    </View>
  );
}

export default Payment
