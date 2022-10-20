import React, { useEffect,useRef, useState } from 'react';
import { Text, View,Image,TextInput, ImageBackground,Linking,FlatList,Picker,StatusBar,Dimensions,ScrollView, Alert, TouchableOpacity,  KeyboardAvoidingView, Platform,Keyboard,ProgressBarAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import newstyles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import Swipeout from 'react-native-swipeout';
import HorizontalSlider from 'react-horizontal-slider';
import Footer3 from '../../../screens/common/Footer3';

import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Provider , Portal,} from 'react-native-paper';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import { PhoneIcon } from "react-native-heroicons/solid";
import { MailIcon } from "react-native-heroicons/solid";


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Dashsupport = (props) => {

     const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Reference
    const userId = props?.route?.params?.userId;
    const brandId = props?.route?.params?.brandId;

    useEffect(() => {
      // props.getincomingtlist(props?.loginuserid);
      // props.getselldeshboard(props?.loginuserid);
      // props.gettopsell(props?.loginuserid,3);
      // props.liveeventdetail(props?.loginuserid);
    }, [])

    useEffect(() => {
       // AsyncStorage.setItem('UserId','');
       // AsyncStorage.setItem('userLogin','');
        getBrandUserId();
    }, [])

    useFocusEffect(() => {
        getBrandUserId();
     })

    const handleScroll=(pageYOffset)=>{
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        }else{
            setshowclassName('#B80000');
        }
    }

    const getBrandUserId = async () => {
        if(userId!="" && userId!=undefined){
            await AsyncStorage.setItem('UserId',userId);
            await AsyncStorage.setItem('userLogin',"1");
        }
    }

    // Local states
    const [visible, setVisible] = React.useState(false);
     const [selectedValue, setSelectedValue] = useState("");
    const [showclassName, setshowclassName] = useState("#B80000");


    const openpopup = () => {
        setVisible(true)
    }

    const closepopup = () => {
        setVisible(false)
    }

    const opensocialicon = (type) => {
        if(type=='facebook'){
            Linking.openURL('https://www.facebook.com/DROPSHIPAPP/');
        }
        if(type=='insta'){
            Linking.openURL('https://www.instagram.com/dropship.shopping/');
        }
        if(type=='twitter'){
            Linking.openURL('https://twitter.com/Dropship_app');
        }
        if(type=='linkedin'){
            Linking.openURL('https://www.linkedin.com/company/dropship-shop/');
        }
        if(type=='phone'){
            Linking.openURL('tel:+13107287960');
        }
        if(type=='email'){
            Linking.openURL('mailto:info@dropship.shopping');
        }
    }

    const containerStyle = {backgroundColor: 'red', padding: '7%',marginHorizontal:'5%',alignItems:'center',};

    return (
         <View style={{flex:1}}>

       <ScrollView onScroll={({nativeEvent}) => {
                handleScroll(nativeEvent['contentOffset'].y);
    }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} >


                <View style={tw.style('flex flex-row justify-between mx-4 mt-10')}>
                  <Text style={tw.style('text-3xl text-gray-700',{fontFamily:'hintedavertastdsemibold'})}>Customer Support</Text>
                </View>

               <View style={tw.style('mx-4 my-4')}>
                 <Text style={tw.style('text-base text-gray-700')}>You can reach out to us via the following channels.</Text>
               </View>


              <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-12')}>
                <View style={tw.style('px-2 py-5')}>
                    <TouchableOpacity onPress={() => opensocialicon('phone')}>
                        <View style={tw.style('flex flex-row px-4 items-center')}>
                            <PhoneIcon color="red" fill="#b80000" size={24} />
                            <Text style={tw.style('text-xl text-gray-700 ml-3')}>+1 (310) 728-7960</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => opensocialicon('email')}>
                        <View style={tw.style('flex flex-row px-4 mt-4 items-center')}>
                            <MailIcon color="red" fill="#b80000" size={24} />
                            <Text style={tw.style('text-xl text-gray-700 ml-3')}>info@dropship.shopping</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={tw.style('flex items-center my-6')}>
                      <View style={tw.style('w-full border-t border-gray-300')}></View>
                    </View>

                    <View style={tw.style('px-4')}>
                        <Text style={tw.style('text-base text-gray-700 ml-3')}>Or you can reach out to us via social media</Text>
                    </View>

                    <View style={tw.style('flex flex-row mx-4')}>
                        <TouchableOpacity onPress={() => opensocialicon('facebook')}>
                            <View style={tw.style('h-12 w-12 bg-white shadow-sm p-3 items-center rounded-full mr-4')}>
                                <Image source={ImageIcons.facebook} style={tw.style('w-4 h-7')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => opensocialicon('insta')}>
                            <View style={tw.style('h-12 w-12 bg-white shadow-sm p-3 items-center rounded-full mr-4')}>
                                <Image source={ImageIcons.insta} style={tw.style('w-6 h-6')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => opensocialicon('twitter')}>
                            <View style={tw.style('h-12 w-12 bg-white shadow-sm p-3 items-center rounded-full mr-4')}>
                                <Image source={ImageIcons.twitter} style={tw.style('w-6 h-6')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => opensocialicon('linkedin')}>
                            <View style={tw.style('h-12 w-12 bg-white shadow-sm p-3 items-center rounded-full mr-4')}>
                                <Image source={ImageIcons.linkin} style={tw.style('w-6 h-6')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                    </View>
                <View>
            </View>
        </ScrollView>
        <Footer3 />
        </View>
    )
}

export default Dashsupport
