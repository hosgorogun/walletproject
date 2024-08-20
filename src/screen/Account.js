import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import HMSAccount, {
  HMSAccountAuthService,
  HMSAuthButton,
  HMSAuthRequestOptionConstants,
  HMSAuthScopeListConstants,
  HMSAuthParamConstants
} from "@hmscore/react-native-hms-account";


const Button = (props) => (
  <TouchableOpacity style={styles.customButton} onPress={props.func}>
    <Text style={styles.buttonText}>{props.text}</Text>
  </TouchableOpacity>
);

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      icon: "",
      log: "",
    };
  }

  logger = (method, response) => {
    this.setState({ log: method + JSON.stringify(response) + '\n' + this.state.log });
  };

  errorLogger = (method, response) => {
    this.setState({ log: method + response + '\n' + this.state.log });
  };

  signInWithIdToken = () => {
    let signInData = {
      accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM,
      authRequestOption: [HMSAuthRequestOptionConstants.ID_TOKEN, HMSAuthRequestOptionConstants.ACCESS_TOKEN],
      authScopeList: [HMSAuthScopeListConstants.EMAIL]
    };

    HMSAccountAuthService.signIn(signInData)
      .then((response) => { 
        this.logger("Sign In With IdToken -> ", response);
        this.props.navigation.navigate('Home'); 
      })
      .catch((err) => { 
        this.errorLogger("Sign In With IdToken -> ", err);
      });
  };

  signInWithAuthorizationCode = () => {
    let signInData = {
      accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM,
      authRequestOption: [HMSAuthRequestOptionConstants.AUTHORIZATION_CODE, HMSAuthRequestOptionConstants.ACCESS_TOKEN],
    };
    HMSAccountAuthService.signIn(signInData)
      .then((response) => { this.logger("Sign In With AuthorizationCode -> ", response) })
      .catch((err) => { this.errorLogger("Sign In With AuthorizationCode -> ", err) });
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HMS Account Plugin</Text>
        </View>

        <ScrollView>
          <Text style={styles.subTitle}>HMSAccountAuthService</Text>
          <Button func={this.signInWithIdToken} text="Sign In With IdToken" />
          <HMSAuthButton
            style={styles.huaweiButton}
            colorPolicy={HMSAccount.HUAWEI_ID_AUTH_BUTTON_COLOR_POLICY_RED}
            enabled={true}
            theme={HMSAccount.HUAWEI_ID_AUTH_BUTTON_THEME_FULL_TITLE}
            cornerRadius={HMSAccount.HUAWEI_ID_AUTH_BUTTON_CORNER_RADIUS_MEDIUM}
            onPress={this.signInWithIdToken}
          />

          {/* <Text style={styles.logText}>{this.state.log}</Text> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    marginBottom: 100,
  },
  logText: {
    margin: 20,
  },
  viewcontainer: {
    marginTop: 20,
    height: 38,
  },
  header: {
    backgroundColor: "red",
    height: 100,
    width: "100%",
    flexDirection: "row",
  },
  headerTitle: {
    flex: 1,
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  subTitle: {
    flex: 1,
    fontSize: 15,
    marginTop: 15,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    textAlign: "center",
  },
  customButton: {
    marginTop: 15,
    width: 200,
    height: 45,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    borderColor: "red",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
  huaweiButton: {
    marginTop: 20,
    width: 200,
    height: 45,
    alignSelf: "center",
  },
});

export default Account;
