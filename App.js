import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  Switch,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function (value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true
    ),
});

export default () => (
  <SafeAreaView style={{ marginTop: 90 }}>
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <React.Fragment>
          <StyledInput
            label="Email"
            formikProps={formikProps}
            formikKey="email"
            placeholder="johndoe@example.com"
            autoFocus
          />

          <StyledInput
            label="Password"
            formikProps={formikProps}
            formikKey="password"
            placeholder="password"
            secureTextEntry
          />

          <StyledInput
            label="Confirm Password"
            formikProps={formikProps}
            formikKey="confirmPassword"
            placeholder="confirm password"
            secureTextEntry
          />

          <StyledSwitch
            label="Agree to Terms"
            formikKey="agreeToTerms"
            formikProps={formikProps}
          />

          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
              <Button title="Submit" onPress={formikProps.handleSubmit} />
            )}
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
);


// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, SafeAreaView, TextInput, Button, ActivityIndicator } from 'react-native';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// const validationSchema = yup.object().shape({
//   //email:yup.string().required().label('Name').min(2,'asfafafaf').max(5,'tttttt')
//   email: yup
//     .string()
//     .label('Email')
//     .email()
//     .required(),
//   password: yup
//     .string()
//     .label('Password')
//     .required()
//     .min(2, 'Seems a bit short....')
//     .max(10, 'We prefer insucre system,try a shorter password')
// })
// export default () => (
//   <SafeAreaView style={{ marginTop: 90 }}>
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       onSubmit={(values, actions) => {
//         alert(JSON.stringify(values))
//         setTimeout(() => {
//           actions.setSubmitting(false);
//         }, 1000);
//       }}
//       validationSchema={validationSchema}
//     >
//       {formikProps => (
//         <React.Fragment>
//           <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
//             <Text style={{ marginBottom: 3 }}>Email</Text>
//             <TextInput
//               placeholder="loki@lordshire.com"
//               style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 3 }}
//               onChangeText={formikProps.handleChange('email')}
//               autoFocus
//               onBlur={formikProps.handleBlur('email')}
//             />
//             <Text style={{ color: 'red' }}>{formikProps.touched.email && formikProps.errors.email}</Text>
//           </View>
//           <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
//             <Text style={{ marginBottom: 3 }}>Password</Text>
//             <TextInput
//               placeholder="password"
//               style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 3 }}
//               onChangeText={formikProps.handleChange('password')}
//               secureTextEntry
//               onBlur={formikProps.handleBlur('password')}
//             />
//             <Text style={{ color: 'red' }}>{formikProps.touched.password && formikProps.errors.password}</Text>
//           </View>
//           {formikProps.isSubmitting ? (
//             <ActivityIndicator />
//           ) : (
//               <Button title="Submit" onPress={formikProps.handleSubmit} />
//             )}
//         </React.Fragment>
//       )}
//     </Formik>
//   </SafeAreaView>
// )
