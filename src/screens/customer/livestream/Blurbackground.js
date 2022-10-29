import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Image, TouchableOpacity,Picker, Keyboard,TextInput, Dimensions, FlatList, AppState, KeyboardAvoidingView, Platform, Alert, ScrollView,StatusBar } from 'react-native'
import RtcEngine, { ChannelProfile, ClientRole, RtcLocalView, RtcRemoteView, VideoRemoteState } from "react-native-agora";
import io from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../../screens/common/style'
import newstyles from '../../../screens/common/styles';
import { Colors, fonts, Images } from '../../../common';
import Loader from '../../../components/modals/Loader';
import { requestMultiplePermisisons } from '../../../services/Permissions'
import { socketUri } from '../../../common/Api'
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-community/async-storage';
import ImageIcons from '../../../common/ImageIcons'
import CountDown from 'react-native-countdown-component';
import { RadioButton ,Provider ,Modal, Portal, Button,} from 'react-native-paper';
import Share from 'react-native-share';
import { v4 as uuid } from "uuid";
import SwitchToggle from "react-native-switch-toggle";
import Sortorder from '../../../components/pickers/Sortorder';
import AwesomeAlert from '../../../components/modals/AlertModal';
import tw from 'twrnc';
import { UsersIcon } from "react-native-heroicons/solid";
import { ClockIcon } from "react-native-heroicons/solid";
import { PhoneIcon } from "react-native-heroicons/solid";
import { VideoCameraIcon } from "react-native-heroicons/solid";
import { HeartIcon } from "react-native-heroicons/solid";
import { PhoneOutgoingIcon } from "react-native-heroicons/solid";
import { VolumeUpIcon } from "react-native-heroicons/solid";
import { VolumeOffIcon } from "react-native-heroicons/solid";
import { ShareIcon } from "react-native-heroicons/solid";
import { DotsVerticalIcon } from "react-native-heroicons/solid";
import { XIcon } from "react-native-heroicons/solid";

