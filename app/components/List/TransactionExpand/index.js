/** @format */

import Text from '@components/Text';
import ListTransaction from '@components/List/Transaction';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import styles from './styles';
import { useTheme } from '@config';

const TransactionExpand = ({
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
  gate_name = '',
  tower = '',
  tower_descs = '',
  lot_no = '',
  tenant_name = '',
  tenant_email = '',
  courier_cd = '',
  other_courier = '',
  deliveryman_name = '',
  deliveryman_hp = '',
  sender_name = '',
  sender_hp = '',
  package_id = '',
  package_type = '',
  other_type = '',
  package_descs = '',
  package_qty = '',
  package_picture = '',
  status = 'P',
  received_by = '',
  other_tenant = '',
  received_date = '',
  ListTransactionProps = {
    icon: 'exchange-alt',
    entity_cd: entity_cd,
    project_no: project_no,
    gate_cd: gate_cd,
    gate_name: gate_name,
    tower: tower,
    tower_descs: tower_descs,
    lot_no: lot_no,
    other_tenant: other_tenant,
    tenant_name: tenant_name,
    tenant_email: tenant_email,
    deliveryman_name: deliveryman_name,
    deliveryman_hp: deliveryman_hp,
    sender_name: sender_name,
    sender_hp: sender_hp,
    package_id: package_id,
    package_type: package_type,
    package_type: package_type,
    package_qty: package_qty,
    package_picture: package_picture,
    package_descs: package_descs,
    status: status,
    received_by: received_by,
    received_date: received_date,
  },
  isExpandInit = false,
}) => {
  const { colors } = useTheme();
  const [isExpand, setIsExpand] = useState(isExpandInit);

  return (
    <View style={style}>
      <ListTransaction
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
        {...ListTransactionProps}
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
                Tower
              </Text>
              <Text footnote semibold>
                {tower}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Unit
              </Text>
              <Text footnote semibold>
                {lot_no}
              </Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Gate
              </Text>
              <Text footnote semibold>
                {gate_name}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Delivery
              </Text>
              <Text footnote semibold>
                {deliveryman_name}
              </Text>
              <Text footnote semibold>
                {deliveryman_hp}
              </Text>
            </View>
          </View>
          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Courier
              </Text>
              <Text footnote semibold>
                {courier_cd}
              </Text>
              <Text footnote semibold>
                {other_courier}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Quantity
              </Text>
              <Text footnote semibold>
                {package_qty}
              </Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Type Package
              </Text>
              <Text footnote semibold>
                {package_descs}
              </Text>
              <Text footnote semibold>
                {other_type}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Quantity
              </Text>
              <Text footnote semibold>
                {package_qty}
              </Text>
            </View>
          </View>

          <View style={[styles.container, style]}>
            <View>
              <Text subhead light style={styles.title}>
                Received Date
              </Text>
              <Text footnote semibold>
                {received_date}
              </Text>
            </View>
            <View style={styles.viewRight}>
              <Text subhead light style={styles.title}>
                Sender
              </Text>
              <Text footnote semibold>
                {sender_name}
              </Text>
              <Text footnote semibold>
                {sender_hp}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

TransactionExpand.propTypes = {
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

export default TransactionExpand;
