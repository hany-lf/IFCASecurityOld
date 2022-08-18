/** @format */

import {
    SafeAreaView,
    Text,
    Header,
    Icon,
    Tag,
    ListVehicleExpand,
  } from '@components';
  import { BaseStyle, useTheme } from '@config';
  import { useNavigation, useRoute } from '@react-navigation/core';
  import React, { useEffect, useState } from 'react';
  import { useTranslation } from 'react-i18next';
  import { enableExperimental } from '@utils';
  
  import moment from 'moment';
  
  import {
    ScrollView,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
  } from 'react-native';
  
  import getUser from '../../selectors/UserSelectors';
  import { useDispatch, useSelector } from 'react-redux';
  import axios from 'axios';
  import ListVehicle from '../../components/List/Transaction/ListVehicle';
  import DropDownPicker from 'react-native-dropdown-picker';
  import { urlApi } from "@config/services";
  
  function VehicleList(props) {
    const [dataprops] = useState(props.route.params); console.log('Data Props',dataprops);
    const { t } = useTranslation();
    const { colors } = useTheme();
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => getUser(state));
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState([]);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ]);
  
    // Make function to call the api
    // useEffect(() => {
    //   axios
    //     .get(urlApi + 'package/history/P')
    //     .then((response) => {
    //       console.log('response', JSON.stringify(response));
    //       setData(response);
    //     });
    // }, []);
  
    // useEffect(() => {
    //   async function fetchData() {
    //     // const URL = 'http://103.111.204.131/apiwebpbi/api/package/history/P';
    //     const URL = urlApi + 'package/vehiclelist';
  
    //     try {
    //       const res = await axios.get(URL);
    //       console.log('datahistor', res.data.data);
    //       setData(res.data.data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   fetchData();
    // }, []);
  
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { flex: 1 }]}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('Vehicle Check History')}
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {/* <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              searchable={true}
              setItems={setItems}
            /> */}
            {dataprops.map((item, index) => (
              <ListVehicleExpand key={index}
                onPress={() => navigation.navigate('FHistoryDetail')}
                check_id={item.check_id}
                wiper={item.wiper}
                name={item.name}
                sticker={item.sticker}
                lights={item.lights}
                rim={item.rim}
                body={item.body}
                windshield={item.windshield}
                rearview_mirror={item.rearview_mirror}
                plate_no={item.plate_no}
                slot={item.slot}
                spare_tire={item.spare_tire}
                door={item.door}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  export default VehicleList;
  