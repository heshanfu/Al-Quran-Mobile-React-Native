import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Modal from 'react-native-modal';

import { Styles } from './ModalOptions.style';
import { deviceHeight } from '../../Utils/Helper';
import { Colors } from '../../Themes/Colors';

const ModalOptions = props => {
  const { isVisible, onBackdropPress, onPressCancel, type, children } = props;
  return (
    <View style={Styles.container}>
      <Modal
        isVisible={isVisible}
        useNativeDriver
        animationIn="fadeInRight"
        animationOut="fadeOutRight"
        onBackdropPress={onBackdropPress}
        backdropOpacity={0.3}
        deviceHeight={deviceHeight}>
        <View style={Styles.modalContainer}>
          <StatusBar
            backgroundColor={Colors.statusbarModal}
            barStyle="light-content"
            animated
          />
          <View style={Styles.modalTitleContainer}>
            <Text style={Styles.modalTitleText}>{type}</Text>
          </View>
          <View style={Styles.modalOptionsContainer}>{children}</View>
          <View style={Styles.modalButtonContainer}>
            <TouchableRipple
              onPress={onPressCancel}
              rippleColor={Colors.rippleColor}
              centered>
              <Text style={Styles.buttonText}>Batal</Text>
            </TouchableRipple>
          </View>
          <StatusBar />
        </View>
      </Modal>
    </View>
  );
};

export { ModalOptions };
