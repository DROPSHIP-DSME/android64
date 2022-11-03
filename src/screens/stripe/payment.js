import React, { useState, useEffect } from 'react';
import { Text, View,TextInput,
 ImageBackground,Image,
 ScrollView,TouchableOpacity,
 Alert,  StatusBar,
 KeyboardAvoidingView,
 Platform,Keyboard, NativeModules, Picker, Button, Switch, Screen} from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import styles from '../common/styles';
import tw from 'twrnc';
import Largebutton from '../../components/dropshipbutton/Largebutton';
import Logobase from '../../components/baseassests/Logobase';
import Paymentvector from '../../components/baseassests/Paymentvector';


// const stripePromise = loadStripe('pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa');

const Payment = () => {

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // const [paymentIntent, setpaymentIntent] = useState('');
  // const [ephemeralKey, setephemeralKey] = useState('');
  // const [customer, setcustomer] = useState('');

  const finalAmount = 17000;
  const customer = "cus_MarHAmfDbApr9b";
  const email = "cd@dropship.com";

  const [loading, setLoading] = useState(false);

  const checkOutPayment = async () => {

    try {
      // const finalAmount = parseInt(amount);
      // if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
      const requestOptions = {
          method: 'POST',
          headers: { 
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'receiptEmail':email, 'amount':finalAmount, 'stripeCustomerId':customer }),
      }
      const response = await fetch('http://161.35.123.125/api/stripe/mobile-payment-intent', requestOptions );
      
      const data = await response.json();
      // console.log(JSON.stringify(data));
      console.log(data.data.customer);
      if (!response.ok) {
        return Alert.alert('data.paymentIntent');
      }
      const initSheet = await initPaymentSheet({
        paymentIntentClientSecret: data.data.paymentIntent,
        customerEphemeralKeySecret: data.data.ephemeralKey,
        customerId: data.data.customer,
        allowsDelayedPaymentMethods: true,
        currencyCode: "USD",
        merchantDisplayName: "anything",
        style: 'automatic',
        returnURL: 'stripe-example://stripe-redirect',
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: true, // use test environment
        },
        
      })
      // console.log(data.data.customer);
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      console.log(data.data.customer);
      const presentSheet = await presentPaymentSheet({
        clientSecret: data.data.paymentIntent,
      });

      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }
      Alert.alert("Payment successfully!");
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };
  
  return (
    <View style={tw.style('top-50')}>
     
     <StripeProvider
        publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
        merchantIdentifier="merchant.identifier"
        >
      <Button variant="primary" title="Stripe Checkout" onPress={checkOutPayment} />
      </StripeProvider>

 
    </View>
  );
}

export default Payment
