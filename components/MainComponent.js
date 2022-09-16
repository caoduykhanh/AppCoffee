import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Linking,StyleSheet } from 'react-native';
import { Icon, Image,Card } from 'react-native-elements';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Dishdetail from './DishdetailComponent';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//cart
import Carts from './CartComponent';
function CartsNavigatorScreen() {
  const CartsNavigator = createStackNavigator();
  return (
    <CartsNavigator.Navigator initialRouteName='Carts'
      screenOptions={{
        headerStyle: { backgroundColor: '#e30022' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
        

      }}>
      <CartsNavigator.Screen name='Carts' component={Carts}
        options={({ navigation }) => ({
         
          headerTitle: 'My Carts',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <CartsNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }} />
    </CartsNavigator.Navigator>
  );
}

//Register
import Register from './RegisterComponent';
function TabNavigatorScreen() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <TabNavigator.Navigator initialRouteName='Login'>
      <TabNavigator.Screen name='Login' component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={color} />)
        }} />
      <TabNavigator.Screen name='Register' component={Register}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name='user-plus' type='font-awesome' size={size} color={color} />)
        }} />
    </TabNavigator.Navigator>
  );
}


//Login
import Login from './LoginComponent';
function LoginNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator initialRouteName='LoginRegister'
      screenOptions={{
        headerStyle: { backgroundColor: '#bf3eff' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <LoginNavigator.Screen name='LoginRegister' component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: 'Login',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </LoginNavigator.Navigator>
  );
}


//Favorites
import Favorites from './FavoriteComponent';
function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: { backgroundColor: '#e936a7' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <FavoritesNavigator.Screen name='Favorites' component={Favorites}
        options={({ navigation }) => ({
          headerTitle: 'My Favorites',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <FavoritesNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }} />
    </FavoritesNavigator.Navigator>
  );
}


//Reservation
import Reservation from './ReservationComponent';
function ReservationNavigatorScreen() {
  const ReservationNavigator = createStackNavigator();
  return (
    <ReservationNavigator.Navigator initialRouteName='Reservation'
      screenOptions={{
        headerStyle: { backgroundColor: '#ff7f50' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ReservationNavigator.Screen name='Reservation' component={Reservation}
        options={({ navigation }) => ({
          headerTitle: 'Reserve Table',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ReservationNavigator.Navigator>
  );
}
// redux
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes, fetchComments,fetchPromos } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

//Home
import Home from './HomeComponent';
function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#318ce7' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home} 
      options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}

//about
import About from './AboutComponent';
function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();

  return (
    <AboutNavigator.Navigator initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#ffd700' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AboutNavigator.Screen name='About' component={About}  
      options={({ navigation }) => ({
          headerTitle: 'About',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AboutNavigator.Navigator>
  );
}

//contact
import Contact from './ContactComponent';
function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();

  return (
    <ContactNavigator.Navigator initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#6897bb' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact}  
      options={({ navigation }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}


//Menu
import Menu from './MenuComponent';


function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#66cd00' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
        
      <MenuNavigator.Screen name='Menu' component={Menu}
      options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
        
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} 
      options={{ 
        headerTitle: 'Dish Detail' }} />

       

    </MenuNavigator.Navigator>

       
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
        <Image source={{ uri: baseUrl + 'images/logo.png' }} style={{ margin: 10, width: 80, height: 60 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Coffee Cup</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label='Help'
        icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />
    </DrawerContentScrollView>
  );
}


function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (

    <MainNavigator.Navigator initialRouteName='HomeScreen'drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen} options={{ 
        title: 'Home', headerShown: false, 
        drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#318ce7' : '#318ce7'} />)
        }} />


      <MainNavigator.Screen name='MenuScreen' component={MenuNavigatorScreen} options={{ 
        title: 'Menu', headerShown: false ,
        drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#66cd00' : '#66cd00'} />)
        }} />

      <MainNavigator.Screen name='CartsScreen' component={CartsNavigatorScreen} options=
      {{ title: 'Carts' ,headerShown: false ,
      drawerIcon: ({ focused, size }) => (<Icon name='shopping-cart' size={size} color={focused ? '#e30022' : '#e30022'} />)
    
    }}/>

      <MainNavigator.Screen name='About' component={AboutNavigatorScreen}
        options={{
          title: 'About Us',headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#ffd700' : '#ffd700'} />)
        }} />
      

      <MainNavigator.Screen name='Contact' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us',headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#6897bb' : '#6897bb'} />)

        }} />


        <MainNavigator.Screen name='ReservationScreen' component={ReservationNavigatorScreen}
          options={{
            title: 'Reserve Table', headerShown: false,
            drawerIcon: ({ focused, size }) => (<Icon name='cutlery' type='font-awesome' size={size} color={focused ? '#ff7f50' : '#ff7f50'} />)
        }} />


        <MainNavigator.Screen name='FavoritesScreen' component={FavoritesNavigatorScreen}
          options={{
            title: 'My Favorites', headerShown: false,
            drawerIcon: ({ focused, size }) => (<Icon name='heart' type='font-awesome' size={size} color={focused ? '#ffb6c1' : '#ffb6c1'} />)
        }} />


        <MainNavigator.Screen name='LoginScreen' component={LoginNavigatorScreen}
        options={{
          title: 'Login', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={focused ? '#bf3eff' : '#bf3eff'} />)
        }} />
         
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
    
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    
  }
}
export default connect(null, mapDispatchToProps)(Main);