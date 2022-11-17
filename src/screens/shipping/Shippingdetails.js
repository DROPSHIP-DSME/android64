import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, ImageBackground, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../screens/common/styles';
import Loader from '../../components/modals/Loader';
import Footer3 from '../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Moment from 'moment';
import StepIndicator from 'react-native-step-indicator';
import tw from 'twrnc';

import Help from '../../components/help/Help';


const Shippingdetails = (props) => {

    const  data = [
        {
            label: 'Processing',
            title: 'Processing',
            body:'Your order is being processed by the brand and will be updated shortly.',
        },
        {
            label: 'Processing',
            title: 'Shipped',
            body:'Your order has been shipped, and will arrive at its destination in the estimated time.',
        },
        {
            label: 'Processing',
            title: 'Delivered',
            body:'Your order has arrived and is ready to be picked up!'
        },
        {
            label: 'Processing',
            title: 'Complete',
            body:'Your order is complete! Thank you for shopping with Dropship.',
        }
      ];

      const stepIndicatorStyles = {
        stepIndicatorSize: 30,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 3,
        currentStepStrokeWidth: 5,
        stepStrokeCurrentColor: '#fe7013',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#aaaaaa',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 15,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 15,
        currentStepLabelColor: '#fe7013',
      };

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
       // props.getAllshop(1);
        props.getincomingtlist(props?.loginuserid);

    }, [])
    useFocusEffect(() => {
        //props.getincomingtlist(props?.loginuserid);
    })

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;


    //Vertical Steps setup
    
    // Vertical Steps setup

    // Local states
    const [text1, onChangeText1] = React.useState("");
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
            <View style={tw(`flex flex-auto`)}>
          
                    <View style={tw`mx-4 mt-[5%] mb-6`}>
                        <Text style={tw`text-2xl text-gray-700 font-bold`}>Shipping Details</Text>
                    </View>

                    <View style={tw(`my-10 py-10`)}>
                    <StepIndicator
                        customStyles={stepIndicatorStyles}
                        stepCount={4}
                        direction="vertical"
                        currentPosition={currentPosition}
                        labels={labels}
                        />
                    </View>
           
            </View>
                

                
            </ScrollView>
            <Help onPress={(text1) => helpbuttonsubmit(text1)} />


            <Footer3 onSelection="5" />
        </KeyboardAvoidingView>

    )
}


export default Shippingdetails