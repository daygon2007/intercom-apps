/* This is code related to the glitch environment setup */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});

/* 
Template to create a canvas and add components and stored data as needed
e.g. 
Step 1: Create the canvas object
let my_canvas = new CreateCanvas();
Step 2: Add one or more components as needed
my_canvas.add_components({ type: "input", id: "my_input", label: "Add some input", 
                          action: { type: "submit" } });
Step 3: optionally add some stored data if you need it
my_canvas.add_stored_data({some_data: "this data"})
*/
class CreateCanvas {

    /* this is the main canvas object which you will use when createing an app */
    constructor() {
        this.canvas = {
            canvas: {
                content: {
                    components: [],
                },
                stored_data: {},
            },
        };
    }

    /* Call this method to add components to the app */
    add_components(comp) {
        this.canvas.canvas.content.components.push(comp);
    };

    /* Call this method to add stored data to the app */
    add_stored_data(storeObj) {
        this.canvas.canvas.stored_data = storeObj;
    }

    /* call this when you want return the canvas object to send it to Intercom */
    get_canvas() {
        return (this.canvas);

    }
};

/* 
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into a conversation composer, Messenger home settings or User Message.
  Params sent from Intercom contains for example `card_creation` parameter that was formed by your `configure` response.
*/
app.post("/initialize", (request, response) => {
    const body = request.body;
    /* Create the canvas based on the teammates configurations */
    let surveyCanvas = new CreateCanvas();
    /* Add the action to the input component */
    surveyCanvas.add_components({
        type: "input",
        id: "firstName",
        label: "First Name",
        /*action: {
          type: "submit"}*/
    });
    surveyCanvas.add_components({
        type: "input",
        id: "lastName",
        label: "Last Name",
        /*action: {
          type: "submit"}*/
    });
    surveyCanvas.add_components({
        type: "input",
        id: "email",
        label: "Email",
        /*action: {
          type: "submit"}*/
    });
    surveyCanvas.add_components({
        type: "input",
        id: "phone",
        label: "Phone Number",
        /*action: {
          type: "submit"}*/
    });
    surveyCanvas.add_components({
        type: "dropdown",
        id: "country",
        label: "Choose your Country",
        value: "United States",
        save_state: "unsaved",
        disabled: false,
        options: [
            {
                type: "option",
                id: "United States",
                text: "United States"
            }, {
                type: "option",
                id: "United Kingdom",
                text: "United Kingdom",
                disabled: false
            },
            {
                type: "option",
                text: "Afghanistan",
                id: "Afghanistan",

            },
            {
                type: "option",
                text: "Åland Islands",
                id: "Åland Islands",

            },
            {
                type: "option",
                text: "Albania",
                id: "Albania",

            },
            {
                type: "option",
                text: "Algeria",
                id: "Algeria",

            },
            {
                type: "option",
                text: "American Samoa",
                id: "American Samoa",

            },
            {
                type: "option",
                text: "AndorrA",
                id: "AndorrA",

            },
            {
                type: "option",
                text: "Angola",
                id: "Angola",

            },
            {
                type: "option",
                text: "Anguilla",
                id: "Anguilla",

            },
            {
                type: "option",
                text: "Antarctica",
                id: "Antarctica",

            },
            {
                type: "option",
                text: "Antigua and Barbuda",
                id: "Antigua and Barbuda",

            },
            {
                type: "option",
                text: "Argentina",
                id: "Argentina",

            },
            {
                type: "option",
                text: "Armenia",
                id: "Armenia",

            },
            {
                type: "option",
                text: "Aruba",
                id: "Aruba",

            },
            {
                type: "option",
                text: "Australia",
                id: "Australia",

            },
            {
                type: "option",
                text: "Austria",
                id: "Austria",

            },
            {
                type: "option",
                text: "Azerbaijan",
                id: "Azerbaijan",

            },
            {
                type: "option",
                text: "Bahamas",
                id: "Bahamas",

            },
            {
                type: "option",
                text: "Bahrain",
                id: "Bahrain",

            },
            {
                type: "option",
                text: "Bangladesh",
                id: "Bangladesh",

            },
            {
                type: "option",
                text: "Barbados",
                id: "Barbados",

            },
            {
                type: "option",
                text: "Belarus",
                id: "Belarus",

            },
            {
                type: "option",
                text: "Belgium",
                id: "Belgium",

            },
            {
                type: "option",
                text: "Belize",
                id: "Belize",

            },
            {
                type: "option",
                text: "Benin",
                id: "Benin",

            },
            {
                type: "option",
                text: "Bermuda",
                id: "Bermuda",

            },
            {
                type: "option",
                text: "Bhutan",
                id: "Bhutan",

            },
            {
                type: "option",
                text: "Bolivia",
                id: "Bolivia",

            },
            {
                type: "option",
                text: "Bosnia and Herzegovina",
                id: "Bosnia and Herzegovina",

            },
            {
                type: "option",
                text: "Botswana",
                id: "Botswana",

            },
            {
                type: "option",
                text: "Bouvet Island",
                id: "Bouvet Island",

            },
            {
                type: "option",
                text: "Brazil",
                id: "Brazil",

            },
            {
                type: "option",
                text: "British Indian Ocean Territory",
                id: "British Indian Ocean Territory",

            },
            {
                type: "option",
                text: "Brunei Darussalam",
                id: "Brunei Darussalam",

            },
            {
                type: "option",
                text: "Bulgaria",
                id: "Bulgaria",

            },
            {
                type: "option",
                text: "Burkina Faso",
                id: "Burkina Faso",

            },
            {
                type: "option",
                text: "Burundi",
                id: "Burundi",

            },
            {
                type: "option",
                text: "Cambodia",
                id: "Cambodia",

            },
            {
                type: "option",
                text: "Cameroon",
                id: "Cameroon",

            },
            {
                type: "option",
                text: "Canada",
                id: "Canada",

            },
            {
                type: "option",
                text: "Cape Verde",
                id: "Cape Verde",

            },
            {
                type: "option",
                text: "Cayman Islands",
                id: "Cayman Islands",

            },
            {
                type: "option",
                text: "Central African Republic",
                id: "Central African Republic",

            },
            {
                type: "option",
                text: "Chad",
                id: "Chad",

            },
            {
                type: "option",
                text: "Chile",
                id: "Chile",

            },
            {
                type: "option",
                text: "China",
                id: "China",

            },
            {
                type: "option",
                text: "Christmas Island",
                id: "Christmas Island",

            },
            {
                type: "option",
                text: "Cocos (Keeling) Islands",
                id: "Cocos (Keeling) Islands",

            },
            {
                type: "option",
                text: "Colombia",
                id: "Colombia",

            },
            {
                type: "option",
                text: "Comoros",
                id: "Comoros",

            },
            {
                type: "option",
                text: "Congo",
                id: "Congo",

            },
            {
                type: "option",
                text: "Congo, The Democratic Republic of the",
                id: "Congo, The Democratic Republic of the",

            },
            {
                type: "option",
                text: "Cook Islands",
                id: "Cook Islands",

            },
            {
                type: "option",
                text: "Costa Rica",
                id: "Costa Rica",

            },
            {
                type: "option",
                text: "Cote D\"Ivoire",
                id: "Cote D\"Ivoire",

            },
            {
                type: "option",
                text: "Croatia",
                id: "Croatia",

            },
            {
                type: "option",
                text: "Cuba",
                id: "Cuba",

            },
            {
                type: "option",
                text: "Cyprus",
                id: "Cyprus",

            },
            {
                type: "option",
                text: "Czech Republic",
                id: "Czech Republic",

            },
            {
                type: "option",
                text: "Denmark",
                id: "Denmark",

            },
            {
                type: "option",
                text: "Djibouti",
                id: "Djibouti",

            },
            {
                type: "option",
                text: "Dominica",
                id: "Dominica",

            },
            {
                type: "option",
                text: "Dominican Republic",
                id: "Dominican Republic",

            },
            {
                type: "option",
                text: "Ecuador",
                id: "Ecuador",

            },
            {
                type: "option",
                text: "Egypt",
                id: "Egypt",

            },
            {
                type: "option",
                text: "El Salvador",
                id: "El Salvador",

            },
            {
                type: "option",
                text: "Equatorial Guinea",
                id: "Equatorial Guinea",

            },
            {
                type: "option",
                text: "Eritrea",
                id: "Eritrea",

            },
            {
                type: "option",
                text: "Estonia",
                id: "Estonia",

            },
            {
                type: "option",
                text: "Ethiopia",
                id: "Ethiopia",

            },
            {
                type: "option",
                text: "Falkland Islands (Malvinas)",
                id: "Falkland Islands (Malvinas)",

            },
            {
                type: "option",
                text: "Faroe Islands",
                id: "Faroe Islands",

            },
            {
                type: "option",
                text: "Fiji",
                id: "Fiji",

            },
            {
                type: "option",
                text: "Finland",
                id: "Finland",

            },
            {
                type: "option",
                text: "France",
                id: "France",

            },
            {
                type: "option",
                text: "French Guiana",
                id: "French Guiana",

            },
            {
                type: "option",
                text: "French Polynesia",
                id: "French Polynesia",

            },
            {
                type: "option",
                text: "French Southern Territories",
                id: "French Southern Territories",

            },
            {
                type: "option",
                text: "Gabon",
                id: "Gabon",

            },
            {
                type: "option",
                text: "Gambia",
                id: "Gambia",

            },
            {
                type: "option",
                text: "Georgia",
                id: "Georgia",

            },
            {
                type: "option",
                text: "Germany",
                id: "Germany",

            },
            {
                type: "option",
                text: "Ghana",
                id: "Ghana",

            },
            {
                type: "option",
                text: "Gibraltar",
                id: "Gibraltar",

            },
            {
                type: "option",
                text: "Greece",
                id: "Greece",

            },
            {
                type: "option",
                text: "Greenland",
                id: "Greenland",

            },
            {
                type: "option",
                text: "Grenada",
                id: "Grenada",

            },
            {
                type: "option",
                text: "Guadeloupe",
                id: "Guadeloupe",

            },
            {
                type: "option",
                text: "Guam",
                id: "Guam",

            },
            {
                type: "option",
                text: "Guatemala",
                id: "Guatemala",

            },
            {
                type: "option",
                text: "Guernsey",
                id: "Guernsey",

            },
            {
                type: "option",
                text: "Guinea",
                id: "Guinea",

            },
            {
                type: "option",
                text: "Guinea-Bissau",
                id: "Guinea-Bissau",

            },
            {
                type: "option",
                text: "Guyana",
                id: "Guyana",

            },
            {
                type: "option",
                text: "Haiti",
                id: "Haiti",

            },
            {
                type: "option",
                text: "Heard Island and Mcdonald Islands",
                id: "Heard Island and Mcdonald Islands",

            },
            {
                type: "option",
                text: "Holy See (Vatican City State)",
                id: "Holy See (Vatican City State)",

            },
            {
                type: "option",
                text: "Honduras",
                id: "Honduras",

            },
            {
                type: "option",
                text: "Hong Kong",
                id: "Hong Kong",

            },
            {
                type: "option",
                text: "Hungary",
                id: "Hungary",

            },
            {
                type: "option",
                text: "Iceland",
                id: "Iceland",

            },
            {
                type: "option",
                text: "India",
                id: "India",

            },
            {
                type: "option",
                text: "Indonesia",
                id: "Indonesia",

            },
            {
                type: "option",
                text: "Iran, Islamic Republic Of",
                id: "Iran, Islamic Republic Of",

            },
            {
                type: "option",
                text: "Iraq",
                id: "Iraq",

            },
            {
                type: "option",
                text: "Ireland",
                id: "Ireland",

            },
            {
                type: "option",
                text: "Isle of Man",
                id: "Isle of Man",

            },
            {
                type: "option",
                text: "Israel",
                id: "Israel",

            },
            {
                type: "option",
                text: "Italy",
                id: "Italy",

            },
            {
                type: "option",
                text: "Jamaica",
                id: "Jamaica",

            },
            {
                type: "option",
                text: "Japan",
                id: "Japan",

            },
            {
                type: "option",
                text: "Jersey",
                id: "Jersey",

            },
            {
                type: "option",
                text: "Jordan",
                id: "Jordan",

            },
            {
                type: "option",
                text: "Kazakhstan",
                id: "Kazakhstan",

            },
            {
                type: "option",
                text: "Kenya",
                id: "Kenya",

            },
            {
                type: "option",
                text: "Kiribati",
                id: "Kiribati",

            },
            {
                type: "option",
                text: "Korea, Democratic People\"S Republic of",
                id: "Korea, Democratic People\"S Republic of",

            },
            {
                type: "option",
                text: "Korea, Republic of",
                id: "Korea, Republic of",

            },
            {
                type: "option",
                text: "Kuwait",
                id: "Kuwait",

            },
            {
                type: "option",
                text: "Kyrgyzstan",
                id: "Kyrgyzstan",

            },
            {
                type: "option",
                text: "Lao People\"S Democratic Republic",
                id: "Lao People\"S Democratic Republic",

            },
            {
                type: "option",
                text: "Latvia",
                id: "Latvia",

            },
            {
                type: "option",
                text: "Lebanon",
                id: "Lebanon",

            },
            {
                type: "option",
                text: "Lesotho",
                id: "Lesotho",

            },
            {
                type: "option",
                text: "Liberia",
                id: "Liberia",

            },
            {
                type: "option",
                text: "Libyan Arab Jamahiriya",
                id: "Libyan Arab Jamahiriya",

            },
            {
                type: "option",
                text: "Liechtenstein",
                id: "Liechtenstein",

            },
            {
                type: "option",
                text: "Lithuania",
                id: "Lithuania",

            },
            {
                type: "option",
                text: "Luxembourg",
                id: "Luxembourg",

            },
            {
                type: "option",
                text: "Macao",
                id: "Macao",

            },
            {
                type: "option",
                text: "Macedonia, The Former Yugoslav Republic of",
                id: "Macedonia, The Former Yugoslav Republic of",

            },
            {
                type: "option",
                text: "Madagascar",
                id: "Madagascar",

            },
            {
                type: "option",
                text: "Malawi",
                id: "Malawi",

            },
            {
                type: "option",
                text: "Malaysia",
                id: "Malaysia",

            },
            {
                type: "option",
                text: "Maldives",
                id: "Maldives",

            },
            {
                type: "option",
                text: "Mali",
                id: "Mali",

            },
            {
                type: "option",
                text: "Malta",
                id: "Malta",

            },
            {
                type: "option",
                text: "Marshall Islands",
                id: "Marshall Islands",

            },
            {
                type: "option",
                text: "Martinique",
                id: "Martinique",

            },
            {
                type: "option",
                text: "Mauritania",
                id: "Mauritania",

            },
            {
                type: "option",
                text: "Mauritius",
                id: "Mauritius",

            },
            {
                type: "option",
                text: "Mayotte",
                id: "Mayotte",

            },
            {
                type: "option",
                text: "Mexico",
                id: "Mexico",

            },
            {
                type: "option",
                text: "Micronesia, Federated States of",
                id: "Micronesia, Federated States of",

            },
            {
                type: "option",
                text: "Moldova, Republic of",
                id: "Moldova, Republic of",

            },
            {
                type: "option",
                text: "Monaco",
                id: "Monaco",

            },
            {
                type: "option",
                text: "Mongolia",
                id: "Mongolia",

            },
            {
                type: "option",
                text: "Montserrat",
                id: "Montserrat",

            },
            {
                type: "option",
                text: "Morocco",
                id: "Morocco",

            },
            {
                type: "option",
                text: "Mozambique",
                id: "Mozambique",

            },
            {
                type: "option",
                text: "Myanmar",
                id: "Myanmar",

            },
            {
                type: "option",
                text: "Namibia",
                id: "Namibia",

            },
            {
                type: "option",
                text: "Nauru",
                id: "Nauru",

            },
            {
                type: "option",
                text: "Nepal",
                id: "Nepal",

            },
            {
                type: "option",
                text: "Netherlands",
                id: "Netherlands",

            },
            {
                type: "option",
                text: "Netherlands Antilles",
                id: "Netherlands Antilles",

            },
            {
                type: "option",
                text: "New Caledonia",
                id: "New Caledonia",

            },
            {
                type: "option",
                text: "New Zealand",
                id: "New Zealand",

            },
            {
                type: "option",
                text: "Nicaragua",
                id: "Nicaragua",

            },
            {
                type: "option",
                text: "Niger",
                id: "Niger",

            },
            {
                type: "option",
                text: "Nigeria",
                id: "Nigeria",

            },
            {
                type: "option",
                text: "Niue",
                id: "Niue",

            },
            {
                type: "option",
                text: "Norfolk Island",
                id: "Norfolk Island",

            },
            {
                type: "option",
                text: "Northern Mariana Islands",
                id: "Northern Mariana Islands",

            },
            {
                type: "option",
                text: "Norway",
                id: "Norway",

            },
            {
                type: "option",
                text: "Oman",
                id: "Oman",

            },
            {
                type: "option",
                text: "Pakistan",
                id: "Pakistan",

            },
            {
                type: "option",
                text: "Palau",
                id: "Palau",

            },
            {
                type: "option",
                text: "Palestinian Territory, Occupied",
                id: "Palestinian Territory, Occupied",

            },
            {
                type: "option",
                text: "Panama",
                id: "Panama",

            },
            {
                type: "option",
                text: "Papua New Guinea",
                id: "Papua New Guinea",

            },
            {
                type: "option",
                text: "Paraguay",
                id: "Paraguay",

            },
            {
                type: "option",
                text: "Peru",
                id: "Peru",

            },
            {
                type: "option",
                text: "Philippines",
                id: "Philippines",

            },
            {
                type: "option",
                text: "Pitcairn",
                id: "Pitcairn",

            },
            {
                type: "option",
                text: "Poland",
                id: "Poland",

            },
            {
                type: "option",
                text: "Portugal",
                id: "Portugal",

            },
            {
                type: "option",
                text: "Puerto Rico",
                id: "Puerto Rico",

            },
            {
                type: "option",
                text: "Qatar",
                id: "Qatar",

            },
            {
                type: "option",
                text: "Reunion",
                id: "Reunion",

            },
            {
                type: "option",
                text: "Romania",
                id: "Romania",

            },
            {
                type: "option",
                text: "Russian Federation",
                id: "Russian Federation",

            },
            {
                type: "option",
                text: "RWANDA",
                id: "RWANDA",

            },
            {
                type: "option",
                text: "Saint Helena",
                id: "Saint Helena",

            },
            {
                type: "option",
                text: "Saint Kitts and Nevis",
                id: "Saint Kitts and Nevis",

            },
            {
                type: "option",
                text: "Saint Lucia",
                id: "Saint Lucia",

            },
            {
                type: "option",
                text: "Saint Pierre and Miquelon",
                id: "Saint Pierre and Miquelon",

            },
            {
                type: "option",
                text: "Saint Vincent and the Grenadines",
                id: "Saint Vincent and the Grenadines",

            },
            {
                type: "option",
                text: "Samoa",
                id: "Samoa",

            },
            {
                type: "option",
                text: "San Marino",
                id: "San Marino",

            },
            {
                type: "option",
                text: "Sao Tome and Principe",
                id: "Sao Tome and Principe",

            },
            {
                type: "option",
                text: "Saudi Arabia",
                id: "Saudi Arabia",

            },
            {
                type: "option",
                text: "Senegal",
                id: "Senegal",

            },
            {
                type: "option",
                text: "Serbia and Montenegro",
                id: "Serbia and Montenegro",

            },
            {
                type: "option",
                text: "Seychelles",
                id: "Seychelles",

            },
            {
                type: "option",
                text: "Sierra Leone",
                id: "Sierra Leone",

            },
            {
                type: "option",
                text: "Singapore",
                id: "Singapore",

            },
            {
                type: "option",
                text: "Slovakia",
                id: "Slovakia",

            },
            {
                type: "option",
                text: "Slovenia",
                id: "Slovenia",

            },
            {
                type: "option",
                text: "Solomon Islands",
                id: "Solomon Islands",

            },
            {
                type: "option",
                text: "Somalia",
                id: "Somalia",

            },
            {
                type: "option",
                text: "South Africa",
                id: "South Africa",

            },
            {
                type: "option",
                text: "South Georgia and the South Sandwich Islands",
                id: "South Georgia and the South Sandwich Islands",

            },
            {
                type: "option",
                text: "Spain",
                id: "Spain",

            },
            {
                type: "option",
                text: "Sri Lanka",
                id: "Sri Lanka",

            },
            {
                type: "option",
                text: "Sudan",
                id: "Sudan",

            },
            {
                type: "option",
                text: "Suriname",
                id: "Suriname",

            },
            {
                type: "option",
                text: "Svalbard and Jan Mayen",
                id: "Svalbard and Jan Mayen",

            },
            {
                type: "option",
                text: "Swaziland",
                id: "Swaziland",

            },
            {
                type: "option",
                text: "Sweden",
                id: "Sweden",

            },
            {
                type: "option",
                text: "Switzerland",
                id: "Switzerland",

            },
            {
                type: "option",
                text: "Syrian Arab Republic",
                id: "Syrian Arab Republic",

            },
            {
                type: "option",
                text: "Taiwan, Province of China",
                id: "Taiwan, Province of China",

            },
            {
                type: "option",
                text: "Tajikistan",
                id: "Tajikistan",

            },
            {
                type: "option",
                text: "Tanzania, United Republic of",
                id: "Tanzania, United Republic of",

            },
            {
                type: "option",
                text: "Thailand",
                id: "Thailand",

            },
            {
                type: "option",
                text: "Timor-Leste",
                id: "Timor-Leste",

            },
            {
                type: "option",
                text: "Togo",
                id: "Togo",

            },
            {
                type: "option",
                text: "Tokelau",
                id: "Tokelau",

            },
            {
                type: "option",
                text: "Tonga",
                id: "Tonga",

            },
            {
                type: "option",
                text: "Trinidad and Tobago",
                id: "Trinidad and Tobago",

            },
            {
                type: "option",
                text: "Tunisia",
                id: "Tunisia",

            },
            {
                type: "option",
                text: "Turkey",
                id: "Turkey",

            },
            {
                type: "option",
                text: "Turkmenistan",
                id: "Turkmenistan",

            },
            {
                type: "option",
                text: "Turks and Caicos Islands",
                id: "Turks and Caicos Islands",

            },
            {
                type: "option",
                text: "Tuvalu",
                id: "Tuvalu",

            },
            {
                type: "option",
                text: "Uganda",
                id: "Uganda",

            },
            {
                type: "option",
                text: "Ukraine",
                id: "Ukraine",

            },
            {
                type: "option",
                text: "United Arab Emirates",
                id: "United Arab Emirates",

            },
            {
                type: "option",
                text: "United States Minor Outlying Islands",
                id: "United States Minor Outlying Islands",

            },
            {
                type: "option",
                text: "Uruguay",
                id: "Uruguay",

            },
            {
                type: "option",
                text: "Uzbekistan",
                id: "Uzbekistan",

            },
            {
                type: "option",
                text: "Vanuatu",
                id: "Vanuatu",

            },
            {
                type: "option",
                text: "Venezuela",
                id: "Venezuela",

            },
            {
                type: "option",
                text: "Viet Nam",
                id: "Viet Nam",

            },
            {
                type: "option",
                text: "Virgin Islands, British",
                id: "Virgin Islands, British",

            },
            {
                type: "option",
                text: "Virgin Islands, U.S.",
                id: "Virgin Islands, U.S.",

            },
            {
                type: "option",
                text: "Wallis and Futuna",
                id: "Wallis and Futuna",

            },
            {
                type: "option",
                text: "Western Sahara",
                id: "Western Sahara",

            },
            {
                type: "option",
                text: "Yemen",
                id: "Yemen",

            },
            {
                type: "option",
                text: "Zambia",
                id: "Zambia",

            },
            {
                type: "option",
                text: "Zimbabwe",
                id: "Zimbabwe",

            }
        ],

        /*action: {
          type: "submit"}*/
    });
    surveyCanvas.add_components({
        type: "button",
        id: "form_submit",
        label: "Submit form",
        action: {
            type: "submit"
        }
    });
    console.log('Initial Form');
    response.send(surveyCanvas.get_canvas());
});

