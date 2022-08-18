/** @format */

import Text from '@components/Text';
import ListVehicle from '@components/List/Transaction/ListVehicle';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import styles from './styles';
import { useTheme } from '@config';

const VehicleExpand = ({
  style = {},
  tradingPairValue = '',
  priceTitle = '',
  price = '',
  feeTitle = '',
  feeValue = '',
  costTitle = '',
  costValue = '',
  changeTitle = '',
  changeValue = '',
  currentTitle = '',
  currentValue = '',
  entity_cd = '',
  project_no = '',
  gate_cd = '',
  wiper = '',
  sticker = '',
  tower_descs = '',
  rim = '',
  name = '',
  tenant_email = '',
  lights = '',
  other_courier = '',
  body = '',
  deliveryman_hp = '',
  plate_no = '',
  slot = '',
  check_id = '',
  package_type = '',
  other_type = '',
  windshield = '',
  rearview_mirror = '',
  package_picture = '',
  door = '',
  status = 'P',
  received_by = '',
  other_tenant = '',
  spare_tire = '',
  ListVehicleProps = {
    icon: 'exchange-alt',
    entity_cd: entity_cd,
    project_no: project_no,
    gate_cd: gate_cd,
    wiper: wiper,
    sticker: sticker,
    tower_descs: tower_descs,
    rim: rim,
    other_tenant: other_tenant,
    name: name,
    tenant_email: tenant_email,
    body: body,
    deliveryman_hp: deliveryman_hp,
    plate_no: plate_no,
    slot: slot,
    check_id: check_id,
    package_type: package_type,
    package_type: package_type,
    rearview_mirror: rearview_mirror,
    package_picture: package_picture,
    windshield: windshield,
    status: status,
    received_by: received_by,
    spare_tire: spare_tire,
  },
  isExpandInit = false,
}) => {
  const { colors } = useTheme();
  const [isExpand, setIsExpand] = useState(isExpandInit);

  return (
    <View style={style}>
      <ListVehicle
        style={StyleSheet.flatten([
          {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.background,
          },
          !isExpand && {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.border,
          },
        ])}
        {...ListVehicleProps}
        onPress={() => setIsExpand(!isExpand)}
      />
      {isExpand && (
        <View
          style={StyleSheet.flatten([
            { paddingBottom: 20 },
            isExpand && {
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ])}>
          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Stiker
              </Text>
              <Text footnote semibold>
                {sticker}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                No. Polisi / Slot
              </Text>
              <Text footnote semibold>
                {plate_no}
              </Text>
              <Text footnote semibold>
                {slot}
              </Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Wiper
              </Text>
              <Text footnote semibold>
                {wiper}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Body
              </Text>
              <Text footnote semibold>
                {body}
              </Text>
            </View>
          </View>
          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Lampu
              </Text>
              <Text footnote semibold>
                {lights}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Spion
              </Text>
              <Text footnote semibold>
                {rearview_mirror}
              </Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Kaca
              </Text>
              <Text footnote semibold>
                {windshield}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Pintu
              </Text>
              <Text footnote semibold>
                {door}
              </Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Ban Serep
              </Text>
              <Text footnote semibold>
                {spare_tire}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Velg
              </Text>
              <Text footnote semibold>
                {rim}
              </Text>
            </View>
            
          </View>
        </View>
      )}
    </View>
  );
};

VehicleExpand.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tradingPairTitle: PropTypes.string,
  tradingPairValue: PropTypes.string,
  priceTitle: PropTypes.string,
  price: PropTypes.string,
  feeTitle: PropTypes.string,
  feeValue: PropTypes.string,
  costTitle: PropTypes.string,
  costValue: PropTypes.string,
  changeTitle: PropTypes.string,
  changeValue: PropTypes.string,
  currentTitle: PropTypes.string,
  currentValue: PropTypes.string,
};

export default VehicleExpand;
