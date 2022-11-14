import React, { useEffect,useRef, useState } from 'react';
import { Text, View,Image,TextInput, Button, ImageBackground,FlatList,Picker,StatusBar,Dimensions,ScrollView, Alert, TouchableOpacity,  KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
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
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Provider , Portal,} from 'react-native-paper';
import Modal from 'react-native-modal'
import tw from 'twrnc';
import Medbutton from '../../../components/dropshipbutton/Medbutton';
import Smallbutton from '../../../components/dropshipbutton/Smallbutton';
import SQsmallbutton from '../../../components/dropshipbutton/SQsmallbutton';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Sortorder from '../../../components/pickers/Sortorder';
import Deletebutton from '../../../components/pickers/Deletebutton';
import AwesomeAlert from '../../../components/modals/AlertModal';
import Datepicker from '../../../components/pickers/Datepicker';

import { DocumentDuplicateIcon } from "react-native-heroicons/solid";

for(var i=0;i<10;i++){
    var today = new Date();
    today.setDate(today.getDate() + parseInt(i));
    var getval = today.getFullYear()+ '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    if(i==0){ var getToday = getval; }
    if(i==1){ var getToday1 = getval; }
    if(i==2){ var getToday2 = getval; }
    if(i==3){ var getToday3 = getval; }
    if(i==4){ var getToday4 = getval; }
    if(i==5){ var getToday5 = getval; }
    if(i==6){ var getToday6 = getval; }
    if(i==7){ var getToday7 = getval; }
    if(i==8){ var getToday8 = getval; }
    if(i==9){ var getToday9 = getval; }
}

const dateOptions = [
    { label: getToday, value: getToday },
    { label: getToday1, value: getToday1 },
    { label: getToday2, value: getToday2 },
    { label: getToday3, value: getToday3 },
    { label: getToday4, value: getToday4 },
    { label: getToday5, value: getToday5 },
    { label: getToday6, value: getToday6 },
    { label: getToday7, value: getToday7 },
    { label: getToday8, value: getToday8 },
    { label: getToday9, value: getToday9 },
]