/* 
  This is an endpoint that Intercom will POST HTTP request whenever your customer interacts with the card.
  Interesting pattern used here is to use `current_canvas` and `stored_data` on this canvas to fetch some 
  detailed info about the card straight from Intercom instead of your backend.
*/
app.post("/submit", (request, response) => {
    const body = request.body;
    // console.log(body);

    switch (body.component_id) {
        case 'form_submit':
            //console.log(body);
            console.log('=====================================================================================');
            /*console.log(body.input_values.firstName);
            console.log(body.input_values.lastName);
            console.log(body.input_values.email);
            console.log(body.input_values.phone);
            console.log(body.input_values.country);*/
            var firstName = body.input_values.firstName;
            var lastName = body.input_values.lastName;
            var email = body.input_values.email;
            var phone = body.input_values.phone;
            var country = body.input_values.country;
            if (body.input_values.country === "United States") {
                let stateCanvas = new CreateCanvas();
                stateCanvas.add_components({
                    type: "dropdown",
                    id: "state",
                    label: "Choose your State",
                    value: "Alabama",
                    save_state: "unsaved",
                    disabled: false,
                    options: [
                        {
                            id: "Alabama",
                            text: "Alabama",
                            type: "option"

                        },
                        {
                            id: "Alaska",
                            text: "Alaska",
                            type: "option"

                        },
                        {
                            id: "American Samoa",
                            text: "American Samoa",
                            type: "option"

                        },
                        {
                            id: "Arizona",
                            text: "Arizona",
                            type: "option"

                        },
                        {
                            id: "Arkansas",
                            text: "Arkansas",
                            type: "option"

                        },
                        {
                            id: "California",
                            text: "California",
                            type: "option"

                        },
                        {
                            id: "Colorado",
                            text: "Colorado",
                            type: "option"

                        },
                        {
                            id: "Connecticut",
                            text: "Connecticut",
                            type: "option"

                        },
                        {
                            id: "Delaware",
                            text: "Delaware",
                            type: "option"

                        },
                        {
                            id: "District Of Columbia",
                            text: "District Of Columbia",
                            type: "option"

                        },
                        {
                            id: "Federated States Of Micronesia",
                            text: "Federated States Of Micronesia",
                            type: "option"

                        },
                        {
                            id: "Florida",
                            text: "Florida",
                            type: "option"

                        },
                        {
                            id: "Georgia",
                            text: "Georgia",
                            type: "option"

                        },
                        {
                            id: "Guam",
                            text: "Guam",
                            type: "option"

                        },
                        {
                            id: "Hawaii",
                            text: "Hawaii",
                            type: "option"

                        },
                        {
                            id: "Idaho",
                            text: "Idaho",
                            type: "option"

                        },
                        {
                            id: "Illinois",
                            text: "Illinois",
                            type: "option"

                        },
                        {
                            id: "Indiana",
                            text: "Indiana",
                            type: "option"

                        },
                        {
                            id: "Iowa",
                            text: "Iowa",
                            type: "option"

                        },
                        {
                            id: "Kansas",
                            text: "Kansas",
                            type: "option"

                        },
                        {
                            id: "Kentucky",
                            text: "Kentucky",
                            type: "option"

                        },
                        {
                            id: "Louisiana",
                            text: "Louisiana",
                            type: "option"

                        },
                        {
                            id: "Maine",
                            text: "Maine",
                            type: "option"

                        },
                        {
                            id: "Marshall Islands",
                            text: "Marshall Islands",
                            type: "option"

                        },
                        {
                            id: "Maryland",
                            text: "Maryland",
                            type: "option"

                        },
                        {
                            id: "Massachusetts",
                            text: "Massachusetts",
                            type: "option"

                        },
                        {
                            id: "Michigan",
                            text: "Michigan",
                            type: "option"

                        },
                        {
                            id: "Minnesota",
                            text: "Minnesota",
                            type: "option"

                        },
                        {
                            id: "Mississippi",
                            text: "Mississippi",
                            type: "option"

                        },
                        {
                            id: "Missouri",
                            text: "Missouri",
                            type: "option"

                        },
                        {
                            id: "Montana",
                            text: "Montana",
                            type: "option"

                        },
                        {
                            id: "Nebraska",
                            text: "Nebraska",
                            type: "option"

                        },
                        {
                            id: "Nevada",
                            text: "Nevada",
                            type: "option"

                        },
                        {
                            id: "New Hampshire",
                            text: "New Hampshire",
                            type: "option"

                        },
                        {
                            id: "New Jersey",
                            text: "New Jersey",
                            type: "option"

                        },
                        {
                            id: "New Mexico",
                            text: "New Mexico",
                            type: "option"

                        },
                        {
                            id: "New York",
                            text: "New York",
                            type: "option"

                        },
                        {
                            id: "North Carolina",
                            text: "North Carolina",
                            type: "option"

                        },
                        {
                            id: "North Dakota",
                            text: "North Dakota",
                            type: "option"

                        },
                        {
                            id: "Northern Mariana Islands",
                            text: "Northern Mariana Islands",
                            type: "option"

                        },
                        {
                            id: "Ohio",
                            text: "Ohio",
                            type: "option"

                        },
                        {
                            id: "Oklahoma",
                            text: "Oklahoma",
                            type: "option"

                        },
                        {
                            id: "Oregon",
                            text: "Oregon",
                            type: "option"

                        },
                        {
                            id: "Palau",
                            text: "Palau",
                            type: "option"

                        },
                        {
                            id: "Pennsylvania",
                            text: "Pennsylvania",
                            type: "option"

                        },
                        {
                            id: "Puerto Rico",
                            text: "Puerto Rico",
                            type: "option"

                        },
                        {
                            id: "Rhode Island",
                            text: "Rhode Island",
                            type: "option"

                        },
                        {
                            id: "South Carolina",
                            text: "South Carolina",
                            type: "option"

                        },
                        {
                            id: "South Dakota",
                            text: "South Dakota",
                            type: "option"

                        },
                        {
                            id: "Tennessee",
                            text: "Tennessee",
                            type: "option"

                        },
                        {
                            id: "Texas",
                            text: "Texas",
                            type: "option"

                        },
                        {
                            id: "Utah",
                            text: "Utah",
                            type: "option"

                        },
                        {
                            id: "Vermont",
                            text: "Vermont",
                            type: "option"

                        },
                        {
                            id: "Virgin Islands",
                            text: "Virgin Islands",
                            type: "option"

                        },
                        {
                            id: "Virginia",
                            text: "Virginia",
                            type: "option"

                        },
                        {
                            id: "Washington",
                            text: "Washington",
                            type: "option"

                        },
                        {
                            id: "West Virginia",
                            text: "West Virginia",
                            type: "option"

                        },
                        {
                            id: "Wisconsin",
                            text: "Wisconsin",
                            type: "option"

                        },
                        {
                            id: "Wyoming",
                            text: "Wyoming",
                            type: "option"

                        }
                    ],
                });
                stateCanvas.add_components({
                    type: "button",
                    id: "region_submit",
                    label: "Submit form",
                    action: {
                        type: "submit"
                    }
                });
                response.send(stateCanvas.get_canvas());
            }

            if (body.input_values.country === "Canada") {
                let provinceCanvas = new CreateCanvas();
                provinceCanvas.add_components({
                    type: "dropdown",
                    id: "state",
                    label: "Choose your Province",
                    value: "Alberta",
                    save_state: "unsaved",
                    disabled: false,
                    options: [
                        {
                            type: "option",
                            id: "Alberta",
                            text: "Alberta",

                        },
                        {
                            type: "option",
                            id: "British Columbia",
                            text: "British Columbia",

                        },
                        {
                            type: "option",
                            id: "Manitoba",
                            text: "Manitoba",

                        },
                        {
                            type: "option",
                            id: "New Brunswick",
                            text: "New Brunswick",

                        },
                        {
                            type: "option",
                            id: "Newfoundland and Labrador",
                            text: "Newfoundland and Labrador",

                        },
                        {
                            type: "option",
                            id: "Northwest Territories",
                            text: "Northwest Territories",

                        },
                        {
                            type: "option",
                            id: "Nova Scotia",
                            text: "Nova Scotia",

                        },
                        {
                            type: "option",
                            id: "Nunavut",
                            text: "Nunavut",

                        },
                        {
                            type: "option",
                            id: "Ontario",
                            text: "Ontario",

                        },
                        {
                            type: "option",
                            id: "Prince Edward Island",
                            text: "Prince Edward Island",

                        },
                        {
                            type: "option",
                            id: "Quebec",
                            text: "Quebec",

                        },
                        {
                            type: "option",
                            id: "Saskatchewan",
                            text: "Saskatchewan",

                        },
                        {
                            type: "option",
                            id: "Yukon Territory",
                            text: "Yukon Territory",

                        }
                    ],
                });
                provinceCanvas.add_components({
                    type: "button",
                    id: "region_submit",
                    label: "Submit form",
                    action: {
                        type: "submit"
                    }
                });
                response.send(provinceCanvas.get_canvas());
            }

            /* Let's post the data to intercom */
            // Set The Data Up
            var data = { id: body.user.id, name: firstName + " " + lastName, email: email, phone: phone, country_name: country, anonymous: false };
            // Send the data
            axios.post('https://api.intercom.io/contacts', data, { 'headers': { 'Authorization': 'Bearer <INTERCOM APP ACCESS TOKEN>', 'Accept': 'application/json', 'Content-Type': 'application/json' } })
                .then(res => {
                    //console.log(res)
                });
            /* ==== End Data Posting ==== */
            break;
        case 'region_submit':
            //console.log(body);

            var region = body.input_values.state;
            let submitCanvas = new CreateCanvas();
            submitCanvas.add_components({
                type: "text",
                text: "Thanks you for your information",
                align: "center",
                style: "header"
            });
            response.send(submitCanvas.get_canvas());

            /* Let's post the data to intercom */
            // Set The Data Up
            var data = { id: body.user.id, region_name: region };
            // Send the data
            axios.post('https://api.intercom.io/contacts', data, { 'headers': { 'Authorization': 'Bearer <INTERCOM APP ACCESS TOKEN>', 'Accept': 'application/json', 'Content-Type': 'application/json' } })
                .then(res => {
                    console.log(res)
                });
            /* ==== End Data Posting ==== */
            window.location.reload();
            break;

        default:
            /* We should not go in here */
            let wrongCanvas = new CreateCanvas();
            wrongCanvas.add_components({
                type: "text",
                text: "This should not happen!!",
                align: "center",
                style: "header"
            });
            response.send(wrongCanvas.get_canvas());
            break;
    }



    /*switch (body.component_id) {
        case 'question_submit':
            let submitCanvas = new CreateCanvas();
            submitCanvas.add_components({
                type: "text",
                text: "Thanks you for your feedback",
                align: "center",
                style: "header"
            });
            response.send(submitCanvas.get_canvas());
            break;
        default:
            /* We should not go in here */
    /*let wrongCanvas = new CreateCanvas();
    wrongCanvas.add_components({
        type: "text",
        text: "This should not happen!!",
        align: "center",
        style: "header"
    });
    response.send(wrongCanvas.get_canvas());
    break;

}*/
});