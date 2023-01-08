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
import AwesomeAlert from '../../../components/modals/AlertModal';
import { RadioButton, Provider, Portal } from 'react-native-paper';

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
import { HomeIcon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { DotsHorizontalIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import Logobase from '../../../components/baseassests/Logobase';


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
        props.cartPrice(props?.loginuserid);
    }

    //Reference
    const [UserID, setUserID] = useState("");
    const [IsLogin, setIsLogin] = useState("");
    // Local states
    const [showAlert, setshowAlert] = React.useState(false);
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');
    const [isVisible, setisVisible] = React.useState(false);
    const [Incval, setIncval] = useState(1);
    // Stripe variable and customer variables
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("1");
    const [customer, setcustomer] = useState('');
    const [loginLoader, setloginLoader] = React.useState(false);
    const [footervisible, setfootervisible] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const containerStyledemo = { position: 'absolute', borderRadius:10, top: '10%', width: '90%', backgroundColor: '#FFFFFF', padding: '1%', marginHorizontal: '5%', alignItems: 'center' };


    const setIncrement = async (Incval,cartId) => {
      setloginLoader(true);
      setIncval(Incval)
      props.increcartlist(cartId, Incval);
       setTimeout(function(){
           props.cartdata(props?.loginuserid);
           props.cartPrice(props?.loginuserid);
       },1000);
       setTimeout(function(){ setloginLoader(false); },2000);
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

     const openfooterpopup = () => {
        //setplayvideoURI(videouri)
        if(footervisible==false){
            setfootervisible(true)
        }else {
            setfootervisible(false)
        }
    }
    const closefooterpopup = () => {
        setfootervisible(false)
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
                        labelStyle={{fontSize:15,marginTop:'1%',color:'#223263',fontFamily:'AvertaStd-Semibold'}}
                        handleClick={(val)=> setIncrement(val,item._id)}
                        />
                    </View>
                </View>
                <View style={tw`flex-row mt-2 -ml-2 items-center`}>
                    <View style={tw`w-6/12 flex-row`}>
                      <Deletebutton onPress={() =>setdeletedata(item._id)} />
                      <Heartbutton  />
                    </View>

                </View>
                <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-base font-bold`}>Price </Text>
                      <Text style={tw`text-base font-bold`}>${item.productId?.productPrice*item.productQuantity}</Text>
                    </View>
            </View>
      </View>

        )
    }

    const checkOutPayment1 = async () => {
      Alert.alert(
        'Dropship',
        'You need to login for checkeout',
        [
          
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', 
            onPress: () => props.navigation.navigate('Golive')
          },
        ],
        {cancelable: false},
      );
    }

    const checkOutPayment = async () => {
      setloginLoader(true);
      try {
            const finalAmount = parseInt(props?.totalcartprice)*100;
            if (finalAmount < 1) return Alert.alert("You cannot pay below $1");
            console.log('stripe_customer_id',props.loginCredentials?.stripe_id);
            console.log('receipt_email',props.loginCredentials?.email);
            console.log('amount',finalAmount);
            const response = fetch(`http://161.35.123.125/api/stripe/mobile-payment-intent` , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'receiptEmail':props.loginCredentials?.email, 'amount':finalAmount, 'stripeCustomerId':props.loginCredentials?.stripe_id }),
             })
            .then(response => response.json())
            .then((responseJson) => {
                console.log('checkOutPayment',responseJson.data)
                checkOutPaymentPayment(responseJson.data);
            }).catch((error) => {
                setloginLoader(false); 
                console.log('error',error)
                setshowotherAlert(true)
                setshowalertmsg('Payment failed')
            });
     
       } catch (err) {
            setloginLoader(false); 
            console.error(err);
            Alert.alert("Payment failed!");
      }

    };

    const checkOutPaymentPayment = async (resdata) => {

        const initSheet = await initPaymentSheet({
          paymentIntentClientSecret: resdata.paymentIntent,
          customerEphemeralKeySecret: resdata.ephemeralKey,
          customerId: resdata.customer,
          allowsDelayedPaymentMethods: true,
          currencyCode: "USD",
          merchantDisplayName: "Dropship",
          style: 'automatic',
          returnURL: 'stripe-example://stripe-redirect',
          googlePay: true,
          merchantCountryCode: 'US',
          testEnv: true
          
        })

        if (initSheet.error) {
          Alert.alert(initSheet.error.message);
          console.error(initSheet.error);
          return Alert.alert(initSheet.error.message);
       }

        const presentSheet = await presentPaymentSheet({
          clientSecret: resdata.paymentIntent,
        });
        
        if (presentSheet.error) {
            setloginLoader(false); 
        }else {
            saveCartData();
        }
        // if (initSheet.error) {
        //   console.error('initSheet',initSheet.error);
        //   // setshowotherAlert(true)
        //   setshowalertmsg('initSheet error')
        // }

        // if(initSheet && initSheet.paymentOption!=undefined){
           

        //     // if (presentSheet.error) {
        //     //     setloginLoader(false); 
        //     //    console.error('presentSheet',presentSheet.error);
        //     //   //  setshowotherAlert(true)
        //     //    setshowalertmsg('presentSheet error')
        //     // }else {
        //     //     saveCartData();
        //     //     setloginLoader(false); 
        //     //     setshowotherAlert(true)
        //     //     setshowalertmsg('Payment successfully Done')
        //     // }
        // }else {
        //     saveCartData();
        // }
        // return true;
    }

    const saveCartData = async () => {
        let newfinaldata = parseInt(props?.totalcartprice);
        let request = {
            "userId":props?.loginuserid,
            "orderNumber":props?.loginuserid+''+newfinaldata,
            "orderStatus":"accepted",
            "orderAmount":newfinaldata,
            "paymentMethod":"Card",
            "orderDate":new Date(),
            "firstName":props.loginCredentials?.userName,
            "lastName":'',
            "emailaddress":props.loginCredentials?.email,
            "phoneNumber":props.loginCredentials?.phoneNumber,
            "streetAdress":props.loginCredentials?.streetAdress,
            "zipCode":props.loginCredentials?.zipCode,
            "city":props.loginCredentials?.city,
            "country":'USA'
        }
        console.log('checkOutPayment',request)
        props.chekout(request, props.navigation, "vendor");
        setTimeout(function(){
            setloginLoader(false); 
            setshowotherAlert(true)
            setshowalertmsg('Order placed successfully');
            props.cartdata(props?.loginuserid);
        },1000);
    }


    return (
      <StripeProvider
      publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
      merchantIdentifier="merchant.identifier"
    >
     <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
     style={styles.registrationRoot}>


      <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />


      <ScrollView style={{backgroundColor:'#ffffff'}}>

        <View style={tw`pt-1 pb-20`}>
          <View style={tw`flex flex-row justify-between mt-4 mx-4`} >
            <View style={tw`self-center`}>
                <Text style={tw.style('flex flex-row text-3xl text-gray-900',{fontFamily:'AvertaStd-Semibold'})}>Shopping Bag</Text>
            </View>
          </View>
          <View style={tw`mx-4 my-2`}>
            <Text style={tw`text-sm text-gray-500`}>Added Items</Text>
          </View>

          <Loader isVisible={loginLoader} />

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

                <View style={tw`flex-row items-center my-5`}>
                    <Text style={tw`text-base font-bold`}>Total Amount: </Text>
                    <Text style={tw`text-base font-bold`}>${props?.totalcartprice}</Text>
                </View>
                {props.loginCredentials?.email=='guest@gmail.com' ?
                  <Button variant="primary" title="Stripe Checkout" onPress={openfooterpopup} />
                :
                  <Button variant="primary" title="Stripe Checkout" onPress={openfooterpopup} />
                }
              </View>

          :
            <Text style={tw`text-lg pt-20 text-center`}>No Items added in cart yet</Text>
          }

        </View>
    </ScrollView>

            {footervisible==true &&
                <View style={{ flex:1, zIndex:0,backgroundColor:'#ffffff', borderRadius:10, borderWidth:1, borderColor:'#c3c3c3', margin:'5%', width:'90%',position:'absolute', height:380  }}>
                    <Modal visible={footervisible} onDismiss={closefooterpopup} contentContainerStyle={containerStyledemo}>
                        <View style={tw.style('items-center mt-[0%] mb-[15%]')}>
                              <Logobase />
                        </View>
                        <Text style={[styles.Modaltext,{marginLeft:100}]}>Sign for more features</Text>
                        <View style={tw.style('items-center  mt-[10%] mb-[0%]')}>
                            <Largebutton
                              text="         Sign in         "
                              onPress={() => { setfootervisible(false); props.navigation.navigate("RegistrationShop"); }}
                            />
                        </View>
                    </Modal>
                </View> 
            }

            <View style={tw.style('max-w-fit bg-white flex h-18 px-6 py-4 md:py-4 md:px-6 sm:mx-1 md:mx-2')}>
                    <View style={tw.style('flex-row justify-between')}>

                        <TouchableOpacity style={tw.style('px-2')} onPress={() => openfooterpopup() }>
                            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                                <Text>
                                    <HomeIcon color="red" fill="#b80000" size={24} />
                                </Text>
                                <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Home</Text>
                            </View>
                        </TouchableOpacity>


                           
                        <TouchableOpacity style={tw.style('px-2')} onPress={() => openfooterpopup() }>
                            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                                <Text>
                                    <ShoppingBagIcon color="#ff0000" fill="gray" size={24} />
                                </Text>
                                    <Text style={tw.style('text-sm font-normal text-gray-700')}>Shop</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={tw.style('px-2')}  onPress={() => openfooterpopup() }>
                           
                            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                                <Text>
                                    <ShoppingCartIcon color="red" fill="gray" size={24} />
                                </Text>
                                <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Sell</Text>
                            </View>
                        </TouchableOpacity>

                       

                        <TouchableOpacity style={tw.style('px-2')} onPress={() => openfooterpopup() }>
                            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                                <Text>
                                    <DotsHorizontalIcon color="#ff0000" fill="gray" size={24} />
                                </Text>
                                    <Text style={tw.style('text-sm font-normal text-gray-700')}>More</Text>
                            </View>
                        </TouchableOpacity>

                </View>
            </View>

</KeyboardAvoidingView>
</StripeProvider>
    )
}

export default Cart
