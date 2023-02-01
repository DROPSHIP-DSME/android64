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
import Largesortorder from '../../../components/pickers/Largesortorder';
import Sortfilter from '../../../components/pickers/Sortfilter';
import { ChevrondoubleupIcon } from "react-native-heroicons/solid";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { VideoCameraIcon } from "react-native-heroicons/outline";
import { ShoppingBagIcon } from "react-native-heroicons/solid";

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
            getmaparr.push({label: 'All', value: 'All'})
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

    const [showmsgdata, setshowmsgdata] = React.useState(false);

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
        setshowmsgdata(true)
    }

    const renderItem1 = ({ item, index }) => {
        return(
            <View style={tw.style('flex flex-row mr-4 mb-3')}>
                  <TouchableOpacity onPress={() => { filterbycategory(item.value,index) }}>
                      {index == selectedIndex ?
                          <View style={tw.style('inline-flex items-center px-3 py-2 border border-transparent rounded-2 shadow-sm bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}>
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
            <View style={tw.style(tw`flex w-1/3 mb-6`)}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("NameStore", { productId: item._id }) }} style={tw.style('rounded-lg mt-5 mx-2')} >
                    <View style={{borderWidth:1,borderColor:'#e6e6e6',borderRadius:10}}>
                        <Image source={{ uri: item.productImage }} style={tw.style('rounded-lg w-fit h-30')} />                        
                        <View style={tw.style('absolute right-3 top-3')}></View>
                    </View>
                    <View style={tw.style('top-2 px-1')}>
                        <View style={tw.style('flex-row')}>
                            <Text style={tw.style(`text-xl font-bold text-gray-700`)}>${item.productPrice}</Text>
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
                

                <View style={tw.style('flex flex-row justify-between items-center mx-4 mt-5')}>
                    <Text style={tw.style('text-3xl text-gray-700',{fontFamily:'AvertaStd-Semibold'})}>Shop</Text>
                    
                </View>

                <View style={tw.style('mt-5 border-gray-300 mb-3',{borderColor:'#c3c3c3', borderBottomWidth:3, marginHorizontal:20})}>
                         <FlatList
                            data={categoryOption}
                            renderItem={renderItem1}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        />
                    </View>
                <View style={{ flexDirection:'row'}}>
                    <View style={{ width:'40%', marginLeft:20}}>
                        <Largesortorder text="Sort" options={options}  onSelect={(checked) => updateorderStatus(checked)}  />
                        
                    </View>
                    <TouchableOpacity style={[styles.poppiker3,{flexDirection:'row'}]}>
                        <Image source={ImageIcons.filter} style={styles.fiterimg}/>
                        <Text style={styles.filterpop}>FILTERS</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw.style('mx-2')}>
                    {props?.getlistproduct?.length>0 ?
                    <FlatList
                        data={props?.getlistproduct || []}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                    />
                    :
                    <View>
                       {showmsgdata==true &&
                        <Text style={{ justifyContent:'center',textAlign:'center',marginTop:100}}>No Item added in this category</Text>
                       }
                    </View>
                    }
                </View>
            </ScrollView>


            <Footer3 onSelection="4" />

        </KeyboardAvoidingView>

    )
}


export default shop
