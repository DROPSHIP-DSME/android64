import React, { useState, useCallback } from "react";
import { Text, View,TextInput,
    Image,  SafeAreaView,
    ScrollView, TouchableOpacity,
    Alert, Linking,
    KeyboardAvoidingView,
    Platform, Keyboard, NativeModules, Button,Dimensions } from 'react-native';
import tw from 'twrnc';
import styles from '../../common/styles';
import { useNavigation } from '@react-navigation/native';
import Logobase from '../../../components/baseassests/Logobase';
import Paymentvector from '../../../components/baseassests/Paymentvector';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Medbutton from '../../../components/dropshipbutton/Medbutton';
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { StripeProvider } from '@stripe/stripe-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import {CameraIcon} from "react-native-heroicons/solid";
import {CheckIcon} from "react-native-heroicons/solid";
import Sortorder from '../../../components/pickers/Sortorder';
import AwesomeAlert from '../../../components/modals/AlertModal';
import Loader from '../../../components/modals/Loader';
import { ViewPropTypes } from 'deprecated-react-native-prop-types'

const ProductDisplay = (props) =>{

//   const [stripeurl, setstripeurl] = useState('');
  

//   const fetchPaymentIntentClientSecret = async () => {
//     const response = await fetch(`http://161.35.123.125/api/stripe/mobile/account/create-link`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // body: JSON.stringify({
//       //   currency: 'usd',
//       // }),
//     })
//     .then(response => response.json())
//     .then((responseJson) => {
//       console.log(responseJson.data);
//       setstripeurl(responseJson.data.url);
//     })
//     .catch(e => Alert.alert(e.message));

//     return {
//       stripeurl,
//     };
//   };

//   const handlePayPress = async () => {
//     // Fetch the intent client secret from the backend.
//     const clientSecret = await fetchPaymentIntentClientSecret();

//   };
//   const supportedURL = stripeurl;

 

//   const OpenURLButton = ({ url }) => {

//     const handlePress = useCallback(async () => {
//       // Checking if the link is supported for links with custom URL scheme.
//       const supported = await Linking.canOpenURL(url);
  
//       if (supported) {
//         // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//         // by some browser in the mobile
//         await Linking.openURL(url);
//       } else {
//         Alert.alert("Don't know how to open this URL: ${url}");
//       }
//     }, [url]);
//     return (
//       <View
//         type="button"
//         style={tw.style('inline-flex items-center px-4 py-3 border border-transparent rounded-b-lg shadow-sm bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
//       >
//         <TouchableOpacity style={tw.style('h-15 w-10/11 justify-center items-center')} onPress={handlePress}>
//           <Text style={tw.style('text-lg text-white')}>Checkout</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={tw.style('mt-6 mb-55 mx-5')}>

//       <View style={tw.style('mb-2 mx-4')}>
//         <Text style={tw.style('text-2xl text-gray-700 text-center mb-3', {fontFamily:"hintedavertastdsemibold"})}>Create Seller Account</Text>
//         <Text style={tw.style('text-base my-1 text-gray-700 text-center')}>We at Dropship value your privacy so all payments are processd through Stripes payment system</Text>
//       </View>
//       <View style={tw.style('h-65 mb-6')}>
//         <Paymentvector />
//       </View>

//       <View style={tw.style('bg-white flex rounded-t-lg justify-between')}>

//          <View>
//             {/* <Largebutton text="Create Stripe Account" onPress={() => navigation.navigate("Payment")} /> */}
//             <Button onPress={handlePayPress} title="confirm Order" />

//             <OpenURLButton url={supportedURL}>Checkout</OpenURLButton>
//          </View>

//       </View>
//     </View>
//   );
// };

// const Verificationsteps = (props) => {
  
//     defaultScrollViewProps = {
//       keyboardShouldPersistTaps: 'handled',
//       contentContainerStyle: {
//         flex: 1,
//         justifyContent: 'center'
//       }
//     };

//     const {
//         values,
//         errors,
//         handleChange,
//         handleSubmit,
//     } = props;



//     const navigation = useNavigation();
//     const deviceWidth = Dimensions.get('window').width;
//     const deviceHeight = Dimensions.get('window').height;

//     const [billImgPath, setBillImgPath] = useState("");
//     const [Brand, onChangeBrand] = React.useState("");
//     const [AboutBrand, onChangeAboutBrand] = React.useState("");

//     const [firstname, setfirstname] = useState("");
//     const [lastname, setlastname] = useState("");
//     const [address1, setaddress1] = useState("");
//     const [address2, setaddress2] = useState("");
//     const [city, setcity] = useState("");
//     const [country, setcountry] = useState("USA");
//     const [zipcode, setzipcode] = useState("");
//     const [selectedValue, setSelectedValue] = useState("");

//     const [showotherAlert, setshowotherAlert] = React.useState(false);
//     const [showalertmsg, setshowalertmsg] = React.useState('');


//     const options = [
//       {
//         label: 'USA',
//         value: 'USA'
//       },
//       {
//         label: 'India',
//         value: 'India'
//       },
//       {
//         label: 'Ghana',
//         value: 'Ghana'
//       },
//       {
//         label: 'Canada',
//         value: 'Canada'
//       }
//     ]

//      const selectPhoto = async () => {
//          ImagePicker.openPicker({
//             width: 400,
//             cropping: true,
//             mediaType: 'photo',
//             compressImageQuality: 0.5,
//             height: 400,
//         }).then(image => {
//             if (image?.path) {
//                 let fileName = image?.path?.split('/').pop();
//                 let mimeType = image?.path?.split('.').pop();
//                 let file = {
//                     'uri': image?.path,
//                     'type': `image/${mimeType}`,
//                     'name': fileName
//                 }
//                // setFieldValue("couponImage", file);
//                 setBillImgPath(file);
//             }
//         }).catch((error) => {
            
//         });
//     }

//   const handleSendRequestSubmit = async () => {
//         Keyboard.dismiss();
//         if  (Brand !== "" && AboutBrand !== "" && billImgPath !== "" ) {
//             alert(props?.loginuserid)
//             const formData = new FormData();
//             formData.append("brandName", Brand);
//             formData.append("aboutBrand", AboutBrand);
//             formData.append("userId", props?.loginuserid);
//             formData.append("brandImage", billImgPath);
//             formData.append("country", "USA");
//             props.createbrand(formData, '', '');

//             setshowotherAlert(true)
//             setshowalertmsg('Store account created')
//         }else{
          
//         }
//     }

  
//     onNextStep = () => {
       
//       console.log('called next step');
//     };

//     onAddressNextStep = () => {
//        onNextStep();
//        Keyboard.dismiss();
//        /* if (firstname == "") {
//             setshowotherAlert(true)
//             setshowalertmsg('First name is required')
//         }else if(lastname ==""){
//             setshowotherAlert(true)
//             setshowalertmsg('Last name is required')
//         }else if (address1 == "") {
//             setshowotherAlert(true)
//             setshowalertmsg('Address is required')
//         }else if(city ==""){
//             setshowotherAlert(true)
//             setshowalertmsg('City is required')
//         }else if(zipcode ==""){
//             setshowotherAlert(true)
//             setshowalertmsg('Zipcode is required')
//         } else {
//             let request = {
//                 "firstName":firstname,
//                 "lastName":lastname,
//                 "streetAdress":address1,
//                 "phoneNumber":address2,
//                 "city":city,
//                 "userId":'6319a8fd9ad53151c16ae880',
//                 "country":country,
//                 "zipCode":zipcode,
//             }
//            props.saveaddress(request,'', '',0);
//            alert('df')
//            onNextStep();
//         }*/
//         //console.log('called next step');
//     };

//     const updateorderStatus = (itemValue) => {
//         setSelectedValue(itemValue)
//     }

  
//     onPaymentStepComplete = () => {
//       handleSendRequestSubmit();
//       onNextStep();
//     };
  
//     onPrevStep = () => {
//       console.log('called previous step');
//     };
  
//     onSubmitSteps = () => {
//       console.log('called on submit step.');
//     };


//     const progressStepsStyle = {
//       borderWidth: 2,
//       activeStepIconBorderColor: '#b80000',
//       activeLabelColor: '#b80000',
//       activeStepNumColor: 'white',
//       activeStepIconColor: '#b80000',
//       completedStepIconColor: '#b80000',
//       completedProgressBarColor: '#b80000',
//       completedCheckColor: 'white',
//       labelFontSize: 12,
//       finishBtnText:'Go Live',
//       marginBottom: 30,
//     };

//     const buttonTextStyle = {
//       color: '#686868',
//       fontWeight: 'bold'
//     };
  
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.registrationRoot}>

      <ScrollView style={{backgroundColor:'#ffffff'}}>
      
       <StripeProvider
          publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
          merchantIdentifier="Dropship.com" // required for Apple Pay
        >

        <View style={tw.style('flex flex-1 mt-6 mx-2')}>
                <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />
                <Text>test to see if screen shows</Text>

          
        </View>

        </StripeProvider>
      </ScrollView>
      
      </KeyboardAvoidingView>

    );
  }
  
  export default Verificationsteps;