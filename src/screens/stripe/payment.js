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

const Payment = (props) => {

  // const stripe = useStripe();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [name, setName] = useState("Aushie Robinson");
  const [amount, setAmount] = useState("170.00");
  const [customer, setcustomer] = useState('');
  const [email, setEmail] = useState('cd@dropship.com');
  
  const [loading, setLoading] = useState(false);
  
  const checkOutPayment = async () => {

    try {
      // const finalAmount = parseInt(amount);
      // if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
      const response = await fetch("http://161.35.123.125/api/stripe/mobile-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount, customer, email }),
      })

      const data = await response.json();
      // console.log(data);
      console.log(JSON.stringify(data));
      // console.log(data.data.customer);
      if (!response.ok) {
        return Alert.alert('data.paymentIntent');
      }
      const initSheet = await initPaymentSheet({
        paymentIntentClientSecret: data.data.paymentIntent,
        customerEphemeralKeySecret: data.data.ephemeralKey,
        customerId: data.data.customer,
        allowsDelayedPaymentMethods: true,
        currencyCode: "USD",
        style: "alwaysLight",
        merchantDisplayName: "Dropship",
        
      });
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
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
    <StripeProvider
      publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
      merchantIdentifier="merchant.identifier"
    >
    <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.registrationRoot}>
        
        <View style={tw.style('items-center mt-15 mb-[10%]')}>
            <Logobase />
        </View>
        <View style={tw.style('mb-1 mx-5')}>
          <Text style={tw.style('text-3xl text-gray-700 text-center', {fontFamily:"hintedavertastdsemibold"})}>Payment</Text>
          <Text style={tw.style('text-base my-1 text-gray-700 text-center')}>We at Dropship value your privacy so all payments are processd through Stripes payment system</Text>
        </View>
        <View style={tw.style('h-100')}>
          <Paymentvector />
        </View>

        <View style={tw.style('my-1 mx-5 text-white mb-20')}>
        
          <Button onPress={checkOutPayment} title="Create strip" />
        
        </View>

        
    </KeyboardAvoidingView>
    </StripeProvider>
 
  );

}

export default Payment
