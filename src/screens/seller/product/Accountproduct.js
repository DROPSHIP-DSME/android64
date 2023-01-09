import React, { useRef, useState,useEffect } from 'react';
import { Text, View,TouchableOpacity,FlatList,Image,TextInput,Picker,StatusBar, ImageBackground, ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import { RadioButton ,Provider ,Modal, Portal, Button,} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Footer3 from '../../../screens/common/Footer3';
const Reactdim = require('react-native');
import { useValidation } from 'react-native-form-validator';
import * as Progress from 'react-native-progress';
import CheckBox from '@react-native-community/checkbox';
import Largesortorder from '../../../components/pickers/Largesortorder';
import { CameraIcon } from "react-native-heroicons/solid";
import Loader from '../../../components/modals/Loader';
import AwesomeAlert from '../../../components/modals/AlertModal';
import tw from 'twrnc';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import { ArrowLeftIcon } from "react-native-heroicons/solid";



    const options2 = [
      {
        label: 'New Stock',
        value: 'New Stock'
      },
      {
        label: 'Good',
        value: 'Good'
      },
      {
        label: 'Excellent',
        value: 'Excellent'
      }
    ]

const Accountproduct = (props) => {
    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Reference

    const categoryId = props?.route?.params?.categoryId;
    const categoryName = props?.route?.params?.categoryName;
    const brandId = props?.route?.params?.brandId;
    const { Dimensions } = Reactdim;
    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;
    //alert(brandId)
    // Local states
    const [billImgPath, setBillImgPath] = useState("");
    const [retakeFlag, setRetakeFlag] = useState(false);
    const [fromGallery, setFromGallery] = useState(false);

    const [billImgPath1, setBillImgPath1] = useState("");
    const [billImgPath2, setBillImgPath2] = useState("");
    const [billImgPath3, setBillImgPath3] = useState("");
    const [billImgPath4, setBillImgPath4] = useState("");
    const [billImgPath5, setBillImgPath5] = useState("");

      const [text1, onChangeText3] = React.useState("");

    const [Store, onChangeStore] = React.useState("");
    const [Themecolor, onThemecolor] = React.useState("");
    const [City, onChangeCity] = React.useState("City");
    const [Country, onChangeCountry] = React.useState("Country");
    const [UserID, setUserID] = useState("");
    const [visible, setVisible] = React.useState(false);
    const [Name, onChangeName] = React.useState("");
    const [Product, onChangeProduct] = React.useState("");
    const [Weight, onChangeWeight] = React.useState("");
    const [Inventory, onChangeInventory] = React.useState("");
    const [Price, onChangePrice] = React.useState("");
    const [counter, setcounter] = useState(0);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedValue1, setSelectedValue1] = useState("6295110f3defd98ec12b7f80");
    const [selectedValue2, setSelectedValue2] = useState("");
    const [Productoption, onChangeProductoption] = React.useState("");
    const [ProductSize, onChangeProductSize] = React.useState("");
    const [ProductColor, onChangeProductColor] = React.useState("");
    const [SelectedQuantity, setSelectedQuantity] = React.useState("");
    const [ProductCode, onChangeProductCode] = React.useState("");
    const [SelectedDiscount, setSelectedDiscount] = React.useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [managedata, setmanagedata] = React.useState(true);
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');
    const [loginLoader, setloginLoader] = React.useState(false);


    const [check, setCheck] = useState(false)
    const [checked, setChecked] = React.useState('first');

    const [categoryOption, setcategoryOption] = useState([])

    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { billImgPath,Name, Product,Weight,Inventory,Price },
    });
     const selectcolor = async (color) => {
        onThemecolor(color);
     }

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }


    const updateorderStatus2 = (itemValue) => {
        setSelectedValue2(itemValue)
    }

    const options = [
      {
        label: 'Sneakers',
        value: '61b2e25addb2bd19c2b9532a'
      },
    ]

    useEffect(() => {
         getBrandUserId();
         getLoginUserId(); 
         props.getAllcategory(1);
    }, [])

    useEffect(() => {
         //props.getbrandName(props?.loginuserid);
         if(props.getlistcategory && props.getlistcategory.length>0){
            var getmaparr = [];
            props.getlistcategory.map(function(category, i){
                getmaparr.push({label: category.categoryName, value: category._id})
            });
            setcategoryOption(getmaparr)
            console.log('getmaparr',getmaparr);
        }
    }, [props.getlistcategory])

    const getBrandUserId = async () => {
         var getUserId = await AsyncStorage.getItem('UserId');
         setUserID(getUserId);
    }
     const getLoginUserId = async () => {
         var getislogin = await AsyncStorage.getItem('userLogin');
         setisLogin(getislogin);
    }

    const getbackbuttonhit = async () => {
        props.getbrandName(props?.loginuserid);
       setTimeout(function(){ props.navigation.navigate("Dashproduct")},500); 
    }
     const selectPhoto = async () => {
         ImagePicker.openPicker({
            width: 400,
            cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            height: 400,
        }).then(image => {
            if (image?.path) {
                let fileName = image?.path?.split('/').pop();
                let mimeType = image?.path?.split('.').pop();
                let file = {
                    'uri': image?.path,
                    'type': `image/${mimeType}`,
                    'name': fileName
                }
               // setFieldValue("couponImage", file);
                setBillImgPath(file);
            }
        }).catch((error) => {
            
        });
    }



    const removeImage = async (Id) => {
        if(Id==1){
            setBillImgPath1('');
            setcounter(counter-1);
        }
        if(Id==2){
            setBillImgPath2('');
            setcounter(counter-1);
        }
        if(Id==3){
            setBillImgPath3('');
            setcounter(counter-1);
        }
    }

    const selectPhoto1 = async () => {
        if(counter<3){
        ImagePicker.openPicker({
            width: 400,
            cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            height: 400,
        }).then(image => {
            if (image?.path) {
                let fileName = image?.path?.split('/').pop();
                let mimeType = image?.path?.split('.').pop();
                let file = {
                    'uri': image?.path,
                    'type': `image/${mimeType}`,
                    'name': fileName
                }
               // setFieldValue("couponImage", file);
                if(billImgPath1==''){
                    setBillImgPath(file);
                    setBillImgPath1(file);
                }else if(billImgPath2==''){ setBillImgPath2(file); }
                else if(billImgPath3==''){ setBillImgPath3(file); }

                setcounter(counter+1);

                // const formData1 = new FormData();
                // formData1.append("productAllImage", file);
                // formData1.append("uploadId", props?.loginuserid);
                // props.uploadpic(formData1, props.navigation, "user");
            }
        }).catch((error) => {
            
        });
       }else {
        alert('You can add upto 3 images')
       }
    } 

     const handleSendRequestSubmit1 = async () => { 
        Keyboard.dismiss();
        if(billImgPath==""){
            setshowotherAlert(true)
            setshowalertmsg('Atleast 1 product image is required')
        }else if(Name==""){
            setshowotherAlert(true)
            setshowalertmsg('Name is required')
        }else if(Product==""){
            setshowotherAlert(true)
            setshowalertmsg('Product description is required')
        }else if(selectedValue==''){
            setshowotherAlert(true)
            setshowalertmsg('Category is required')
        }else if(selectedValue2==''){
            setshowotherAlert(true)
            setshowalertmsg('Product condition is required')
        }else if(Price==""){
            setshowotherAlert(true)
            setshowalertmsg('Product price is required')
        }else{
            setloginLoader(true)
            if(billImgPath1!=""){
                const formData1 = new FormData();
                formData1.append("productAllImage", billImgPath1);
                formData1.append("uploadId", props?.loginuserid);
                props.uploadpic(formData1, props.navigation, "user");
            }
            if(billImgPath2!=""){
                const formData2 = new FormData();
                formData2.append("productAllImage", billImgPath2);
                formData2.append("uploadId", props?.loginuserid);
                props.uploadpic(formData2, props.navigation, "user");
            }
            if(billImgPath3!=""){
                const formData3 = new FormData();
                formData3.append("productAllImage", billImgPath3);
                formData3.append("uploadId", props?.loginuserid);
                props.uploadpic(formData3, props.navigation, "user");
            }
            //alert('sdf')
            setTimeout(function(){
                const formData = new FormData();
                formData.append("productName", Name);
                formData.append("categoryId", selectedValue);
                formData.append("userId", props?.loginuserid);
                formData.append("brandId", brandId);
                formData.append("productImage", billImgPath);
                formData.append("productDescription", Product);
                formData.append("productPrice", Price);
                formData.append("productWeight", Weight);
                formData.append("productSize", ProductSize);
                formData.append("productColor", ProductColor);
                formData.append("productInventory", SelectedQuantity);
                formData.append("productCode", ProductCode);
                formData.append("productCaption", Productoption);
                formData.append("uploadId", props?.loginuserid);
                props.createproduct(formData, props.navigation, "vendor",true);
                setloginLoader(false)
            },2000);
        }
    }



