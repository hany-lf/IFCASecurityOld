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
import styles from '../Vehicle/styles';

import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DatePicker from "react-native-datepicker";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import { urlApi } from "@config/services";

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';


const VehicleSearch = (props) => {
  const { navigation, route } = props;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [startdate, setStartDate]= useState(moment(new Date()).format("DD/MM/YYYY"));
  const [enddate, setEndDate]= useState(moment(new Date()).format("DD/MM/YYYY"));

  // useEffect(() => {
  //   console.log(select);
  // }, [select]);

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

  const valueStartDate = (index) => {
    console.log('name', index);

    setStartDate(index);
  };

 
  const valueEndDate = (index) => {
    console.log('name', index);

    setEndDate(index);
  };

  
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
 

  const [fileList, setFileList] = useState([]);
  const state = useMemo(() => ({ fileList }), [fileList]);



  const onSubmitAll = () => {
 
    // if (!startdate) {
    //   alert('Please enter Start Date');
    //   return;
    // }
    // if (!enddate) {
    //   alert('Please enter End Date');
    //   return;
    // }

    const bodyData = new FormData();
    bodyData.append('entity_cd', '01');
    bodyData.append('project_no', '01');
    bodyData.append('startdate', startdate);
    bodyData.append('enddate', enddate);
    bodyData.append('userid', 'MGR');

    console.log('liatbody', bodyData); //return;
    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/search', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then((res) => {
              return res.json().then((resJson) => {
                if (resJson.Error === false){
                  console.log('resJsonCallback', resJson.Data[1]);
                  // Alert.alert(resJson.Pesan);
                  navigation.navigate('VehicleList', resJson.Data);
                } else {
                  alert(resJson.Pesan);
                  console.log('ERROR',resJson);
                }
              });
       
      })
      .catch((err) => {
        Alert.alert('List Kosong');
        console.log(err);
      });
  };

  const onSubmitToday = (itemValue) => {
 
   
    const bodyData = new FormData();
    bodyData.append('entity_cd', '01');
    bodyData.append('project_no', '01');
    bodyData.append('userid', 'MGR');

    console.log('liatbody', bodyData); //return;
    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/searchToday', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then((res) => {
              return res.json().then((resJson) => {
                if (resJson.Error === false){
                  console.log('resJsonCallback', resJson.Data[0]);
                  // Alert.alert(resJson.Pesan);
                  navigation.navigate('VehicleList', resJson.Data);
                } else {
                  alert(resJson.Pesan);
                  console.log('ERROR',resJson);
                }
              });
       
      })
      .catch((err) => {
        Alert.alert('List Kosong');
        console.log(err);
      });
  };
  
  const onSubmitWeek = (itemValue) => {
 
   
    const bodyData = new FormData();
    bodyData.append('entity_cd', '01');
    bodyData.append('project_no', '01');
    bodyData.append('userid', 'MGR');

    console.log('liatbody', bodyData); //return;
    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/searchWeek', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then((res) => {
              return res.json().then((resJson) => {
                if (resJson.Error === false){
                  console.log('resJsonCallback', resJson.Data[1]);
                  // Alert.alert(resJson.Pesan);
                  navigation.navigate('VehicleList', resJson.Data);
                } else {
                  alert(resJson.Pesan);
                  console.log('ERROR',resJson);
                }
              });
       
      })
      .catch((err) => {
        Alert.alert('List Kosong');
        console.log(err);
      });
  };

  const onSubmitMonth = (itemValue) => {
 
   
    const bodyData = new FormData();
    bodyData.append('entity_cd', '01');
    bodyData.append('project_no', '01');
    bodyData.append('userid', 'MGR');

    console.log('liatbody', bodyData); //return;
    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/searchMonth', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then((res) => {
              return res.json().then((resJson) => {
                if (resJson.Error === false){
                  console.log('resJsonCallback', resJson.Data[1]);
                  // Alert.alert(resJson.Pesan);
                  navigation.navigate('VehicleList', resJson.Data);
                } else {
                  alert(resJson.Pesan);
                  console.log('ERROR',resJson);
                }
              });
       
      })
      .catch((err) => {
        Alert.alert('List Kosong');
        console.log(err);
      });
  };

  const renderContent = () => {
    // console.log('cekkk', valueType)
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('Search')}
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
            navigation.goBack();
          }}
        />

        <ScrollView
          contentContainerStyle={styles.contain}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <DropDownPicker
              schema={{
                label: 'gate_name',
                value: 'gate_cd',
              }}
              placeholder={t('Select Gates')}
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
          </View> */}
          {/* <View
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
              onValueChange={(itemValue) =>
                // setValueTower(itemValue)
                chooseTower(itemValue)
              }
              onSelectItem={(itemValue) =>
                // setValueTower(itemValue)
                chooseTower(itemValue)
              }
              style={{
                paddingHorizontal: 20,
                height: 50,
                width: '100%',
              }}
            />
          </View> */}
         

          <View
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Today')}</Text>
            </View>

            <Button
              style={{ width: '50%' }}
              full
              onPress={() => {
                onSubmitToday();
              }}
            >
              {t('check')}
            </Button>
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
              <Text semibold>{t('A Week')}</Text>
            </View>

            <Button
              style={{ width: '50%' }}
              full
              onPress={() => {
                onSubmitWeek();
              }}
            >
              {t('check')}
            </Button>
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
              <Text semibold>{t('A Month')}</Text>
            </View>

            <Button
              style={{ width: '50%' }}
              full
              onPress={() => {
                onSubmitMonth();
              }}
            >
              {t('check')}
            </Button>
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
                <Text semibold>{t('Start Date')}</Text>
              </View>
              {/* <View>
              <Text style={styles.pickedDate}>{startdate}</Text>
              
              </View>
              {!isPickerShow && (
                <View>
                  <Button title="Show Picker" color="purple" onPress={showPicker} />
                </View>
              )}
              {isPickerShow && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onChange}
                  // style={styles.datePicker}
                />
              )} */}
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
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={styles.contentTitle}>
                <Text semibold>{t('End Date')}</Text>
              </View>
              
              <DatePicker
                  style={{width: 200}}
                  date={enddate}
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
                  onDateChange={valueEndDate}
              />
            </View>
         
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            full
            onPress={() => {
              onSubmitAll();
            }}>
            {t('check')}
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

export default VehicleSearch;
