/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    var ua = navigator.userAgent;
    if (ua.match(/Android/i)){
        hide("inputNumber");
        hide("inputNumber2");
        hide("result");
        hide("b1");
        hide("b2");
        hide("l2");
        hide("l3");
    }

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function hide(id) {
         document.getElementById(id).hidden = true
}

function searchCapital() {

    // Define the API URL
    const apiUrl = 'https://countriesnow.space/api/v0.1/countries/capital'

    // Make a GET request
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(countries => {
        var country = document.getElementById('country').value;
        var found = false;
        // iterate over each element in the array
        for (var i = 0; i < countries.data.length; i++){
              // look for the entry with a matching `code` value
            if (countries.data[i].name.toUpperCase() == country.toUpperCase()){
                 // we found it
                // obj[i].name is the matched result
                document.getElementById('capital').innerHTML = countries.data[i].capital;
                found = true;
            }
        }

        if (!found) {
            document.getElementById('capital').innerHTML = "Country was not found";
        }

    })
    .catch(error => {
        document.getElementById('capital').innerHTML = error;
    });

}

function convertDollarToEuro() {

    // Create an js object XMLHttpRequest
    var http = new XMLHttpRequest();
    // Define and declarate a constant called url
    const url = "http://www.apilayer.net/api/live?access_key=87cfd6a6a74806885b833f8985189273";

	// Property of the class XMLHttpRequest to initializes the request, or re-initializes
    // an existing one.
    http.open("GET", url);
	// Property to send request
    http.send();

    // Property which is waiting for the answer (asynchronously)
    http.onreadystatechange = (e) => {

        // Get the raw answer
        var response = http.responseText;

        // return an js object from the raw answer
        var responseJSON = JSON.parse(http.responseText);

        // Get an attribute from object
        var usdeur = responseJSON.quotes.USDEUR;

        // Get from the screen input
        var number_to_convert = document.getElementById('inputNumber').value;

        // result of the conversion
        var result = number_to_convert * usdeur;

        // set on the screen result
        document.getElementById('result').innerHTML = result;


    }

}

function convertEuroToDolar() {

    // Create an js object XMLHttpRequest
    var http = new XMLHttpRequest();

    // Define and declarate a constant called url
    const url = "http://www.apilayer.net/api/live?access_key=87cfd6a6a74806885b833f8985189273";

    // Property of the class XMLHttpRequest to initializes the request, or re-initializes
    // an existing one.
    http.open("GET", url);

    // Property to send request
    http.send();

    // Property which is waiting for the answer (asynchronously)
    http.onreadystatechange = (e) => {

        // Get the raw answer
        var response = http.responseText;

        // return an js object from the raw answer
        var responseJSON = JSON.parse(http.responseText);

        // Get an attribute from object
        var usdeur = responseJSON.quotes.USDEUR;

        // Get from the screen input
        var number_to_convert = document.getElementById('inputNumber2').value;

        // result of the conversion
        var result = number_to_convert / usdeur;

        // set on the screen result
        document.getElementById('result').innerHTML = result;


    }
}