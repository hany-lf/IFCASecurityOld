/** @format */

import Text from '@components/Text';
import Icon from '@components/Icon';
import { useTheme, BaseColor } from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

const ListVehicle = ({
  style = {},
  icon = 'exchange-alt',
  entity_cd = '',
  project_no = '',
  gate_cd = gate_cd,
  wiper = wiper,
  sticker = sticker,
  tower_descs = tower_descs,
  rim = rim,
  name = name,
  tenant_email = tenant_email,
  body = body,
  deliveryman_hp = deliveryman_hp,
  plate_no = plate_no,
  slot = slot,
  other_tenant: other_tenant,
  check_id = check_id,
  package_type = package_type,
  windshield = windshield,
  rearview_mirror = rearview_mirror,
  package_picture = package_picture,
  status = 'P',
  received_by = received_by,
  spare_tire = spare_tire,
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: colors.primaryLight }]}>
        <Icon name='book' size={24} solid color={BaseColor.whiteColor} />
      </View>
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text light>Check ID</Text>
        <Text footnote semibold style={{ marginTop: 5 }}>
          {check_id}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text light style={styles.text}>
          Member Name
        </Text>
        <Text footnote semibold style={[styles.text, { marginTop: 5 }]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListVehicle.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  check_id: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListVehicle;
