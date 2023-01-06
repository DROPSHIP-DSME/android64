import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text ,Image,StyleSheet,View} from 'react-native';
import { SearchIcon } from "react-native-heroicons/solid";
import { BellIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { connect, useSelector } from 'react-redux';

import {
  Registration,
  RegistrationShop,
  Login,
  OTPVerification,
  Dashwith,
  Dashaccount,
  Accountorderhist,
  Accountsum,
  StoreOwner,
  Accountfollow,
  Accountproduct,
  Accountbrandlist,
  Accountpublish,
  Accountbrand,
  Accountfav1,
  Accountstore,
  Accountdata,
  Dashdetail,
  Accountorderview,
  Dashlive3,
  Dashlive,
  Dashlive2,
  Dashimport,
  ForgetPassword,
  Dashsupport,
  Dashsupportacc,
  ResetPassword,
  Dashadvertise,
  Dashaccountlist,
  Golive,
  Dashsale,
  Dashproduct,
  Dashsetting,
  Dashsubscribe,
  Dashsubscribe2,
  Dashchats,
  Dashorder,
  Dashreturn,
  Goliveshop,
  Footer2,
  Footer3,
  SalesAnalytic,
  editprofile,
  editaddress,
  editviewaddress,
  editpassword,
  deletaccount,
  Codeconfirm,
  CreateAccountShop,
  CreateStore,
  SearchProduct,
  NameStore,
  ProductDetails,
  Cart,
  Overview,
  Verification,
  Log,
  watchlist,
  clothing,
  clothdetails,
  upcoming,
  shop,
  Blurbackground,
  Search,
  shippinginfo,
  Popevent,
  Notification,
  Viewevent,
  Account,
  ProductStore,
  Sellheader,
  payment,
  ordercheckout,
  createselleraccount,
  Verificationsteps,
  Profile,
  Shippingdetails,
} from '../container';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../common/Color';
import { Fonts, ImageIcons } from '../common';
import tw from 'twrnc';
import Whitelogo from '../components/baseassests/Whitelogo';


const Stack = createStackNavigator();

const Auth = (props) => {

    let { cartcountVal } = useSelector(state => state.auth)
    const [cartCount, setcartCount] = useState(0);

    let { notificationcountVal } = useSelector(state => state.auth)
    const [notificationCount, setnotificationCount] = useState(0);

    let { brandName } = useSelector(state => state.auth);
    const [brandImage, setbrandImage] = useState('');

  useEffect(() => {
    setcartCount(cartcountVal);
    setnotificationCount(notificationcountVal);
    setbrandImage(brandName?.brandImage);
  }, [cartcountVal,notificationcountVal,brandName])

  return (
    <Stack.Navigator
    screenOptions={{ animationEnabled: false }}
    // initialRouteName={defaultScreen}
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: Colors.SKY_BLUE,
    //   },
    //   headerTintColor: Colors.WHITE,
    // }}
    >
      {props.defaultAuthScreen === "ResetPassword" ?
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: '', headerShown: false }}
        />
        :

         <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE}}
          />
      }


        <Stack.Screen
        name="Sellheader"
        component={Sellheader}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />



      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE }}
      />

      <Stack.Screen
        name="payment"
        component={payment}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE }}
      />

      {/* <Stack.Screen
        name="ordercheckout"
        component={ordercheckout}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE }}
      /> */}

      <Stack.Screen
        name="createselleraccount"
        component={createselleraccount}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE }}
      />

      <Stack.Screen
        name="Verificationsteps"
        component={Verificationsteps}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE }}
      />

      <Stack.Screen
        name="RegistrationShop"
        component={RegistrationShop}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE }}
      />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerification}
        options={{ title: '', headerShown: true }}
      />

      <Stack.Screen
        name="shop"
        component={shop}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount}notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />




      <Stack.Screen
        name="Popevent"
        component={Popevent}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Popevent ",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#fce8e8', elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />
       <Stack.Screen
        name="Viewevent"
        component={Viewevent}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Viewevent",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#FFE7E7', elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />

      <Stack.Screen
        name="upcoming"
        component={upcoming}
        options={({ navigation }) => ({
                         headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

       <Stack.Screen
        name="Accountsum"
        component={Accountsum}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />


      <Stack.Screen
        name="deletaccount"
        component={deletaccount}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: " ",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#fce8e8', elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />
     <Stack.Screen
        name="editpassword"
        component={editpassword}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />



     <Stack.Screen
        name="editaddress"
        component={editaddress}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="clothdetails"
        component={clothdetails}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />


      <Stack.Screen
        name="clothing"
        component={clothing}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="Blurbackground"
        component={Blurbackground}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: " ",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#B80000', elevation: 0, shadowOpacity: 0 },
                    })}
      />

      <Stack.Screen
        name="watchlist"
        component={watchlist}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />



       <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount}  notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />



      <Stack.Screen
        name="NameStore"
        component={NameStore}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="ProductStore"
        component={ProductStore}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />


      <Stack.Screen
        name="editprofile"
        component={editprofile}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

       <Stack.Screen
        name="Accountorderhist"
        component={Accountorderhist}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="editviewaddress"
        component={editviewaddress}
         options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />




       <Stack.Screen
        name="Accountorderview"
        component={Accountorderview}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />


      <Stack.Screen
        name="Search"
        component={Search}
         options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

       <Stack.Screen
        name="Notification"
        component={Notification}
         options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />



      <Stack.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />


       <Stack.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="Shippingdetails"
        component={Shippingdetails}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />





      <Stack.Screen
        name="SalesAnalytic"
        component={SalesAnalytic}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Sales Analytics",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#FFE7E7', elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />





      <Stack.Screen
        name="Overview"
        component={Overview}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="Dashproduct"
        component={Dashproduct}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

       <Stack.Screen
        name="Dashorder"
        component={Dashorder}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />


       <Stack.Screen
        name="Accountfollow"
        component={Accountfollow}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Accountbrand"
        component={Accountbrand}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}/>,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Accountpublish"
        component={Accountpublish}
         options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Accountstore"
        component={Accountstore}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}/>,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="Accountfav1"
        component={Accountfav1}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Accountbrandlist"
        component={Accountbrandlist}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Accountdata"
        component={Accountdata}
         options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashchats"
        component={Dashchats}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashreturn"
        component={Dashreturn}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="Dashsale"
        component={Dashsale}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="Dashsubscribe"
        component={Dashsubscribe}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashsubscribe2"
        component={Dashsubscribe2}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashadvertise"
        component={Dashadvertise}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashaccount"
        component={Dashaccount}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashaccountlist"
        component={Dashaccountlist}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashwith"
        component={Dashwith}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />

      <Stack.Screen
        name="Dashimport"
        component={Dashimport}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="Dashsetting"
        component={Dashsetting}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
      <Stack.Screen
        name="Dashsupport"
        component={Dashsupport}
       options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashsupportacc"
        component={Dashsupportacc}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashlive"
        component={Dashlive}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashlive2"
        component={Dashlive2}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashlive3"
        component={Dashlive3}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={true}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage} />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />
       <Stack.Screen
        name="Dashdetail"
        component={Dashdetail}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItemsell navigation={navigation} brandImage={brandImage}/>,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />





      <Stack.Screen
        name="StoreOwner"
        component={StoreOwner}
        options={({ navigation }) => ({
                        headerShown: true,
                        headerLeft: () => <LeftMenuItem navigation={navigation} isMenu={false}  />,
                        headerRight: () => <RightMenuItem navigation={navigation} cartCount={cartCount} notificationCount={notificationCount}  />,
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: styles.titleheaderstyle,
                        headerStyle: styles.headerbackgroundstyle,
                    })}
      />







      <Stack.Screen
        name="CreateStore"
        component={CreateStore}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Create my Shop",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#FFE7E7', elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />

       <Stack.Screen
        name="Accountproduct"
        component={Accountproduct}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Create my Shop",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor:'#FFE7E7', elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />



      <Stack.Screen
        name="Goliveshop"
        component={Goliveshop}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Go Live",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor: Colors.WHITE, elevation: 0, shadowOpacity: 0 },
                    })}
        // options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.BLACK}}
      />

      <Stack.Screen
        name="Golive"
        component={Golive}
        options={({ navigation }) => ({
                        headerShown: false,
                        headerLeft: () => <LeftMenuItem navigation={navigation}  />,
                        //headerRight: () => <RightMenuItem navigation={navigation}  />,
                        headerTitle: "Go Live",
                        headerTitleAlign: "center",
                        headerTitleStyle: { color: Colors.BLACK, fontFamily: Fonts.RalewayExtraBold },
                        headerStyle: { backgroundColor: Colors.WHITE, elevation: 0, shadowOpacity: 0 },
                    })}
        //options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />






      <Stack.Screen
            name="Codeconfirm"
            component={Codeconfirm}
            options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE}}
          />


      <Stack.Screen
        name="CreateAccountShop"
        component={CreateAccountShop}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />


      <Stack.Screen
        name="Footer2"
        component={Footer2}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />
      <Stack.Screen
        name="Footer3"
        component={Footer3}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ title: '', headerShown: false, headerTransparent: true,headerTintColor:Colors.WHITE}}
      />


      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ title: '', headerShown: true, headerTransparent: true,headerTintColor:Colors.BLACK }}
      />

       <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: '', headerShown: false }}
        />

    </Stack.Navigator>
  );
};

