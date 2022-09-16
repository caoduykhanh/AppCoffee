import React, { Component } from 'react';
import {  Text, FlatList, YellowBox } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
/*import { LEADERS } from '../shared/leaders';*/
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-virtualized-view';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

class RenderHistory extends Component {
  render() {
    return (
      <Card>
        <Card.Title> 
        <Text style={{color:'#ff0000'}}>Lịch Sử Coffee Cup</Text>       
        </Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10}}>Từ tình yêu với Việt Nam và niềm đam mê cà phê, năm 1999, thương hiệu Coffee Cup® ra đời với khát vọng nâng tầm di sản cà phê lâu đời của Việt Nam và lan rộng tinh thần tự hào, kết nối hài hoà giữa truyền thống với hiện đại.Bắt đầu với sản phẩm cà phê đóng gói tại Hà Nội vào năm 2000, chúng tôi đã nhanh chóng phát triển và mở rộng thành thương hiệu quán cà phê nổi tiếng và không ngừng mở rộng hoạt động trong và ngoài nước từ năm 2002.</Text>
        <Text style={{ margin: 10 }}>Qua một chặng đường dài, chúng tôi đã không ngừng mang đến những sản phẩm cà phê thơm ngon, sánh đượm trong không gian thoải mái và lịch sự. Những ly cà phê của chúng tôi không chỉ đơn thuần là thức uống quen thuộc mà còn mang trên mình một sứ mệnh văn hóa phản ánh một phần nếp sống hiện đại của người Việt Nam.</Text>
      </Card>
    );
  }
}

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>
          <Text style={{color:'#ff0000'}}>Ban Lãnh Đạo Công Ty</Text>
          </Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title><Text style={{color:'#ff0000'}}>Ban Lãnh Đạo Công Ty</Text></Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
    return (
      <Card>
        <Card.Title><Text style={{color:'#ff0000'}}>Ban Lãnh Đạo Công Ty</Text></Card.Title>
        <Card.Divider />
        <FlatList data={this.props.leaders}
          renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      </Card>
    );
  }
}

  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
        <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold',color:'#0000ff' }}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*leaders: LEADERS*/
    };
   
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderHistory />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <RenderLeadership 
        leaders={this.props.leaders.leaders} 
        isLoading={this.props.leaders.isLoading}
        errMess={this.props.leaders.errMess}
        />
          </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);
