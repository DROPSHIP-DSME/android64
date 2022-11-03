import React, { useRef, useState,useEffect } from 'react';
import { Text, View, Image, TextInput, ActivityIndicator, ImageBackground, 
  ScrollView,FlatList, Alert, TouchableOpacity,  KeyboardAvoidingView, 
  Platform,Keyboard,StatusBar, Button, Switch, Screen } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import { Rating ,AirbnbRating} from 'react-native-ratings';
import RnIncrementDecrementBtn  from
'react-native-increment-decrement-button';
import DashedLine from 'react-native-dashed-line';
import Footer3 from '../../../screens/common/Footer3';
import Modal from 'react-native-modal';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import tw from 'twrnc';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Deletebutton from '../../../components/pickers/Deletebutton';
import Heartbutton from '../../../components/pickers/Heartbutton';



const Cart = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    useEffect(() => {
        props.getprofileuser(props?.loginuserid);
        props.getuseraddress(props?.loginuserid);
    }, [])

    useEffect(() => {
       getBrandUserId();
    }, [])

    const getBrandUserId = async () => {
        //alert(props?.loginuserid)
        props.cartdata(props?.loginuserid);
    }

    //Reference
    const [UserID, setUserID] = useState("");
    const [IsLogin, setIsLogin] = useState("");
    // Local states
    const [showAlert, setshowAlert] = React.useState(false);
    const [isVisible, setisVisible] = React.useState(false);
    const [Incval, setIncval] = useState(1);
    // Stripe variable and customer variables 
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("1");
    // const [customer, setcustomer] = useState('');

    const finalAmount = 17000;
    const customer = "cus_MarHAmfDbApr9b";
    const email = "cd@dropship.com";
    
    const [loading, setLoading] = useState(false);

    const setIncrement = async (Incval,cartId) => {
      setIncval(Incval)
      props.increcartlist(cartId, Incval);
       setTimeout(function(){
           props.cartdata(props?.loginuserid);
       },1000);
    };

    const setdeletedata = async (cartId) => {
      setisVisible(true);
      props.deletedata(cartId,props.navigation);
      setTimeout(function(){
          props.cartdata(props?.loginuserid);
      },1000);
      setTimeout(function(){
          setisVisible(false);
      },3000);
    }


    const checklogin =  async () => {
      //if(props?.loginuserstatus=="1"){
          props.navigation.navigate("StoreOwner")
    }

  
    const renderItem = ({ item, index }) => {
        return (

       <View style={tw`flex flex-row my-3 mx-5 pt-3 pb-5 border-b-2 border-gray-200`} >
            <View style={tw`bg-gray-200 mr-4`}>
                <Image source={{uri:item.productId?.productImage}}  style={tw`w-30 h-45 rounded-lg`} />
            </View>
            <View>
                <Text style={tw`text-base text-gray-700`}>{item.productId?.productName}</Text>

                <View style={tw`flex-row`}>

                </View>

                <Text style={tw`text-base font-bold mt-3`}>Quantity</Text>
                <View  style={tw`flex-row`} >
                    <View>
                        <RnIncrementDecrementBtn
                        minVal={1}
                        minreq={1}
                        max={99}
                        val={parseInt(item.productQuantity)}
                        styleBtn={{width:30.6,height:28,backgroundColor:'#F3F3F3'}}
                        styleTextInput={{width:38.25,height:28,backgroundColor:'#F3F3F3'}}
                        labelStyle={{fontSize:15,marginTop:'1%',color:'#223263',fontFamily:'hintedavertastdsemibold'}}
                        handleClick={(val)=> setIncrement(val,item._id)}
                        />
                    </View>
                </View>
                <View style={tw`flex-row mt-4 -ml-2 mr-8 items-center`}>
                    <View style={tw`w-7/12 flex-row`}>
                      <Deletebutton onPress={() =>setdeletedata(item._id)} />
                      <Heartbutton  />
                    </View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw.style('text-xl',{fontFamily: 'hintedavertastdsemibold'})}>Total </Text>
                      <Text style={tw.style('text-xl')}>${item.productId?.productPrice*item.productQuantity}</Text>
                    </View>
                </View>
            </View>
      </View>

        )
    }

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
        // console.log(data.data.customer);
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
     <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.registrationRoot}>
     
      
      <ScrollView style={{backgroundColor:'#ffffff'}}>
      
        <View style={tw`pt-1 pb-20`}>
          <View style={tw`flex flex-row justify-between mt-4 mx-4`} >
            <View style={tw`self-center`}>
                <Text style={tw.style('flex flex-row text-3xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>Shopping Bag</Text>
            </View>
          </View>
          <View style={tw`mx-4 my-2`}>
            <Text style={tw`text-sm text-gray-500`}>Added Items</Text>
          </View>


           <Modal
              isVisible={isVisible}
              animationIn='fadeIn'
              animationOut='fadeOut'
              style={{ justifyContent: 'center', alignItems: 'center',padding:0,margin:0 }}
            >
            <ActivityIndicator size="large" color={Colors.WHITE} />
            </Modal>
          <View>
              <FlatList
                  data={props?.cartlistdata1 || []}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
              />
          </View>
         
          
          { props?.cartlistdata1?.length>0 ?

              <View style={tw.style('top-2 mx-5')}>
                 <StripeProvider
                  publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
                  merchantIdentifier="merchant.identifier"
                  >
                <Button variant="primary" title="Stripe Checkout" onPress={checkOutPayment} />
                </StripeProvider>
              </View>

          :
            <Text style={tw`text-lg pt-20 text-center`}>No Items added in cart yet</Text>
          }
        
        </View>
     </ScrollView>

    <Footer3  />
   
</KeyboardAvoidingView>




    )
}

export default Cart
