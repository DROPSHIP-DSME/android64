import React, { useEffect, useRef, useState } from 'react';
import {
    Text, TextInput, Image, View, TouchableOpacity,
    ImageBackground, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard, Linking
} from 'react-native';

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
import { useValidation } from 'react-native-form-validator';
import PasswordInputText from '../../components/react-native-hide-show-password-input';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import { LoginManager } from "react-native-fbsdk-next";


const Registration = (props) => {

    const {
        navigation,
        values, 
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Reference
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const phoneRef = useRef();
    const fullnameRef = useRef();
    const instaLogin = useRef()
    const linkedInLogin = useRef()


    // Local States
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
    const [deviceToken, setDeviceToken] = useState();
    const [isCheckPrivacy, setIsCheckPrivacy] = useState(false)
    const [text, onChangeText] = React.useState("fullName");
    const [email, onChangeText1] = React.useState("lav@yopmail.com");
    const [password, onChangeText2] = React.useState("Dropship@123");
    const [text3, onChangeText3] = React.useState("Confirm password");
    const [UserID, setUserID] = useState("");
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { email, password, },
        });

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '512487199242-cp48gba87neibcgvoo98i8tca01tr0i0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
        requestUserPermission();
        //getBrandUserId();
    }, [])

    const getBrandUserId = async () => {
        var getUserId = await AsyncStorage.getItem('userLogin');
        if (getUserId == "1") {
            props.navigation.navigate("watchlist")
        }
    }

    // Request FCM Permission & get device token
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const _deviceToken = await messaging().getToken();
            setDeviceToken(_deviceToken)
        }
    }


    // Registration request submission
    const handleRegistrationSubmit = () => {
        Keyboard.dismiss();
        validate({
            email: { email: true },
            password: { password: true },
        }); {
            //props.navigation.navigate("Overview")
            let request = {
                "email": email,
                "password": password,
                "deviceToken": deviceToken,
                "otheruserid": props?.loginuserid,
                "type": "shop"
            }
            props.login(request,props.navigation,'user','user')
            //props.signup(request, props.navigation, "salesman");
        }
    }
    const googleSignIn = async () => {
        try {
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();
           
        } catch (error) {
        }
    } 
    const facebookSignIn = async () => {
        // LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        //     function (result) {
        //         if (result.isCancelled) {
        //         } else {
        //         }
        //     },
        //     function (error) {
        //     }
        // );
    }
    
    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>

            <View style={[styles.heading, { marginTop: '15%', marginBottom: '5%' }]}>
                <Image source={ImageIcons.logored_1} style={styles.setlogonewdata} />
            </View>
            
            <View>
               <View style={{alignItems:'center',marginTop:'19%'}}>
                    <TouchableOpacity
                        style={styles.Touchablestarttextnew}
                        activeOpacity = { .5}
                        onPress={() => navigation.navigate('watchlist')}>
                        <View style={{flexDirection:'row',  justifyContent:'center',padding:10}}>
                            <Image source={ImageIcons.googleicon} style={{ width:25,height:23,}} />
                            <Text style={[styles.startbutton1,{fontSize:18,marginLeft:20,color:'#000000'}]}>Sign up with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View> 

                <View style={{alignItems:'center',marginTop:'4%'}}>
                    <TouchableOpacity
                        style={styles.Touchablestarttextnew}
                        activeOpacity = { .5}
                        onPress={() => bigcommercelogin()}>
                        <View style={{flexDirection:'row',  justifyContent:'center',padding:10}}>
                            <Image source={ImageIcons.facebook} style={{ width:14,height:24,}} />
                            <Text style={[styles.startbutton1,{fontSize:18,marginLeft:20,color:'#000000'}]}>Sign up with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View> 
                <View style={[styles.devider1, { marginTop: '10%' }]}>
                    <View style={styles.devider2} />
                    <Text style={styles.devider3}>OR</Text>
                    <View style={styles.devider2} />
                </View>

            </View>

            <TouchableOpacity style={[styles.Touchablelogin,{width:'90%',marginTop:'5%',marginHorizontal:'2%'}]}
                onPress={() => navigation.navigate("CreateAccountShop")}>
                <Text style={[styles.TouchableloginTEXT,{fontSize:18,fontWeight:'700'}]}>Sign up with Email</Text>
            </TouchableOpacity>

             <View style={styles.twotextviewcreatetop}>
                <Text style={styles.customertext}>Already have an account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("RegistrationShop")}>
                    <Text style={styles.customertextred}>Sign in here.</Text>
                </TouchableOpacity>
            </View> 

            <Loader isVisible={props?.loginLoader} />

            
            
        </View>


    )

}


export default Registration