const LeftMenuItem = ({ navigation, isMenu }) => {
    return (
       <View style={isMenu ? styles.leftLabel: styles.leftLabelfalse}>
           <TouchableOpacity onPress={() => {
                if (isMenu) {
                    navigation?.goBack()
                } else {
                    navigation?.goBack();
                }
            }}
            style={tw.style('mr-10')}>
               {isMenu ?
                <View style={tw.style('w-7 h-7 top-4')}>
                    <Whitelogo />
                </View>
               :
                <ChevronLeftIcon color="#FFFFFF" fill="#ffffff" size={40} />
              }
            </TouchableOpacity>
        </View>
    )
}



const RightMenuItem = ({navigation,cartCount,notificationCount}) => {
    return (
        <View style={tw.style('flex flex-row justify-center items-center mr-4 px-2')}>
           <TouchableOpacity onPress={() => navigation.navigate("Search")} style={tw.style('mr-1 px-1')}>
                <SearchIcon color="#FFFFFF" fill="#ffffff" size={20} />
            </TouchableOpacity>

           <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={tw.style('mr-2 px-1')}>
              <View style={tw.style('flex-row items-center')}>
              <BellIcon color="#FFFFFF" fill="#ffffff" size={18} />
              <Text style={tw.style('text-lg text-white font-bold pl-1')}>{notificationCount}</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
              <View style={tw.style('flex-row items-center')}>
                  <ShoppingBagIcon color="red" fill="#ffffff" size={18} />
                  <Text style={tw.style('text-lg text-white font-bold pl-1')}>{cartCount}</Text>
              </View>
          </TouchableOpacity>
        </View>
    )
}


