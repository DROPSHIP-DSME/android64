import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, TextInput, ImageBackground, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import styl from '../../../screens/common/styledrop';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import Footer3 from '../../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { RadioButton, Provider, Modal, Portal, Button, } from 'react-native-paper';
import tw from 'twrnc';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import AwesomeAlert from '../../../components/modals/AlertModal';
import { EyeIcon,EyeOffIcon } from "react-native-heroicons/solid";

const editpassword = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
        props.getAllshop(1);
    }, [])
    useFocusEffect(() => {
        //props.getAllshop(1);
    })


    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    //Reference
    const emailRef = useRef();
    const phoneRef = useRef();
    const bisinessnameRef = useRef();
    const fullnameRef = useRef();

    // Local states
    const [oldpassword, onChangeText1] = React.useState("");
    const [password, onChangeText2] = React.useState("");
    const [confirmPassword, onChangeText3] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [starCount, setstarCount] = useState(5);
    const [selectedValue, setSelectedValue] = useState("java");
    const [showAlert, setshowAlert] = React.useState(false);
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');
    const [showclassName, setshowclassName] = useState("#B80000");

    const [oldsecure, setoldsecure] = useState(true)
    const [confirmsecure, setconfirmsecure] = useState(true)
    const [passwordsecure, setpasswordsecure] = useState(true)

    const handleRegistrationSubmit = async () => {
        Keyboard.dismiss();
        var getpassword = await AsyncStorage.getItem('rememberpassword');

        if (password == "") {
            setshowotherAlert(true)
            setshowalertmsg('Password is required')
        }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            setshowotherAlert(true)
            setshowalertmsg('The password should have at least 8 characters with 1 upper case, 1 lower case, 1 number, and 1 special character(*,%,!,@,&,$,?)')
        }else if (confirmPassword == "") {
            setshowotherAlert(true)
            setshowalertmsg('Confirm Password is required')
        } else if (confirmPassword !== password) {
            setshowotherAlert(true)
            setshowalertmsg('Password does not match.')
        } else {
            let request = {
                "userId": props?.loginuserid,
                "password": password,
            }
            //openpopup();
            props.updatepassword(request, props.navigation, "user");
            setshowotherAlert(true)
            setshowalertmsg('Password changed successfully!')
            setTimeout(function(){ props.navigation.navigate("Account");},2000)
        }
    }



    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }


    const openpopup = () => {
        setVisible(true)

    }

    const closepopup = () => {
        setVisible(false)
    }

    const containerStyle = { backgroundColor: '#FFFFFF', padding: 15, marginHorizontal: '5%', height:'100%', borderRadius: 10 };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw.style('flex-1 justify-center')}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#ffffff' }} >

                    <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

                <View style={tw`mx-4 my-10`}>
                    <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'AvertaStd-Semibold'})}>Change Password</Text>
                </View>

                {/*<View style={[tw.style('border-gray-200 rounded-md bg-gray-200 h-14 self-center mt-2 justify-center'), { width: deviceWidth / 1.1 }]}>
                    <TextInput
                        style={tw.style(' pl-3 sm:text-sm text-gray-700  border-gray-300 bg-gray-200 rounded-lg')}
                        placeholder="Old Password"
                        placeholderTextColor="#b3b3b3"
                        paddingLeft={15}
                        onChangeText={onChangeText1}
                        value={oldpassword}
                        secureTextEntry={oldsecure}
                        onSubmitEditing={() => handleRegistrationSubmit()}
                    />
                    <View style={tw`absolute top-3 right-8`}>

                      <TouchableOpacity onPress={() => setoldsecure(s=>!s)}>
                        {oldsecure==false ?
                            <EyeIcon color="red" fill="black" size={24} />
                        :
                            <EyeOffIcon color="red" fill="black" size={24} />
                        }
                      </TouchableOpacity>
                    </View>
                </View>*/}

                <View style={[tw.style('border-gray-200 rounded-md bg-gray-200 h-14 self-center mt-4 mx-2 justify-center'), { width: deviceWidth / 1.1 }]}>
                    <TextInput
                        style={tw.style(' pl-3 sm:text-sm text-gray-700  border-gray-300 bg-gray-200 rounded-lg')}
                        placeholder="New Password"
                        placeholderTextColor="#b3b3b3"
                        paddingLeft={15}
                        onChangeText={onChangeText2}
                        value={password}
                        secureTextEntry={passwordsecure}
                        onSubmitEditing={() => handleRegistrationSubmit()}

                    />
                    <View style={tw`absolute top-3 right-8`}>
                      <TouchableOpacity onPress={() => setpasswordsecure(s=>!s)}>
                        {passwordsecure==false ?
                            <EyeIcon color="red" fill="black" size={24} />
                        :
                            <EyeOffIcon color="red" fill="black" size={24} />
                        }
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={[tw.style('border-gray-200 rounded-md bg-gray-200 h-14 self-center mt-4 mx-2 justify-center'), { width: deviceWidth / 1.1 }]}>
                    <TextInput
                        style={tw.style(' pl-3 sm:text-sm text-gray-700  border-gray-300 bg-gray-200 rounded-lg')}
                        placeholder="Confirm New Password"
                        placeholderTextColor="#b3b3b3"
                        paddingLeft={15}
                        onChangeText={onChangeText3}
                        value={confirmPassword}
                        secureTextEntry={confirmsecure}
                        onSubmitEditing={() => handleRegistrationSubmit()}
                    />
                    <View style={tw`absolute top-3 right-8`}>
                      <TouchableOpacity onPress={() => setconfirmsecure(s=>!s)}>
                        {confirmsecure==false ?
                            <EyeIcon color="red" fill="black" size={24} />
                        :
                            <EyeOffIcon color="red" fill="black" size={24} />
                        }
                      </TouchableOpacity>
                    </View>
                </View>



                <View style={tw`mt-10 mx-4`}>
                <Largebutton
                text="Save Changes"
                onPress={() => { handleRegistrationSubmit() }} />
                </View>

                


            </ScrollView>




            <Footer3 onSelection="5" />


        </KeyboardAvoidingView>

    )
}


export default editpassword
