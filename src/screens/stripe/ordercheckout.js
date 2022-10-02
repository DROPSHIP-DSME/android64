import React, { useState, useEffect, useCallback } from "react";
import { Text, View,TextInput,
 ImageBackground,Image,
 ScrollView,TouchableOpacity,
 Alert,  StatusBar, Linking,
 KeyboardAvoidingView,
 Platform,Keyboard, NativeModules, Picker, Button, Switch} from 'react-native';
 import styles from '../../screens/common/styles';
import tw from 'twrnc';
import Logobase from '../../components/baseassests/Logobase';
import Paymentvector from '../../components/baseassests/Paymentvector';

const supportedURL = "https://checkout.stripe.dev/preview";

const OpenURLButton = ({ url }) => {

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert("Don't know how to open this URL: ${url}");
    }
  }, [url]);
  return (
    <View
      type="button"
      style={tw.style('inline-flex items-center px-4 py-3 border border-transparent rounded-b-lg shadow-sm bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
    >
      <TouchableOpacity style={tw.style('h-15 w-10/11 justify-center items-center')} onPress={handlePress}>
        <Text style={tw.style('text-lg text-white')}>Stripe Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};


const ProductDisplay = () =>{
  return (
    <View style={tw.style('mt-20 mb-10 mx-5')}>

      <View style={tw.style('items-center mt-4 mb-3')}>
          <Logobase />
      </View>
      <View style={tw.style('mb-1 mx-5')}>
        <Text style={tw.style('text-3xl text-gray-700 text-center', {fontFamily:"hintedavertastdsemibold"})}>Payment</Text>
        <Text style={tw.style('text-base my-1 text-gray-700 text-center')}>We at Dropship value your privacy so all payments are processd through Stripes payment system</Text>
      </View>
      <View style={tw.style('h-100')}>
        <Paymentvector />
      </View>

      <View style={tw.style('bg-white flex rounded-t-lg justify-between')}>
        <Text style={tw.style('text-2xl text-gray-700 text-center mb-5')}> You shopping bag</Text>
        <View style={tw.style('flex flex-row items-center mb-2')}>
            <Image source={{ uri: 'https://i.imgur.com/EHyR2nP.png' }} style={tw.style('w-30 h-30 m-2 rounded-lg')} />
            <View style={tw.style('ml-2')}>
              <Text style={tw.style('text-lg text-gray-600')}>Stubborn Attachments</Text>
              <Text style={tw.style('text-lg text-gray-600')}>$20.00</Text>
            </View>
        </View>

        <View style={tw.style('flex flex-row items-center mb-2')}>
            <Image source={{ uri: 'https://i.imgur.com/EHyR2nP.png' }} style={tw.style('w-30 h-30 m-2 rounded-lg')} />
            <View style={tw.style('ml-2')}>
              <Text style={tw.style('text-lg text-gray-600')}>Stubborn Attachments</Text>
              <Text style={tw.style('text-lg text-gray-600')}>$20.00</Text>
            </View>
        </View>
        <Text style={tw.style('text-xl text-gray-700 text-center my-3', {fontFamily: 'hintedavertastdsemibold'})}> You shopping Total $40.00 plus shipping</Text>

         <View style={tw.style('mb-20')}>
            {/* We should change this to send intent button as I do think as is will work*/}
            <OpenURLButton url={supportedURL}>Checkout</OpenURLButton>
         </View>

      </View>
    </View>
  );
};

const Message = ({ message }) => (
  <View>
    <Text style={tw.style('text-lg text-red-700')}>{message}</Text>
  </View>
);

const ordercheckout = () => {
  const [message, setMessage] = useState("");

{ /* useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []); */}

  return message ? (

    <Message message={message} />
  ) : (
    <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.registrationRoot}>
       <ScrollView style={{backgroundColor:'#ffffff'}}>

        <ProductDisplay />

       </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ordercheckout