const options = [
      {
        label: '00:00 AM',
        value: '00:00 AM'
      },
      {
        label: '12:30 AM',
        value: '12:30 AM'
      },
      {
        label: '1:00 AM',
        value: '1:00 AM'
      },
      {
        label: '1:30 AM',
        value: '1:30 AM'
      },
      {
        label: '2:00 AM',
        value: '2:00 AM'
      },
      {
        label: '2:30 AM',
        value: '2:30 AM'
      },
      {
        label: '3:00 AM',
        value: '3:00 AM'
      },
      {
        label: '3:30 AM',
        value: '3:30 AM'
      },
      {
        label: '4:00 AM',
        value: '4:00 AM'
      },
      {
        label: '4:30 AM',
        value: '4:30 AM'
      },
      {
        label: '5:00 AM',
        value: '5:00 AM'
      },
      {
        label: '5:30 AM',
        value: '5:30 AM'
      },
      {
        label: '6:00 AM',
        value: '6:00 AM'
      },
      {
        label: '6:30 AM',
        value: '6:30 AM'
      },
      {
        label: '7:00 AM',
        value: '7:00 AM'
      },
      {
        label: '7:30 AM',
        value: '7:30 AM'
      },
      {
        label: '8:00 AM',
        value: '8:00 AM'
      },
      {
        label: '8:30 AM',
        value: '8:30 AM'
      },
      {
        label: '9:00 AM',
        value: '9:00 AM'
      },
      {
        label: '9:30 AM',
        value: '9:30 AM'
      },
      {
        label: '10:00 AM',
        value: '10:00 AM'
      },
      {
        label: '10:30 AM',
        value: '10:30 AM'
      },
      {
        label: '11:00 AM',
        value: '11:00 AM'
      },
      {
        label: '11:30 AM',
        value: '11:30 AM'
      },
      {
        label: '12:00 PM',
        value: '12:00 PM'
      },
      {
        label: '12:30 PM',
        value: '12:30 PM'
      },
      {
        label: '1:00 PM',
        value: '1:00 PM'
      },
      {
        label: '1:30 PM',
        value: '1:30 PM'
      },
      {
        label: '2:00 PM',
        value: '2:00 PM'
      },
      {
        label: '2:30 PM',
        value: '2:30 PM'
      },
      {
        label: '3:00 PM',
        value: '3:00 PM'
      },
      {
        label: '3:30 PM',
        value: '3:30 PM'
      },
      {
        label: '4:00 PM',
        value: '4:00 PM'
      },
      {
        label: '4:30 PM',
        value: '4:30 PM'
      },
      {
        label: '5:00 PM',
        value: '5:00 PM'
      },
      {
        label: '5:30 PM',
        value: '5:30 PM'
      },
      {
        label: '6:00 PM',
        value: '6:00 PM'
      },
      {
        label: '6:30 PM',
        value: '6:30 PM'
      },
      {
        label: '7:00 PM',
        value: '7:00 PM'
      },
      {
        label: '7:30 PM',
        value: '7:30 PM'
      },
      {
        label: '8:00 PM',
        value: '8:00 PM'
      },
      {
        label: '8:30 PM',
        value: '8:30 PM'
      },
      {
        label: '9:00 PM',
        value: '9:00 PM'
      },
      {
        label: '9:30 PM',
        value: '9:30 PM'
      },
      {
        label: '10:00 PM',
        value: '10:00 PM'
      },
      {
        label: '10:30 PM',
        value: '10:30 PM'
      },
      {
        label: '11:00 PM',
        value: '11:00 PM'
      },
      {
        label: '11:30 PM',
        value: '11:30 PM'
      },
    ]

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Dashlive2 = (props) => {

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
    const selectedProduct = props?.route?.params?.selectedProduct;


    useEffect(() => {
      props.getAllproduct(props?.loginuserid);
      let getbrandnumberId = makeid(32);
      setlivedetailId(getbrandnumberId);
      // if(props?.livedetail && props?.livedetail[0]?._id!=undefined){
      //   setlivedetailId(props?.livedetail[0]?._id);
      // }else {
      //   props.liveeventdetail(props?.loginuserid);
      // } 

      if(selectedProduct!=undefined && selectedProduct!=""){
            let filteredData = props?.getlistproduct.filter(function (item) {
                    return selectedProduct.indexOf(item._id) > -1;
            });
            setselproductShown(filteredData);
        }

    }, [selectedProduct])

    useEffect(() => {
       //getBrandUserId();
    }, [])

    const makeid=(len)=>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < len; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

     const handleScroll=(pageYOffset)=>{
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        }else{
            setshowclassName('#B80000');
        }
    }
    const handlesch=()=>{
        setshowstream(true);
    }

    const getBrandUserId = async () => {
        var getUserId = await AsyncStorage.getItem('UserId');
        setUserID(getUserId);
        props.getAllproduct(props?.loginuserid);
    }

    // Local states

    const [showstream, setshowstream] = useState(false);
    const [UserID, setUserID] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [showclassName, setshowclassName] = useState("#B80000");
    const [timer, settimer] = useState(0);
    const [Duration, setDuration] = React.useState(1200);
    const [livedetailId, setlivedetailId] = React.useState('');
    const [Name, onChangeName] = React.useState("");
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');
    const [producttype, setproducttype] = React.useState('new');
    const [selectedDateValue, setSelectedDateValue] = useState("");
    const [selproductShown, setselproductShown] = React.useState([]);


    const openpopup = () => {
        setVisible(true);
    };

    const closepopup = () => {
        setVisible(false);
    }

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const updateDateStatus = (itemValue) => {
        setSelectedDateValue(itemValue)
    }



    const containerStyle = {backgroundColor: 'red', padding: '7%',marginHorizontal:'5%',alignItems:'center',};

    const startlivebtn = ()=>{
        if(Name==""){
            setshowotherAlert(true)
            setshowalertmsg('Stream Title is required')
        }else if(selectedDateValue==""){
            setshowotherAlert(true)
            setshowalertmsg('Stream Date is required')
        }else if(selectedValue==""){
            setshowotherAlert(true)
            setshowalertmsg('Stream Time is required')
        }else if(selectedProduct==undefined || selectedProduct==""){
            setshowotherAlert(true)
            setshowalertmsg('Please select products')
        }else {
            let request = {
                "eventId":livedetailId,
                "EventDuration":Duration,
                "startNow":true,
                "eventType":producttype,
                "eventDate":selectedDateValue,
                "eventTime":selectedValue,
                "Name":Name,
                "userId":props?.loginuserid,
                "productArr":selectedProduct,
                "schedulelater":true
            }
            let request1 = {
                "channelName":livedetailId,
                "appID":"0c96ec2a0c9744c0bb3d21330bb0911d",
                "appCertificate":"f877b72b55264162bfc8b88421fa8b77",
                "uid":1
            }
            //props.liveeventdetail(props?.loginuserid);
            //props.getchanneltoken(request1, props.navigation, "vendor");
            props.schuleEventstart(request, props.navigation, "vendor");
            setshowotherAlert(true)
            setshowalertmsg('Your Event has been scheduled successfully!');
            setTimeout(function(){ props.navigation.navigate("Overview");},3000);
        }
    }

    const openshare=()=>{
        let options = {
          message: 'To join our broadcast, click here',
          url: 'https://com.dropship/'+livedetailId,
        };
      Share.open(options);
    }

    const startBrodcast = ()=>{
        props.navigation.navigate("Blurbackground", { isback: false, channel:livedetailId, isbroadcaster: true })
    }

    const renderItem2 = ({ item ,index }) => {
     return(
        <View style={tw`w-2/4 px-4 mb-6`}>
           <View style={tw`mx-1`}>
              <Image source={{uri:item.productImage}} style={tw`w-full h-40 rounded-lg`} />
           </View>
           <View style={tw`mt-3 mx-3`}>
            <Text style={tw`text-base w-9/11`}>{item.productName}</Text>
            <Text style={tw`text-base w-9/11`}>Price: ${item.productPrice}</Text>
             <View style={tw`items-center w-full`}>
                {item?.productRating ?
                <Rating
                type='custom'
                imageSize={18}
                ratingCount={5}
                readonly
                ratingColor='#EB5757'
                tintColor='#FFE7E7'
                style={tw`w-28 py-2`}
                value={item?.productRating}
                startingValue={item?.productRating}
                />
                :
                <Rating
                type='custom'
                imageSize={18}
                ratingCount={5}
                readonly
                ratingColor='#EB5757'
                tintColor='#FFE7E7'
                style={tw`w-28 py-2`}
                value={0}
                startingValue={0}
                />
            }
             </View>
             <TouchableOpacity onPress={() => props.navigation.navigate("Dashsubscribe2")} style={tw`items-center px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-80`}>
                <Text style={tw`text-sm text-gray-600`}>NEW STOCK</Text>
             </TouchableOpacity>
          </View>
        </View>
  );
}


