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
  Modal,
  Pressable
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

const VehicleDetail = (props) => {
  const { navigation, route } = props;

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [plateNo, setPlateNo] = useState('');
  const [slotNo, setSlotNo] = useState('');

  const [select, setSelectec] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [startdate, setStartDate]= useState(moment(new Date()).format("DD/MM/YYYY"));
  const [enddate, setEndDate]= useState(moment(new Date()).format("DD/MM/YYYY"));

  const [dataprops] = useState(props.route.params); console.log('Data Props',dataprops);
  const [dataSession, setDataSession] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const handleModal = () => setIsModalVisible(() => !isModalVisible);

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

  const valuePlateNo = (index) => {
    // console.log('name', index);

    setPlateNo(index);
  };

  const valueSlotNo = (index) => {
    // console.log('name', index);

    setSlotNo(index);
  };

  const fetchSession = () => {
      const params = {
          check_id : dataprops.check_id,
          entity_cd : '01',
          project_no : '01',
          userid : 'MGR',
          check_date : dataprops.check_date
        };
        try {
          const resss = axios.post(
              // 'http://103.111.204.131/apiwebpbi/api/package/tower'
             urlApi + 'package/getSessionDetail' , params
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
    bodyData.append('entity_cd', dataprops.entity_cd);
    bodyData.append('project_no', dataprops.project_no);
    bodyData.append('check_id', dataprops.check_id);
    bodyData.append('userid', dataprops.userid);
    bodyData.append('plateno', plateNo);
    bodyData.append('slotno', slotNo);
    bodyData.append('tower_cd', dataprops.tower_cd);
    bodyData.append('location', dataprops.location);
    bodyData.append('check_date', dataprops.check_date);

    console.log('liatbody', bodyData);  
    setIsModalVisible(() => !isModalVisible); //return;

    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/check', {
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
                    navigation.navigate('VehicleCheck', resJson.Data);
                    setPlateNo('');
                    setSlotNo('');
                  } else {
                    alert(resJson.Pesan);
                    console.log('ERROR',resJson);
                    setPlateNo('');
                    setSlotNo('');
                  }
                });
                
        
      })
      .catch((err) => {
        Alert.alert('Error Sistem');
        console.log(err);
      });
  };

  const onEdit = (item, slot) => {
    // console.log('PLAT',item); return;
    const bodyData = new FormData();
    bodyData.append('entity_cd', dataprops.entity_cd);
    bodyData.append('project_no', dataprops.project_no);
    bodyData.append('check_id', dataprops.check_id);
    bodyData.append('userid', dataprops.userid);
    bodyData.append('plateno', item);
    bodyData.append('slotno', slot);
    bodyData.append('tower_cd', dataprops.tower_cd);
    bodyData.append('location', dataprops.location);
    bodyData.append('check_date', dataprops.check_date);
    bodyData.append('status', dataprops.status);

    console.log('liatbody', bodyData);  

    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/checkEdit', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then((res) => {
        
              return res.json().then((resJson) => {
                  if (resJson.Error === false){
                    console.log('VehicleCheckEdit', resJson.Data); //return;
                    navigation.navigate('VehicleCheckEdit', resJson.Data);
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

  const onSubmit = () => {
    
    const bodyData = new FormData();
    bodyData.append('entity_cd', dataprops.entity_cd);
    bodyData.append('project_no', dataprops.project_no);
    bodyData.append('check_id', dataprops.check_id);
    bodyData.append('userid', dataprops.userid);
    bodyData.append('check_date', dataprops.date);

    console.log('liatbody', bodyData);  //return;

    
    // console.log('DATAPASS',dataPass); return;

    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/submitSession', {
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
                    navigation.push('VehicleHeader', dataPass);
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

  const dataPass = {
    tower_cd: props.route.params.tower_cd,
    check_date: props.route.params.check_date,
    location: props.route.params.location
  };

  const onCancel = () => {
    
    const bodyData = new FormData();
    bodyData.append('entity_cd', dataprops.entity_cd);
    bodyData.append('project_no', dataprops.project_no);
    bodyData.append('check_id', dataprops.check_id);
    bodyData.append('userid', dataprops.userid);
    bodyData.append('check_date', dataprops.date);

    console.log('liatbody', bodyData);  //return;

    

    // return fetch('http://103.111.204.131/apiwebpbi/api/package/save', {
      return fetch(urlApi + 'package/cancelSession', {
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
                    navigation.push('VehicleHeader', dataPass);
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
  
  const renderContent = () => {
   return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('Vehicle List')}
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
            navigation.push('VehicleHeader', dataPass);
          }}
        />
        
        <View style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                  paddingHorizontal: 20,
                },
              ]}>
          <Button
           full
           disabled={props.route.params.status == 'C' ? true : false}
            onPress={() => {
              setIsModalVisible(() => !isModalVisible);
            }}
            style={{backgroundColor: props.route.params.status == 'C' ? '#8D8D8D' : '#1384CA'  }}
            >
            {t('Add Vehicle Check')}
          </Button>
          <View style={styled.centeredView}>
            <Modal 
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setIsModalVisible(() => !isModalVisible);
            }}
            >
              <View style={styled.centeredView}>
                <View style={styled.modalView}>
                  <Text style={styled.modalText}>Please input Police No and Slot No</Text>
                  <TextInput
                    style={{ width: '70%', marginBottom: 15 }}
                    autoCorrect={false}
                    placeholder={t('Nomor Plat')}
                    value={plateNo}
                    onChangeText={valuePlateNo}
                    textAlign='center'
                  />
                  <TextInput
                    style={{ width: '70%', marginBottom: 15 }}
                    autoCorrect={false}
                    placeholder={t('Nomor Slot')}
                    value={slotNo}
                    onChangeText={valueSlotNo}
                    textAlign='center'
                  />
                  <Pressable
                    style={[styled.button, styled.buttonClose]}
                    onPress={onAdd}
                  >
                    <Text style={styled.textStyle}>Check Vehicle</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
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
                       onPress={() => {onEdit(item.plate_no, item.slot)}}
                      >
                          <View style={[styless.image, { backgroundColor: colors.primaryLight }]}>
                              <Icon name='car' size={24} solid color={BaseColor.whiteColor} />
                          </View>
                          <View style={{ paddingLeft: 8, flex: 1 }}>
                              <Text light>{item.slot}</Text>
                              <Text footnote semibold style={{ marginTop: 5 }}>
                              {item.plate_no}
                              </Text>
                          </View>
                          <View style={{ flex: 1, alignItems:'space-between', justifyContent:'space-between' }}>
                             <Text footnote semibold style={[styless.text, { marginTop: 5 }]}>
                              {item.type}
                              </Text>
                              <Text style={[styless.text,  {width:90, textAlign:'right', backgroundColor: item.status == 'Complete' ? '#CDF275' : '#F79595' }]}>
                              {item.status}
                              </Text>
                          </View>
                      </TouchableOpacity>
                      </View>
                  );
              }}
          />
          <View style={{ padding: 20 , flexDirection:'row', alignItems:'space-between', justifyContent:'space-between', flex: 1, display: dataSession ? 'flex' : 'none'}}>
            <Button style={{width: 150, backgroundColor: '#09B537'}}
              onPress={onSubmit}
              disabled={dataSession ? false : true}
              >
              {t('Submit')}
            </Button>
            <Button style={{width: 150, backgroundColor: '#DA154A'}}
              // onPress={onCancel}
              onPress={() => {
                navigation.push('VehicleHeader', dataPass);
              }}
              disabled={dataSession ? false : true}
              >
              {t('Cancel')}
            </Button>
          </View>
         
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

const styled = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default VehicleDetail;
