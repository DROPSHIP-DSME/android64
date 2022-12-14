import React, { useEffect,useRef, useState } from 'react';
import { Text, View,Image,TextInput, ImageBackground,FlatList,Picker,StatusBar,Dimensions,ScrollView, Alert, TouchableOpacity,  KeyboardAvoidingView, Platform,Keyboard,ProgressBarAndroid} from 'react-native';
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
import AwesomeAlert from '../../../components/modals/AlertModal';

import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Provider , Portal,} from 'react-native-paper';
import Modal from 'react-native-modal';
import tw from 'twrnc'
import Medbutton from '../../../components/dropshipbutton/Medbutton';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Largesortorder from '../../../components/pickers/Largesortorder';
import Comingsoon from '../../../components/baseassests/Comingsoon';

const options = [
      {
        label: 'USA',
        value: 'USA'
      },
      {
        label: 'India',
        value: 'India'
      },
      {
        label: 'Ghana',
        value: 'Ghana'
      },
      {
        label: 'Canada',
        value: 'Canada'
      }
    ]

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Dashadvertise = (props) => {

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
    const emailRef = useRef();
    const phoneRef = useRef();
    const bisinessnameRef = useRef();
    const fullnameRef = useRef();
    const userId = props?.route?.params?.userId;
    const brandId = props?.route?.params?.brandId;



    useEffect(() => {
      props.getincomingtlist(props?.loginuserid);
      props.getselldeshboard(props?.loginuserid);
      props.gettopsell(props?.loginuserid,3);
      props.liveeventdetail(props?.loginuserid);
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
    const [subMsg, onChangeText1] = React.useState("");
    const [msg, onChangeText2] = React.useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState("USA");
    const [showclassName, setshowclassName] = useState("#B80000");
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');

    const updateorderStatus = (itemValue) => {
      setSelectedValue(itemValue)
    }

    const openTerms = () => {
        setshowotherAlert(true)
        setshowalertmsg('This feature is in progress')
    }

    return (
         <View style={{flex:1}}>
            <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />
             <View style={tw`py-6 bg-white h-[93%]`}>
              <View style={tw`items-center mt-10 mx-4`}>
                <Comingsoon />
                <View style={tw`items-center mt-8`}>
                  <Text style={tw`text-5xl text-Red-700 text-center`}>Dropship Premium</Text>
                  <Text style={tw`text-xl text-gray-700 text-center mx-4 mt-3`}>Get access to extended livestreams, in-depth analytics, featured streams and more!</Text>
                </View>
                <View style={tw`mt-10 w-full`}>
                 <Medbutton text="Join Waiting List" />
                </View>
              </View>
             </View>
       {/*<ScrollView onScroll={({nativeEvent}) => {
                handleScroll(nativeEvent['contentOffset'].y);
    }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} >

               <View style={tw.style('flex flex-row justify-between mx-4 mt-7')}>
                  <Text style={tw.style('text-2xl font-bold text-gray-700')}>Advertisements</Text>
               </View>

               <View style={tw.style('mx-4 mt-5')}>
                 <Text style={tw.style('text-lg')}>Select the parameters you would like to use for this advertisement and the total will adjust.</Text>
               </View>

              <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-7')}>
                <View style={tw.style('px-3 py-5')}>
                    <Text style={tw.style('text-lg text-gray-700')}>Total Cost of Advertisement</Text>

                    <Text style={tw.style('text-2xl font-bold text-gray-800 mb-4')}>US$35000</Text>
                    <Medbutton
                      text="Purchase Advertisment"
                    />
                </View>
              </View>

              <View style={tw.style('sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mx-4')}>
                <View style={tw.style('mt-1 sm:mt-0 sm:col-span-2 ')}>
                  <View style={tw.style('my-3 max-w-fit block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 bg-gray-200 rounded-md')}>
                    <Text style={tw.style('mt-3 mx-2 mb-0 font-sm font-sm text-gray-700')}>
                      Type of advertisment
                    </Text>
                      <Largesortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                    </View>
                </View>
              </View>


            <View style={tw.style('sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mx-4')}>
              <View style={tw.style('mt-1 sm:mt-0 sm:col-span-2 ')}>
                  <View style={tw.style('my-3 max-w-fit block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 bg-gray-200 rounded-md')}>
                    <Text style={tw.style('mt-3 mx-2 mb-0 font-sm font-sm text-gray-700')}>
                      Country
                    </Text>
                        <Largesortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                      </View>
                  </View>
                </View>


              <View style={tw.style('sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mx-4')}>
                <View style={tw.style('mt-1 sm:mt-0 sm:col-span-2 ')}>
                    <View style={tw.style('my-3 max-w-fit block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 bg-gray-200 rounded-md')}>
                      <Text style={tw.style('mt-3 mx-2 mb-0 font-sm font-sm text-gray-700')}>
                        Advertisment Location
                      </Text>
                        <Largesortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                      </View>
                  </View>
                </View>

                <View style={tw.style('sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mx-4')}>
                  <View style={tw.style('mt-1 sm:mt-0 sm:col-span-2 ')}>
                      <View style={tw.style('my-3 max-w-fit block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 bg-gray-200 rounded-md')}>
                        <Text style={tw.style('mt-3 mx-2 mb-0 font-sm font-sm text-gray-700')}>
                          What are you advertising
                        </Text>
                        <Largesortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                      </View>
                  </View>
                </View>


               <View style={tw.style('mt-10 mx-4')}>
                 <Text style={tw.style('text-lg text-gray-700')}> Budget $5 daily</Text>
                  <View style={tw.style('bg-gray-200 w-fit px-3 rounded-md')}>
                  <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={0.3}
                    padding={15}
                    marginHorizontal={5}
                    color='#b80000'
                  />
                  </View>
                </View>

                <View style={tw.style('mt-10 mx-4')}>
                  <Text style={tw.style('text-lg text-gray-700')}>Duration 7 Days</Text>
                   <View style={tw.style('bg-gray-200 w-fit px-3 rounded-md')}>
                   <ProgressBarAndroid
                     styleAttr="Horizontal"
                     indeterminate={false}
                     progress={0.6}
                     padding={15}
                     marginHorizontal={5}
                     color='#b80000'
                   />
                   </View>
                 </View>

                 <View style={tw.style('mt-15 mb-30')}>
                    <Largebutton
                    text="Preview Advertisment" />
                </View>
               </ScrollView>*/}

                 <Footer3 />
          </View>
    )
}


export default Dashadvertise
