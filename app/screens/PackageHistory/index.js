/** @format */

import {
  SafeAreaView,
  Text,
  Header,
  Icon,
  Tag,
  ListTransactionExpand,
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
import ListTransaction from '../../components/List/Transaction';
import DropDownPicker from 'react-native-dropdown-picker';
import { urlApi } from "@config/services";

function PackageHistory(props) {
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
  //     .get('http://103.111.204.131/apiwebpbi/api/package/history/P')
  //     .then((response) => {
  //       console.log('response', JSON.stringify(response));
  //       setData(response);
  //     });
  // }, []);

  useEffect(() => {
    async function fetchData() {
      // const URL = 'http://103.111.204.131/apiwebpbi/api/package/history/P';
      const URL = urlApi + 'package/history/P';

      try {
        const res = await axios.get(URL);
        console.log('datahistor', res.data.data);
        setData(res.data.data);
        console.log('tenantname',res.data.data[0].tenant_name.length)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Package History')}
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
          {data.map((item) => (
            <ListTransactionExpand
              onPress={() => navigation.navigate('FHistoryDetail')}
              package_id={item.package_id}
              gate_name={item.gate_name}
              tenant_name={item.tenant_name}
              tower={item.tower}
              other_tenant={item.other_tenant}
              courier_cd={item.courier_cd}
              other_courier={item.other_courier}
              lot_no={item.lot_no}
              package_type={item.package_type}
              other_type={item.other_type}
              deliveryman_name={item.deliveryman_name}
              deliveryman_hp={item.deliveryman_hp}
              package_descs={item.package_descs}
              package_qty={item.package_qty}
              sender_name={item.sender_name}
              sender_hp={item.sender_hp}
              received_date={item.received_date}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PackageHistory;
