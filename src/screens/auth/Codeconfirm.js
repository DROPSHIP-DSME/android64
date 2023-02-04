import React, { useEffect, useRef, useState } from 'react';

import { Text,TextInput,Image,TouchableOpacity, View,Dimensions, ImageBackground, ScrollView,  Alert, KeyboardAvoidingView, Platform, Keyboard, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
import CheckBox from '@react-native-community/checkbox';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../screens/common/styles';
import { Colors, CommonStrings } from '../../common'
import ImageIcons from '../../common/ImageIcons'
import InputField from '../../components/forms/inputField';
import { RoundedButton } from '../../components/forms/button';
import { passwordValidationRegx, phoneRegExp } from '../../services/helper';
import Loader from '../../components/modals/Loader';
import PhoneMaskInput from '../../components/forms/inputField/PhoneMaskInput';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PasswordInputText from '../../components/react-native-hide-show-password-input';
import tw from 'twrnc';
import Medbutton from '../../components/dropshipbutton/Medbutton';
import Logobase from '../../components/baseassests/Logobase';
import { CheckIcon } from "react-native-heroicons/solid";
const deviceHeight = Dimensions.get('window').height;

const Codeconfirm = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Reference

    const [deviceToken, setDeviceToken] = useState();
    const [FullName, onChangeText] = React.useState("");
    const [email, onChangeText1] = React.useState("");
    const [phone, onChangeText4] = React.useState("");
    const [password, onChangeText2] = React.useState("");
    const [UserID, setUserID] = useState("");

    useEffect(() => {
        getBrandUserId();
    }, [])

    const getBrandUserId = async () => {
         var getUserId = await AsyncStorage.getItem('UserId');
         setUserID(getUserId);
    }

    // Registration request submission
    const openPrivacyPolicy = () => {
        Linking.openURL('');
    }

    const openTerms = () => {
        Linking.openURL('');
    }

    return (
        <KeyboardAwareScrollView
            style={[styles.registrationRootscroll,{backgroundColor:'#C02B27',}]}>
        <View style={tw.style('flex',{ backgroundColor:'#C02B27'})}>
            

            <View style={tw.style('mx-5 mt-20 justify-center items-center')}>
                <Text style={tw.style('text-3xl text-center text-white mb-8', {fontFamily: 'AvertaStd-Semibold'})}>Start selling live with Dropship!</Text>
            </View>
            <View style={tw.style('mx-5 justify-center items-center')}>
                <Text style={tw.style('text-sm text-white opacity-80 text-center')}>Create your won store and start selling and livestreaming your products with us. A quick and easy process.</Text>
            </View>

            <View style={tw.style('mx-0 mt-10')}>
               <Image source={ImageIcons.signupcover}  style={{ width:'98%', height:300}}/>
            </View>

            <View
              style={tw.style('mx-5 mt-14 items-center px-4 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
            >
                <TouchableOpacity style={tw.style('w-10/11 items-center')}
                onPress={() => {props.navigation.navigate("Verificationsteps");}}> 
                <Text style={tw.style('text-lg text-white')}>Create Your Store</Text>
              </TouchableOpacity>
            </View>
            <View
              style={tw.style('mx-5 items-center px-4 py-3 border border-transparent text-sm font-medium text-white')}
            >
               
                <TouchableOpacity style={tw.style('w-10/11 items-center')}
                onPress={() => {props.navigation.navigate("watchlist");}}> 
                <Text style={tw.style('text-sm text-white')}>Return Home</Text>
              </TouchableOpacity>
            </View>
           
        </View>
       </KeyboardAwareScrollView>
    )
}

export default Codeconfirm