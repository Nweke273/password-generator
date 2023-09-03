import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '~!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }

    if (lowerCase) {
      characterList += lowerCaseChars;
    }

    if (numbers) {
      characterList += digitChars;
    }

    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <ScrollView style={{backgroundColor: '#2b2d42'}}>
      <SafeAreaView>
        <View style={styles.appContainer}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 24,
                color: '#ffffff',
                marginBottom: 32,
                fontWeight: '800',
              }}>
              Password Generator
            </Text>
          </View>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(Number(values.passwordLength));
            }}>
            {({
              handleChange,
              handleSubmit,
              handleReset,
              isValid,
              errors,
              touched,
              values,
            }) => (
              <>
                <View style={styles.inputField}>
                  <View>
                    <Text style={styles.inputLabel}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={{color: 'red'}}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    placeholder="E.g 8"
                    style={styles.textFocus}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputField}>
                  <View>
                    <Text style={styles.inputLabel}>Include Lowercase</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    size={20}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    // text="Custom Checkbox"
                    iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 2}}
                    textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => setLowerCase(!lowerCase)}
                  />
                </View>
                <View style={styles.inputField}>
                  <View>
                    <Text style={styles.inputLabel}>
                      Include Uppercase Letters
                    </Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    size={20}
                    fillColor="grey"
                    unfillColor="#FFFFFF"
                    // text="Custom Checkbox"
                    iconStyle={{borderColor: 'blue'}}
                    innerIconStyle={{borderWidth: 2}}
                    // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => setUpperCase(!upperCase)}
                  />
                </View>
                <View style={styles.inputField}>
                  <View>
                    <Text style={styles.inputLabel}>Include Numbers</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    size={20}
                    fillColor="blue"
                    unfillColor="#FFFFFF"
                    // text="Custom Checkbox"
                    iconStyle={{borderColor: '#00bbf9'}}
                    innerIconStyle={{borderWidth: 2}}
                    // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => setNumbers(!numbers)}
                  />
                </View>
                <View style={styles.inputField}>
                  <View>
                    <Text style={styles.inputLabel}>Include Symbols</Text>
                  </View>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    size={20}
                    fillColor="brown"
                    unfillColor="#FFFFFF"
                    // text="Custom Checkbox"
                    iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 2}}
                    // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                    onPress={() => setSymbols(!symbols)}
                  />
                </View>

                <View style={styles.actionBtns}>
                  <TouchableOpacity
                    style={styles.generateBtn}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.whiteText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.whiteText}>Reset</Text>
                  </TouchableOpacity>
                </View>
                {!isPasswordGenerated ? null : (
                  <View style={styles.passwordArea}>
                    <Text style={styles.copyPassword}>Long Press To Copy</Text>
                    <View style={styles.generatedPassword}>
                      <Text
                        style={styles.generatedPasswordText}
                        selectable={true}>
                        {password}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  passwordArea: {
    backgroundColor: '#ffffff',
    height: 150,
    borderRadius: 6,
    position: 'relative',
    marginVertical: 35,
  },

  generatedPassword: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatedPasswordText: {
    fontSize: 20,
    fontWeight: '700',
  },
  copyPassword: {
    position: 'absolute',
    top: 40,
    left: 10,
    fontSize: 14,
    fontWeight: '500',
  },

  inputField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  appContainer: {
    paddingHorizontal: 18,
    paddingVertical: 24,
  },

  whiteText: {
    color: '#ffffff',
  },

  inputLabel: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    color: '#ffffff',
  },

  actionBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginTop: 20,
  },

  generateBtn: {
    backgroundColor: 'green',
    marginRight: 4,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resetBtn: {
    backgroundColor: 'grey',
    marginLeft: 4,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textFocus: {
    backgroundColor: '#ffffff',
    width: 50,
    height: 35,
    borderRadius: 4,
  },
});
