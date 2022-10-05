import React, { useRef, useState } from 'react';
import { Text, View,Image,TouchableOpacity,TextInput, ImageBackground, ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../screens/common/styles';
import { Colors, CommonStrings } from '../../common'
import ImageIcons from '../../common/ImageIcons'
import InputField from '../../components/forms/inputField';
import { RoundedButton } from '../../components/forms/button';
import { phoneRegExp } from '../../services/helper';
import DropdownField from '../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../components/modals/Loader';
import { useNavigation } from '@react-navigation/native';
import { useValidation } from 'react-native-form-validator';
import tw from 'twrnc';
import Logobase from '../../components/baseassests/Logobase';
import Largebutton from '../../components/dropshipbutton/Largebutton';
import AwesomeAlert from '../../components/modals/AlertModal';


const Verification = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    const navigation = useNavigation();

    //Reference

    // Local states
    const [hide, setHide] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [code, setCode] = React.useState("123456");
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');

   const [phonenumber, onChangeText1] = React.useState("");


    const handleRegistrationSubmit = () => {
        Keyboard.dismiss();
        if (phonenumber == "") {
            setshowotherAlert(true)
            setshowalertmsg('Mobile Number is required')
        }else if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phonenumber)) {
            setshowotherAlert(true)
            setshowalertmsg('Invalid Phone Number')
        }else{
            setShow('true');
            setHide(true);
        }
    }

    const handleRegistrationSubmit1 = () => {
        Keyboard.dismiss();
        if(code!='123456'){
            setshowotherAlert(true)
            setshowalertmsg('Code is invalid')
        }else {
            props.navigation.navigate("Codeconfirm");
        }
    }

    return (
       <View style={tw.style('flex flex-1 bg-white')}>


         <View style={tw.style('items-center mt-[20%] mb-[10%]')}>
             <Logobase />
         </View>

        <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

        <View>
            <Text style={tw.style('text-2xl text-gray-700 mx-5 my-5')}>Confirm Phone Number</Text>
        </View>
    { show == false &&
        <View>
             <View>
                <Text style={tw.style('text-base text-gray-600 mx-5 mb-3')}>To authorise your account, we will send a code to the mobile number entered below. Please enter your mobile number.</Text>
            </View>
            <View style={tw.style('flex mt-2 my-4')}>
                <TextInput
                style={tw.style('mx-5 pl-3 sm:text-sm text-gray-700 border-gray-300 bg-gray-200 rounded-lg')}
                placeholder="Mobile Number"
                placeholderTextColor="#b3b3b3"
                onChangeText={onChangeText1}
                value={phonenumber}
                onSubmitEditing={() => handleRegistrationSubmit()}
                />

            </View>

            <View style={tw`mx-5 my-5`}>
              <Largebutton text="Send Code" onPress={() => {  handleRegistrationSubmit() }} />
            </View>
        </View>
    }
    { hide == true &&
        <View>
             <View style={tw.style('mx-5 mb-3')}>
                <Text style={tw.style('text-base text-gray-600')}>Please enter the code you received via text message.</Text>
            </View>
            <View style={tw.style('flex mt-2 my-4')}>
                <TextInput
                style={tw.style('mx-5 pl-3 sm:text-sm text-gray-700 border-gray-300 bg-gray-200 rounded-lg')}
                placeholder="Enter Code"
                placeholderTextColor="#b3b3b3"
                onChangeText={setCode}
                value={code}
                onSubmitEditing={() => handleRegistrationSubmit1() }
                />

            </View>

            <View style={tw.style('flex flex-row mx-6')}>
               <Text style={tw.style('text-base text-gray-600')}>Didn't receive a code?</Text>
               <TouchableOpacity onPress={() => props.navigation.navigate("CreateAccountShop")}>
                <Text style={tw.style('text-base text-blue-700 ml-1', {fontFamily:'hintedavertastdsemibold'})}>Rescend Code</Text>
               </TouchableOpacity>
           </View>

            <View style={tw`mx-5 my-5`}>
              <Largebutton text="Confirm" onPress={() => handleRegistrationSubmit1()} />
            </View>
        </View>
    }
         <Loader isVisible={props?.loginLoader} />

        {/* <View style={styles.twotextviewcreate}>
                    <Text style={styles.customertext}>Return to</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("RegistrationShop")}>
                        <Text style={styles.customertextred}> login screen.</Text>
                    </TouchableOpacity>
                </View>*/}






        </View>
    )
}




export default Verification
