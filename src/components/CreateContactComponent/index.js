import React, {useState} from 'react';
import Container from '../common/Container';
import {Text, TextInput, Image, View} from 'react-native';
import styles from './styles';
import Input from '../common/Input';
import CustomButton from '../common/CustomButton';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_IMAGE_URI} from '../../constants/general';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from '../common/ImagePicker';


//We store the contact information here
const CreateContactComponent = ({
  onChangeText,
  form,
  onSubmit,
  setForm,
  sheetRef,
  openSheet,
  closeSheet,
  onFileSelected,
  localFile,
  loading,
  error,
}) => {
  const [inputText, setText] = useState('');
  //console.log('localFile', localFile);
  console.log('error: >>', error)
  return (
    <>
      <View style={styles.container}>
        <Image
          width={150}
          height={150}
          source={{uri: localFile?.path || DEFAULT_IMAGE_URI}}
          style={styles.imageView}
        />

        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseText}>Choose profile photo</Text>
        </TouchableOpacity>

        <Container>
          <Input 
            onChangeText={(value) =>{
              onChangeText({name: 'firstName', value: value});
            }}
            label="First Name" 
            placeholder="Enter First Name" 
            error={error?.firstName?.[0]}/>
          <Input 
            onChangeText={(value) =>{
              onChangeText({name: 'lastName', value: value});
            }}
            label="Last Name" 
            placeholder="Enter Last Name" />
          <Input 
            onChangeText={(value) =>{
              onChangeText({name: 'relationship', value: value});
            }}
            label="Relationship" 
            placeholder="Enter Relationship" />
          <Input 
            onChangeText={(value) =>{
              onChangeText({name: 'birthDate', value: value});
            }}
            label="Birthday" 
            placeholder="Enter Birthday" />
          <Input
            icon={
              <CountryPicker
                withFilter
                withFlag
                countryCode={form.countryCode || undefined}
                withCountryNameButton={false}
                withCallingCode
                withCallingCodeButton
                withEmoji
                onSelect={(v) => {
                  const phoneCode=v.callingCode[0];
                  const cCode=v.cca2;
                  setForm({...form, phoneCode, countryCode:cCode});
                }}
              />
            }
            style={{paddingLeft: 10}}
            iconPosition="left"
            label="Phone Number"
            placeholder="Enter Phone Number"
            onChangeText={(value) =>{
              onChangeText({name: 'phoneNumber', value: value});
            }}
          />

          <Input
            onChangeText={(value) =>{
              onChangeText({name: 'address', value: value});
            }}
            label="Address" placeholder="Enter Address" />

          <View style={{padding: 10}}>
            <TextInput
              label="Add Note Description"
              style={{height: 100}}
              placeholder="Type here to add memory!"
              //onChangeText={inputText => setText(inputText)}
              onChangeText={(value) =>{
                onChangeText({name: 'memory', value: value});
              }}
              defaultValue={inputText}
              mode="flat"
              multiline={true}
              scrollEnabled={true}
              returnKeyLabel="done"
              blurOnSubmit={true}
            />
          </View>

          <CustomButton onPress={onSubmit} primary title="Submit" />
        </Container>

        <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
      </View>
    </>
  );
}; //the onSubmit is from the screens/CreateContact/index.js

export default CreateContactComponent;