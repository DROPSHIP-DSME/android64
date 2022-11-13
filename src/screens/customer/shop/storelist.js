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
                <TouchableOpacity onPress={() => { props.navigation.navigate("ProductStore", { brandId: item._id, brandName: item.brandName,aboutBrand: item.aboutBrand,brandImage:item.brandImage })}}
                    style={tw.style('rounded-lg mt-5 mx-2')}
                    >
                    <View style={tw.style('p-0.5')}>
                        <Image source={{ uri: item.brandImage }} style={tw.style('rounded-lg w-fit h-40')} />
                        {/* TODO: Add Variable if product has a livestream gooing show video camera */}
                        
                    </View>
                    <View style={tw.style('flex flex-row mt-2 justify-between')}>
                        <View style={tw.style('pl-2')}>

                          <Text style={tw.style('text-gray-600 text-xl',{fontFamily:"AvertaStdSemibold"})}>{item.brandName}</Text>
                            
                      
                        </View>
                        
                    </View>
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
                    <Text style={tw.style('text-3xl text-gray-700',{fontFamily:'AvertaStdSemibold'})}>Stores</Text>
                </View>

                {/* TODO: Need to add DATA binding to Category buttons */}
                


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
