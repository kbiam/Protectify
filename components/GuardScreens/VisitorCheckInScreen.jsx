import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';


export default function VisitorCheckInScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState();

  return (

    <View style={styles.container}>
        <View style={{flex:1,backgroundColor:"#F6F7FB",borderRadius:30}}>
            <View style={{padding:30,gap:20,flex:1}}>
                <Formik
            initialValues={{ VisitorName: '', Phone:'' ,NoOfVisitor:1, VisitorVehicleNo:'',FlatNumber:''}}
            onSubmit={values => console.log(values)}
            validate={values => {
                const errors = {};
                if (!values.VisitorName ) {
                errors.VisitorName = 'Required';
                }
              // Phone field validation
                if (!values.Phone) {
                    errors.Phone = 'Required';
                } else if (!/^\d+$/.test(values.Phone)) {
                    errors.Phone = 'Only numbers are allowed';
                } else if (values.Phone.length !== 10) {
                    errors.Phone = 'Phone number must be 10 digits';
                }
                return errors;
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values,errors }) => (
                <>
            <View style={styles.inputBoxCon}>
                <View style={styles.inputUpperBox}>
                    <Text style={styles.inputLabel}>Visitor's Name</Text>
                <Text style={styles.errors}>{errors.VisitorName}</Text>

                </View>
                <TextInput
                onChangeText={handleChange('VisitorName')}
                onBlur={handleBlur('VisitorName')}
                value={values.VisitorName}
                style={styles.inputBox}
                placeholder='Name'
                />


                
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",gap:25}}>
                
                <View style={[styles.inputBoxCon,{flex:1}]}>
                    <View style={styles.inputUpperBox}>
                        <Text style={styles.inputLabel}>Phone</Text>
                    <Text style={styles.errors}>{errors.Phone}</Text>

                    </View>
                    <TextInput
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                    value={values.Phone}
                    style={styles.inputBox}
                    placeholder='Phone'
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    />


                    
                </View>
                <View style={styles.inputBoxCon}>
                    <View style={styles.inputUpperBox}>
                        <Text style={styles.inputLabel}>No. of Visitors</Text>
                    <Text style={styles.errors}>{errors.NoOfVisitor}</Text>

                    </View>
                    <TextInput
                    onChangeText={handleChange('NoOfVisitor')}
                    onBlur={handleBlur('NoOfVisitor')}
                    value={values.NoOfVisitor}
                    style={styles.inputBox}
                    placeholder='1'
                    keyboardType='number-pad'
                    />


                    
                </View>
            </View>
            <View style={[styles.inputBoxCon]}>
                    <View style={styles.inputUpperBox}>
                        <Text style={styles.inputLabel}>Visitor's Vehicle No.</Text>
                    <Text style={styles.errors}>{errors.VisitorVehicleNo}</Text>

                    </View>
                    <TextInput
                    onChangeText={handleChange('VisitorVehicleNo')}
                    onBlur={handleBlur('VisitorVehicleNo')}
                    value={values.VisitorVehicleNo}
                    style={styles.inputBox}
                    placeholder='GJ 16 XX XXXX'
                    keyboardType='number-pad'
                    textContentType='telephoneNumber'
                    />


                    
                </View>
                <View style={[styles.inputBoxCon]}>
                    <View style={styles.inputUpperBox}>
                        <Text style={styles.inputLabel}>Purpose of Visit</Text>
                    <Text style={styles.errors}>{errors.VisitorVehicleNo}</Text>

                    </View>
                    <View style={[styles.inputBox,{justifyContent:"center"}]}>
                    <Picker
                        mode='dropdown'
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Delivery" value="Delivery" />
                        <Picker.Item label="Guest/Relative Visit" value="Guest/Relative Visit" />
                        <Picker.Item label='Maintenance/Repair' value="Maintenance/Repair"/>
                        <Picker.Item label='Event' value="Event"/>
                        <Picker.Item label='Pick-up/Drop-off' value="Pick-up/Drop-off"/>
                        <Picker.Item label='Other' value="Other"/>
                    </Picker>
                </View>

                </View>
                <View style={styles.inputBoxCon}>
                    <View style={styles.inputUpperBox}>
                    <Text style={styles.inputLabel}>Flat No.</Text>
                    <Text style={styles.errors}>{errors.FlatNumber}</Text>
                    </View>
                    <TextInput
                    onChangeText={handleChange('FlatNumber')}
                    onBlur={handleBlur('FlatNumber')}
                    value={values.FlatNumber}
                    style={styles.inputBox}
                    placeholder='A 101'
                    keyboardType='default'
                    />
                </View>
            
            <Pressable onPress={handleSubmit} style={styles.loginButton}>
                <Text style={{color:"white",textAlign:"center",fontWeight:"500",fontSize:17}}>Submit</Text>
            </Pressable>

            </>
            )}
                </Formik>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        // borderRadius:30,
        // padding:30,

    },
    inputBoxCon:{
        gap:7,
    },
    inputLabel:{
        fontSize:16,
        color:"black",
        fontWeight:"500"
    },
    inputBox:{
        borderRadius:12,
        borderWidth:1,
        borderColor:"gray",
        paddingHorizontal:15,
        height:50,
        
    },
    inputUpperBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    errors:{
        color:"red",
        fontSize:13
    },
    loginButton:{
        backgroundColor:"#1E232C",
        width:"90%",
        borderRadius:10,
        padding:17,
        fontSize:15,
        fontWeight:"500",
        
      }
})