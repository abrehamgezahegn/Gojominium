import firebase from "firebase/app";
import "firebase/storage";
import { firebaseApi } from "../config/keys";

var config = {
	apiKey: firebaseApi,
	authDomain: "gojominium.firebaseapp.com",
	databaseURL: "https://gojominium.firebaseio.com",
	projectId: "gojominium",
	storageBucket: "gojominium.appspot.com",
	messagingSenderId: "565856114230"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
