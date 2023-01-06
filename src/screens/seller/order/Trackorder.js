import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TextInput, ImageBackground, FlatList, Picker, StatusBar, Dimensions, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
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
import { Provider, Portal, } from 'react-native-paper';
import Modal from 'react-native-modal';
import Moment from 'moment';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import tw from 'twrnc';
import Sortorder from '../../../components/pickers/Sortorder';
import Orderstable from '../../../components/tables/Orderstable';
import { ArrowCircleDownIcon } from "react-native-heroicons/solid";


const Trackorder = (props) => {

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
     props.trackshippinglabel();
    
  }, [])

  

  const handleScroll = (pageYOffset) => {
    if (pageYOffset > 0) {
      setshowclassName('#B80000');
    } else {
      setshowclassName('#B80000');
    }
  }

  // Local states
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [showclassName, setshowclassName] = useState("#B80000");
  const [hitcount, sethitcount] = useState(0);
  const [orderlisting, setorderlisting] = useState([]);


  const openpopup = () => {
    setVisible(true)

  }

  

  

  return (
    <View style={tw.style('flex-1 bg-white')}>


      <ScrollView onScroll={({ nativeEvent }) => {
        handleScroll(nativeEvent['contentOffset'].y);
      }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={tw.style('bg-slate-2')} >

        <View style={tw`flex flex-row relative mx-4 mt-7 mb-2 shadow-sm`}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Dashproduct")} style={tw.style('w-2/4')}>
              <View
                type="button"
                style={tw`relative inline-flex items-center px-4 py-3 rounded-l-md border border-red-300 bg-red-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
              >
                  <Text style={tw`text-base font-medium text-white`}>Products</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("Overview")} style={tw.style('w-2/4')}>
              <View
                type="button"
                style={tw`-ml-px relative inline-flex items-center px-4 py-3 rounded-r-md border border-gray-200 bg-gray-200 hover:bg-red-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
              >
                  <Text style={tw`text-base font-medium text-gray-700`}>Sales Overview</Text>
              </View>
            </TouchableOpacity>
        </View>

        <View style={tw.style('my-2 mx-4')}>
          <Text style={tw.style('text-2xl text-gray-600 mb-3',{fontFamily:'AvertaStd-Semibold'})}>Track Orders</Text>


          <View style={tw.style('mt-6 p-3')} >

            
          </View>

         </View>

      </ScrollView>
      <Footer3 onSelelection="3" />
    </View>

  )
}

export default Trackorder
