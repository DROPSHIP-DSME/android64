import React, { useState } from 'react';
import { Text, View,TextInput,
 ImageBackground,Image,
 ScrollView,TouchableOpacity,
 Alert,  StatusBar,
 KeyboardAvoidingView,
 Platform,Keyboard, NativeModules, Picker, Button, Switch} from 'react-native';
{/*import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';*/}

import styles from '../../screens/common/styles';
import tw from 'twrnc';
import Largebutton from '../../components/dropshipbutton/Largebutton';
import Logobase from '../../components/baseassests/Logobase';
import Paymentvector from '../../components/baseassests/Paymentvector';

const payment = (props) => {

    {/*const [email, setEmail] = useState();
    const [saveCard, setSaveCard] = useState(false);
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'usd',
        }),
      });
      const {clientSecret} = await response.json();

      return clientSecret;
    };

    const handlePayPress = async () => {

      // Fetch the intent client secret from the backend.
      const clientSecret = await fetchPaymentIntentClientSecret();

      const { error, paymentIntent } = await confirmPayment(
        clientSecret,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        },
        {
          setupFutureUsage: saveCard ? 'OffSession' : undefined,
        }
      );

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        
      } else if (paymentIntent) {
        Alert.alert(
          'Success',
          `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
        );
      }

    };

    const inputStyles: CardFieldInput.Styles = {
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
      borderRadius: 8,
      fontSize: 14,
      placeholderColor: '#A020F0',
      textColor: '#000000',
    }


  return (
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

          <View style={tw.style('mx-5 mt-2 mb-3')}>
            <CardField
              postalCodeEnabled={false}
              autofocus
              placeholders={{
                number: '4242 4242 4242 4242',
                postalCode: '12345',
                cvc: 'CVC',
                expiration: 'MM|YY',
              }}

              cardStyle={inputStyles}
              style={tw.style('h-12 mt-1 mb-2')}

              onCardChange={(cardDetails) => {
                
              }}
              onFocus={(focusedField) => {
              }}
            />
          </View>

          <View style={tw.style('flex flex-row text-center my-3 mx-4')}>
            <Switch
              onValueChange={(value) => setSaveCard(value)}
              value={saveCard}
            />
            <Text style={tw.style('ml-2 text-base text-gray-700')}>Save card during payment</Text>
          </View>
          <View style={tw.style('my-1 mx-5 text-white mb-20')}>
            <Button onPress={handlePayPress} title="Pay" disabled={loading} />
          </View>


    </KeyboardAvoidingView>
  );*/}

}

export default payment
