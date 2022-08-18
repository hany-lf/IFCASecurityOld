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
  import styles from './styles';
  
  import ImagePicker from 'react-native-image-crop-picker';
  import DropDownPicker from 'react-native-dropdown-picker';
  import SearchableDropdown from 'react-native-searchable-dropdown';
  import moment from "moment";
  import DatePicker from "react-native-datepicker";
  import styless from '../../components/List/Transaction/styles';
  import { urlApi } from "@config/services";
  
  import axios from 'axios';
  
  export const themeColor = '#1e1e1e';
  export const textColor = '#ffffffdd';
  
  const VehicleHeader = (props) => {
    const { navigation, route } = props;
  
    const { colors } = useTheme();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [hasError, setErrors] = useState(false);
  
    const [select, setSelectec] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [startdate, setStartDate]= useState(moment(new Date()).format("DD/MM/YYYY"));
    const [enddate, setEndDate]= useState(moment(new Date()).format("DD/MM/YYYY"));
  
    const [dataprops] = useState(props.route.params); console.log('Data Props2',dataprops);
    const [dataSession, setDataSession] = useState([]);
   
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
    //   setDataSession([]);
      fetchSession();
    }, []);
    
    useEffect(() => {
        fetchSession()
    }, []);
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(!loading);
      }, 1000);
    }, []);

    const fetchSession = () => {
        const params = {
            tower_cd : dataprops.tower_cd,
            check_date : dataprops.check_date,
            location : dataprops.location,
            entity_cd : '01',
            project_no : '01',
            userid : 'MGR'
          };
          try {
            const resss = axios.post(
                // 'http://103.111.204.131/apiwebpbi/api/package/tower'
                urlApi + 'package/getSessionCheck' , params
            ).then(res => {
                console.log('HASIL',res.data.Data);
                setDataSession(res.data.Data);
                console.log('dataSession', dataSession);
            });         
    
          } catch (error) {
            alert('ERROR here',hasError.toString());
          }
  
      };

    const onAdd = () => {
    
      const bodyData = new FormData();
      bodyData.append('entity_cd', '01');
      bodyData.append('project_no', '01');
      bodyData.append('tower_cd', dataprops.tower_cd);
      bodyData.append('location', dataprops.location);
      bodyData.append('check_date', dataprops.check_date);
      bodyData.append('userid', 'MGR');
  
      console.log('liatbody', bodyData);  //return;
      // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
        return fetch(urlApi + 'package/saveSession', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyData,
      })
        .then((res) => {
          
                return res.json().then((resJson) => {
                    if (resJson.Error === false){
                      console.log('resJsonCallback', resJson);
                      Alert.alert('Your New Check ID : ' + resJson.Data.check_id );
                      onRefresh();
                    } else {
                      alert(resJson.Pesan);
                      console.log('ERROR',resJson);
                    }
                  });
          
        })
        .catch((err) => {
          Alert.alert('Error Sistem');
          console.log(err);
        });
    };

    const onDetail = (item, status) => {
        // console.log('CEK ID',item);
        const bodyData = new FormData();
        bodyData.append('check_id', 'item');
        bodyData.append('entity_cd', '01');
        bodyData.append('project_no', '01');
        bodyData.append('userid', 'MGR');

        const dataPass = {
            check_id: item,
            entity_cd: '01',
            project_no: '01',
            userid : 'MGR',
            tower_cd: dataprops.tower_cd,
            location : dataprops.location,
            check_date: dataprops.check_date,
            status: status
        };

        navigation.push('VehicleDetail', dataPass);
      };
    
    const renderContent = () => {
     return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          edges={['right', 'top', 'left']}>
          <Header
            title={t('Session List')}
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
              navigation.push('Vehicle');
            }}
          />
          
          <View style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                  paddingHorizontal: 20
                },
              ]}>
            <Button
             full
              onPress={() => Alert.alert(
                'Warning',
                'Are you sure want to generate New Session ?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  {text: 'OK', onPress: onAdd},
                ],
                { cancelable: true }
              )}
              style={{backgroundColor: '#1384CA'}}
              >
              {t('Add Check ID')}
            </Button>
          </View>
  
          {/* <ScrollView
            contentContainerStyle={styles.contain}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }> */}
            <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={dataSession}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => {
                    // const selected = item == languageSelected;
                    return (
                        <View style={{borderBottomWidth: 1, borderBottomColor: '#000'}}> 
                        <TouchableOpacity  style={[styless.container]} 
                         onPress={() => {onDetail(item.check_id, item.status)}}
                        >
                            {/* { backgroundColor: item.status == 'C' ? '#E5660B':'#50CB64' } */}
                            <View style={[styless.image, { backgroundColor: colors.primaryLight }]}>  
                                <Icon name='building' size={24} solid color={BaseColor.whiteColor} />
                            </View>
                            <View style={{ paddingLeft: 8, flex: 1 }}>
                                <Text semibold>{item.check_id}</Text>
                                <Text footnote  style={{ marginTop: 5 }}>
                                {item.location}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems:'space-between', justifyContent:'space-between' }}>
                                <Text light style={styless.text}>
                                {moment(item.check_date).format("DD/MM/YYYY")}
                                </Text>
                                <Text style={[styless.text, {width:50, marginTop: 5, backgroundColor: item.status == 'O' ? '#CDF275' : '#F79595' }]}>
                                {item.status == 'O' ? 'Open' : 'Close'}
                                </Text><Text footnote semibold style={[styless.text, { marginTop: 5 }]}>
                                {item.cnt}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    );
                }}
            />


            
                
  
           
           
          {/* </ScrollView> */}
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
  
  export default VehicleHeader;
  