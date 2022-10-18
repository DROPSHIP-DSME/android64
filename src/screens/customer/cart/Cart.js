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
        props.cartPrice(props?.loginuserid);
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
    const [customer, setcustomer] = useState('');
    const [loginLoader, setloginLoader] = React.useState(false);

    const [loading, setLoading] = useState(false);

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

    const checkOutPayment = async () => {

      try {
        // const finalAmount = parseInt(amount);
        // if (finalAmount < 1) return Alert.alert("You cannot donate below 1 INR");
        const response = await fetch("http://161.35.123.125/api/stripe/mobile-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, amount, customer }),
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

                <Button variant="primary" title="Stripe Checkout" onPress={checkOutPayment} />
              </View>

          :
            <Text style={tw`text-lg pt-20 text-center`}>No Items added in cart yet</Text>
          }
        
        </View>
     </ScrollView>

        <Footer3  />

</KeyboardAvoidingView>
</StripeProvider>



    )
}

export default Cart
