import React, { useEffect, useRef, useState } from 'react';
import { Text,TextInput,Image,TouchableOpacity, View, ImageBackground, ScrollView,  Alert, KeyboardAvoidingView, Platform, Keyboard, Linking } from 'react-native';
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
            style={styles.registrationRootscroll}>
        <View style={tw.style('flex flex-1 bg-white')}>
            <View style={tw.style('items-center mt-[20%] mb-[10%]')}>
                <Logobase />
            </View>

            <View style={tw.style('flex flex-row mb-5 mt-10 justify-center')}>
                <View style={tw.style('w-18 h-18 rounded-full bg-green-600 items-center justify-center')}>
                  <CheckIcon color="green" fill="#ffffff" size={48} />
                </View>
            </View>

            <View style={tw.style('mx-5 justify-center items-center')}>
                <Text style={tw.style('text-2xl text-gray-700 mb-8', {fontFamily: 'hintedavertastdsemibold'})}>Code Confirmed</Text>
            </View>
            <View style={tw.style('mx-5 justify-center items-center')}>
                <Text style={tw.style('text-lg text-gray-600 text-center')}>Your account has been created. Confirm your account via email to get access to all features.</Text>
            </View>

            <View style={tw`mx-5 my-6`}>
              <Medbutton
                text="Start Shopping"
                onPress={() => {props.navigation.navigate("watchlist");}} />
            </View>

            <View
              style={tw.style('mx-5 items-center px-4 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
            >
            <TouchableOpacity style={tw.style('w-10/11 items-center')}
                onPress={() => {props.navigation.navigate("Goliveshop");}}>
                <Text style={tw.style('text-lg text-white')}>Create Store</Text>
              </TouchableOpacity>
            </View>



            <Loader isVisible={props?.loginLoader} />
        </View>
       </KeyboardAwareScrollView>
    )
}

export default Codeconfirm
