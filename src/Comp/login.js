import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';

import {app, base, googleProvider} from './fire'



const loginstyle = {
    width:"90%",
    maxWidth: "315px",
    margin: "20px auto",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px"
}

class login extends Component {

    constructor(props){
        super(props)
        this.authWithGoogle = this.authWithGoogle.bind(this)
        this.authWithEmailPassward = this.authWithEmailPassward.bind(this)
        this.state={
            redirect: true

        }
    }

    authWithGoogle(){
        console.log("google")
        app.auth().signInWithPopup(googleProvider).then((result, error) => {
            if(error){
                this.toaster.show({intent: Intent.DANGER, message:"unable to sign in with google"})
            }
            else{
                this.setState({ redirect: true })
            }
        })
    }

    authWithEmailPassward(event){
        event.preventDefault()
        console.table([{
            email: this.emailInput.value,
            password: this.passwordInput.value
        }])
    }

    render() {
        if(this.state.redirect){
        
            return (
            <div style = {loginstyle}>
                <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                    You
                </div>
                <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                    have 
                </div>
                <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                     successfully 
                </div>
                <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                    logged in! 
                </div>
                
            </div>
        )
        }
        return (
            <div style = {loginstyle}>
                <Toaster ref = { (element) => { this.toaster = element } }/>

                <button style = {{width:"100%", backgroundColor: "#6bc4ff", color:"white"}} class = "btn-secondary" onClick = { () => { this.authWithGoogle() }}>
                    Sign In With Google
                </button>

                <hr/>
                <form onSubmit = {(event) => { this.authWithEmailPassward(event) } } ref = { (form) => { this.loginForm = form }}>
                    <div>
                        <h5>Note</h5>
                            If you don't have an account, this form will create your account.
                    </div>
                    <hr/>
                    <label>
                        <b>Email</b>
                        <input style = {{width: "100%"}} className = "input" name = "email" type = "email" ref = {(input) => {this.emailInput = input}} placeholder = "Email"/>
                    </label>
                    <label>
                    <b>Passward</b>
                        <input style = {{width: "100%"}} className = "input" name = "passward" type = "passward" ref = {(input) => {this.passwordInput = input}} placeholder = "Passward"/>
                    </label>
                    <input style = {{width: "100%", backgroundColor: "#6bc4ff", color:"white"}} type = "submit" value = "Log In"/>
                </form>


                
            </div>
        );
    }
}

export default login;