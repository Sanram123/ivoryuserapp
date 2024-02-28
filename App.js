import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Walkthrough_1 from './screens/Walkthrough_1';
import Walkthrough_2 from './screens/Walkthrough_2';
import Walkthrough_3 from './screens/Walkthrough_3';
import SignupMobile from './screens/Signup_MobileNum';
import SignupEnterOTP from './screens/Signup_EnterOTP';
import TermsNConditions from './screens/TermsConditions';
import ProfileComplete from './screens/CompleteProfile';
import ProfileCompleteGender from './screens/CompleteprofileGender';
import ProfileCompleteAddess from './screens/AddressCapture';
import Dashboard from './screens/Dashboard';
import Search from './screens/TestSearch';
// import CommonSearch from './Components/CommonSearch';
import PackageOverview from './screens/PackageOverview';
import Cart from './screens/Cart';
import SplashScreen from './screens/SplashScreen';
import SetAccessPin from './screens/SetAccessPin';
import Login from './screens/Login';
import ChooseAddress from './screens/ChooseAddress';
import LoginQuickPinScreen from './screens/LoginQuickPinScreen';
import SlotSelectScreen from './screens/SlotSelectScreen';
import AddEditAddress from './screens/AddEditAddress';
import FamilyList from './screens/FamilyList';
import FamilyAdd from './screens/FamilyAdd';
import CartAddRemove from './Components/CartAddRemove';
import FamilyGender from './screens/FamilyGender';
import FamilyOtp from './screens/FamilyOtp';
import Community from './screens/Community';
import CommunityProfile from './screens/CommunityProfile';
import CommunityStepBoard from './screens/CommunityStepBoard';
import LeaderboardDetails from './screens/LeaderboardDetails';
import CommunityCreateGroup from './screens/CommunityCreateGroup';
import CommunityInviteMemList from './screens/CommunityInviteMemList';
import FitbitIntegration from './screens/FitbitIntegration';
import CommunityGroupStatusList from './screens/CommunityGroupStatusList';
import GoogleFitIntegration from './screens/GoogleFitIntegration';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splashscreen" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="splashscreen" component={SplashScreen} />
        <Stack.Screen name="Walkthrough_1" component={Walkthrough_1} />
        <Stack.Screen name="Walkthrough_2" component={Walkthrough_2} />
        <Stack.Screen name="Walkthrough_3" component={Walkthrough_3} />
        <Stack.Screen name="SignUpMobile" component={SignupMobile} />
        <Stack.Screen name="SignupEnterOTP" component={SignupEnterOTP} />
        <Stack.Screen name="TermsNConditions" component={TermsNConditions} />
        <Stack.Screen name="ProfileComplete" component={ProfileComplete} />
        <Stack.Screen name="ProfileCompleteGender" component={ProfileCompleteGender} />
        <Stack.Screen name="ProfileCompleteAddess" component={ProfileCompleteAddess} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerLeft: () => null}}/>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="PackageOverview" component={PackageOverview} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="SetAccessPin" component={SetAccessPin} />
        <Stack.Screen name="Login" component={Login} options={{headerLeft: () => null}}/>
        <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
        <Stack.Screen name="LoginQuickPinScreen" component={LoginQuickPinScreen} />
        <Stack.Screen name="SlotSelectScreen" component={SlotSelectScreen} />
        <Stack.Screen name="AddEditAddress" component={AddEditAddress} />
        <Stack.Screen name="FamilyList" component={FamilyList} />
        <Stack.Screen name="FamilyAdd" component={FamilyAdd} />
        <Stack.Screen name="CartAddRemove" component={CartAddRemove} />
        <Stack.Screen name="FamilyGender" component={FamilyGender} />
        <Stack.Screen name="FamilyOtp" component={FamilyOtp} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="CommunityProfile" component={CommunityProfile} />
        <Stack.Screen name="CommunityStepBoard" component={CommunityStepBoard} />
        <Stack.Screen name="LeaderboardDetails" component={LeaderboardDetails} />
        <Stack.Screen name="CommunityCreateGroup" component={CommunityCreateGroup} />
        <Stack.Screen name="CommunityInviteMemList" component={CommunityInviteMemList} />
        <Stack.Screen name="FitbitIntegration" component={FitbitIntegration} />
        <Stack.Screen name="CommunityGroupStatusList" component={CommunityGroupStatusList}/>
        <Stack.Screen name="GoogleFitIntegration" component={GoogleFitIntegration}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;