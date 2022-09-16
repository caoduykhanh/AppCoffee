import React, { Component } from 'react';
import { FlatList,Text} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  }
};
class Menu extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
          dishes: DISHES
        };*/
      }
  render() {
    if (this.props.dishes.isLoading) {
      return (<Loading />);
    } else if (this.props.dishes.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {

    return (
       
      <FlatList data={this.props.dishes.dishes}
        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        keyExtractor={item => item.id.toString()} />
        
          );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
      <ListItem key={index} onPress={() => navigate('Dishdetail', { dishId: item.id })}>
          <Avatar source={{uri: baseUrl + item.image}}style={{ margin: 10, width: 80, height: 60 }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>Giá {item.price}VNĐ</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      </Animatable.View>

    );
  };
  onDishSelect(item) {
    //alert(item.id);
    this.setState({ selectedDish: item });
  }
}
export default connect(mapStateToProps)(Menu);
