/** @format */

import Text from '@components/Text';
import Icon from '@components/Icon';
import { useTheme, BaseColor } from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

const ListTransaction = ({
  style = {},
  icon = 'exchange-alt',
  entity_cd = '',
  project_no = '',
  gate_cd = gate_cd,
  gate_name = gate_name,
  tower = tower,
  tower_descs = tower_descs,
  lot_no = lot_no,
  tenant_name = tenant_name,
  tenant_email = tenant_email,
  deliveryman_name = deliveryman_name,
  deliveryman_hp = deliveryman_hp,
  sender_name = sender_name,
  sender_hp = sender_hp,
  other_tenant: other_tenant,
  package_id = package_id,
  package_type = package_type,
  package_descs = package_descs,
  package_qty = package_qty,
  package_picture = package_picture,
  status = 'P',
  received_by = received_by,
  received_date = received_date,
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: colors.primaryLight }]}>
        <Icon name={icon} size={24} solid color={BaseColor.whiteColor} />
      </View>
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text light>Package ID</Text>
        <Text footnote semibold style={{ marginTop: 5 }}>
          {package_id}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text light style={styles.text}>
          Member Name
        </Text>
        <Text footnote semibold style={[styles.text, { marginTop: 5 }]}>
          {tenant_name}
        </Text>
        <Text footnote semibold style={[styles.text, { marginTop: 5 }]}>
          {other_tenant}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListTransaction.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  package_id: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListTransaction;
