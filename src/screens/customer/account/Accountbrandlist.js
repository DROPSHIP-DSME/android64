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
import Footer2 from '../../../screens/common/Footer2';
import Footer3 from '../../../screens/common/Footer3';

import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Provider , Portal,} from 'react-native-paper';
import Modal from 'react-native-modal'
import Sortorder from '../../../components/pickers/Sortorder';
import tw from 'twrnc';
import { DotsVerticalIcon } from "react-native-heroicons/solid";
import { ShareIcon } from "react-native-heroicons/solid";
import Medbutton from '../../../components/dropshipbutton/Medbutton';
import Sortfilter from '../../../components/pickers/Sortfilter';
import Help from '../../../components/help/Help';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Accountbrandlist = (props) => {

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
       props.branddetails(brandId);
     }, [])

    useEffect(() => {
       getBrandUserId();

    }, [])

    useFocusEffect(() => {
        getBrandUserId();
     })

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

     const ratingCompleted = (ratingdata) => {
               if(ratingdata!="" && ratingdata!=undefined){
                //setstarCount(ratingdata)
               }

        }

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

    const [text1, onChangeText3] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [showclassName, setshowclassName] = useState("#B80000");
    const options = [ { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' },{ label: '5', value: '5' },{ label: '6', value: '6' },{ label: '7', value: '7' },{ label: '8', value: '8' },{ label: '9', value: '9' } ]
    const openpopup = () => {
        setVisible(true)
    }

    const closepopup = () => {
        setVisible(false)
    }

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const containerStyle = {backgroundColor: 'red', padding: '7%',marginHorizontal:'5%',alignItems:'center',};

    const renderItem = ({ item ,index }) => {
        return(
        <View>
           <TouchableOpacity style={{padding:2,marginHorizontal:7}} onPress={()=>props.navigation.navigate("ProductDetails",{productId:item._id, })}>
              <Image source={{uri: item.productImage}} style={{height:162,width:deviceWidth/2.5,borderRadius:10}} />
           </TouchableOpacity>
           <View style={{marginTop:5,flexDirection:'row',marginHorizontal:3}}>
            <View>
            <Text style={{fontSize:14,width:'80%',marginLeft:'5%'}}>{item.productName}</Text>
            <Text style={{fontSize:16,width:'80%',fontFamily:'AvertaStd-Semibold',marginLeft:'5%'}}>{item.productPrice}</Text>
             <View style={{marginBottom:'12%'}}>
                {item?.productRating ?
                <Rating
                type='custom'
                imageSize={18}
                ratingCount={5}
                ratingColor='#EB5757'
                tintColor='#FFE7E7'
                value={item?.productRating}
                startingValue={item?.productRating}
                style={{ paddingVertical: 5,width:100,}}
                />
                :
                <Rating
                type='custom'
                imageSize={18}
                ratingCount={5}
                ratingColor='#EB5757'
                value={0}
                startingValue={0}
                tintColor='#FFE7E7'
                style={{ paddingVertical: 5,width:100,}}
                />
            }
             </View>

             </View>
              <View style={{marginLeft:4}}>
                 <View style={{padding:2,marginHorizontal:7}}>
                  <Image source={ImageIcons.outlock} style={{height:30,width:30}} />
               </View>
               <View style={{padding:2,marginHorizontal:7}}>
                  <Image source={ImageIcons.outheart} style={{height:30,width:30}} />
               </View>
              </View>
          </View>
        </View>
  );
}



    const renderItem6 = ({ item }) => {
            return(
                <View>
                    { item.userId.userName=='Admin' ?
                       <View>
                        <View style={styles.chatrightView}>
                           <Text style={styles.hellotext}>{item.message}</Text>
                        </View>
                         <Text style={styles.chattingtime}>{ moment(item.msgDate).format('hh:mm A')}</Text>
                        </View>
                    :
                        <View>
                        <View style={styles.chatlongView}>
                          <Text style={styles.chattingtext}>{item.message}</Text>
                        </View>
                        <Text style={styles.chattingtime2}>{moment(item.msgDate).format('hh:mm A')}</Text>
                        </View>

                    }
                </View>
            );
    }


    return (
         <View style={{flex:1}}>


       <ScrollView onScroll={({nativeEvent}) => {
                handleScroll(nativeEvent['contentOffset'].y);
    }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} >


               <View style={tw`mt-7 rounded-lg mx-3`}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate("Accountbrandlist")}>
                   <View style={tw`bg-gray-400 items-center`}>
                      <Image source={{uri:props?.getBranddetails?.brandImage}} style={tw`h-52 w-full rounded-lg `}/>
                    </View>
                  </TouchableOpacity>

                 

                  <Text style={tw`text-3xl text-center text-red-700 font-bold mt-3`}>{props?.getBranddetails?.brandName}</Text>

                  <Text style={tw`text-lg text-center text-gray-600 mt-1`}>{props?.getBranddetails?.aboutBrand}</Text>

                 <View style={tw`flex flex-row justify-around mt-3`}>
                    <View>
                      <Text style={tw`text-2xl font-bold text-center text-gray-700`}>0</Text>
                      <Text style={tw`text-base text-center text-gray-500`}>Livestreams</Text>
                    </View>
                    <View>
                      <Text style={tw`text-2xl font-bold text-center text-gray-700`}>0</Text>
                      <Text style={tw`text-base text-center text-gray-500`}>Products</Text>
                    </View>
                    <View>
                      <Text style={tw`text-2xl font-bold text-center text-gray-700`}>0</Text>
                      <Text style={tw`text-base text-center text-gray-500`}>Followers</Text>
                    </View>

                 </View>

                  <View style={tw`mt-6 mb-10 mx-2`}>
                      <Medbutton text="Follow" />
                   </View>
              </View>

              <View style={tw`flex flex-row mx-3`}>

                   <Sortorder text="Sort Order" options={options} onSelect={(checked) => updateorderStatus(checked)} />

                  <Sortfilter text="filter"/>
              </View>




                 <View style={{marginTop:'8%',}}>

                    <View style={{marginLeft:'5%',marginBottom:'15%'}}>
                    <FlatList
                        data={props?.getlistbranddetails || []}
                        renderItem={renderItem}
                        key={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        />
                    </View>
               </View>
                <View>
         </View>



               </ScrollView>

               

            <Footer3 onSelection="5"  />
        </View>
    )
}


export default Accountbrandlist
