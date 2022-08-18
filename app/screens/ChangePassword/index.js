/** @format */

import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from '@components';
import { BaseColor, BaseStyle, useTheme } from '@config';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import {
  actionTypes,
  login,
  logout,
  changePass,
} from '../../actions/UserActions';

const ChangePassword = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => getUser(state));

  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');
  const [currPass, setCurrPass] = useState('');

  const savePassword = () => {
    if (newPass == conPass) {
      dispatch(changePass(user.user, newPass, currPass));
    } else {
      alert("Password Doesn't Match");
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('change_password')}
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
      <ScrollView>
        <View style={styles.contain}>
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('password')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder={t('password')}
            placeholderTextColor={BaseColor.grayColor}
            value={newPass}
            onChangeText={(val) => setNewPass(val)}
            selectionColor={colors.primary}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('re_password')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder={t('password_confirm')}
            placeholderTextColor={BaseColor.grayColor}
            value={conPass}
            onChangeText={(val) => setConPass(val)}
            selectionColor={colors.primary}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button loading={loading} full onPress={savePassword}>
          {t('confirm')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
