import React, { useRef, useState,useEffect } from 'react';
import { Text, View,Image,TouchableOpacity, ImageBackground, FlatList,ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import { Colors, CommonStrings } from '../../common';
import ImageIcons from '../../common/ImageIcons';
import tw from 'twrnc';
import BottomSheet from 'react-native-easy-bottomsheet';
import RBSheet from "react-native-raw-bottom-sheet";
import { HomeIcon } from "react-native-heroicons/solid";
import { VideoCameraIcon } from "react-native-heroicons/solid";
import { CashIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { SpeakerphoneIcon } from "react-native-heroicons/solid";
import { DotsHorizontalIcon } from "react-native-heroicons/solid";
import { PresentationChartLineIcon } from "react-native-heroicons/solid";
import { UserIcon } from "react-native-heroicons/solid";
import { ChatAltIcon } from "react-native-heroicons/solid";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { TagIcon } from "react-native-heroicons/solid";
import { MenuIcon } from "react-native-heroicons/solid";
import InputField from '../../components/forms/inputField';
import { RoundedButton } from '../../components/forms/button';
import { phoneRegExp } from '../../services/helper';
import DropdownField from '../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../components/modals/Loader';
import { useNavigation } from '@react-navigation/native';
import { RadioButton ,Provider, Modal, Portal, Button,} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Footer3 = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        onSelection,
        Brandlistdata,
        loginCredentials,
        menucount
    } = props;

    

    const navigation = useNavigation();

    //Reference
    // Local states
    const [visible, setVisible] = React.useState(false);
    const [IsLogin, setIsLogin] = React.useState('');
    const [showpop, setshowpop] = React.useState(false);
    const [showaccountpop,setshowaccountpop]= React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAcctVisible, setAcctModalVisible] = useState(false);
    const [getCredentials, setgetCredentials] = useState([]);
    const [getBrandlistdata, setgetBrandlistdata] = useState([]);
    const [getmenucount, setgetmenucount] = useState([]);

    useEffect(() => {
        getBrandUserId(menucount,Brandlistdata,loginCredentials);
    }, [loginCredentials])

    const getBrandUserId = async (menucount,Brandlistdata,loginCredentials) => {
        console.log('Brandlistdata',Brandlistdata);
        var getIsLogin = await AsyncStorage.getItem('userLogin');
        //console.log('loginCredentials',loginCredentials?.isSeller);
        if(loginCredentials!=null && loginCredentials!=undefined){
            await AsyncStorage.removeItem('Brandlistdata');
            await AsyncStorage.removeItem('loginCredentials');
            await AsyncStorage.removeItem('menucount');

            await AsyncStorage.setItem('Brandlistdata',JSON.stringify(Brandlistdata));
            await AsyncStorage.setItem('loginCredentials',JSON.stringify(loginCredentials));
            //console.log('footer3menucount',menucount);
            await AsyncStorage.setItem('menucount',JSON.stringify(menucount));
            setgetCredentials(loginCredentials);
            setgetBrandlistdata(Brandlistdata);
            setgetmenucount(menucount);
        }else{

            var newloginCredentials = await AsyncStorage.getItem('loginCredentials');
            var newBrandlistdata = await AsyncStorage.getItem('Brandlistdata');
            var menucount = await AsyncStorage.getItem('menucount');
            setgetCredentials(JSON.parse(newloginCredentials));
            setgetBrandlistdata(JSON.parse(newBrandlistdata));
            setgetmenucount(JSON.parse(menucount));
             
        }

        setIsLogin(getIsLogin);
    }

    const Showshoplinks = () => {
        const refRBSheet = useRef();

        return (
            <View>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                        <Text>
                            <ShoppingBagIcon color="#ff0000" fill="gray" size={24} />
                        </Text>
                            <Text style={tw.style('text-sm font-normal text-gray-700')}>Shop</Text>
                    </View>
                </TouchableOpacity>
                    <RBSheet
                        ref={refRBSheet}
                        height={300}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: 'rgba(52, 52, 52, 0.8)'
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            }
                        }}
                    >


                    <ScrollView>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('shop'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <ShoppingCartIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Shop Products</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('upcoming'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <VideoCameraIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>View Livestreams</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    </RBSheet>
            </View>
        );
    }

    const Showaccountlinks = () => {
        const refRBSheet = useRef();

        return (
            <View>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                        <Text>
                            <DotsHorizontalIcon color="#ff0000" fill="gray" size={24} />
                        </Text>
                            <Text style={tw.style('text-sm font-normal text-gray-700')}>More</Text>
                    </View>
                </TouchableOpacity>

                <RBSheet
                    ref={refRBSheet}
                    height={750}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)'
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <ScrollView>
                        {/* user Store profile */}
                        {getCredentials?.isSeller == true &&
                            <View style={tw`pb-2`}>
                                <TouchableOpacity style={tw`flex flex-row`} onPress={() => {refRBSheet.current.close(); navigation.navigate('Account'); }}>
                                    <View style={tw`flex-row items-center w-full`}>
                                        <FlatList
                                              data={getBrandlistdata || []}
                                              renderItem={renderItem1}
                                              keyExtractor={item => item.id}
                                              showsHorizontalScrollIndicator={false}
                                              numColumns={1}
                                            />
                                        

                                    </View>
                                </TouchableOpacity>
                            </View>
                        }

                        {getCredentials?.isSeller == true &&
                            <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                                <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Overview'); }} style={tw.style(`flex-row items-center w-full`)}>
                                    <Image
                                        style={tw.style(`w-5 h-5`)}
                                        source={ImageIcons.stack}
                                    />
                                    <Text style={tw.style('text-xl text-gray-700 ml-4')}>Sellers Dashboard</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {getCredentials?.isSeller == true &&
                            <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                                <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashproduct'); }} style={tw.style(`flex-row items-center w-full`)}>
                                    <Image
                                        style={tw.style(`w-5 h-5`)}
                                        source={ImageIcons.stack}
                                    />
                                    <Text style={tw.style('text-xl text-gray-700 ml-4')}>Products</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {getCredentials?.isSeller == true &&
                            <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                                <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashorder'); }} style={tw.style(`flex-row items-center w-full`)}>
                                    <Image
                                        style={tw.style(`w-5 h-5`)}
                                        source={ImageIcons.stack}
                                    />
                                    <Text style={tw.style('text-xl text-gray-700 ml-4')}>Orders</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {getCredentials?.isSeller == true &&
                            <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                                <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashsubscribe'); }} style={tw.style(`flex-row items-center w-full`)}>
                                    <Image
                                        style={tw.style(`w-5 h-5`)}
                                        source={ImageIcons.stack}
                                    />
                                    <Text style={tw.style('text-xl text-gray-700 ml-4')}>Subcriptions</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {getCredentials?.isSeller == true &&
                            <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                                <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashadvertise'); }} style={tw.style(`flex-row items-center w-full`)}>
                                    <SpeakerphoneIcon color="red" fill="#000000" size={24} />
                                    <Text style={tw.style('text-xl text-gray-700 ml-4')}>Ads</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {getCredentials?.isSeller == true &&
                            <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                                <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashsale'); }} style={tw.style(`flex-row items-center w-full`)}>
                                    <PresentationChartLineIcon color="red" fill="#000000" size={24} />
                                    <Text style={tw.style('text-xl text-gray-700 ml-4')}>Stats</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* If user has store or no store these links will show for both use cases */}
                        <View style={tw.style('h-5 w-full px-4')}>
                            <View style={tw.style('border-b-2 border-gray-300')}></View>
                        </View>
                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Profile'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <UserIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>My Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashchats'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <ChatAltIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Message</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Accountorderhist'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <Image
                                    style={tw.style(`w-5 h-5`)}
                                    source={ImageIcons.stack}
                                />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Purchases</Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </RBSheet>

            </View>

        );
    }

    // useFocusEffect(
    //     () => {
    //     getBrandUserId();
    //  })


     const renderItem1 = ({ item, index }) => {
      return (
        <View>
          {index == 0 &&
            <View style={tw`pb-2`}>
                <TouchableOpacity style={tw`flex flex-row`} onPress={() => navigation.navigate("Dashsetting")}>
                    <View style={tw`flex-row items-center w-full`}>

                        <View style={{marginLeft:10}}>
                            <Image source={{ uri: item.brandImage }} style={styles.produtbrandimage2} />
                        </View>
                        <View style={tw`ml-3`}>
                            <Text style={styles.droptxttt}>{item.brandName} - Store</Text>

                            <View style={tw`flex-row items-center`}>
                                <View style={tw.style('flex-row items-center mr-1')}>
                                    <ShoppingBagIcon color="red" fill="#b80000" size={20} />
                                    <Text style={styles.optext}>{getmenucount?.getProductCount} products</Text>
                                </View>
                                <View style={tw.style('flex-row items-center ml-1')}>
                                    <TagIcon color="red" fill="#b80000" size={20} />
                                    <Text style={styles.optext}>{getmenucount?.getSalesCount} sales</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`absolute right-0`}>
                          <ChevronRightIcon color="red" fill="#b80000" size={48} />
                        </View>

                    </View>
              </TouchableOpacity>
            </View>
          }
        </View>
      );
    }


    return (
    <View>

        <View style={tw.style('max-w-fit  bg-white flex h-18 px-6 py-3 md:py-4 md:px-6 sm:mx-1 md:mx-2')}>
            <View style={tw.style('flex-row justify-between')}>

                <TouchableOpacity onPress={() => { setshowaccountpop(false); setshowpop(false); navigation.navigate('watchlist'); }}>
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


                    {/* showShopLinks selection component */}
                    <Showshoplinks/>


                    <TouchableOpacity onPress={() => { setshowaccountpop(false); setshowpop(false); navigation.navigate("Account")}} >
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

                    {/* Account links selection component */}
                    <Showaccountlinks/>

            </View>

        </View>
    </View>

    )
}
export default Footer3