return (
         <View style={{flex:1}}>


       <ScrollView onScroll={({nativeEvent}) => {
                handleScroll(nativeEvent['contentOffset'].y);
    }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#ffffff'}} >

              <View style={tw.style('flex flex-row justify-between items-center mx-4 mt-8 mb-6')}>
                <Text style={tw.style('text-3xl text-gray-700',{fontFamily:'AvertaStd-Semibold'})}>Go Live</Text>
               </View>


            <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

             <View style={tw`flex flex-row relative mx-4 shadow-sm`}>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Dashlive")} style={tw.style('w-1.5/4')}>
                    <View
                      type="button"
                      style={tw`relative inline-flex items-center px-4 py-3 rounded-l-md border border-gray-200 bg-gray-200 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
                    >
                        <Text style={tw`text-base sm:text-sm font-medium text-gray-700`}>Go Live Now</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Dashlive2")} style={tw.style('w-2.5/4')}>
                    <View
                      type="button"
                      style={tw`-ml-px relative inline-flex items-center px-4 py-3 rounded-r-md border border-red-300 bg-red-700 hover:bg-red-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
                    >
                      <Text style={tw`text-base sm:text-sm font-medium text-white`}>Schedule Livestream</Text>
                    </View>
                  </TouchableOpacity>
                </View>




              <View style={tw.style('mt-8 mb-5 mx-4')}>
                      <TextInput
                        style={tw.style('h-18 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')}
                        placeholder="Stream Title"
                        placeholderTextColor="#b3b3b3"
                        paddingLeft={15}
                        multiline
                        value={Name}
                        onChangeText={onChangeName}

                      />
              </View>

                <View style={tw`mx-4 mt-10`}>
                  <TouchableOpacity>
                     <Text style={tw`text-2xl text-gray-700`}>Date & Time</Text>
                    </TouchableOpacity>
                </View>


                <View style={tw`mx-4 mt-5`}>
                  <Datepicker text="Select Date" options={dateOptions} onSelect={(checked) => updateDateStatus(checked)} />
                </View>
                <View style={tw`mx-4 mt-5`}>
                  <Sortorder text="Select time" options={options} onSelect={(checked) => updateorderStatus(checked)} />
                </View>

               <View style={tw`mx-4 mt-10`}>
                 <TouchableOpacity>
                    <Text style={tw`text-2xl text-gray-700`}>Stream Time</Text>
                   </TouchableOpacity>
               </View>

              <View style={tw.style('flex flex-row mx-4 my-5')}>
                 <TouchableOpacity onPress={() =>setDuration(1200)} style={tw.style('mr-2')}>
                  { Duration==1200 ?
                     <SQsmallbutton text="20 Min" />
                     :
                      <View  style={tw.style('w-auto items-center px-4 py-3 border border-transparent rounded-md shadow-sm  bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200')}>
                        <Text style={tw.style('text-sm text-gray-700')}>20 MIN</Text>
                      </View>
                }
                  </TouchableOpacity>

                 <TouchableOpacity onPress={() =>setDuration(1800)} style={tw.style('mx-2')}>
                { Duration==1800 ?
                    <SQsmallbutton text="30 Min" />
                   :
                    <View  style={tw.style('w-auto items-center px-4 py-3 border border-transparent rounded-md shadow-sm  bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200')}>
                      <Text style={tw.style('text-sm text-gray-700')}>30 MIN</Text>
                   </View>
                }
                   </TouchableOpacity>

                   <TouchableOpacity onPress={() =>setDuration(2700)} style={tw.style('mx-2')}>
                        { Duration==2700 ?
                      <SQsmallbutton text="45 Min" />
                   :
                    <View  style={tw.style('w-auto items-center px-4 py-3 border border-transparent rounded-md shadow-sm  bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200')}>
                      <Text style={tw.style('text-sm text-gray-700')}>45 MIN</Text>
                   </View>
                }
                   </TouchableOpacity>
              </View>




                <View style={tw.style('mt-1')}>
                    <View style={tw.style('flex flex-row justify-between mx-4 mt-4 mb-6 items-center')}>
                       <Text style={tw.style('text-2xl text-gray-700')}>Products</Text>
                       <Smallbutton
                       text="Select Product"
                       onPress={() => props.navigation.navigate("SearchProduct",{eventId:livedetailId,pageName:'Dashlive2'})}
                       />
                    </View>
                    <View style={tw`mt-3 mx-3`}>
                      <FlatList
                          data={selproductShown || []}
                          renderItem={renderItem2}
                          key={item => item.id}
                          showsHorizontalScrollIndicator={false}
                          numColumns={2}
                          />
                      </View>
               </View>



                <View style={tw.style('mt-10 mb-16 mx-4')}>
                      <Text style={tw.style('text-xl')}>Invite Audience</Text>
                      <TextInput
                        style={tw.style('h-18 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white')}
                        placeholder=""
                        placeholderTextColor="#b3b3b3"
                        value={livedetailId}
                        paddingLeft={15}
                        multiline
                        onChangeText={(text) => {}}
                      />
                      <View style={tw.style('absolute flex flex-end mt-6 right-5 top-8')}>
                        
                      </View>
                </View>

              { timer>0 &&
                        <View style={{marginTop:'6%'}}>
                            <Image source={ImageIcons.refresh} style={{width:43,height:43,alignSelf:'center'}}/>
                            <View style={{position:'absolute',alignSelf:'center',top:5}}>
                                <CountDown
                                    until={timer}
                                    size={12}
                                    onFinish={() => startBrodcast()  }
                                    digitStyle={{backgroundColor: '#FF000000'}}
                                    digitTxtStyle={{color: '#000000'}}
                                    timeToShow={['S']}
                                    separatorStyle={{color: '#000000'}}
                                    timeLabels={{m: null, s: null}}
                                    showSeparator
                                  />
                            </View>
                        </View>
                    }


                    <View style={tw`mx-4 my-4`}>
                       <Largebutton
                       text="Schedule Livestream"
                       onPress={() => startlivebtn()}
                       />


                    </View>

                <View>



         </View>

               </ScrollView>

            <Footer3 onSelection="3"  />

        </View>

    )
}
export default Dashlive2
