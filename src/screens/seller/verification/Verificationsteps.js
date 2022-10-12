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
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Medbutton from '../../../components/dropshipbutton/Medbutton';
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
import { ViewPropTypes } from 'deprecated-react-native-prop-types'


const Verificationsteps = (props) => {
    const navigationOptions = {
      header: null
    };
  
    defaultScrollViewProps = {
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

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");
    const [city, setcity] = useState("");
    const [country, setcountry] = useState("USA");
    const [zipcode, setzipcode] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');


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

  const handleSendRequestSubmit = async () => {
        Keyboard.dismiss();
        if  (Brand !== "" && AboutBrand !== "" && billImgPath !== "" ) {
            alert(props?.loginuserid)
            const formData = new FormData();
            formData.append("brandName", Brand);
            formData.append("aboutBrand", AboutBrand);
            formData.append("userId", props?.loginuserid);
            formData.append("brandImage", billImgPath);
            formData.append("country", "USA");
            props.createbrand(formData, '', '');

            setshowotherAlert(true)
            setshowalertmsg('Store account created')
        }else{
          
        }
    },

    onAddressNextStep = () => {
       onNextStep();
       Keyboard.dismiss();
       /* if (firstname == "") {
            setshowotherAlert(true)
            setshowalertmsg('First name is required')
        }else if(lastname ==""){
            setshowotherAlert(true)
            setshowalertmsg('Last name is required')
        }else if (address1 == "") {
            setshowotherAlert(true)
            setshowalertmsg('Address is required')
        }else if(city ==""){
            setshowotherAlert(true)
            setshowalertmsg('City is required')
        }else if(zipcode ==""){
            setshowotherAlert(true)
            setshowalertmsg('Zipcode is required')
        } else {
            let request = {
                "firstName":firstname,
                "lastName":lastname,
                "streetAdress":address1,
                "phoneNumber":address2,
                "city":city,
                "userId":'6319a8fd9ad53151c16ae880',
                "country":country,
                "zipCode":zipcode,
            }
           props.saveaddress(request,'', '',0);
           alert('df')
           onNextStep();
        }*/
        //console.log('called next step');
    };

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    };

    onNextStep = () => {   
      console.log('called next step');
    };
  
    onPaymentStepComplete = () => {
      handleSendRequestSubmit();
      onNextStep();
    };
  
    onPrevStep = () => {
      console.log('called previous step');
    };
  
    onSubmitSteps = () => {
      console.log('called on submit step.');
    };

    
    const progressStepsStyle = {
      borderWidth: 2,
      activeStepIconBorderColor: '#b80000',
      activeLabelColor: '#b80000',
      activeStepNumColor: 'white',
      activeStepIconColor: '#b80000',
      completedStepIconColor: '#b80000',
      completedProgressBarColor: '#b80000',
      completedCheckColor: 'white',
      labelFontSize: 12,
      finishBtnText:'Go Live',
      marginBottom: 30,
    };

    const buttonTextStyle = {
      color: '#686868',
      fontWeight: 'bold'
    };

    return (
      <StripeProvider
          publishableKey="pk_test_51KAP7TI5xiyquKWN1EzKcfFoxzcW8zdytVN86qfEPgAVH7JdOWdbN9Q7EamxAnfPWhfEeBbrmZP1LGtt4xAJpKh200yilHKVPa"
          merchantIdentifier="Dropship.com" // required for Apple Pay
        >
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.registrationRoot}>

          <ScrollView style={{backgroundColor:'#ffffff'}}>
          
          

            <View style={tw.style('flex flex-1 mt-6 mx-2')}>
                    <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

              <ProgressSteps {...progressStepsStyle}>
                <ProgressStep
                  labelFontSize="12"
                  label="Create Brand"
                  onNext={onNextStep}
                  onPrevious={onPrevStep}

                >
                  <View style={tw.style('items-center mt-10 mb-65')}>
                    <View style={tw.style('text-gray-700 text-xl items-center mt-6 mb-6')}>
                      <View style={tw.style('mb-2')}>
                        <Text style={tw.style('text-3xl text-gray-700', {fontFamily:"hintedavertastdsemibold"})}>Create your Brand</Text>
                      </View>
                        
                    
                      {/* { billImgPath !== "" ?
                          <Image source={{ uri: billImgPath.uri }} style={tw`h-28 w-28 rounded-full mt-10 mb-5`} />
                      :
                        <TouchableOpacity style={tw`mt-8 w-28 h-28 rounded-full items-center justify-center bg-gray-700`} onPress={() => selectPhoto()}>
                          <CameraIcon color="#ffffff" fill="#ffffff" size={70} />
                        </TouchableOpacity>
                      } */}

                    </View>


                    {/* <View style={tw`flex flex-row pl-3 h-16 bg-zinc-200 rounded-lg rounded-md mt-8 mb-2 mx-5`}>
                        <TextInput
                          style={tw`text-gray-700 w-full px-2`}
                          onChangeText={onChangeBrand}
                          value={Brand}
                          placeholder="Brand name"
                          placeholderTextColor="#848484"
                        />
                    </View>

                    <View style={tw`w-11/12 h-32 bg-zinc-200 rounded-lg my-3`}>
                        <TextInput
                          style={tw`px-2 text-gray-700 text-start`}
                          onChangeText={(text) =>onChangeAboutBrand(text)}
                          value={AboutBrand}
                          placeholder="Tell us about your brand in fewer then 150 characters"
                          placeholderTextColor="#848484"
                          numberOfLines={10}
                          multiline={true}
                        />
                    </View> */}

                  </View>
                </ProgressStep>

                <ProgressStep
                  labelFontSize="12"
                  label="Address Information"
                  onNext={onAddressNextStep}
                  onPrevious={onPrevStep}

                >
                  <View style={tw.style('text-gray-700 text-xl items-center mt-6 mb-40')}>
                    
                    {/* <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="#1a1a1a"
                            onChangeText={(firstname) =>setfirstname(firstname)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={firstname}
                        />
                    </View>

                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="#1a1a1a"
                            onChangeText={(lastname) =>setlastname(lastname)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={lastname}
                        />
                    </View>

                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Address Line 1"
                            placeholderTextColor="#1a1a1a"
                            onChangeText={(address1) =>setaddress1(address1)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={address1}
                        />
                    </View>


                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="Address Line 2"
                            placeholderTextColor="#1a1a1a"
                            onChangeText={(address2) =>setaddress2(address2)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={address2}
                        />
                    </View>


                    <View style={[styles.pickerViewshorttodaybrand,{marginTop:'7%',backgroundColor:"#e6e6e6",marginHorizontal:"3%",borderRadius:10}]}>
                        <TextInput
                            placeholder="City"
                            placeholderTextColor="#1a1a1a"
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
                            placeholderTextColor="#1a1a1a"
                            onChangeText={(zipcode) =>setzipcode(zipcode)}
                            style={{color:'#333333',marginTop:5}}
                            paddingLeft={15}
                            value={zipcode}
                        />
                    </View> */}


                  </View>
                </ProgressStep>

                <ProgressStep
                  labelFontSize="12"
                  label="Stripe"
                  onNext={onNextStep}
                  onPrevious={onPrevStep}
                >
                  
                    <View style={tw.style('text-gray-700 text-xl items-center')}>
                      <View style={tw.style('mt-6 mb-55 mx-5')}>
                          <View style={tw.style('mb-2 mx-4')}>
                            <Text style={tw.style('text-2xl text-gray-700 text-center mb-3', {fontFamily:"hintedavertastdsemibold"})}>Create Seller Account</Text>
                            <Text style={tw.style('text-base my-1 text-gray-700 text-center')}>We at Dropship value your privacy so all payments are processd through Stripes payment system</Text>
                          </View>
                          <View style={tw.style('h-65 mb-6')}>
                            <Paymentvector />
                          </View>

                        
                        <Stripeprocess />
                      </View>
                    </View>
                  
                </ProgressStep>

                <ProgressStep
                  labelFontSize="12"
                  borderWidth="4"
                  label="Confirm"
                  scrollViewProps={defaultScrollViewProps}
                  onPrevious={onPrevStep}
                
                >
                  
                  <View style={tw.style('flex flex-1 bg-white mt-10 mb-75')}>

                      <View style={tw.style('flex-row mb-10 mt-2 justify-center')}>
                          <View style={tw.style('w-18 h-18 rounded-full bg-green-600 items-center justify-center')}>
                            <CheckIcon color="green" fill="#ffffff" size={48} />
                          </View>
                      </View>

                      <View style={tw.style('mx-5 justify-center items-center')}>
                          <Text style={tw.style('text-2xl text-gray-700 mb-4', {fontFamily: 'hintedavertastdsemibold'})}>Your Store is Ready</Text>
                      </View>
                      <View style={tw.style('mx-5 justify-center items-center mb-10')}>
                          <Text style={tw.style('text-base text-gray-600 text-center')}>Your new store information has been submitted to Dropship, and we will be in touch soon!</Text>
                      </View>

                      <View style={tw`mx-3 my-6`}>
                        <Medbutton
                          text="Seller's Dashboard"
                          onPress={() => {navigation.navigate("Account");}} />
                      </View>

                      <View style={tw`mx-3 my-3`}>
                        <Medbutton
                          text="Go Live"
                          onPress={() => {navigation.navigate("Dashlive");}} />
                      </View>

                  </View>

                </ProgressStep>
              </ProgressSteps>
            

              
            </View>

            
          </ScrollView>
          
          </KeyboardAvoidingView>
      </StripeProvider>

    );
  
  }
  
  export default Verificationsteps;