const renderItem6 = ({ item }) => {
            return(
                <View>
                    { item.userId.userName=='Admin' ?
                       <View>
                        <View style={styles.chatrightView}>
                           <Text style={styles.hellotext}>{item.message}</Text>
                        </View>
                         <Text style={styles.chattingtime}>{ moment(item.msgDate).format('hh:mm A')}</Text>
                        </View>
                    :
                        <View>
                        <View style={styles.chatlongView}>
                          <Text style={styles.chattingtext}>{item.message}</Text>
                        </View>
                        <Text style={styles.chattingtime2}>{moment(item.msgDate).format('hh:mm A')}</Text>
                        </View>

                    }
                </View>
            );
    }

    return (
       <KeyboardAvoidingView style={{flex:1,backgroundColor:'#F2F2F2'}}>

             <StatusBar backgroundColor={"#FFFFFF00"} barStyle="dark-content" translucent={true} />

             <View style={tw`flex flex-1 mx-2`}>
               <TouchableOpacity onPress={() => props.navigation.navigate("Dashproduct")}>
                <View style={tw`flex-row mx-3 mt-15 mb-5 items-center`} >
                    <ArrowLeftIcon color="red" fill="gray" size={14} />
                    <View style={tw`ml-1`}>
                    <Text style={tw`text-xs text-gray-500 `}>BACK TO STORES</Text>
                    </View>
                </View>
            </TouchableOpacity>
             <ScrollView  keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} >
                {/* <View style={tw`flex flex-row justify-between mt-4 mb-5 mx-3 items-center`}>
                    <Progress.Bar progress={1.5} width={150} style={tw`absolute top-6`} color='#B80000' height={1} />
                    <TouchableOpacity>

                        <View style={tw`items-center justify-center h-14 w-14 rounded-full bg-red-700`}>
                          <Text style={tw`text-white text-sm text-center`} >1</Text>
                        </View>
                    </TouchableOpacity>
                    <Progress.Bar progress={1} width={150} style={tw`absolute top-6 right-1`} color='grey' height={1} />
                    <TouchableOpacity>
                        <View style={tw`items-center justify-center h-14 w-14 rounded-full bg-gray-500`}>
                          <Text style={tw`text-white text-sm text-center`} >2</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={tw`items-center justify-center h-14 w-14 rounded-full bg-gray-500`}>
                          <Text style={tw`text-white text-sm text-center`} >3</Text>
                        </View>
                    </TouchableOpacity>
                </View>*/}

                  <View style={tw`items-center mt-2`}>

                  <View style={tw`flex flex-row justify-between mx-3 mt-1 mb-3`}>
                    <Text style={tw`text-2xl font-bold text-gray-700`}>Add a Product</Text>
                  </View>

                <Text style={tw`text-base text-gray-700 text-center mx-3`}>To add goods to your store for distribution, you need to create a brand first. Add details about your brand. </Text>
                 </View>

            <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

            <View style={tw`flex flex-row mx-2 mt-7`}>
                <TouchableOpacity onPress={()=>selectPhoto1()} style={tw.style('h-36 bg-gray-600 border-3 rounded-lg justify-center', {width:deviceWidth/2.2})}>
                  <View style={tw`items-center`}>
                      <CameraIcon color="red" fill="#FFFFFF" size={28} />
                      <View>
                        <Text style={tw`text-center w-32 text-gray-200`}>Add a image of your product, one image can be selected at a time</Text>
                      </View>
                   </View>
                </TouchableOpacity>

                 <View style={tw`ml-5 w-auto`}>
                  <View style={tw`flex flex-row`}>
                   <View style={tw`h-16 w-16 border-3 bg-gray-700 rounded-lg items-center`}>
                    { billImgPath1 !== "" &&
                        <View>
                            <Image source={{ uri: billImgPath1.uri }} style={{height:64, width:64,borderRadius:5}} />
                            <TouchableOpacity style={{ position: 'absolute', right:-10, top: -10 }} onPress={() => removeImage(1)}>
                                <Image source={ImageIcons.closepopup} style={styles.sendmsg2} />
                            </TouchableOpacity>
                        </View>
                    }
                    </View>
                    <View style={tw`h-16 w-16 border-3 bg-gray-700 rounded-lg ml-3`}>
                      { billImgPath2 !== "" &&
                        <View>
                            <Image source={{ uri: billImgPath2.uri }} style={{height:64, width:64,borderRadius:5}} />
                            <TouchableOpacity style={{ position: 'absolute', right:-10, top: -10 }} onPress={() => removeImage(2)}>
                                <Image source={ImageIcons.closepopup} style={styles.sendmsg2} />
                            </TouchableOpacity>
                        </View>
                    }
                    </View>
                  </View>
                    <View style={tw`h-16 w-16 border-3 bg-gray-700 rounded-lg mt-3`}>
                      { billImgPath3 !== "" &&
                       <View>
                            <Image source={{ uri: billImgPath3.uri }} style={{height:64, width:64,borderRadius:5}} />
                            <TouchableOpacity style={{ position: 'absolute', right:-10, top: -10 }} onPress={() => removeImage(3)}>
                                <Image source={ImageIcons.closepopup} style={styles.sendmsg2} />
                            </TouchableOpacity>
                        </View>
                    }
                    </View>

                  </View>
                   
              </View>

                <Loader isVisible={loginLoader} />

                 <View style={tw`mt-8`}>
                      <Text style={tw`text-2xl text-gray-900 mx-3 mb-3`}>Product Info</Text>
                     <View style={tw`justify-center`}>
                       <TextInput
                        placeholder='Name of Product'
                        value={Name}
                        onChangeText={onChangeName}

                        placeholderTextColor='#b3b3b3'
                        style={tw`h-14 bg-zinc-200 mx-3 text-gray-500 px-4 rounded-md items-center`} />

                           {isFieldInError('Name') &&
                          <Text style={tw`text-base text-gray-900 my-1 mx-3`}>must be required field</Text>
                      }
                     </View>

                      <TextInput
                      onChangeText={onChangeProduct}
                      value={Product}
                      multiline={managedata}
                      placeholder='Provide more details about your product (500 characters max)' 
                      placeholderTextColor='#b3b3b3'
                      style={tw`h-36 bg-zinc-200 mx-3 text-gray-600 px-5 mt-5 rounded-md text-start`} />
                 </View>

                 <View style={tw`mx-3 mt-5`}>
                    <Largesortorder text="Choose a Category" options={categoryOption} onSelect={(checked) => updateorderStatus(checked)}  />
                 </View>

                 <View style={tw`mx-3 mt-5`}>
                    <Largesortorder text="Product Condition" options={options2} onSelect={(checked) => updateorderStatus2(checked)} />
                </View>


                

                <Text style={tw`text-2xl text-gray-900 mt-10 mx-3`} >Pricing</Text>

                <View style={tw`flex flex-row mx-3 mt-5 justify-between`}>
                  <View style={tw`w-6/12 mr-1`}>
                    <Text style={tw`text-gray-700`}>Price US$</Text>
                      <TextInput
                      placeholder='0.00'
                      value={Price}
                      onChangeText={onChangePrice}
                      keyboardType={'numeric'}

                      placeholderTextColor='#b3b3b3'
                      style={tw`bg-zinc-200 h-14 rounded-md px-4 w-full text-gray-900`} />

                  </View>
                  <View style={tw`w-6/12 ml-1`}>
                    <Text style={tw`text-gray-700`}>Discount in %</Text>
                      <TextInput
                      placeholder='0.00'
                      value={SelectedDiscount}
                      onChangeText={setSelectedDiscount}
                      keyboardType={'numeric'}

                      placeholderTextColor='#b3b3b3'
                      style={tw`bg-zinc-200 h-14 rounded-md px-4 w-full text-gray-900`} />
                  </View>

                </View>

                <Text style={tw`text-2xl text-gray-900 mt-10 mx-3`} >Product Specifics (Optional)</Text>
                <View style={tw`flex flex-row mx-3 mt-4`}>
                <TextInput
                    placeholder='Height (ft)'
                    placeholderTextColor='#b3b3b3'
                    keyboardType={'numeric'}
                    value={ProductSize}
                    onChangeText={onChangeProductSize}
                    style={tw`bg-zinc-200 h-14 rounded-md px-4 w-6/12 text-gray-900`}
                />

                <TextInput
                    placeholder='Length (ft)'
                    placeholderTextColor='#b3b3b3'
                    keyboardType={'numeric'}
                    value={Weight}
                    onChangeText={onChangeWeight}
                    style={tw`bg-zinc-200 h-14 rounded-md px-4 w-6/12 ml-2 text-gray-900`} 
                />

                </View>


                <View style={tw`mt-1 mb-1`}>
                  <Text style={tw`text-2xl text-gray-900 mt-10 mx-3`} >Product Tags</Text>
                  <Text style={tw`text-gray-700 text-small mx-3`} >Automatic Labels</Text>
                </View>

                <View style={tw`flex-row mx-3`}>
                  <Text style={tw`items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-700 text-white`} >New Stock</Text>
                </View>

                <Text style={tw`text-lg mt-10 mx-3 text-gray-600`} >Optional Labels</Text>

                <View style={tw`flex-row mt-5 mx-3`}>
                    <TouchableOpacity>
                        <Text style={tw`mr-3 items-center px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800`}>One Sale</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={tw`mr-3 items-center px-3 py-1 rounded-md text-sm font-medium bg-red-100 text-red-800`}>Low Supply</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={tw`mr-3 items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800`}>Highly Rated</Text>
                    </TouchableOpacity>
                </View>

                <Text style={tw`text-2xl text-gray-900 mt-10 mx-4`} >Shipping</Text>


              <View style={tw`mx-4`}>
                <View style={tw.style('bg-white overflow-hidden shadow rounded-md my-6')}>
                  <View style={tw`px-2 py-5`}>
                    <View style={tw`flex flex-row items-center`}>
                      <RadioButton
                        value="second"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                      />
                      <View style={tw`ml-2`}>
                        <Text style={tw`text-lg font-bold text-red-700 ml-2`}>Dropship Shipping</Text>
                        <Text style={tw`text-base font-bold text-gray-500 ml-2`} >US$7.00 - US$8.00</Text>
                        <Text style={tw`text-sm text-gray-600 ml-2 pr-10`}>Shipping cost is caluclated automatically based on the buyer’s location and the package weight and dimensions.</Text>
                      </View>
                    </View>
                  </View>
                </View>


                <View style={tw` bg-white overflow-hidden shadow rounded-md`}>
                  <View style={tw.style('px-2 py-5')}>
                    <View style={tw`flex flex-row items-center`}>
                      <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                      />
                      <View style={tw`ml-2 w-full pr-10`}>
                        <Text style={tw`text-lg font-bold text-gray-600 ml-2`}>Ship on your own</Text>
                        <Text style={tw`text-sm text-gray-600 ml-2 pr-10`}>You provide the label and pay to ship the item on your own. It is not covered by shipping protection.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

                <View style={tw`mx-4 mr-4 my-5 mt-8`}>
                  <Largebutton text="Continue" onPress={() => handleSendRequestSubmit1()} />
                </View>

                <View
                  type="button"
                  style={tw.style('mb-20 mx-4 items-center px-2 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-black hover:bg-black focus:outline-none focus:ring-2')}
                >
                <TouchableOpacity style={tw.style('w-10/11 items-center')}
                    onPress={() => getbackbuttonhit()}>
                    <Text style={tw.style('text-lg text-white')}>Back</Text>
                  </TouchableOpacity>
                </View>





            <View style={{position:'absolute',opacity:0,alignSelf:'flex-end',marginTop:'12%',right:'2%'}}>
                        <TouchableOpacity>
                            <Image source={ImageIcons.plusicon} style={{height:41,width:41}} />
                        </TouchableOpacity>
                    </View>



               </ScrollView>





        </View>

        <Footer3 onSelelection="2"  />

        </KeyboardAvoidingView>
    )
}


export default Accountproduct
