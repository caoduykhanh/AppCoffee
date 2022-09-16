import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, YellowBox, Modal, Button, PanResponder, Alert,StyleSheet } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { SliderBox } from 'react-native-image-slider-box';

//Slider
class RenderSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30,
      height: 0
    };
  }
  render() {
    const images = [
      baseUrl + this.props.dish.image,
      baseUrl + 'images/quannuoc1.jpg',
      baseUrl + 'images/logo.png'
    ];
    return (
      <Card onLayout={this.onLayout}>
        <SliderBox images={images}style={{ width: '100%', height: 250,}} parentWidth={this.state.width - 30} />
      
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

// redux
import { connect } from 'react-redux';
import { postFavorite, postComment,postCart } from '../redux/ActionCreators';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    carts: state.carts
  }
};
const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postCart: (dishId) => dispatch(postCart(dishId)),
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))

});

class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return 1; // right to left
      else if (dx > 200) return 2; // left to right
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Thêm vào yêu thích',
            'Bạn có muốn thêm món  ' + dish.name + ' vào danh sách món yêu thích??',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Đã thêm món này vào yêu thích') : this.props.onPressFavorite() } },
            ],
            { cancelable: false }
          );
        }
        else if (recognizeDrag(gestureState) === 2) {
          this.props.onPressComment();
        }
        return true;
      }
    });
    // render
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card {...panResponder.panHandlers}>
          {/*<Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
      </Image>*/}
       <Card.Title>{dish.name}</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#ffbcd9'
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='#2acaea'
              onPress={() => this.props.onPressComment()} />
              <Icon raised reverse 
                name={this.props.cart ? "shopping-cart" : "shopping-cart"} type="font-awesome" color="#eead0e" 
                onPress={() => this.props.cart ? alert("Sản phẩm này đã nằm trong giỏ hàng của bạn") : this.props.onPressAddToCart()}/>
          </View>
          <Text style={styles.itemPrice}>{dish.price}VNĐ</Text>
        </Card>
      );
    }
    return (<View />);
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      </Card>
    );
  }

  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: '',
      comment: ''
    };
   
  }
    markFavorite(dishId) {
      this.props.postFavorite(dishId);
    }
    addToCart(dishId) {
      this.props.postCart(dishId);
    }
    toggleModal = () => {
      this.setState({ showModal: !this.state.showModal });
    };
  
    handleReservation() {
      console.log(JSON.stringify(this.state));
      this.toggleModal();
    }
  
    ratingCompleted = rating => {
      this.setState({ rating });
    };
  
    handleAuthorInput = author => {
      this.setState({ author });
    };
  
    handleCommentInput = comment => {
      this.setState({ comment });
    };
  
    resetForm() {
      this.setState({
        guests: 1,
        smoking: false,
        date: "",
        showModal: false
      });
    }
  
    handleComment() {
      const { rating, author, comment } = this.state;
      const dishId = parseInt(this.props.route.params.dishId);
  
      this.toggleModal();
      this.props.postComment(dishId, rating, author, comment);
    };
  
  
  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const cart = this.props.carts.some((el) => el === dishId)
    
    
    return (
      <ScrollView>

    <Animatable.View animation="flipInY" duration={2000} delay={1000}>
          <RenderSlider dish={this.props.dishes.dishes[dishId]} />
        </Animatable.View>

        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderDish dish={this.props.dishes.dishes[dishId]}
            favorite={this.props.favorites.some(el => el === dishId)}
            onPressFavorite={() => this.markFavorite(dishId)}
            onPressComment= {this.toggleModal}
          
            cart={this.props.carts.some(el => el === dishId)} 
            onPressAddToCart={()=>this.addToCart(dishId)} 

            />
              </Animatable.View>


        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        </Animatable.View>
        <Modal visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <View style={{ justifyContent: 'center', margin: 20 }}>
            <Rating startingValue={this.state.rating} showRating={true}
              onFinishRating={(value) => this.setState({ rating: value })} />
            <View style={{ height: 20 }} />
            <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
              onChangeText={(text) => this.setState({ author: text })} />
            <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
              onChangeText={(text) => this.setState({ comment: text })} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button title='SUBMIT' color='#7cc'
                onPress={() => { this.submitComment(dishId); this.setState({ showModal: false }); }} />
              <View style={{ width: 10 }} />
              <Button title='CANCEL' color='#7cc'
                onPress={() => { this.setState({ showModal: false }); }} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }



  submitComment(dishId) {
    //alert(dishId + ':' + this.state.rating + ':' + this.state.author + ':' + this.state.comment);
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
  }
}
const styles = StyleSheet.create({
  icons: {
    // alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    flexDirection: "row"
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "center",
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  itemPrice: {
    fontSize: 25,
    fontWeight: "bold",
    fontWeight: '500',
    color: '#2a2a2a',
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);