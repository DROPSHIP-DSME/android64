import React, { useState } from 'react';
import { TouchableOpacity, Text, View,Image,TextInput } from 'react-native';
import tw from 'twrnc';
import ImageIcons from '../../common/ImageIcons'
import styles from '../../screens/common/styles';


const Help = ({onPress}) => {

    const [helppopup, sethelppopup] = React.useState(false);
    const [text1, onChangeText1] = React.useState("");
    
    const [managedata, setmanagedata] = React.useState(true);
    
    const sendnewmsg = () => {
        if(text1==""){
            alert('Message is required')
        }else {
            sethelppopup(false);
            onChangeText1('');
            alert('Message sent successfully')
        }
    }

    return (
        <View>
            {helppopup == true &&
                <View style={{ flex: 1, backgroundColor: '#f2f2f2', margin: 20, paddingVertical: 10, borderRadius: 10, zIndex: 4001, position: 'absolute', bottom:20 }}>
                    <View style={styles.chatViewrose}>
                        <Text style={styles.Benrosetext}>Write to Customer Support</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 15, top: -30 }} onPress={() => sethelppopup(false)}>
                            <Image source={ImageIcons.closepopup} style={styles.sendmsg2} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.accountmainview, { marginBottom: 50, width: '100%' }]}>
                        <View style={{ width: '90%' }}>
                            <TextInput style={[styles.chatinput, { height: 120, fontSize:14, width: '100%' }]}
                                placeholder="Type here..."
                                onChangeText={onChangeText1}
                                value={text1}
                                multiline={managedata}
                                placeholderTextColor="#b3b3b3"
                            />
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: '43%', bottom: -50 }} onPress={() => sendnewmsg()}>
                            <View style={{ borderRadius: 10, marginRight: 10, padding: 10, backgroundColor: '#B80000' }}>
                                <Text style={{ color: '#ffffff', fontFamily: 'hinted-AvertaStd-Semibold', paddingHorizontal: 10 }}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }

          <View style={{ position: 'absolute', zIndex: 2001, right: 25, bottom: 35 }}>
              <TouchableOpacity onPress={() => sethelppopup(true)}>
                  <Image source={ImageIcons.exporthelp} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
          </View>
      </View>
    );
}
export default Help
