import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import Rebase from 're-base';
import * as firebase from 'firebase';
import config from './config';



const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { app, base, googleProvider}