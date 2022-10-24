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
import Footer2 from '../../../screens/common/Footer2';
import Footer3 from '../../../screens/common/Footer3';

import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Provider, Portal, } from 'react-native-paper';
import Modal from 'react-native-modal'
import tw from 'twrnc';
import Sortfilter from '../../../components/pickers/Sortfilter';
import Supportchat from '../../../components/Supportchat';
import Sortorder from '../../../components/pickers/Sortorder';
import Help from '../../../components/help/Help';

 const options = [ { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' },{ label: '5', value: '5' },{ label: '6', value: '6' },{ label: '7', value: '7' },{ label: '8', value: '8' },{ label: '9', value: '9' } ]


import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


const Accountfav1 = (props) => {

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
        props.getincomingtlist(props?.loginuserid);
        props.getselldeshboard(props?.loginuserid);
        props.gettopsell(props?.loginuserid, 3);
        props.liveeventdetail(props?.loginuserid);
        props.getfavoriteproductlist(props?.loginuserid);
        props.getAllproduct(1);
    }, [])

    useEffect(() => {
        props.getfavoriteproductlist(props?.loginuserid);
        setloginLoader(true);
        var getmaparr = [];
        props.getlistproduct.map(function(category, i){
            if((props?.getfavproduct && props?.getfavproduct.indexOf(category._id) > -1)){
                getmaparr.push(category)
            }
        });
        setfavlist(getmaparr)
        setTimeout(function(){ setloginLoader(false); },1000);
    }, [])

    useFocusEffect(() => {
        //getBrandUserId();
    })

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }

    const getBrandUserId = async () => {
        if (userId != "" && userId != undefined) {
            await AsyncStorage.setItem('UserId', userId);
            await AsyncStorage.setItem('userLogin', "1");
        }
    }

    const [text1, onChangeText3] = React.useState("");
    const [selectedValue, setSelectedValue] = useState("1");
    const [showclassName, setshowclassName] = useState("#B80000");
    const [favlist, setfavlist] = useState([]);
    const [loginLoader, setloginLoader] = React.useState(false);



    const DATA2 = [];

    const renderItem = ({ item, index }) => {
        return (
            <View style={tw.style('ml-2 mr-2')}>
                <TouchableOpacity onPress={() => props.navigation.navigate("NameStore", { productId: item._id, userId: item._id, productQuantity: item.productQuantity })}>
                    <View style={{borderWidth:1,borderColor:'#e6e6e6'}}>
                        <Image source={{ uri: item.productImage }} style={tw.style('w-40 h-56 rounded-md')} />
                        <Text style={styles.beautyproduct}></Text>
                    </View>

                    <View style={tw.style('flex flex-row mt-2')}>
                        <View style={{borderWidth:1,borderColor:'#e6e6e6',borderRadius:20}}>
                            <Image source={{ uri: item.productImage }} style={tw.style('h-6 w-6 rounded-full')} />
                        </View>
                        <View style={tw.style('pl-2 pt-1')}>
                            <Text style={tw.style('text-gray-500 text-xs')}>{item.productName}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }

    return (
         <View style={{flex:1}}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#f2f2f2' }} >
                <View style={tw`flex flex-row justify-between mx-4 mt-10 mb-5`}>
                    <Text style={tw.style('text-3xl text-gray-700', {fontFamily: 'hintedavertastdsemibold', })}>My Favorites</Text>
                </View>

                <Loader isVisible={loginLoader} />

                <View style={tw`mt-10`}>
                    <View style={tw`mx-3`}>
                        {favlist?.length>0 ?
                        <FlatList
                            data={favlist || []}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                        />
                        :
                            <Text style={{margin:100,fontSize:20}}>No Data found</Text>
                        }
                    </View>
                </View>



            </ScrollView>

            <Help onPress={(text1) => helpbuttonsubmit(text1)} />

            <Footer3 onSelection="5" />
        </View>
    )
}

export default Accountfav1