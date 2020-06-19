import React, { Component } from 'react';

class login extends Component {
    render() {
        return (
            <div className = "container">
                <input id = "txtEmail" type = "email" placeholder = "Email"/>

                <input id = "txtPassword" type = "password" placeholder = "Password"/>

                <button id = "btnLogin" class = "btn-action">
                    login
                </button>

                <button id = "btnSignUp" class = "btn-secondary">
                    Sign Up
                </button>


                
            </div>
        );
    }
}

export default login;