import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card, Image } from 'react-native-elements';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { SliderBox } from 'react-native-image-slider-box';
/*import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';*/
import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
};
//Slider
class RenderSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30,
      height: 10
    };
  }
  render() {
    const images = [
      /*baseUrl + 'images/quannuoc.png',*/
      baseUrl + 'images/quannuoc2.jpg',
      baseUrl + 'images/quannuoc1.jpg'
    ];
    return (
      <Card onLayout={this.onLayout}>
        <SliderBox images={images} parentWidth={this.state.width - 30} />
      </Card>
    );
  }
  onLayout = (evt) => {
    this.setState({
      width: evt.nativeEvent.layout.width,
      height: evt.nativeEvent.layout.height,
    });
  };
}

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return (<Loading />);
    } else if (this.props.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
    const item = this.props.item;
    if (item != null) {
      return (
        <Card>
          <Image source={{ uri: baseUrl + item.image }} style={{ width: '100%', height: 280, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle></Card.FeaturedTitle>
            <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
          </Image>
          <Text style={{ margin: 10,color:'#4a4a4a' }}>{item.description}</Text>
        </Card>
      );
    }
    return (<View />);
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };*/
  }
  render() {
   
    const dish = this.props.dishes.dishes.filter((dish) => dish.featured === false)[7];
    const promo = this.props.promotions.promotions.filter((promo) => promo.featured === true)[0];
    const leader = this.props.leaders.leaders.filter((leader) => leader.featured === false)[2];
    return (
      <ScrollView>
               <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <RenderSlider item={dish} 
        isLoading={this.props.dishes.isLoading}
        
        />
          </Animatable.View>

          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <RenderItem item={dish} 
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        />
          </Animatable.View>


          <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
        <RenderItem item={promo} 
        isLoading={this.props.promotions.isLoading}
        errMess={this.props.promotions.errMess}
        />
          </Animatable.View>


          <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <RenderItem item={leader} 
         isLoading={this.props.leaders.isLoading}
         errMess={this.props.leaders.errMess}
        />
          </Animatable.View>

      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);
