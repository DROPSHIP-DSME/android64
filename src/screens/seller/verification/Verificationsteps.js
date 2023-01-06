import React, { useState, useCallback,useEffect } from "react";
import { Text, View,TextInput,
    Image,  SafeAreaView,
    ScrollView, TouchableOpacity,
    Alert, Linking,
    KeyboardAvoidingView,
    Platform, Keyboard, NativeModules, Button, Dimensions } from 'react-native';
import tw from 'twrnc';
import styles from '../../common/styles';
import { useNavigation } from '@react-navigation/native';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Medbutton from '../../../components/dropshipbutton/Medbutton';
import Smallbutton from '../../../components/dropshipbutton/Smallbutton';
import Paymentvector from '../../../components/baseassests/Paymentvector';
import Stripeprocess from '../../../components/baseassests/Stripeindprocess';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { StripeProvider } from '@stripe/stripe-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import {CameraIcon} from "react-native-heroicons/solid";
import {CheckIcon} from "react-native-heroicons/solid";
import Sortorder from '../../../components/pickers/Sortorder';
import AwesomeAlert from '../../../components/modals/AlertModal';
import Loader from '../../../components/modals/Loader';
import AsyncStorage from '@react-native-community/async-storage';


const Verificationsteps = (props) => {

   const defaultScrollViewProps = {
      keyboardShouldPersistTaps: 'handled',
      contentContainerStyle: {
        flex: 1,
        justifyContent: 'center'
      }
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    const navigation = useNavigation();
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const [billImgPath, setBillImgPath] = useState("");
    const [Brand, onChangeBrand] = React.useState("");
    const [AboutBrand, onChangeAboutBrand] = React.useState("");

    const [firstName, setfirstname] = useState("");
    const [lastName, setlastname] = useState("");
    const [line1, setaddress1] = useState("");
    const [line2, setaddress2] = useState("");
    const [city, setcity] = useState("");
    const [country, setcountry] = useState("USA");
    const [zipCode, setzipcode] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');

    const [step1, setstep1] = useState(true);
    const [step2, setstep2] = useState(true);
    const [step3, setstep3] = useState(true);
    const [email, setEmail] = useState("sallywest@dropship.com");
    const [phone, setPhone] = useState("0000000000");
    const [refreshUrl, setrefreshUrl] = useState("https://dropship.shopping");
    const [returnUrl, setreturnUrl] = useState("https://dropship.shopping");

    // URL process
    const [data, setData] = useState('');
    // console.log(JSON.stringify(data));
    // const supportedURL = data;


    const options = [
      {
        label: 'USA',
        value: 'USA'
      },
      {
        label: 'India',
        value: 'India'
      },
      {
        label: 'Ghana',
        value: 'Ghana'
      },
      {
        label: 'Canada',
        value: 'Canada'
      }
    ]

    // state = {
    //     isValid: false,
    //     errors: false
    // };

     const selectPhoto = async () => {
         ImagePicker.openPicker({
            width: 400,
            cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            height: 400,
        }).then(image => {
            if (image?.path) {
                let fileName = image?.path?.split('/').pop();
                let mimeType = image?.path?.split('.').pop();
                let file = {
                    'uri': image?.path,
                    'type': `image/${mimeType}`,
                    'name': fileName
                }
               // setFieldValue("couponImage", file);
                setBillImgPath(file);
            }
        }).catch((error) => {

        });
    }

    useEffect(() => {
      getrememberMe();
    })

  const handleSendRequestSubmit = async (type) => {
        //Keyboard.dismiss();
        const formData = new FormData();
        formData.append("brandName", Brand);
        formData.append("aboutBrand", AboutBrand);
        formData.append("userId", props?.loginuserid);
        formData.append("brandImage", billImgPath);
        formData.append("country", "USA");
        props.createbrand(formData, '', '');

        let request = {
            "firstName":firstName,
            "lastName":lastName,
            "streetAdress":line1,
            "phoneNumber":line2,
            "city":city,
            "userId":props?.loginuserid,
            "country":country,
            "zipCode":zipCode,
        }
        props.saveaddress(request,'', '',0);
        if(type==1){
            props.navigation.navigate('watchlist')
        }else{
            props.navigation.navigate('watchlist')
        }
        //onNextStep();
    },


    onAddressNextStep = () => {
        if (firstName == "") {
            setshowotherAlert(true)
            setshowalertmsg('First name is required')
        }else if(lastName ==""){
            setshowotherAlert(true)
            setshowalertmsg('Last name is required')
        }else if (line1 == "") {
            setshowotherAlert(true)
            setshowalertmsg('Address is required')
        }else if(city ==""){
            setshowotherAlert(true)
            setshowalertmsg('City is required')
        }else if(zipCode ==""){
            setshowotherAlert(true)
            setshowalertmsg('Zipcode is required')
        } else {
            setaddress2(line1);
            setstep2(false)
            onsetuppayout();
            onNextStep();
        }
        //console.log('called next step');
    };

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    };

    const onNextStep = () => {
      console.log('called next step');
    };

   const getrememberMe = async () => {
        var getemail = await AsyncStorage.getItem('rememberemail');
        setEmail(getemail);
   }

   useEffect(() => {
      onsetuppayout();
    }, []);

    const onsetuppayout = () => {
        const response = fetch(`http://161.35.123.125/api/stripe/account/express-account/individual` , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, line1, line2, city, email, zipCode, phone, refreshUrl, returnUrl }),
         })
        .then(response => response.json())
        .then((responseJson) => {
            //alert(responseJson.data.url)
            console.log(responseJson);
            
           // setstep3(false)
            if(responseJson?.data?.url){
                setData(responseJson.data.url);
                setstep3(false);
                // setshowotherAlert(true)
                // setshowalertmsg('stripe account created successfully')
            }else{
                setshowotherAlert(false)
                setshowalertmsg(JSON.stringify(responseJson.error));
            }
        })
        .catch((error) => console.error(error) )
        .finally(() => console.log('sd') );
    }

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, [url]);

        return (
            <View
              type="button"
              style={tw.style('bottom-1 inline-flex items-center px-3 py-1 mx-8 border border-transparent rounded-full shadow-sm bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
            >
              <TouchableOpacity style={tw.style('h-12 justify-center items-center')} onPress={handlePress}>
                <Text style={tw.style('text-lg text-white')}>Setup Payouts</Text>
              </TouchableOpacity>
            </View>
        );
    };

    const onNextStep1= () => {
        if(billImgPath == "") {
            setshowotherAlert(true)
            setshowalertmsg('Brand Image is required')
        }else if(Brand == "" ) {
            setshowotherAlert(true)
            setshowalertmsg('Brand name is required')
        }else if(AboutBrand == "") {
            setshowotherAlert(true)
            setshowalertmsg('Enter your brand details')
        }else {
            setstep1(false)
            onNextStep();
        }
    };


    const onPrevStep = () => {
      console.log('called previous step');
    };

    const onSubmitSteps = () => {
      console.log('called on submit step.');
    };


    const progressStepsStyle = {
      borderWidth: 2,
      activeStepIconBorderColor: '#b80000',
      activeLabelColor: '#b80000',
      activeStepNumColor: '#FFFFFF',
      activeStepIconColor: '#b80000',
      completedStepIconColor: '#b80000',
      completedProgressBarColor: '#b80000',
      completedCheckColor: '#FFFFFF',
      labelFontSize: 12,
      finishBtnText:'Go Live',
      marginBottom: 30,
    };

    const buttonTextStyle = {
      color: '#686868',
      fontWeight: 'bold'
    };

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.registrationRoot}>


      <StripeProvider
          publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
          merchantIdentifier="Dropship.com" // required for Apple Pay
        >



            <View style={tw.style('flex flex-1 mt-6 mx-2')}>
              <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

              <ProgressSteps {...progressStepsStyle}>
                <ProgressStep
                  labelFontSize="12"
                  label="Create Brand"
                  onNext={onNextStep1}
                  onPrevious={onPrevStep}
                  scrollViewProps={defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  errors={step1}
                 >
                  <View style={tw.style('items-center mt-5')}>
                  <ScrollView>
                      <View style={tw.style('text-gray-700 text-xl items-center mb-6')}>
                        <View style={tw.style('mb-2')}>
                          <Text style={tw.style('text-3xl text-gray-700', {fontFamily:"AvertaStd-Semibold"})}>Create your Brand</Text>
                        </View>


                        { billImgPath !== "" ?
                            <Image source={{ uri: billImgPath.uri }} style={tw`h-28 w-28 rounded-full mt-4 mb-5`} />
                        :
                          <TouchableOpacity style={tw`mt-4 w-28 h-28 rounded-full items-center justify-center bg-gray-700`} onPress={() => selectPhoto()}>
                            <CameraIcon color="#ffffff" fill="#ffffff" size={70} />
                          </TouchableOpacity>
                        }
                      </View>


                      <View style={tw`flex flex-row pl-3 h-16 bg-zinc-200 rounded-lg rounded-md mt-8 mb-2 mx-5`}>
                          <TextInput
                            style={tw`text-gray-700 w-full px-2`}
                            onChangeText={onChangeBrand}
                            value={Brand}
                            placeholder="Brand name"
                            placeholderTextColor="#b3b3b3"
                          />
                      </View>

                      <View style={tw` h-32 bg-zinc-200 rounded-lg my-3  mx-5`}>
                          <TextInput
                            style={tw`px-2 text-gray-700 text-start`}
                            onChangeText={(text) =>onChangeAboutBrand(text)}
                            value={AboutBrand}
                            placeholder="Tell us about your brand in fewer then 150 characters"
                            placeholderTextColor="#b3b3b3"
                            numberOfLines={10}
                            multiline={true}
                          />
                      </View>
                    </ScrollView>
                  </View>
                </ProgressStep>

                <ProgressStep
                  labelFontSize="12"
                  label="Address Information"
                  onNext={onAddressNextStep}
                  onPrevious={onPrevStep}
                  scrollViewProps={defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  errors={step2}>

                  <View style={tw.style('text-gray-700 text-xl items-center mt-2 mb-1')}>
                    <ScrollView>
                     <View style={[styles.pickerViewshorttodaybrand,{marginTop:'1%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="First Name"
                            onChangeText={(firstname) =>setfirstname(firstname)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            placeholderTextColor="#b3b3b3"
                            value={firstName}
                        />
                    </View>

                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'5%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="#b3b3b3"
                            onChangeText={(lastname) =>setlastname(lastname)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={lastName}
                        />
                    </View>

                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Address Line 1"
                            placeholderTextColor="#b3b3b3"
                            onChangeText={(address1) =>setaddress1(address1)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={line1}
                        />
                    </View>


                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Address Line 2"
                            placeholderTextColor="#b3b3b3"
                            onChangeText={(address2) =>setaddress2(address2)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={line2}
                        />
                    </View>


                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="City"
                            placeholderTextColor="#b3b3b3"
                            onChangeText={(city) =>setcity(city)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={city}
                        />
                    </View>

                    <View style={{marginHorizontal:'4%',marginTop:'7%'}}>
                    <View style={{height:55,width:deviceWidth/1.1,backgroundColor:'#e6e6e6',borderRadius:10,}}>
                          <Sortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />
                    </View>

                    </View>


                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Zipcode"
                            placeholderTextColor="#b3b3b3"
                            onChangeText={(zipcode) =>setzipcode(zipcode)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={zipCode}
                        />
                    </View>
                    </ScrollView>

                  </View>
                </ProgressStep>

                <ProgressStep
                  labelFontSize="12"
                  label="Stripe"
                  onNext={onSubmitSteps}
                  onPrevious={onPrevStep}
                  scrollViewProps={defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  errors={step3}
                >
                    <ScrollView>
                    <View style={tw.style(`flex flex-1 mx-4 mb-10 justify-center`)}>
                    
                        <View style={tw.style('mb-2 mt-3')}>
                            <Text style={tw.style('text-3xl text-gray-700 text-center', {fontFamily:"AvertaStd-Semibold"})}>Almost There!</Text>
                            <Text style={tw.style('text-base text-gray-600 text-center mt-3 mx-4', {fontFamily:"AvertaStd-Semibold"})}>Congrats! You’re store is almost ready! Here’s a quick preview!</Text>
                        </View>
                        <View style={tw.style('bg-white overflow-hidden shadow rounded-xl my-5')}>
                          <View style={tw.style('px-6 py-5 items-center')}>

                            { billImgPath !== "" ?
                                <Image
                                  style={tw.style(`mt-4 h-28 w-28 rounded-full border-2 border-gray-400`)}
                                  source={{ uri: billImgPath.uri }}
                                />
                            :
                                <Image
                                  style={tw.style(`mt-4 h-28 w-28 rounded-full border-2 border-gray-400`)}
                                  source={''}
                                />
                            }
                            <Text style={tw.style('mt-4 text-xl text-gray-900 text-center', {fontFamily:"hintedavertastdsemibold"})}>{Brand}</Text>
                            <Text style={tw.style('text-base text-gray-900 text-center', {fontFamily:"hintedavertastdsemibold"})}>@{Brand}</Text>
                            <Text style={tw.style('mt-6 text-base text-gray-900 text-center', {fontFamily:"hintedavertastdsemibold"})}>Selling clothes and shoes for toddlers! Check out our socials too.</Text>
                          </View>
                          {/* <View style={tw.style(`mx-20 mb-10`)}>
                            <Smallbutton
                              text="Add Products"
                              onPress={() => { }} />
                          </View> */}
                        </View>
                        <View style={tw.style(`mb-5`)}>
                          <Text style={tw.style('text-2xl text-gray-700 text-center', {fontFamily:"AvertaStd-Semibold"})}>Let's Make sure you get Paid</Text>
                          <Text style={tw.style('mt-1 text-base text-gray-700 text-center', {fontFamily:"AvertaStd-Semibold"})}>Dropship uses Stripe to ensure seamless transactions for our buyers and sellers</Text>
                        </View>

                        <View style={tw.style(`mb-10`)}>
                           {data!='' &&
                             <OpenURLButton url={data}>Setup Payouts</OpenURLButton>
                           }
                        </View>
                       
                    </View>
                    </ScrollView>
                </ProgressStep>

                <ProgressStep
                  labelFontSize="12"
                  borderWidth="4"
                  label="Confirm"
                  onPrevious={onPrevStep}
                  scrollViewProps={defaultScrollViewProps}
                  nextBtnTextStyle={buttonTextStyle}
                  previousBtnTextStyle={buttonTextStyle}
                  removeBtnRow={true}
                >

                  <View style={tw.style('flex flex-1 mt-15 mb-1')}>

                      <View style={tw.style('flex-row mt-2 justify-center')}>
                          <View style={tw.style('w-18 h-18 rounded-full bg-green-600 items-center justify-center')}>
                            <CheckIcon color="green" fill="#ffffff" size={48} />
                          </View>
                      </View>

                      <View style={tw.style('mx-5 justify-center items-center')}>
                          <Text style={tw.style('text-2xl text-gray-700 mb-4', {fontFamily: 'AvertaStd-Semibold'})}>Your Store is Ready</Text>
                      </View>
                      <View style={tw.style('mx-5 justify-center items-center mb-15')}>
                          <Text style={tw.style('text-base text-gray-600 text-center')}>Your new store information has been submitted to Dropship, and we will be in touch soon!</Text>
                      </View>

                      <View style={tw.style('mx-3 my-6 bottom-1')}>
                        <Medbutton
                          text="Seller's Dashboard"
                          onPress={() => { handleSendRequestSubmit(1)}} />
                      </View>

                        

                  </View>

                </ProgressStep>
              </ProgressSteps>



            </View>

      </StripeProvider>

      </KeyboardAvoidingView>

    );

  }

  export default Verificationsteps;
