import React, { useRef, useState,useEffect } from 'react';
import { Text, View,Image,TouchableOpacity, ImageBackground, ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import { Colors, CommonStrings } from '../../common';
import ImageIcons from '../../common/ImageIcons';
import tw from 'twrnc';
import { HomeIcon } from "react-native-heroicons/solid";
import { VideoCameraIcon } from "react-native-heroicons/solid";
import { CashIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { UserIcon } from "react-native-heroicons/solid";
import InputField from '../../components/forms/inputField';
import { RoundedButton } from '../../components/forms/button';
import { phoneRegExp } from '../../services/helper';
import DropdownField from '../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../components/modals/Loader';
import { useNavigation } from '@react-navigation/native';
import { RadioButton ,Provider ,Modal, Portal, Button,} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Footer3 = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        onSelection,
    } = props;

    const navigation = useNavigation();

    //Reference
    // Local states
    const [visible, setVisible] = React.useState(false);
    const [IsLogin, setIsLogin] = React.useState('');
    const [showpop, setshowpop] = React.useState(false);
    const [showaccountpop,setshowaccountpop]= React.useState(false);

    useEffect(() => {
       getBrandUserId();
    }, [])

    const getBrandUserId = async () => {
        var getIsLogin = await AsyncStorage.getItem('userLogin');
        setIsLogin(getIsLogin);
    }

    useFocusEffect(
        () => {
        getBrandUserId();
     })


    return (
        <View>
            {showpop==true &&
                <View style={{flex:1,position:'absolute',zIndex:8003,bottom:50,left:60, borderRadius:10, backgroundColor:'#ffffff'}}>
                    <View onPress={() => { navigation.navigate('shop'); }}  style={tw.style('inline-block items-center mx-3 mt-4 md:px-2 md:mx-2')}>
                        <TouchableOpacity onPress={() => { navigation.navigate('shop'); }}>
                            <Text onPress={() => { navigation.navigate('shop'); }} style={tw.style('text-sm text-right font-bold text-gray-700')}>Shop Products</Text>
                        </TouchableOpacity>
                    </View>
                    <View onPress={() => { navigation.navigate('upcoming'); }}  style={tw.style('inline-block items-center px-2 mt-3 mx-3 md:px-2 md:mx-2')}>
                        <TouchableOpacity onPress={() => { navigation.navigate('upcoming'); }}>
                            <Text onPress={() => { navigation.navigate('upcoming'); }} style={tw.style('text-sm text-right font-bold text-gray-700',{marginBottom:10})}>View Livestreams</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {showaccountpop==true &&
                <View style={{flex:1,position:'absolute',width:150,zIndex:8003,bottom:50,right:20, borderRadius:10, backgroundColor:'#ffffff'}}>
                    <View onPress={() => { navigation.navigate('Account'); }}  style={tw.style('inline-block items-center mx-3 mt-4 md:px-2 md:mx-2')}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Account'); }}>
                            <Text onPress={() => { navigation.navigate('Account'); }} style={tw.style('text-sm text-right font-bold text-gray-700')}>My Account</Text>
                        </TouchableOpacity>
                    </View>
                    <View onPress={() => { navigation.navigate('Overview'); }}  style={tw.style('inline-block items-center px-2 mt-3 mx-3 md:px-2 md:mx-2')}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Overview'); }}>
                            <Text onPress={() => { navigation.navigate('Overview'); }} style={tw.style('text-sm text-right font-bold text-gray-700',{marginBottom:10})}>My Store</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }


        <View style={tw.style('max-w-fit  bg-white flex h-15 px-6 py-2 md:py-4 md:px-6 sm:mx-1 md:mx-2')}>
          <View style={tw.style('flex-row justify-between')}>

          <TouchableOpacity onPress={() => { navigation.navigate('watchlist'); }}>
            {onSelection==1 ?
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <HomeIcon color="red" fill="#b80000" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Home</Text>
              </View>
          :
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <HomeIcon color="red" fill="gray" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Home</Text>
              </View>
            }
        </TouchableOpacity>
        {/*
        <TouchableOpacity onPress={() => { navigation.navigate('upcoming'); }}>
            {onSelection==2 ?
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <VideoCameraIcon color="red" fill="#b80000" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Livestreams</Text>
              </View>
          :
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <VideoCameraIcon color="red" fill="gray" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Livestreams</Text>
              </View>
            }
        </TouchableOpacity>
        */}

        
        <TouchableOpacity onPress={() => { setshowpop(s=>!s) }}>
         {onSelection==2 ?
           <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
               <Text>
                  <ShoppingBagIcon color="red" fill="#b80000" size={24} />
               </Text>
                <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Shop</Text>
           </View>
       :
           <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
               <Text>
                  <ShoppingBagIcon color="red" fill="gray" size={24} />
               </Text>
                <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Shop</Text>
           </View>
        }
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("Dashlive")} >
            {onSelection==3 ?
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <ShoppingCartIcon color="red" fill="#b80000" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Sell</Text>
              </View>
          :
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <ShoppingCartIcon color="red" fill="gray" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Sell</Text>
              </View>
            }

        </TouchableOpacity>


        <TouchableOpacity onPress={() => { setshowaccountpop(s=>!s) }}>
         {onSelection==5 ?
           <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
               <Text>
                  <UserIcon color="red" fill="#b80000" size={24} />
               </Text>
                <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Account</Text>
           </View>
       :
           <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
               <Text>
                  <UserIcon color="red" fill="gray" size={24} />
               </Text>
                <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Account</Text>
           </View>
        }
        </TouchableOpacity>

        </View>

        </View>
        </View>

    )
}
export default Footer3
