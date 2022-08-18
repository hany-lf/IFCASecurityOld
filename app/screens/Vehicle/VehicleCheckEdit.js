/** @format */

import {
    View,
    StatusBar,
    StyleSheet,
    Image,
    Platform,
    Alert,
    TouchableOpacity,
    PermissionsAndroid,
    FlatList,
    ScrollView,
    RefreshControl
  } from 'react-native';
  import {
    TextInput,
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
  } from '@components';
  import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
  } from 'react';
  import { Picker } from '@react-native-picker/picker';
  import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
  import SelectDropdown from 'react-native-select-dropdown';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import { BaseColor, BaseStyle, useTheme } from '@config';
  import { useTranslation } from 'react-i18next';
  import { useNavigation, useRoute } from '@react-navigation/core';
  import styles from './styles';
  
  import ImagePicker from 'react-native-image-crop-picker';
  import DropDownPicker from 'react-native-dropdown-picker';
  import SearchableDropdown from 'react-native-searchable-dropdown';
  import { SegmentedControls  } from 'react-native-radio-buttons';
  import { urlApi } from "@config/services";
  
  import axios from 'axios';
  
  export const themeColor = '#1e1e1e';
  export const textColor = '#ffffffdd';

  const initialState = {
    plateNo: '',
    cartype: '',
    colour: '',
    slot: '',
    remark: '',
    sticker: '',
    velg: '',
    wiper: '',
    body: '',
    lampu: '',
    spion: '',
    kaca: '',
    pintu: '',
    banserep: ''
  };
  
  const VehicleCheckEdit = (props) => {

    
   
    var { navigation, route } = props;
    var [dataprops, setProps] = useState(props.route.params); console.log('Data Edit',props.route.params.urls);
    var { colors } = useTheme();
    var { t } = useTranslation();
    var [loading, setLoading] = useState(true);
    var [hasError, setErrors] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    var [dataSession, setDataSession] = useState(props.route.params);
    
    var [plateNo, setPlateNo] = useState('');
    var [cartype, setCarType] = useState('');
    var [colour, setColour] = useState('');
    var [slot, setSlot] = useState('');
    var [remark, setRemark] = useState('');
    var [sticker, setSticker] = useState('');
    var [velg, setVelg] = useState('');
    var [wiper, setWiper] = useState('');
    var [body, setBody] = useState('');
    var [lampu, setLampu] = useState('');
    var [spion, setSpion] = useState('');
    var [kaca, setKaca] = useState('');
    var [pintu, setPintu] = useState('');
    var [banserep, setBanSerep] = useState('');

     const params = {
        check_id : props.route.params.check_id,
        entity_cd : '01',
        project_no : '01',
        userid : 'MGR',
        plateno: props.route.params.plateno,
        tower_cd: props.route.params.tower_cd,
        location: props.route.params.location,
        check_date: props.route.params.check_date
      };

    
    useEffect(() => {
      
      setSticker(props.route.params.sticker);
      setVelg(props.route.params.rim);
      setWiper(props.route.params.wiper);
      setBody(props.route.params.body);
      setLampu(props.route.params.lights);
      setSpion(props.route.params.rearview_mirror);
      setKaca(props.route.params.windshield);
      setPintu(props.route.params.door);
      setBanSerep(props.route.params.spare_tire);
      setRemark(props.route.params.remarks);
      setFileList(props.route.params.urls);
    //  console.log('IMAGE',fileList[0].url);
      refreshPage();
    }, [props]);
    

    useEffect(() => {
    //  updateState();
    }, []);
  
    // var clearState = () => {
    //   setState({ ...initialState });
    // };
  
  
    // useEffect(() => {
    //   console.log(select);
    // }, [select]);
  
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      startRefresh();
      useEffect();
      wait(1000).then(() => setRefreshing(false));
    }, []);

    const refreshPage = ()=> {
      // window.location.reload(false);
    };

    const startRefresh = () => {
      // axios.get(API_URL + '/counter')
      axios.post(
            // 'http://103.111.204.131/apiwebpbi/api/package/tower'
           urlApi + 'package/checkEdit' , params
        )
      .then((response) => {
        console.log('Data SeSSION', response.data.Data);
        setDataSession(response.data.Data);
        // setLoading(false);
      }).catch((error) => {
        // setLoading(false);
        console.log(error.message);
      });
    };
   
  
    useEffect(() => {
      startRefresh(),
      setTimeout(() => {
        setLoading(!loading);
      }, 3000);
    }, []);

    var valueRemark = (index) => {
      setRemark(index);
    };

    var valueSticker = (index) => {
      console.log('Sticker',index);
      setSticker(index);
    };
    var valueVelg = (index) => {
      console.log('Velg',index);
      setVelg(index);
    };
    var valueWiper = (index) => {
      console.log('Wiper',index);
      setWiper(index);
    };
    var valueBody = (index) => {
      console.log('Body',index);
      setBody(index);
    };
    var valueLampu = (index) => {
      console.log('Lampu',index);
      setLampu(index);
    };
    var valueSpion = (index) => {
      console.log('Spion',index);
      setSpion(index);
    };
    var valueKaca = (index) => {
      console.log('Kaca',index);
      setKaca(index);
    };
    var valuePintu = (index) => {
      console.log('Pintu',index);
      setPintu(index);
    };
    var valueBanSerep = (index) => {
      console.log('BanSerep',index);
      setBanSerep(index);
    };

    const [fileList, setFileList] = useState([]);
    const state = useMemo(() => ({ fileList }), [fileList]);
  
    const onSelectedImage = useCallback(
      (image) => {
        setFileList((fileList) => {
          const newDataImg = [...fileList];
          const source = { uri: image.path };
          const item = {
            id: Date.now(),
            url: source,
            content: image.data,
          };
          newDataImg.push(item);
          return newDataImg;
        });
      },
      [setFileList]
    );
  
    const takePhotoFromCamera = useCallback(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        compressImageMaxHeight: 300,
        compressImageMaxWidth: 300,
        compressImageQuality: 1,
      }).then((image) => {
        onSelectedImage(image);
        console.log('itemimage', image);
      });
    }, [onSelectedImage]);
  
    const renderItem = useCallback(({ item, index }) => {
      console.log('RENDER',item);
      return (
        <View>
          <Image source={item.url} style={styles.imageBox} />
        </View>
      );
    }, []);

    const dataPass = {
      check_id: props.route.params.check_id,
      entity_cd: '01',
      project_no: '01',
      userid : 'MGR',
      plateno: props.route.params.plateno,
      tower_cd: props.route.params.tower_cd,
      location : props.route.params.location,
      check_date: props.route.params.check_date
     };

    

    const onSubmit = () => {
      
      // if (!plateNo.trim()) {
      //   alert('Please enter Police Number');
      //   return;
      // }
      
      // const plateno = plateNo;
      // console.log('plateno', plateno);
  
      const bodyData = new FormData();
      bodyData.append('entity_cd', props.route.params.entity_cd);
      bodyData.append('project_no', props.route.params.project_no);
      bodyData.append('colour', props.route.params.colour);
      bodyData.append('audit_user', props.route.params.audit_user);
      bodyData.append('location', props.route.params.location);
      bodyData.append('name', props.route.params.name);
      bodyData.append('plateno', props.route.params.plateno);
      bodyData.append('slot', props.route.params.slot);
      bodyData.append('tower', props.route.params.tower_cd);
      bodyData.append('type', cartype);
      bodyData.append('check_id', props.route.params.check_id);
      bodyData.append('sticker', sticker);
      bodyData.append('velg', velg);
      bodyData.append('wiper', wiper);
      bodyData.append('body', body);
      bodyData.append('lampu', lampu);
      bodyData.append('spion', spion);
      bodyData.append('kaca', kaca);
      bodyData.append('pintu', pintu);
      bodyData.append('banserep', banserep);
      bodyData.append('remark', remark);
      bodyData.append('userid', props.route.params.audit_user);
      bodyData.append('cnt', fileList.length);

      for(let i = 1; i <= fileList.length; i++){
        bodyData.append('userfile'+i, {
          uri: fileList[i-1].url.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }
  
      console.log('liatbody', bodyData); //return;
      // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
        return fetch(urlApi + 'package/updatecheck', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyData,
      })
        .then((res) => {
          return res.json().then((resJson) => {
            console.log('resJsonCallback', resJson);
            Alert.alert(resJson.Pesan);
            // navigation.navigate('Home');
            navigation.push('VehicleDetail', dataPass);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };


    const options = [
        "YES",
        "NO"
      ];
     
   

    const renderContent = () => {
      // console.log('cekkk', dataSession);
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          edges={['right', 'top', 'left']}>
          <Header
            title={t('Checking Vehicle')}
            renderLeft={() => {
              return (
                <Icon
                  name='angle-left'
                  size={20}
                  color={colors.primary}
                  enableRTL={true}
                />
              );
            }}
            onPressLeft={() => {setDataSession([]);
              navigation.push('VehicleDetail', dataPass);
            }}
          />
  
          <ScrollView
            contentContainerStyle={styles.contain}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
           
  
            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Jenis')}</Text>
              </View>
  
              <TextInput
                style={{ width: '70%' }}
                autoCorrect={false}
                placeholder={t('Tipe Kendaraan')}
                value={props.route.params.type}
                editable={false}
              />
            </View>
            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Warna')}</Text>
              </View>
  
              <TextInput
                style={{ width: '70%' }}
                autoCorrect={false}
                placeholder={t('Warna Kendaraan')}
                value={props.route.params.colour}
                editable={false}
              />
            </View>
            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('No. Polisi')}</Text>
              </View>
  
              <TextInput
                style={{ width: '70%' }}
                autoCorrect={false}
                placeholder={t('Nomor Plat')}
                value={props.route.params.plateno}
                editable={false}
              />
            </View>
            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Slot')}</Text>
              </View>
  
              <TextInput
                style={{ width: '70%' }}
                autoCorrect={false}
                placeholder={t('Slot Kendaraan')}
                value={props.route.params.slot}
                editable={false}
              />
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Stiker')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueSticker }
                    selectedOption={ sticker }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Velg / Dop')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueVelg }
                    selectedOption={ velg }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Wiper')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueWiper }
                    selectedOption={ wiper }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Body')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueBody }
                    selectedOption={ body }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Lampu')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueLampu }
                    selectedOption={ lampu }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Spion')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueSpion }
                    selectedOption={ spion }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Kaca')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueKaca }
                    selectedOption={ kaca }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Pintu')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valuePintu }
                    selectedOption={ pintu }
                />
               </View>
            </View>

            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Ban Serep')}</Text>
              </View>
              <View style={styles.contentMain}>
                <SegmentedControls
                    options={ options }
                    onSelection={ valueBanSerep }
                    selectedOption={ banserep }
                />
               </View>
            </View>
            <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Keterangan')}</Text>
              </View>
  
              <TextInput
                style={{ width: '70%', height: '105%' }}
                autoCorrect={false}
                multiline={true}
                numberOfLines={4}
                placeholder={t('Remark')}
                value={remark}
                onChangeText={valueRemark}
              />
            </View>

            <View style={styles.container}>
            <FlatList
              data={fileList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              extraData={state}
            />

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={takePhotoFromCamera}>
              <Text>Open Camera</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.buttonStyle}
              onPress={choosePhotoFromLibrary}>
              <Text>Open Gallery</Text>
            </TouchableOpacity> */}
          </View>
        
          </ScrollView>
          <View style={{ padding: 20 }}>
            <Button
              full
              onPress={() => {
                onSubmit();
              }}>
              {t('Update')}
            </Button>
          </View>
        </SafeAreaView>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          edges={['right', 'top', 'left']}>
          {renderContent()}
        </SafeAreaView>
      </View>
    );
  };
  
  export default VehicleCheckEdit;
  