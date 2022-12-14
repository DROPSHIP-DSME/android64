import React, { useEffect,useRef, useState } from 'react';
import { Text, View,Image,TextInput, ImageBackground,FlatList,Picker,StatusBar,Dimensions,ScrollView, Alert, TouchableOpacity,  KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
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
import Modal from 'react-native-modal'


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Dashsubscribe2 = (props) => {

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
      props.getincomingtlist(props?.loginuserid);
      props.getselldeshboard(props?.loginuserid);
      props.gettopsell(props?.loginuserid,3);
      props.liveeventdetail(props?.loginuserid);
    }, [])

    useEffect(() => {
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
    const [showclassName, setshowclassName] = useState("#B80000");

    return (
         <View style={{flex:1}}>
        

       <ScrollView onScroll={({nativeEvent}) => {
                handleScroll(nativeEvent['contentOffset'].y);
    }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} > 
          
               <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:'3%',marginTop:'5%'}}>
                 <Text style={{fontSize:22,color:'#1a1a1a',fontFamily:'hinted-AvertaStd-Semibold',}}>Subscriptions</Text>
               </View>

            <View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:5,marginTop:'5%'}}>
              <View style={{width:'46%',padding:'5%',backgroundColor:'#ffffff',borderRadius:15}}>
                <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular',color:'#666666',textAlign:'center'}}>Current</Text>
                <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular',color:'#666666',textAlign:'center'}}>Subscription</Text>
                <Text style={{fontSize:22,fontFamily:'hinted-AvertaStd-Semibold',color:'#1a1a1a',textAlign:'center',marginTop:'2%'}}>Pro Tier</Text>
                <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular',color:'#1a1a1a',textAlign:'center'}}>$0/month</Text>
                <View style={{backgroundColor:'#b80000',width:100,borderRadius:25,padding:8,alignSelf:'center',marginTop:'6%'}}>
                      <Text style={styles.totalincometodayPLAN}>UPGRADE</Text> 
                   </View>
                <Text style={{fontSize:14,fontFamily:'hinted-AvertaStd-Semibold',color:'#666666',textAlign:'center',marginTop:'5%'}}>Cancel</Text>   
              </View>

              <View style={{width:'46%',padding:'5%',backgroundColor:'#ffffff',borderRadius:15}}>
                <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular',color:'#666666',textAlign:'center'}}>SMS</Text>
                               <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular',color:'#666666',textAlign:'center'}}>Bundle</Text>

               <Text style={{fontSize:20,fontFamily:'hinted-AvertaStd-Semibold',color:'#1a1a1a',textAlign:'center',marginTop:'2%'}}>0/0</Text>
                <Text style={{fontSize:22,fontFamily:'hinted-AvertaStd-Semibold',color:'#1a1a1a',textAlign:'center',marginTop:'2%'}}>SMS left</Text>
            
                <View style={{backgroundColor:'#b80000',width:100,borderRadius:25,padding:8,alignSelf:'center',marginTop:'6%'}}>
                      <Text style={styles.totalincometodayPLAN}>TOP UP</Text> 
                   </View> 
              </View>

            </View> 

             <Text style={{fontSize:22,color:'#1a1a1a',fontFamily:'hinted-AvertaStd-Semibold',marginHorizontal:'4%',marginTop:'7%'}}>Recent SMS Campaigns</Text>

             <View style={{width:deviceWidth/1.1,backgroundColor:'#ffffff',padding:'5%',alignSelf:'center',marginTop:'7%',borderRadius:15,}}>
                <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular',color:'#666666'}}>25 - 01 - 2022</Text>
                <View style={{backgroundColor:'#d0e3fb',width:120,borderRadius:10,padding:8,marginTop:'2%'}}>
                      <Text style={[styles.totalincometodayPLAN,{color:'#2f80ed'}]}>NEW PRODUCT</Text> 
                   </View>
                <Text style={{fontSize:22,color:'#1a1a1a',fontFamily:'hinted-AvertaStd-Semibold',marginTop:'2%'}}>New Product Launch!</Text>
                <Text style={{fontSize:18,fontFamily:'hinted-AvertaStd-Regular'}}>Dropship gives you the option of increase the value of your livestreaming exprience through additional marketing features. Select the plan that best suits your goals.</Text>
                 <View style={{backgroundColor:'#e6e6e6',width:120,borderRadius:10,padding:8,marginTop:'2%'}}>
                      <Text style={[styles.totalincometodayPLAN,{color:'#000000'}]}>0 SMS SENT</Text> 
                   </View>
                 
              </View>

               <View style={{backgroundColor:'#b80000',marginBottom:'20%',width:320,borderRadius:30,padding:'5%',alignSelf:'center',marginTop:'6%'}}>
                      <Text style={styles.totalincometodaycompaign}>NEW SMS CAMPAIGN</Text> 
                   </View>
        
               </ScrollView>
            
            <Footer3 />
        </View>       
    )
}
export default Dashsubscribe2