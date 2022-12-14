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
import tw from 'twrnc';
import Smallbutton from '../../../components/dropshipbutton/Smallbutton';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import Sortorder from '../../../components/pickers/Sortorder';
import Sortfilter from '../../../components/pickers/Sortfilter';
import Selectall from '../../../components/pickers/Selectall';
import Editbutton from '../../../components/pickers/Editbutton';
import Deletebutton from '../../../components/pickers/Deletebutton';
import { AdjustmentsIcon } from "react-native-heroicons/solid";
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Provider, Portal, } from 'react-native-paper';
import Modal from 'react-native-modal'
const options = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }]

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const Dashproduct = (props) => {

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  const options1 = [
    {
      label: 'Prcoessing',
      value: 'Prcoessing'
    },
    {
      label: 'Shipped',
      value: 'Shipped'
    },
    {
      label: 'Delivered',
      value: 'Delivered'
    },
    {
      label: 'Cancelled',
      value: 'Cancelled'
    }
  ]

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
  const productreload = props?.route?.params?.productreload;

  useEffect(() => {
    props.getincomingtlist(props?.loginuserid);
    props.getselldeshboard(props?.loginuserid);
    props.gettopsell(props?.loginuserid, 3);
    props.liveeventdetail(props?.loginuserid);
    props.Brandslist(props?.loginuserid);
    //alert(props?.loginCredentials?.isSeller)
  }, [])

  useEffect(() => {
    props.getAllproduct(props?.loginuserid);
    props.getbrandName(props?.loginuserid);
    setUserID(props?.loginuserid);
  }, [])

  const callnewfun = () => {
    props.getAllproduct(props?.loginuserid);
    setTimeout(function(){ setloginLoader(false); },2000);
  }

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = callnewfun();
      return () => unsubscribe;
    }, [])
  );

  const handleScroll = (pageYOffset) => {
    if (pageYOffset > 0) {
      setshowclassName('#B80000');
    } else {
      setshowclassName('#B80000');
    }
  }


  // Local states
  const [UserID, setUserID] = useState("");
  const [subMsg, onChangeText1] = React.useState("");
  const [msg, onChangeText2] = React.useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [dataload, setdataload] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("1");
  const [showclassName, setshowclassName] = useState("#B80000");
  const [loginLoader, setloginLoader] = React.useState(true);

  const updateorderStatus = (itemValue) => {
    setSelectedValue(itemValue)
  }

  const openpopup = () => {
    setVisible(true)
  }

  const closepopup = () => {
    setVisible(false)
  }

  const containerStyle = { backgroundColor: 'red', padding: '7%', marginHorizontal: '5%', alignItems: 'center', };

  const DATA = [
    {
      image: ImageIcons.redincome,
    },

  ];

  const renderItem2 = ({ item, index }) => {
    return (
      <View style={tw`mr-[1%]`}>
        <TouchableOpacity onPress={() => props.navigation.navigate("ProductDetails", { productId: item._id, })} style={tw`p-2`}>
          <Image source={{ uri: item.productImage }} style={tw`w-33 h-30`} />
        </TouchableOpacity>

        <View style={tw`mt-2`}>
          <Text style={tw`text-sm w-10/12 ml-3`}>{item.productName}</Text>

          <Text style={tw`text-large w-10/12 ml-3`}>${item.productPrice}</Text>
          {/* Joel want to remove we will leave incase we need to bring back */}
          {/* <View>
            {item?.productRating ?
                <Rating
                type='custom'
                imageSize={18}
                ratingCount={5}
                ratingColor='#EB5757'
                tintColor='#FFE7E7'
                value={item?.productRating}
                  startingValue={item?.productRating}
                style={{ paddingVertical: 5,width:100,marginLeft:5}}
                />
                :
                <Rating
                type='custom'
                imageSize={18}
                ratingCount={5}
                ratingColor='#EB5757'
                tintColor='#FFE7E7'
                value={0}
                startingValue={0}
                style={{ paddingVertical: 5,width:100,marginLeft:5}}
                />
            }
          </View> */}
          <Text style={tw`text-sm w-10/12 ml-3 text-blue-300 mb-5`}>{item.text2}</Text>
        </View>
      </View>
    );
  }

  const renderItem3 = ({ item, index }) => {
    return (
      <View>
        <View style={tw`flex flex-row justify-between bg-white w-full p-4 mt-4`}>
          <Text style={tw`text-sm leading-3 text-gray-700`}>{item.text}</Text>
          <Text style={tw`text-sm leading-3 text-gray-700`}>{item.text1}</Text>
          <Text style={tw`text-sm leading-3 text-gray-700`}>{item.text2}</Text>
        </View>
      </View>
    );
  }

  const renderItem4 = ({ item, index }) => {
    return (
      <View>
        <View style={tw`flex flex-row justify-between bg-white w-full p-4 mt-4`}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={item.image} style={{ width: 24, height: 24, }} />
            <Text style={[tw`text-sm leading-3 text-gray-700`, { alignSelf: 'center', marginLeft: 1 }]}>{item.text}</Text>
          </View>
          <Text style={tw`text-sm leading-3 text-gray-700`}>{item.text1}</Text>
        </View>
      </View>
    );
  }


  return (
    <View style={{ flex: 1 }}>


      <ScrollView onScroll={({ nativeEvent }) => {
        handleScroll(nativeEvent['contentOffset'].y);
      }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#ffffff' }} >

        <View style={tw`flex flex-row relative mx-4 mt-6 mb-7 shadow-sm`}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Dashorder")} style={tw.style('w-2/4')}>
              <View
                type="button"
                style={tw`relative inline-flex items-center px-4 py-3 rounded-l-md border border-red-300 bg-red-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
              >
                  <Text style={tw.style('text-base text-white', {fontFamily:'hintedavertastdsemibold'})}>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("Overview")} style={tw.style('w-2/4')}>
              <View
                type="button"
                style={tw`-ml-px relative inline-flex items-center px-4 py-3 rounded-r-md border border-gray-200 bg-gray-200 hover:bg-red-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
              >
                  <Text style={tw.style('text-base text-gray-700', {fontFamily:'hintedavertastdsemibold'})}>Sales Overview</Text>
              </View>
            </TouchableOpacity>
        </View>

        <Loader isVisible={loginLoader} />

        <View style={tw.style('flex flex-row justify-between mx-4')}>

          <TouchableOpacity>
            <Text style={tw.style('text-2xl text-gray-600',{fontFamily:'hintedavertastdsemibold'})}>Products ({props?.getlistproduct?.length})</Text>
          </TouchableOpacity>
            <Smallbutton
              text="Add Product"
              onPress={() => props.navigation.navigate("Accountproduct", { brandId: props?.brandName._id })}
            />
        </View>

        <View style={tw.style('flex flex-row mx-4 items-center')}>

          <Sortorder text="Sort Order" options={options} onSelect={(checked) => updateorderStatus(checked)} />


          <Sortfilter text="Filter"
          />

        </View>

        {/*
                    <View style={tw.style('flex flex-row m-4 ')}>
                        <Selectall text="Select All" />
                        <Editbutton navigation={props.navigation} page='Dashproduct' />
                        <Deletebutton />
                    </View>
                */}


        <View style={tw.style('m-4 mb-2')}>
          {props?.getlistproduct?.length > 0 ?
            <FlatList
              data={props?.getlistproduct || []}
              renderItem={renderItem2}
              key={item => item.id}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
            />
            :
            <View style={tw.style('justify-center my-8')}>
              <Text style={tw.style('text-base text-center', {fontFamily:'hintedavertastdsemibold'})}>No Product added yet</Text>
            </View>
          }
        </View>


        <View>


          {openpopup &&
            <Provider>
              <Portal>
                <Modal visible={visible} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', marginHorizontal: -20, marginVertical: -5 }} onDismiss={closepopup} contentContainerStyle={containerStyle}>
                  <View style={{ marginTop: 150, position: 'absolute', textAlign: 'center', justifyContent: 'center', alignItems: 'center', top: 10, left: 0, right: 0 }}>
                    <View style={{ width: 250, borderRadius: 10, backgroundColor: '#fff', borderColor: '#999', borderWidth: 2 }}>


                      <Text style={{ marginVertical: '4%', marginHorizontal: '11%', fontSize: 14, fontFamily: 'hinted-AvertaStd-Semibold' }}>Adjust Price</Text>
                      <View style={styles.pickerViewshorttodaymodal}>
                        <Sortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                      </View>

                      <View style={{ borderBottomWidth: 2, borderColor: '#e6e6e6', width: '90%', marginVertical: '7%', alignSelf: 'center' }}></View>

                      <Text style={{ marginVertical: '3%', marginHorizontal: '11%', fontSize: 14, fontFamily: 'hinted-AvertaStd-Semibold' }}>Adjust Quantity</Text>
                      <View style={styles.pickerViewshorttodaymodal}>
                        <Sortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                      </View>

                      <View style={{ borderBottomWidth: 2, borderColor: '#e6e6e6', width: '90%', marginVertical: '7%', alignSelf: 'center' }}></View>

                      <Text style={{ marginVertical: '3%', marginHorizontal: '11%', fontSize: 14, fontFamily: 'hinted-AvertaStd-Semibold' }}>Apply Discount</Text>
                      <View style={styles.pickerViewshorttodaymodal}>
                        <Sortorder options={options} onSelect={(checked) => updateorderStatus(checked)} />

                      </View>

                      <TouchableOpacity onPress={() => closepopup()} style={{ backgroundColor: '#B80000', width: 200, borderRadius: 25, padding: 15, alignSelf: 'center', marginVertical: '8%' }}>
                        <Text style={styles.totalincometodaySAVECHANGE}>SAVE CHANGES</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </Portal>
            </Provider>
          }
        </View>

      </ScrollView>
      <Footer3 onSelelection="3" />
    </View>
  )
}
export default Dashproduct