const options = [ { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' },{ label: '5', value: '5' },{ label: '6', value: '6' },{ label: '7', value: '7' },{ label: '8', value: '8' },{ label: '9', value: '9' } ]
const options1 = [
      {label: 'English', value: 'English' },
      { label: 'French',value: 'French' },
      { label: 'Spanish',value: 'Spanish'},
      { label: 'Italian', value: 'Italian' },
      { label: 'African', value: 'African' },
      { label: 'chinese', value: 'chinese' },
      { label: 'Japanese', value: 'Japanese' }
    ]

// const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
// const currentTimestamp = Math.floor(Date.now() / 1000)
// const expirationTimeInSeconds = 3600;
// const appID = '25e8f297394d4539a9ba4bc4930730d6';
// const appCertificate = '7cb09f222989455c943a1060695f2b1e';
// const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
// const role = RtcRole.PUBLISHER;

const Blurbackground = (props) => {
    const AgoraEngine = useRef();
    const socketRef = useRef();
    const appState = useRef(AppState.currentState);
    const dispatch = useDispatch()

    const isback = props?.route?.params?.isback;
    //const channel = '43a24d31-f151-4acb-bb46-c2e8df0690ec';
    const channel = props?.route?.params?.channel;
    const isbroadcaster = props?.route?.params?.isbroadcaster;
    const [visible, setVisible] = React.useState(false);
    const [ isPress, setIsPress ] = React.useState(false);
    const [ likePress, setlikePress ] = React.useState(false);
    const [likeCount, setlikeCount] = React.useState(0);
    const [sharePress, setsharePress ] = React.useState(0);
    const [showmodal, setshowmodal] = React.useState(false);
    const [showsidebar, setshowsidebar] = React.useState(false);
    const [cartview, setcartview] = React.useState(false);
    const [on, seton] = React.useState(false);
    const [purchaseCount, setpurchaseCount] = React.useState(0);
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');
    const [selectedValue, setSelectedValue] = useState(1);
    const [comment, setcomment] = useState();
    const [getaudiance, Setgetaudiance] = useState(0);
    const [joined, setJoined] = useState(false);
    const [mute, setMute] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [timer, settimer] = useState(1);
    const [userComments, setuserComments] = useState([]);
    //const [broadcasterVideoState, setBroadcasterVideoState] = useState(VideoRemoteState.Decoding);
    
    const init = async () => {
        if (Platform.OS === 'android') await requestMultiplePermisisons();
        //  AgoraEngine.current = await RtcEngine.create("0c96ec2a0c9744c0bb3d21330bb0911d");
        AgoraEngine.current = await RtcEngine.create("ccb0f65b5af549c383620f289af77cbf");   //appId used for testing
        await AgoraEngine.current.enableVideo();
        await AgoraEngine.current.startPreview()
        if (isback) {
            AgoraEngine.current.switchCamera();
        }
        await AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
            //if (isbroadcaster) dispatch(createRoom(channel, 'Running'))
            setJoined(true)
            Setgetaudiance(getaudiance+1)
        });
        await AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
        if (isbroadcaster) AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
        //if (isbroadcaster==false) { AgoraEngine.current.setClientRole(ClientRole.Audience); }
        await AgoraEngine.current.addListener("RemoteVideoStateChanged", (uid, state) => { 
           // if (uid == 1) setBroadcasterVideoState(state);
        });
        //await AgoraEngine.current.userJoined( Setgetaudiance(getaudiance+1) )
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); // or some other action
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); // or some other action
          }
        );
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
    }, []);

    
    const socketConnection = () => {
        socketRef.current = io(socketUri, { forceNew: true });
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-channel', channel);
        })
        socketRef.current.on('message', (users) => {
            setuserComments(prev => [users.currentUser,...prev ]);
        })
        socketRef.current.on("connect_error", (error) => {

        });
    }
    
    const opensettings = () => {
      setshowsidebar(s => !s);
    }

    const hidesidebar = () => {
       setshowsidebar(false)
    }

    const showcartview1 = (itemid,productPrice) => {
        let request = {
            "productId":itemid,
            "userId":props?.loginuserid,
            "productQuantity":1,
            "productPrice":productPrice,
            "branduserId":props?.getliveeventlist?.userId._id
        }
        setpurchaseCount(purchaseCount+1);
        props.cartadd(request, props.navigation, "vendor");
        setcartview(true);
    }

    const openshare=()=>{
        let options = {
          message: 'To join our broadcast, click here',
          url: 'https://com.dropship/'+channel,
        };
       Share.open(options);
       setsharePress(sharePress+1);
    }

    const cartpicker = (productid,productPrice,index) =>{
        let request = {
            "productId":productid,
            "userId":props?.loginuserid,
            "productQuantity":1,
            "productPrice":productPrice,
            "branduserId":props?.getliveeventlist?.userId._id
        }
        setpurchaseCount(purchaseCount+1);
        setshowotherAlert(true)
        setshowalertmsg('Item added in cart successfully!')
        props.cartadd(request, props.navigation, "vendor");
    }

    useEffect(() => {
        props.getchannelbrandName(channel);
        props.getLiveCustomer(channel);
        props.getLivecommentCustomer(props?.getliveeventlist?._id);
        //props.updatelikecount(channel,false,props?.loginuserid);
        if (isbroadcaster) {
            props.updateaudiancecount(channel,0,props?.loginuserid);
        }else {
            props.updateaudiancecount(channel,1,props?.loginuserid);
        }
        //Orientation.lockToPortrait();
        AppState.addEventListener('change', inBackground)
        //const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, 2882341273, 1, privilegeExpiredTs);
        const uid = isbroadcaster ? 1 : 0
        init().then(() => {
            AgoraEngine.current.joinChannel(props?.getcalltokendata, channel, null, uid)
            socketConnection()
        });
        return () => {
            AgoraEngine.current.destroy();
            if (isbroadcaster) {
               // dispatch(destroyRoom(channel, 'Ended'))
                AppState.removeEventListener('change', inBackground)
            }
        };
    }, [])

    useEffect(() => {
        if (isbroadcaster) {
          const interval = setInterval(() => {
            props.getaudiancecount(channel,1);
            //props.getLivecommentCustomer(channel);
          }, 15000);
          return () => clearInterval(interval);
        }else {
            const interval = setInterval(() => {
               props.getaudiancecount(channel,0);
              // props.getLivecommentCustomer(channel);
            }, 15000);
          return () => clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        //videoStateMessage(broadcasterVideoState)
    }, [])

    const resetchannel = (channeldata)=>{
        AgoraEngine.current.destroy();
        setshowsidebar(false)
        props.navigation.navigate("SearchProduct", { isback: false, channel: channeldata, isbroadcaster: false })
    }

    const inBackground = (nextState) => {
        if (nextState = "background") {
            //dispatch(destroyRoom(channel, 'Ended'))
            appState.current = nextState
            if (isbroadcaster) {
               // props.navigation.navigate("Overview")
            }else {
               // props.navigation.navigate("Search")
            }
        }
    }

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const muteaudio = async() => {
        if(mute==false){
            //AgoraEngine.current.UserMuteAudio(true);
            await AgoraEngine.current.disableAudio();
            setMute(true);
        }else {
            //AgoraEngine.current.UserMuteAudio(false);
            await AgoraEngine.current.enableVideo();
            setMute(false);
        }
    }

    const calllike = async() => {
        if(likePress==false){
            setlikePress(true);
            setlikeCount(likeCount+1);
            props.updatelikecount(channel,true,props?.loginuserid);
        }else {
            setlikePress(false);
            setlikeCount(likeCount-1);
            props.updatelikecount(channel,false,props?.loginuserid);
        }
    }

    const endStream = async() => {
        AgoraEngine.current.destroy();
        //if (isbroadcaster) dispatch(destroyRoom(channel, 'Ended'))
        await AsyncStorage.removeItem('notificationData');
        if (isbroadcaster) {
            // call removeapi
            let request = {
                "eventId":channel,
                "EventDuration":1200,
                "startNow":false
            }
            props.schuleEventstart(request, props.navigation, "vendor");
        }
        if (isbroadcaster) {
            props.navigation.navigate("Overview")
        }else {
            props.navigation.navigate("upcoming")
        }
    }
    
    const Header = () => {
        return (
            <View style={tw.style('flex flex-row pt-8 relative justify-between mx-5',{ marginTop: Platform.OS == 'android' ? 30 : 60,zIndex:1001})}>
                <View style={tw`w-[45%]`}>
                    <Text style={tw`text-xl text-white`}>{props?.getliveeventlist?.eventTitle}</Text>
                </View>
                <View style={tw`flex-row`}>
                    <View style={tw`mt-2 h-7 items-center px-5 py-0.5 rounded-lg bg-red-700 justify-center`}>
                        <Text style={tw`text-xs font-medium text-white`}>Live</Text>
                    </View>
                    <View style={tw`px-3 pt-2`}>
                        <View style={tw`ml-1 flex-row items-center px-4 py-1 rounded-lg bg-green-300 justify-center`}>
                            <UsersIcon color="red" fill="black" size={20} />
                            <Text style={tw`ml-3 text-xs font-medium text-grey-700`}>{props?.audiancecount?.JoinedUsers?.length}</Text>
                        </View>
                    </View>
                    <View style={tw.style('ml-2 right-1',{zIndex:100})}>
                        <TouchableOpacity onPress={() => endStream()}>
                            {/* <PhoneOutgoingIcon color="green" fill="white" size={32} /> */}
                            <Image
                                    style={tw.style(`mt-2 w-8 h-8`)}
                                    source={ImageIcons.exittoday}
                                />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const videoStateMessage = (state) => {
        switch (state) {
            case VideoRemoteState.Stopped:
                setshowalertmsg('Live Broadcasting has been ended by the user')
                setshowotherAlert(true);
                let request = {
                    "eventId":channel,
                    "EventDuration":1200,
                    "startNow":false
                }
                props.schuleEventstart(request, props.navigation, "vendor");
                props.navigation.navigate("Overview")
                return "Live Broadcasting has been ended by the user";

            case VideoRemoteState.Frozen:
               // Alert.alert("Dropship", "Connection Issue, Please Wait")
                return "Connection Issue, Please Wait";

            case VideoRemoteState.Failed:
                //Alert.alert("Dropship", "Network Error")
                return "Network Error";
        }
    }

    const Comments = (index, item) => {
        return (
            <View style={{ marginTop: 10 }}>
                <Text>
                    <Text style={{ color: Colors.white, fontSize: 14, textTransform: 'lowercase'}}>@{item?.user?.userName}:</Text>
                    <Text style={{ color: Colors.white }}>
                        {' '}
                        {item.message}
                    </Text>
                </Text>
            </View>
        )
    }

    const renderItemcart = ({ item, index }) => {
       return(
        <View style={tw`my-2 mx-2`}>
              <View style={tw`flex-row items-center`}>
                <Image source={{uri:item.productImage}}  style={tw.style('h-30 w-35 rounded-lg border-gray-500 border-2 mr-1')} />
                <View style={tw`justify-between`}>
                    <View>
                         <Text style={tw`text-lg text-gray-700 leading-1`}> {item.productName}</Text>
                    </View>
                    <View style={tw`ml-2`}>
                        <Text style={tw`text-lg text-gray-900`}>${item.productPrice}</Text>
                        <Text style={tw`text-base text-gray-700`}>MSRP: ${item.productPrice}</Text>
                    </View>
                    <View style={tw`flex flex-row justify-end items-center`}>
                          <View style={tw`items-center px-4 py-2 rounded-lg bg-blue-100 w-25 my-1`}>
                            <Text style={tw`text-xs font-medium text-blue-800`}>New Stock</Text>
                         </View>
                         <TouchableOpacity onPress={() => cartpicker(item._id,item.productPrice,index)}>
                             <View style={tw`items-center px-4 py-2 rounded-lg bg-red-700 w-35 my-1 ml-5`}>
                                <Text style={tw`text-xs font-medium text-white`}>Add to Bag</Text>
                             </View>
                         </TouchableOpacity>
                    </View>
                </View>
              </View>
            </View>
        );
    }
    
    const renderItem2 = ({ item }) => {
       return(
       <View style={{marginHorizontal:5}}>
            <View style={{borderRadius:10, marginLeft:10, flexDirection:'row',backgroundColor:'#ffffff',padding:10,paddingHorizontal:15}}>
                <TouchableOpacity style={{marginBottom:5, justifyContent:'center', textAlign:'center'}} onPress={() =>{ setIsPress(false);showcartview1(item._id,item.productPrice);  }}>
                    <Image source={{uri:item.productImage}} style={[newstyles.blurimg,{borderRadius:10}]} />
              </TouchableOpacity>
              <View style={{marginLeft:20}}>
                    <Text style={{fontSize:12,color:'#1a1a1a',fontWeight:'400',fontFamily:'source hinted-AvertaStd-Semibold'}}>${item.productPrice}</Text>
                    <View style={{ backgroundColor:'#D4E0F2',paddingHorizontal:10,paddingVertical:3,borderRadius:10,marginTop:5}}>
                       <Text style={{color:'#2666BE',fontSize:11}}>New Stock</Text>
                    </View>
              </View>
            </View>
        </View>
        );
    }

    const doComment = () => {

        if(comment!="" && comment!=undefined){
                let request ={
                  "liveevent":props?.getliveeventlist?._id,
                  "message":comment,
                  "user":props?.loginuserid
                }
                
                props.postcomment(request, props.navigation, "vendor");
                setTimeout(function(){ props.getLivecommentCustomer(props?.getliveeventlist?._id);},1000);
            try {
                if (comment) {
                    let i = 0;
                    const currentUser = {
                        id: i++,
                        message: comment
                    }
                    socketRef.current.emit('live-stream-comments', ({ currentUser, channel }));
                    setcomment('');
                }
            } catch (error) {

            }
        }
    }

    if (!joined) {
        return <Loader color={Colors.green} size='large' />;
    } else {
        return (
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined} style={styles.container}>
                {
                    isbroadcaster ? (
                        <RtcLocalView.SurfaceView
                            style={styles.fullscreen}
                            channelId={channel}
                        />
                    ) : (
                        <RtcRemoteView.SurfaceView
                            uid={1}
                            style={styles.fullscreen}
                            channelId={channel}
                        />
                    )
                }
                <Header />
                <StatusBar backgroundColor={'#B80000'} barStyle="dark-content" translucent={true} />
                 <View style={tw.style('justify-between absolute top-30 right-3 text-center', {zIndex:1010})}>
                    { isbroadcaster == true &&
                        <TouchableOpacity onPress={() => opensettings() } >
                            <View style={tw`mb-4`}>
                                 <DotsVerticalIcon color="red" fill="white" size={28} />
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => openshare() } >
                        <View style={tw`mb-4`}>
                            <ShareIcon color="red" fill="white" size={28} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={calllike}>
                        <View style={{marginVertical:15,marginRight:15}}>
                            {likePress==false ?
                                <HeartIcon color="red" fill="white" size={28} />
                            :
                                <HeartIcon color="red" fill="red" size={28} />
                            }
                            <Text style={[newstyles.liketext,{marginTop:4}]}>{props?.audiancecount?.likeUsers?.length}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={muteaudio}>
                        <View style={{flexDirection:'row',marginHorizontal:'2%',marginVertical:6}}>
                           {mute==false ?
                            <VolumeUpIcon color="white" fill="white" size={28} />
                            :
                            <VolumeOffIcon color="white" fill="gray" size={28} />
                           }
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                   <TouchableOpacity style={tw`mx-5 mt-3 items-center px-2.5 py-1 rounded-lg bg-red-700 w-24`}>
                        <Text style={tw`text-xs font-medium text-white`}>FOLLOW</Text>
                    </TouchableOpacity>
                    <View style={tw`flex flex-row rounded-lg ml-5 bg-white w-24 mt-3 py-1 justify-center items-center`}>
                        <ClockIcon color="red" fill="red" size={20} />
                        <View style={tw``}>
                        { props?.getliveeventlist?.EventDuration &&
                        <CountDown
                            until={props?.getliveeventlist?.EventDuration}
                            size={10}
                            onFinish={() => endStream }
                            digitStyle={{backgroundColor: '#FF000000'}}
                            digitTxtStyle={{color: '#000000'}}
                            timeToShow={['M', 'S']}
                            separatorStyle={{color: '#000000'}}
                            timeLabels={{m: null, s: null}}
                            showSeparator
                          />
                        }
                    </View>
                </View>
                { isbroadcaster == 'asdsd' &&
                    <View style={tw.style('flex flex-row mx-[3%]',{marginTop:isKeyboardVisible?'1%':'3%'})}>
                      <TouchableOpacity>
                        <ClockIcon color="green" fill="green" size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity style={tw`mx-[2%]`}>
                        <VideoCameraIcon color="red" fill="white" size={20} />
                      </TouchableOpacity>
                    </View>
                }
                </View>

                { isbroadcaster == false &&
                    <View style={{marginRight:10}}>
                        <View style={{marginTop:isKeyboardVisible?'10%':'80%'}}>
                        <FlatList
                            style={{ height:isPress ? 100 : 100 ,marginBottom:0}}
                            data={props?.getliveeventlist?.products || []}
                            renderItem={renderItem2}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        />
                        </View>
                    </View>
                } 

                { showsidebar  &&
                <Provider>
                    <Portal>
                        <Modal visible={showsidebar} onDismiss={hidesidebar}
                        contentContainerStyle={{ top:-200,zIndex:1011,justifyContent:'center',backgroundColor: 'white', marginBottom:0, padding: 10,borderRadius:5,paddingHorizontal:'10%',alignSelf:'center',alignItems:'center',marginHorizontal:0 }}>
                            <View>
                                <Text style={{fontFamily:'hinted-AvertaStd-Bold',fontSize:15,fontWeight:'bold', color:'#000000',}}>Language</Text>
                                <View style={{backgroundColor:'#F3F3F3',marginTop:5,borderRadius:10,alignSelf:'center',paddingHorizontal:0}}>
                                    <Sortorder options={options1} onSelect={(checked) => updateorderStatus(checked)} />
                                </View>
                                <Text style={{fontFamily:'hinted-AvertaStd-Bold',fontSize:15,marginTop:10,marginBottom:5,fontWeight:'bold', color:'#000000',}}>Call requests</Text>
                                <View style={{borderRadius:10,marginLeft:-20,alignSelf:'center',padding:'1%',paddingHorizontal:'3%'}}>
                                    <SwitchToggle
                                      switchOn={on}
                                      onPress={() => seton(s => !s)}
                                      backgroundColorOn='#B80000'
                                      containerStyle={{ marginTop: 5, width: 96, height: 38, borderRadius: 25, padding: 5 }}
                                      circleStyle={{ width: 30, height: 30, borderRadius: 20 }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    </Portal>
                </Provider>
            }
                <View style={tw`flex flex-1 justify-end mx-2`}>
                    <View style={tw`flex-end flex-row mb-1`}>
                        { isbroadcaster == false ?
                            <FlatList
                                data={props?.livecommentlist}
                                keyExtractor={(item, index) => item.id + index + ""}
                                style={{ maxHeight: 150, left:15 }}
                                renderItem={({ index, item }) => Comments(index, item)}
                            />
                            :
                                <FlatList
                                data={props?.livecommentlist}
                                keyExtractor={(item, index) => item.id + index + ""}
                                style={{ maxHeight: 150,left:15 }}
                                renderItem={({ index, item }) => Comments(index, item)}
                            />
                        }
                    </View>
                    <View style={tw`flex flex-row justify-between items-center mx-3`}>
                        <View style={styles.box}>
                            <TextInput
                                value={comment}
                                style={{ color: Colors.white, ...styles.input,paddingLeft:5 }}
                                onChangeText={text => setcomment(text)}
                                
                                placeholderTextColor="#b3b3b3"
                                placeholder="Send a message"
                                ></TextInput>
                        </View>

                        <TouchableOpacity onPress={() => doComment()} style={tw`left-0 right-4 px-2 my-2 rounded-lg`}>
                            <Image source={ImageIcons.messagesend} style={{ width: 21, height: 20.94 }} />
                        </TouchableOpacity>

                        { isbroadcaster == false ?
                            <TouchableOpacity onPress={() =>props.navigation.navigate("Cart")} style={{marginLeft:10,backgroundColor:'#EB2F2F',paddingHorizontal:10,paddingVertical:10,borderRadius:5}}>
                                <Image source={ImageIcons.callbag} style={{ width: 12, height: 14}} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity style={{marginLeft:10,backgroundColor:'#EB2F2F',paddingHorizontal:10,paddingVertical:10,borderRadius:5}}>
                                <Image source={ImageIcons.callbag} style={{ width: 12, height: 14}} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
        <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />

            { cartview  &&
                <View style={tw.style('rounded-r-3xl rounded-l-3xl bg-white absolute w-full bottom-0',{zIndex:2001})}>
                    <View style={tw`flex flex-row justify-between items-center mx-5 mb-5 pt-5`}>
                        <Text style={tw`mx-4 text-3xl text-gray-700`}>Shop</Text>
                        <View style={tw`right-5 bg-gray-200 p-2 rounded-lg`}>
                          <TouchableOpacity onPress={() => setcartview(false) }>
                              <XIcon color="red" fill="black" size={24} />
                          </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView  keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#ffffff',height:'auto',maxHeight:450,minHeight:225}} >
                        <View style={tw`my-[1%] mx-5`}>
                            <FlatList
                                data={props?.getliveeventlist?.products || []}
                                renderItem={renderItemcart}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </ScrollView>
                    <View  style={tw`flex flex-row justify-center my-5`} >
                        <TouchableOpacity style={tw`px-6 py-2 border border-transparent rounded-full shadow-sm bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`} onPress={() =>props.navigation.navigate("Cart")}>
                            <Text style={tw`items-center text-base font-medium  text-black`}>View Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            
        </KeyboardAvoidingView>
        )
    }
}
export default Blurbackground