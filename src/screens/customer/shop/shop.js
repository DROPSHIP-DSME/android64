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
import { VideoCameraIcon } from "react-native-heroicons/outline";

const shop = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
        props.getAllproduct(1);
        props.getAllcategory(1);
    }, [])
    useFocusEffect(() => {
        //props.getAllshop(1);
    })

    useEffect(() => {
         //props.getbrandName(props?.loginuserid);
         if(props.getlistcategory && props.getlistcategory.length>0){
            var getmaparr = [];
            getmaparr.push({label: 'Most popular', value: 'Most popular'})
            getmaparr.push({label: 'Live Now', value: 'Live Now'})
            props.getlistcategory.map(function(category, i){
                getmaparr.push({label: category.categoryName, value: category._id})
            });
            setcategoryOption(getmaparr)
        }
    }, [props.getlistcategory])

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
    const [categoryOption, setcategoryOption] = useState([])

    const [selectedIndex, setselectedIndex] = React.useState(0);

    const [selectedCat, setselectedCat] = useState('Most popular');

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
        props.getfilterproduct(selectedCat,itemValue);
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
        label: 'Price Low to High',
        value: 'Lowtohigh'
      },
      {
        label: 'Price High to Low',
        value: 'hightolow'
      }
    ]

    const checklogin = async () => {
        if (props?.loginuserstatus == "1") {
            props.navigation.navigate("watchlist")
        } else {
            setshowAlert(true)
        }
    }
    
    const filterbycategory = async(val,index) => {
        setselectedIndex(index);
        setselectedCat(val);
        props.getfilterproduct(val,'no');
    }

    const renderItem1 = ({ item, index }) => {
        return(
            <View style={tw.style('flex flex-row ml-4')}>
                  <TouchableOpacity onPress={() => { filterbycategory(item.value,index) }}>
                      {index == selectedIndex ?
                          <View style={tw.style('inline-flex items-center px-3 py-2 border border-transparent rounded-full shadow-sm bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}>
                              <Text style={tw.style('text-xs text-white mx-2')}>{item.label}</Text>
                          </View>
                          :
                          <Text style={tw.style('px-1 py-1 w-auto text-base text-gray-500')}>{item.label}</Text>
                      }
                  </TouchableOpacity>
              </View>
        );
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={tw.style(tw`w-1/3 mb-6`)}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("NameStore", { productId: item._id }) }} style={tw.style('rounded-lg mt-5 mx-2')} >
                    <View style={tw.style('p-0.5')}>
                        <Image source={{ uri: item.productImage }} style={tw.style('rounded-lg w-fit h-40')} />                        
                        <View style={tw.style('absolute right-3 top-3')}>
                            <VideoCameraIcon color="red" fill="white" size={36} />
                        </View>
                    </View>
                    <View style={tw.style('mx-2')}>
                        <Text style={styles.boldproduct}>{item.productName}</Text>
                        <View style={tw.style('flex flex-row',{justifyContent:'space-between',marginBottom:10})}>
                            <Text style={styles.salestext}>${item.productPrice}</Text>
                            <Image source={ImageIcons.Iconlock} style={tw.style('w-6 h-6')} />
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
                    <Text style={tw.style('text-3xl text-gray-700',{fontFamily:'hintedavertastdsemibold'})}>Shop</Text>
                </View>

                <View style={tw.style('flex flex-row mx-5 mt-4')}>

                    <Sortorder text="Sort Order" options={options}  onSelect={(checked) => updateorderStatus(checked)}  />

                    <Sortfilter text="Filter" />

                </View>
                <View style={tw.style('border-b-2 mt-5 border-gray-300 mb-3 mx-5')}>
                         <FlatList
                            data={categoryOption}
                            renderItem={renderItem1}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        />
                    </View>

                <View style={tw.style('mx-2')}>
                    <FlatList
                        data={props?.getlistproduct || []}
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
