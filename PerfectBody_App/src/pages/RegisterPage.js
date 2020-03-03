import React from 'react';
import AuthForm from '../components/AuthForm/authForm';
import {connect} from 'react-redux';
import Register from '../components/AuthForm/Register';
import {register} from '../operations/authorizationOperations';
import CulcScreen from '../components/CulcScreen';

const RegisterPage = (props) => {
   return ( 
   <>
    <CulcScreen props={props}/>
    <Register formName='Register' userData={props.register}/>
    </>
   )

   }

export default connect(null, {register})(RegisterPage);