const RightMenuItemsell = ({navigation,brandImage}) => {
    return (
        <View style={tw.style('flex flex-row justify-center items-center mr-4 px-2 h-12 w-2/3')}>

           <TouchableOpacity onPress={() => navigation.navigate("Dashsetting")} style={tw.style('mr-1 px-1 w-[100%]')}>
               <Image source={{uri:brandImage}} style={tw.style('w-8 h-8 rounded-full')}/>
          </TouchableOpacity>

          {/*<TouchableOpacity onPress={() => { navigation.navigate('Sellheader') }}>
              <View style={tw.style('flex-row')}>
                  <Image source={ImageIcons.menutoday} style={{ width: 18, height: 20.6,marginRight:2}} />
              </View>
          </TouchableOpacity>*/}
        </View>
    )
}



const mapStateToProps = (state) => ({
  defaultAuthScreen: state.auth.defaultAuthScreen,
});

const mapDispatchToProps = {
};

const styles = StyleSheet.create({
    leftButton: {
        width: 50,
        height: 45,
        marginLeft: 10,
        paddingHorizontal: 8,
        justifyContent: 'center'
    },
    leftLabel: {
        height: wp('6%'),
        width: wp('30%'),
        paddingHorizontal: 8,
        marginRight: 20,
        justifyContent: 'center',
        flexDirection:'row',
        marginTop:-40
    },
    leftLabelfalse:{
      height: wp('6%'),
        width: wp('25%'),
        paddingHorizontal: 8,
        marginRight: 20,
        justifyContent: 'center',
        flexDirection:'row',
        marginTop:-20
    },
    rightLabel: {
        height: wp('6%'),
        width: wp('15%'),
        paddingHorizontal: 8,
        marginRight: 30,
        justifyContent: 'center',
        flexDirection:'row'
    },
    leftIcon: {
        width: 50,
        height: 40,
    },
    rightText: {
        fontSize: 12
    },
    headerbackgroundstyle:{
       backgroundColor:'#B80000', elevation: 0, shadowOpacity: 0
    },
    titleheaderstyle:{
      color: Colors.WHITE, fontFamily:'AvertaStd-Semibold'
    },
    numtext1:{
         fontSize:20,fontWeight:'bold',fontStyle:'normal',lineHeight:25,marginLeft:5,
        fontFamily:'AvertaStd-Semibold',color:'#FFFFFF',textAlign:'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
