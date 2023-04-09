import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageTitle from '../components/PageTitle'
import { ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES, images } from "../constants"
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import { Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { FlatList } from 'react-native'

const PhoneNumber = ({ navigation}) => {
    const [modalVisible, setModalVisible] =useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [areas,setAreas] = useState([]);


    useEffect(()=>{
        fetch('https://restcountries.com/v2/all')
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            let areaData = data.map((item) => {
                return {
                    code: item.alpha2Code,
                    item: item.name,
                    callingCode: `+${item.callingCodes[0]}`,
                    flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`
                }
            });
            setAreas(areaData);
            if(areaData.length > 0){
                let defaultData = areaData.filter((a)=>a.code == 'US')

                if(defaultData.length > 0){
                    setSelectedArea(defaultData[0])
                }
            }
        })
    },[]);

    function renderAreasCodesModal(){
        const renderItem = ({ item }) =>{
            return (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    flexDirection: 'row'
                  }}
                  onPress={()=>{
                    setSelectedArea(item),
                    setModalVisible(false)
                  }}
                >
                    <Image
                      source={{ uri: item.flag}}
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10
                      }}
                    />
                    <Text style={{...FONTS.body3, color: COLORS.white}}>
                        {item.item}
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
            >
                <TouchableWithoutFeedback
                  onPress={()=>setModalVisible(false)}
                >
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                        <View style={{
                            height: 400,
                            width: SIZES.width * 0.8,
                            color: COLORS.white,
                            backgroundColor: "#342342",
                            borderRadius: 12
                        }}>
                            <FlatList
                              data={areas}
                              renderItem={renderItem}
                              keyExtractor={(item)=>item.code}
                              verticalScrollIndicator={false}
                              style={{
                                padding: 20,
                                marginBottom: 20
                              }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

  return (
   <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <PageTitle onPress={()=>navigation.navigate('Walkthrough')} />
        <ScrollView>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{...FONTS.h2, color: COLORS.black, marginTop: 80}}>
                    Enter Phone Number
                </Text>
                <Text
                  style={{
                    ...FONTS.body4,
                    textAlign: 'center',
                    marginVertical: 4
                  }}
                >
                    Please confirm your country code and enter your phone numbaer
                </Text>

                <View style={{
                    width: "100%",
                    paddingHorizontal: 22,
                    paddingVertical: 60,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 88
                    }}>
                        <TouchableOpacity
                          style={{
                            width: 100,
                            height: 48,
                            marginHorizontal: 5,
                            borderRadius: SIZES.padding,
                            borderColor: SIZES.secondaryWhite,
                            backgroundColor: COLORS.secondaryWhite,
                            flexDirection: "row",
                            fontSize: 12
                          }}
                          onPress={()=>setModalVisible(true)}
                        >
                            <View style={{justifyContent: "center"}}>
                                <Image
                                 source={images.down}
                                 style={{
                                    width: 10,
                                    height: 10,
                                    tintColor: COLORS.black
                                 }}
                                />
                            </View>

                            <View style={{justifyContent: "center", marginLeft: 5}}>
                                 <Image
                                   source={{ uri: selectedArea?.flag}}
                                   resizeMode='contain'
                                   style={{
                                    height: 30,
                                    width: 30
                                   }}
                                 />
                            </View>
                            <View
                              style={{
                                justifyContent: "center",
                                marginLeft: 5
                              }}
                            >
                                <Text style={{
                                    color: COLORS.black,
                                    ...FONTS.body3
                                }}>{selectedArea?.callingCode}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Phone Number Text Input */}
                        <TextInput
                          style={{
                            flex: 1,
                            marginVertical: 10,
                            borderColor: "#111",
                            backgroundColor: COLORS.secondaryWhite,
                            borderRadius: SIZES.padding,
                            paddingLeft: SIZES.padding,
                            height: 48,
                            fontSize: 12,
                            color: '#111'
                          }}
                          placeholder='Enter your phone number'
                          placeholderTextColor={COLORS.black}
                          selectionColor={COLORS.black}
                          keyboardType='numeric'
                        />
                    </View>
                    <Button
                      title="Submit"
                      onPress={()=>navigation.navigate('Verification')}
                      style={{
                        width: "100%",
                        paddingVertical: 12,
                        marginBottom: 48
                      }}
                    />
                </View>
            </View>
            {renderAreasCodesModal()}
        </ScrollView>
   </SafeAreaView>
  )
}

export default PhoneNumber