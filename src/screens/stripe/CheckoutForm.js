import React, { useState, useEffect } from "react";
import { Text, View,TextInput,
 ImageBackground,Image,
 ScrollView,TouchableOpacity,
 Alert,  StatusBar,
 KeyboardAvoidingView,
 Platform,Keyboard, NativeModules, Picker, Button, Switch} from 'react-native';
 import type {
   CardFieldInput,
   BillingDetails,
 } from '@stripe/stripe-react-native';
 
import tw from 'twrnc';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <View nativeID="payment-form" onSubmit={handleSubmit}>
      <CardElement nativeID="card-element" options={cardStyle} onChange={handleChange} />
      <Button disabled={processing || disabled || succeeded}
        title="Pay Now">
        <View nativeID="button-text">
          {processing ? (
            <View style={{spinner}} nativeID="spinner"></View>
          ) : (
            <Text style={tw.style('text-lg text-white')}>Pay now</Text>
          )}
        </View>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <View style={tw.style('text-base text-red-800')} role="alert">
          {error}
        </View>
      )}
      {/* Show a success message upon completion */}
      <View className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <Text
          src={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </Text>
        <Text style={tw.style('text-base text-red-800')}>Refresh the page to pay again.</Text>
      </View>
    </View>
  );
}
