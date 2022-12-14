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
import Modal from 'react-native-modal';
import tw from 'twrnc';
import { CheckIcon } from "react-native-heroicons/solid";
import Smallbutton from '../../../components/dropshipbutton/Smallbutton';
import Medbutton from '../../../components/dropshipbutton/Medbutton';
import Comingsoon from '../../../components/baseassests/Comingsoon';
import AwesomeAlert from '../../../components/modals/AlertModal';


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Dashsubscribe = (props) => {

    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');

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

    const openTerms = () => {
        setshowotherAlert(true)
        setshowalertmsg('This feature is in progress')
    }

    // Local states
    const [showclassName, setshowclassName] = useState("#B80000");

    return (
         <View style={{flex:1}}>

            <View style={tw`py-6 bg-white h-[93%]`}>
              <View style={tw`items-center mt-15 mx-4`}>
                <Comingsoon />
                <View style={tw`items-center mt-8`}>
                  <Text style={tw`text-5xl text-Red-700 text-center`}>Dropship Premium</Text>
                  <Text style={tw`text-xl text-gray-700 text-center mx-4 mt-3`}>Get access to extended livestreams, in-depth analytics, featured streams and more!</Text>
                </View>
                <View style={tw`mt-5 w-full`}>
                 <Medbutton text="Join Waiting List"  onPress={() => openTerms()} />
                </View>
              </View>
            </View>

      {/* <ScrollView onScroll={({nativeEvent}) => {
                handleScroll(nativeEvent['contentOffset'].y);
    }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} >

               <View style={tw.style('flex flex-row justify-between mx-4 mt-10')}>
                 <Text style={tw.style('text-2xl font-bold text-gray-700')}>Subscriptions</Text>
               </View>

               <View style={tw.style('mx-4 mt-4')}>
                 <Text style={tw.style('text-base my-2')}>Dropship gives you the option of increase the value of your livestreaming exprience through additional marketing features. Select the plan that best suits your goals.</Text>
               </View>

               <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-6')}>
                 <View style={tw.style('px-2 py-5')}>
                    <Text style={tw.style('text-center text-xl font-bold mb-2')}>Basic</Text>
                    <View style={tw.style('flex flex-row justify-center')}>
                      <Text style={tw.style('text-4xl font-bold')}>$5</Text>
                      <Text style={tw.style('text-xl text-gray-600 mt-2')}>/month</Text>
                    </View>
                    <View style={tw.style('items-center my-3 mb-6')}>
                        <FlatList
                          data={[
                            {key: 'Livestream Duration - 10 mins'},
                          ]}
                          renderItem={({item}) =>
                            <Text style={tw.style('text-base text-gray-700')}><CheckIcon color="green" fill="green" size={24} /> {item.key}</Text>
                          }
                        />
                    </View>

                    <Smallbutton
                    text="Select Plan"
                    />

                 </View>
               </View>


               <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-6')}>
                 <View style={tw.style('px-2 py-5')}>
                    <Text style={tw.style('text-center text-xl font-bold mb-2')}>Standard</Text>
                    <View style={tw.style('flex flex-row justify-center')}>
                      <Text style={tw.style('text-4xl font-bold')}>$10</Text>
                      <Text style={tw.style('text-xl text-gray-600 mt-2')}>/month</Text>
                    </View>
                    <View style={tw.style('items-center my-3 mb-6')}>
                        <FlatList
                          data={[
                            {key: 'Livestream Duration - 25 mins'},
                          ]}
                          renderItem={({item}) =>
                            <Text style={tw.style('text-base text-gray-700')}><CheckIcon color="green" fill="green" size={24} /> {item.key}</Text>
                          }
                        />
                    </View>

                    <Smallbutton
                    text="Select Plan"
                    />

                 </View>
               </View>



               <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-6 border-4 border-red-700')}>
                 <View style={tw.style('px-2 py-5')}>
                    <Text style={tw.style('text-center text-xl font-bold mb-2')}>Pro</Text>
                    <View style={tw.style('flex flex-row justify-center')}>
                      <Text style={tw.style('text-4xl font-bold')}>$150</Text>
                      <Text style={tw.style('text-xl text-gray-600 mt-2')}>/month</Text>
                    </View>
                    <View style={tw.style('items-center my-3 mb-6')}>
                        <FlatList
                          data={[
                            {key: 'Livestream Duration - 25 mins'},
                            {key: '250 sms'},
                            {key: '2 Product Photoshoot'},
                          ]}
                          renderItem={({item}) =>
                            <Text style={tw.style('text-base text-gray-700')}><CheckIcon color="green" fill="green" size={24} /> {item.key}</Text>
                          }
                        />
                    </View>

                    <Smallbutton
                    text="Select Plan"
                    />

                 </View>
               </View>


               <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-6')}>
                 <View style={tw.style('px-2 py-5')}>
                    <Text style={tw.style('text-center text-xl font-bold mb-2')}></Text>
                    <View style={tw.style('flex flex-row justify-center')}>
                      <Text style={tw.style('text-4xl font-bold')}>Enterprise</Text>
                    </View>
                    <View style={tw.style('items-center my-3 mb-6')}>
                        <FlatList
                          data={[
                            {key: 'Livestream Duration - 25 mins'},
                            {key: '250 sms'},
                            {key: 'Product Photoshoot and Short Videos'},
                            {key: 'Manage Brand Livestreams'},
                          ]}
                          renderItem={({item}) =>
                            <Text style={tw.style('text-base text-gray-700')}><CheckIcon color="green" fill="green" size={24} /> {item.key}</Text>
                          }
                        />
                    </View>

                    <Smallbutton
                    text="Contact Sales"
                    />

                 </View>
               </View>


               </ScrollView> */}
            <Footer3 />
        </View>
    )
}
export default Dashsubscribe
