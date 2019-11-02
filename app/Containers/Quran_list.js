import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialIcons';

class QuranList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuran: [],
      refreshing: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: true,
      title: 'Al-Quran Mobile',
      headerStyle: {
        backgroundColor: '#EA3C64',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ marginLeft: 20 }}>
          <Icon name="book" size={30} color="#fff" />
        </View>
      ),
    };
  };

  componentDidMount() {
    this.getDataQuran();
  }

  getDataQuran = () => {
    axios
      .get('https://quran.kemenag.go.id/index.php/api/v1/surat')
      .then(res => {
        const listQuran = res.data.data;
        this.setState({
          listQuran,
        });
      })
      .catch(error => {
        throw error;
      });
  };

  goToDetailpage = dataSurah => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('QuranDetail', {
      dataSurah,
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true }, () => this.getDataQuran());
    setTimeout(() => this.setState({ refreshing: false }), 1000);
  };

  renderCardContent = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.goToDetailpage(item)} activeOpacity={0.6}>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={Styles.CardStyle}>
          <View style={Styles.cardContainer}>
            <View style={Styles.numberCircleContainer}>
              <View style={Styles.NumberCircle}>
                <Text style={Styles.textNumber}>{item.id}</Text>
              </View>
            </View>
            <View style={Styles.descContainer}>
              <Text style={Styles.descTitle}>
                {item.surat_name} ({item.surat_text})
              </Text>
              <Text style={Styles.descSubTitle}>
                Terjemahan: {item.surat_terjemahan}
              </Text>
              <Text style={Styles.descSubTitle}>
                Jumlah Ayat: {item.count_ayat}
              </Text>
            </View>
            <View style={Styles.goToDetailContainer}>
              <Icon
                name="keyboard-arrow-right"
                size={30}
                color="grey"
                style={Styles.expandIconStyle}
              />
            </View>
          </View>
        </CardView>
      </TouchableOpacity>
    );
  };

  render() {
    const { listQuran, refreshing } = this.state;
    return (
      <View>
        <StatusBar backgroundColor="#B02B4B" barStyle="light-content" />
        <FlatList
          data={listQuran}
          keyExtractor={(list, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderCardContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  CardStyle: {
    height: 100,
    margin: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  numberCircleContainer: {
    flex: 1.25,
  },
  descContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  goToDetailContainer: {
    flex: 1,
  },
  NumberCircle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#EA3C64',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 10,
  },
  textNumber: {
    color: '#fff',
    fontSize: 18,
  },
  descTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  descSubTitle: {
    fontSize: 14,
    paddingTop: 3,
  },
  expandIconStyle: {
    paddingTop: 35,
  },
});

export default QuranList;