import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card,Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card>
        <Card.Title>Contact Information</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>113, Nguyễn Văn Quá</Text>
        <Text style={{ margin: 10 }}>Phường Đông Hưng Thuận, Quận 12</Text>
        <Text style={{ margin: 10 }}>Việt Nam</Text>
        <Text style={{ margin: 10 }}>Tel: 0909617248</Text>
        <Text style={{ margin: 10 }}>Fax: 0911702871</Text>
        <Text style={{ margin: 10 }}>Email:Khanh.cd0937@sinhvien.hoasen.edu.vn</Text>
        <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#7cc' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />
      </Card>
      </Animatable.View>
    );
  }
  composeMail() {
    MailComposer.composeAsync({
      recipients: ['<ngan.ntk3597@sinhvien.hoasen.edu.vn>'],
      subject: 'From Khánh',
      body: 'Coffee Cup hello my friends !!!'
    });
  }
}

export default Contact;