/** @format */
import 'react-native-gesture-handler';
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
    RefreshControl,
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
  import moment from "moment";
  import DatePicker from "react-native-datepicker";
  import { urlApi } from "@config/services";
  
  import axios from 'axios';
  
  export const themeColor = '#1e1e1e';
  export const textColor = '#ffffffdd';
  
  const Vehicle = (props) => {
    const { navigation, route } = props;
  
    const { colors } = useTheme();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);
    const [plateNo, setPlateNo] = useState('');
    const [hpDelivery, setHpDelivery] = useState('');
    const [delVehicle, setdelVehicle] = useState('');
    const [nameSender, setSenderName] = useState('');
    const [nameOtherCourier, setOtherCourier] = useState('');
    const [nameOtherCus, setOtherCust] = useState('');
  
    const [nameType, setNameType] = useState('');
    const [hpSender, setSenderHp] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dataGate, setDataGate] = useState([]);
    const [dataTower, setDataTower] = useState([]);
    const [dataUnit, setDataUnit] = useState([]);
    const [dataCust, setDataCust] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [dataCourier, setDataCourier] = useState([]);
  
    const [valueGate, setValueGate] = useState('');
    const [valueTower, setValueTower] = useState('');
    const [valueUnit, setValueUnit] = useState('');
    const [valueCourier, setValueCourier] = useState('');
    const [valueCust, setValueCust] = useState('');
    const [valueType, setValueType] = useState('');
    const [open, setOpen] = useState(false);
    const [openTower, setOpenTower] = useState(false);
    const [openUnit, setOpenUnit] = useState(false);
    const [openCust, setOpenCust] = useState(false);
    const [openCourier, setOpenCourier] = useState(false);
    const [openType, setOpenType] = useState(false);
  
    const [select, setSelectec] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [itemSelected, setItemSelected] = useState(false);
    const [startdate, setStartDate]= useState(moment(new Date()).format("DD/MM/YYYY"));
    const [enddate, setEndDate]= useState(moment(new Date()).format("DD/MM/YYYY"));
  
    const selectHandler = (item) => {
      setSelectec(item);
    };
  
    useEffect(() => {
      console.log(select);
    }, [select]);
  
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(!loading);
      }, 1000);
    }, []);
  
    const valuePlateNo = (index) => {
      // console.log('name', index);
  
      setPlateNo(index);
    };
    
    const valueStartDate = (index) => {
      console.log('name', index);
  
      setStartDate(index);
    };
    
  
    const fetchLocation = async (item) => {

      let lottype = item.lot_type;
      console.log('ITEEM',lottype); //return;
      
        try {
        const resss = await axios.get(
          // 'http://103.111.204.131/apiwebpbi/api/package/tower'
          urlApi + 'gate/getLocation/' + lottype
        );
  
        console.log('res LOCATION',resss.data.data);
  
        setDataGate(resss.data.data);
        console.log('datagate', JSON.stringify(dataGate));
  
        } catch (error) {
          alert('ERROR here',hasError.toString());
        }

    };

    // const fetchGate = async() => {
    //   try {

        
    //     // const res = await axios.get('http://103.111.204.131/apiwebpbi/api/gate');
    //     const res = await axios.get(
    //       urlApi + 'gate'
    //     );
        
    //     setDataGate(res.data.data);
    //     console.log('datagate', JSON.stringify(dataGate));
    //   } catch (error) {
    //     setErrors(error.ressponse.data);
    //     alert(hasError.toString());
    //   }
    // };
  
    const fetchTower = async () => {
      try {
        const res = await axios.get(
          // 'http://103.111.204.131/apiwebpbi/api/package/tower'
          urlApi + 'package/tower'
        );
  
        console.log('res tower', res.data.data);
  
        setDataTower(res.data.data);
  
        // console.log("datatower", dataTower);
        // fetchUnit(res.data.data); //coba buat ngehit unit
      } catch (error) {
        setErrors(error.ressponse.data);
      }
    };
    
  
    const chooseTower = (itemValue) => {
      console.log('itemvalue choose tower', itemValue);
      setValueTower(itemValue);
    };
  
   
  
    useEffect(() => {
      // fetchGate();
      fetchTower();
      // fetchLocation();
    }, []);
  
    const [fileList, setFileList] = useState([]);
    const state = useMemo(() => ({ fileList }), [fileList]);
  
    const dataPass = {
      tower_cd: valueTower,
      check_date: startdate,
      location: valueGate
    };
  
    const onSubmits = () => {
    
      // if (!valueGate.trim()) {
      //   Alert.alert('Please enter Gate');
      //   return;
      // }
      // if (!valueTower.trim()) {
      //   Alert.alert('Please enter Tower');
      //   return;
      // }
      // if (!plateNo.trim()) {
      //   Alert.alert('Please enter Police Number');
      //   return;
      // }
      // const gate = valueGate;
      // console.log('gate', gate);
      // const tower = valueTower;
      // console.log('tower', tower);
      // const plateno = plateNo;
      // console.log('plateno', plateno);
      console.log('VALUE',valueGate + valueTower); //return;
      const bodyData = new FormData();
      bodyData.append('entity_cd', '01');
      bodyData.append('project_no', '01');
      bodyData.append('gate_cd', valueGate);
      bodyData.append('tower', valueTower);
      bodyData.append('date', startdate);
      // bodyData.append('plateno', plateNo);
      bodyData.append('userid', 'MGR');

      
  
      console.log('liatbody', bodyData);
      // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      //   return fetch(urlApi + 'package/getSessionCheck', {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: bodyData,
      // })
      //   .then((res) => {
          
      //           return res.json().then((resJson) => {
      //               if (resJson.Error === false){
      //                 console.log('resJsonCallback', resJson);
      //                 // Alert.alert(resJson.Pesan);
      //               } else {
      //                 alert(resJson.Pesan);
      //                 console.log('ERROR',resJson);
      //               }
                    navigation.push('VehicleHeader', dataPass);
        //           });
          
        // })
        // .catch((err) => {
        //   Alert.alert('No. Plat belum terdaftar');
        //   console.log(err);
        // });
    };
    const renderContent = () => {
      // console.log('cekkk', valueType)
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          edges={['right', 'top', 'left']}>
          <Header
            title={t('Session Check ID')}
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
            onPressLeft={() => {
              navigation.push('VehicleHome');
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
                <Text semibold>{t('Checking Date')}</Text>
              </View>
  
              <DatePicker
                  style={{width: 200}}
                  date={startdate}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  // minDate="2016-05-01"
                  // maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                  dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                      display: 'none'
                  },
                  dateInput: {
                      marginTop: 15,
                      marginLeft: 40,
                      marginRight: 0,
                      marginBottom: 15,
                      borderRadius: 5,  
                  }
                  // ... You can check the source to find the other keys.
                  }}
                  onDateChange={valueStartDate}
              />
            </View>
              
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <DropDownPicker
                schema={{
                  label: 'descs',
                  value: 'lot_type',
                }}
                placeholder={t('Select Towers')}
                listMode='MODAL'
                open={openTower}
                items={dataTower}
                setItems={setDataTower}
                setOpen={setOpenTower}
                value={valueTower}
                searchable={true}
                setValue={setValueTower}
                // onValueChange={(itemValue) =>
                  // setValueTower(itemValue)
                  // chooseTower(itemValue),
                  // fetchGate(itemValue)
                // }
                onSelectItem={(itemValue) =>
                  // setValueTower(itemValue)
                  fetchLocation(itemValue)
                }
                style={{
                  paddingHorizontal: 20,
                  height: 50,
                  width: '100%',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <DropDownPicker
                schema={{
                  label: 'descs',
                  value: 'parking_loc_cd',
                }}
                placeholder={t('Select Location')}
                listMode='MODAL'
                open={open}
                items={dataGate}
                setItems={setDataGate}
                setOpen={setOpen}
                value={valueGate}
                searchable={true}
                setValue={setValueGate}
                style={{
                  paddingHorizontal: 20,
                  height: 50,
                  width: '100%',
                }}
              />
            </View>
           
  
            {/* <View
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('Police Number')}</Text>
              </View>
  
              <TextInput
                style={{ width: '70%' }}
                autoCorrect={false}
                placeholder={t('Nomor Plat')}
                value={plateNo}
                onChangeText={valuePlateNo}
              />
            </View> */}

           
           
          </ScrollView>
          <View style={{ padding: 20 }}>
            <Button
             full
              onPress={() => {
                onSubmits();
              }}
              >
              {t('Next')}
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
  
  export default Vehicle;
  