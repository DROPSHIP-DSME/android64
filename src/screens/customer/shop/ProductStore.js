import React, { useRef, useState, useEffect } from 'react';
import {
    Text, View, TouchableOpacity,
    Image, TextInput, ImageBackground,
    ScrollView, Alert,
    FlatList, StatusBar,
    KeyboardAvoidingView, Platform,
    Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import { RadioButton, Provider, Modal, Portal, Button, } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Footer3 from '../../../screens/common/Footer3';
import tw from 'twrnc';
import { VideoCameraIcon } from "react-native-heroicons/outline";


const ProductStore = (props) => {

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

    const brandId = props?.route?.params?.brandId;
    const brandName = props?.route?.params?.brandName;
    const aboutBrand = props?.route?.params?.aboutBrand;
    const brandImage = props?.route?.params?.brandImage;
    
    // Local states
    const [checked, setChecked] = React.useState('first');

    const [visible, setVisible] = React.useState(false);
    const [starCount, setstarCount] = useState(3);

    const [Paypal, onChangePaypal] = React.useState("Paypal");
    const [Debit, onChangeDebit] = React.useState("Debit Card");

    const [wayToContact, setWayToContact] = useState("Phone");
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
    useEffect(() => {
        props.shopproduct(brandId);
        //props.shopsellcount(brandId);
    }, [])


    const [showclassName, setshowclassName] = useState("#B80000");
    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }
    const openpopup = () => {
        setVisible(true)

    }
    const closepopup = () => {
        setVisible(false)
    }

   
    const containerStyle = { backgroundColor: 'white', padding: '5%', marginHorizontal: '5%', alignItems: 'center' };


    const DATA = [
        {
            height: 30,
            width: 30,
            image: ImageIcons.twit,
        },
        {
            height: 29.82,
            width: 30,
            image: ImageIcons.fb,
        },
        {
            height: 30,
            width: 30,
            image: ImageIcons.insta,
        },
        {
            height: 30,
            width: 30,
            image: ImageIcons.whatsapp,
        },
        {
            height: 30,
            width: 30,
            image: ImageIcons.mail,
        },
        {
            height: 25,
            width: 25,
            image: ImageIcons.email,
        },


    ];

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
    const renderItem = ({ item }) => {

        return (
            <View style={styles.maincartviewshop}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("NameStore", { productId: item._id }) }}>
                    <View >
                        <Image source={{ uri: item.productImage }} style={styles.jeansimgshop} />
                        <View style={tw.style('absolute right-3 top-3')}>
                            <VideoCameraIcon color="red" fill="white" size={36} />
                        </View>
                        <View style={tw.style('mx-2')}>
                            <Text style={styles.boldproduct}>{item.productName}</Text>
                            <View style={tw.style('flex flex-row',{justifyContent:'space-between',marginBottom:10})}>
                                <Text style={styles.salestext}>${item.productPrice}</Text>
                                <Image source={ImageIcons.Iconlock} style={tw.style('w-6 h-6')} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.registrationRoot}>
            <View style={tw.style('flex flex-1 mt-1 bg-white')}>

                <View style={tw.style('flex flex-row mt-2 mx-5')}>
                    <Image source={{ uri: brandImage }} style={tw.style('rounded-lg w-30 h-30')} />
                    <View style={tw.style('mt-5')}>
                        <Text style={tw.style('mx-5 text-xl  text-gray-700 w-fit')}>{brandName}</Text>
                        <Text style={[tw.style('mx-5 text-base text-gray-700'),{width:'75%'}]}>{aboutBrand}</Text>
                    </View>
                </View>
                <View style={styles.bagimageView}>
                    <View style={{ alignItems: 'center' }}>
                        {props?.getshopproductlist == false ?
                            <Text style={tw.style('mx-2 text-xl text-gray-700 w-fit',{fontFamily:'AvertaStd-Semibold'})}>Products</Text>
                        :
                            <Text style={tw.style('mx-2 text-xl text-gray-700 w-fit',{fontFamily:'AvertaStd-Semibold'})}>Products({props?.getshopproductlist?.length})</Text>
                        }
                    </View>
                </View>
                {props?.getshopproductlist != false &&
                    <View style={tw.style('border-b-2 mt-5 border-gray-300 mb-3 mx-5')}>
                         <FlatList
                            data={data}
                            renderItem={renderItem1}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        />
                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#ffffff' }} >
                    <View >
                        
                        <View>
                        {props?.getshopproductlist == false &&
                            <View style={tw.style('mt-4 mx-5')}>
                               
                                <Text style={tw.style('mx-2 mt-10 text-base text-gray-700 w-fit')}>No Product added in this store</Text>
                            </View>
                        }
                    </View>


                        <View style={{ marginHorizontal: '2%', marginBottom: '25%' }}>
                            <FlatList
                                data={props?.getshopproductlist || []}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Footer3 onSelection="4" />

        </KeyboardAvoidingView>
    )
}



export default ProductStore
