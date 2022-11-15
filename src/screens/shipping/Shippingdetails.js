import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, ImageBackground, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import Footer3 from '../../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Moment from 'moment';
import tw from 'twrnc';

import Help from '../../../components/help/Help';

const options = [ { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' },{ label: '5', value: '5' },{ label: '6', value: '6' },{ label: '7', value: '7' },{ label: '8', value: '8' },{ label: '9', value: '9' } ]

const Shippingdetails = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
       // props.getAllshop(1);
        props.getincomingtlist(props?.loginuserid);

    }, [])
    useFocusEffect(() => {
        //props.getincomingtlist(props?.loginuserid);
    })


    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    //Reference
    const emailRef = useRef();
    const phoneRef = useRef();
    const bisinessnameRef = useRef();
    const fullnameRef = useRef();

    // Local states
    const [text1, onChangeText1] = React.useState("");
    const [starCount, setstarCount] = useState(5);
    const [selectedValue, setSelectedValue] = useState("1");
    const [wayToContact, setWayToContact] = useState("Phone");
    const [showAlert, setshowAlert] = React.useState(false);

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const [showclassName, setshowclassName] = useState("#B80000");
    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }

    
    const checklogin = async () => {
        if (props?.loginuserstatus == "1") {
            props.navigation.navigate("watchlist")
        } else {
            setshowAlert(true)
        }
    }

    const helpbuttonsubmit = async (textval) => {
        if(textval!=''){
            let request = {
                "userId": props?.loginuserid,
                "message": textval,
                "msgDate": new Date()
            }
            props.support(request, props.navigation, "vendor");
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.registrationRoot}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#f2f2f2' }} >

                <View style={tw`mx-4 mt-[5%] mb-6`}>
                    <Text style={tw`text-2xl text-gray-700 font-bold`}>Shipping Details</Text>
                </View>

                
            </ScrollView>
            <Help onPress={(text1) => helpbuttonsubmit(text1)} />


            <Footer3 onSelection="5" />
        </KeyboardAvoidingView>

    )
}


export default Shippingdetails