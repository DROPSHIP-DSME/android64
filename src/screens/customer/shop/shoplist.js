import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, ImageBackground, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import styl from '../../../screens/common/styledrop';
import { Colors, CommonStrings } from '../../../common';
import { FlatListSlider } from '../../../components/react-native-flatlist-slider';
import ImageIcons from '../../../common/ImageIcons';
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import Footer3 from '../../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc';
import { VideoCameraIcon } from "react-native-heroicons/outline";
import Sortorder from '../../../components/pickers/Sortorder';
import Sortfilter from '../../../components/pickers/Sortfilter';
import { ChevrondoubleupIcon } from "react-native-heroicons/solid";
import { Rating, AirbnbRating } from 'react-native-ratings';

const shop = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
        props.getAllshop(1);
    }, [])
    useFocusEffect(() => {
        //props.getAllshop(1);
    })


    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    //Reference
    const emailRef = useRef();
    const phoneRef = useRef();
    const bisinessnameRef = useRef();
    const fullnameRef = useRef();

    // Local states
    const [starCount, setstarCount] = useState(5);
    const [selectedValue, setSelectedValue] = useState("java");
    const [wayToContact, setWayToContact] = useState("Phone");
    const [showAlert, setshowAlert] = React.useState(false);
    const [wayToContactList, setWayToContactList] = useState([
        {
            label: "Phone",
            value: "Phone"
        },
        {
            label: "Email",
            value: "Email"
        }
    ]);
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

    
    const options = [
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

    const checklogin = async () => {
        if (props?.loginuserstatus == "1") {
            props.navigation.navigate("watchlist")
        } else {
            setshowAlert(true)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={tw.style(tw`w-1/3 mb-6`)}>
              {/* TODO: Send Link to product overview page for shopper to order multiply if that applies if on goes to add to bag*/}
                <TouchableOpacity onPress={() => { props.navigation.navigate("ProductStore", { productId: item._id, shopId: item._id, shopName: item.shopName })}}
                    style={tw.style('rounded-lg mt-5 mx-2')}
                    >
                    <View style={tw.style('p-0.5')}>
                        <Image source={{ uri: item.shopImage }} style={tw.style('rounded-lg w-fit h-40')} onPress={() => { props.navigation.navigate("clothing") }} />
                        {/* TODO: Add Variable if product has a livestream gooing show video camera */}
                        <View style={tw.style('absolute right-3 top-3')}>
                            <VideoCameraIcon color="red" fill="white" size={36} />
                        </View>
                    </View>
                    <View style={tw.style('flex flex-row mt-2 justify-between')}>
                        <View style={tw.style('pl-2')}>

                        {/*   <Text style={tw.style('text-gray-700 text-xs font-normal')}>{item.shopName}</Text> */}
                            <Text style={tw.style('text-gray-700 text-xl',{fontFamily:"AvertaStdSemibold"})}>$0</Text>
                      {/*
                            {item?.productRating ?
                                 <View style={tw.style('flex flex-row mt-1 items-center')}>

                                    <Rating
                                      type='custom'
                                      imageSize={15}
                                      ratingCount={5}
                                      readonly
                                      ratingColor='#EB5757'
                                      tintColor='#FFE7E7'
                                      value={item?.productRating}
                                      startingValue={item?.productRating}
                                      style={tw.style('ml-[2%]')}
                                    />
                                    <Text style={tw.style('ml-3 text-sm text-black font-normal')}>{item?.productRating}</Text>
                                  </View>
                                  :
                                  <View style={tw.style('flex flex-row mt-1 items-center')}>

                                    <Rating
                                      type='custom'
                                      imageSize={15}
                                      ratingCount={5}
                                      readonly
                                      ratingColor='#EB5757'
                                      tintColor='#FFE7E7'
                                      value={0}
                                      startingValue={0}
                                      style={tw.style('ml-[2%]')}
                                    />
                                    <Text style={tw.style('ml-3 text-sm text-black font-normal')}></Text>
                                  </View>
                                }
                        */}
                        </View>
                        <View style={tw.style('mr-2')}>
                            <Image source={ImageIcons.Iconlock} style={tw.style('w-8 h-8')} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }



    const data = [{ text: "ALL" }, { text: "ACTIVE LIVESTREAMS" }, { text: "CLOTHING & SHOES" }, { text: "FURNITURE" }, { text: "BEAUTY & HAIR" }, { text: "ELECTRONICS" }]

    const renderItem1 = ({ item, index }) => {
        return(
            <View style={tw.style('flex flex-row ml-4')}>
                  <TouchableOpacity>
                      {index == 1 ?
                          <View style={tw.style('inline-flex items-center px-3 py-2 border border-transparent rounded-full shadow-sm bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}>
                              <Text style={tw.style('text-xs text-white mx-2')}>{item.text}</Text>
                          </View>
                          :
                          <Text style={tw.style('px-1 py-1 w-auto text-base text-gray-500')}>{item.text}</Text>
                      }
                  </TouchableOpacity>
              </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw.style('flex-1 justify-center')}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={tw.style('bg-white')} >
                <View style={tw.style('mx-4 mt-9 mb-5')}>
                    <Text style={tw.style('text-3xl text-gray-700',{fontFamily:'AvertaStdSemibold'})}>Shop</Text>
                </View>

                {/* TODO: Need to add DATA binding to Category buttons */}
                <View style={tw.style('border-b-2 border-gray-300 mb-3 mx-5')}>
                     <FlatList
                        data={data}
                        renderItem={renderItem1}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    />
                </View>


                <View style={tw.style('flex flex-row mx-5 mt-4')}>

                    <Sortorder text="Sort Order" options={options}  onSelect={(checked) => updateorderStatus(checked)}  />

                    <Sortfilter text="Filter" />

                </View>
                <View style={tw.style('mx-2')}>
                    <FlatList
                        data={props?.getlistshop || []}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                    />
                </View>
            </ScrollView>


            <Footer3 onSelection="4" />

        </KeyboardAvoidingView>

    )
}


export default shop
