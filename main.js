//get ten users from api

fetch('https://randomuser.me/api/?results=10')
    .then(function (response) {
        //extract the json from the response
        console.log("repsonse status:", response.status)
        return response.json();
    }).then(function (json) {
        //process json body
        console.log("response payload:", json)
        processJson(json)
    })

let processJson = (json) => {
    //sort json alphabetically
    let sortedJson = json.results.sort((a, b) => {
        let nameA = a.name.last.toLowerCase();
        let nameB = b.name.last.toLowerCase();
        //return negative number if nameA is before nameB
        //retturn positive number if nameB is before nameA
        //return zero if nameA === nameB
        return nameA.localeCompare(nameB)
    })
    for (let i = 0; i < sortedJson.length; i++) {
        let contact = sortedJson[i];
        processContact(contact);
    }
}

// loop through the result array and process one contact at a time 


//process one contact at a time and process the dom with the contact's info
let processContact = (contact) => {
    //set contact info
    let firstName = contact.name.first;
    let lastName = contact.name.last;
    let contactThumbNail = contact.picture.medium;
    let street = `${contact.location.street.number} ${contact.location.street.name}`;
    let city = contact.location.city;
    let state = contact.location.state;
    let postCode = contact.location.postCode;
    let phone = contact.phone;
    let email = contact.email;

    //get contact list and create list item
    let contactList = document.getElementById('contactList');
    let li = document.createElement('li');

    //create elements to add to the list item and set their text and attributes 
    let h2 = document.createElement('h2');
    h2.innerHTML = `${firstName} ${lastName}`;
    
    let img = document.createElement('img');
    img.setAttribute('src', contactThumbNail);

    const p = document.createElement('p');
    p.innerHTML = `<span class = "label">Email</span> ${email} <br> <span class = "label"> Phone: </span> ${phone} <br> ${street} <br> ${city}, ${state}, ${postCode}`;
    p.classList.add('hide');

    let showPara = false;
    
    let button = document.createElement('button');
    button.innerHTML = 'view more';

    button.addEventListener('click', function() {
        p.classList.toggle('hide');
        showPara = !showPara;

        if (showPara){
            button.innerHTML = "view less";
        } else {
            button.innerHTML = "view more";
        }
    });

li.appendChild(img);
li.appendChild(h2);
li.appendChild(p);
li.appendChild(button);

contactList.appendChild(li);
}
