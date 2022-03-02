const NUM_USERS = 12;
users = [];

var gallery = document.querySelector("#gallery"), 
searchContainer = document.querySelector("#search-container");

init();

async function main() {
    for (let i = 0; i < NUM_USERS; i++)
        users.push(await fetchRandomUser());
    
    users.forEach(user => {
        const picture = user.picture.large,
        firstName = user.name.first,
        lastName = user.name.last,
        email = user.email,
        city = user.location.city,
        state = user.location.state,
        phone = user.phone,
        streetNumber = user.location.street.number,
        streetName = user.location.street.name,
        postcode = user.location.postcode,
        dob = new Date(user.dob.date).toISOString().split('T')[0]

        const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${picture}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>`;

        gallery.insertAdjacentHTML("beforeend", html);
        
        var card = gallery.lastChild;
        card.addEventListener("click", () => {
            var modalContainer = document.querySelector(".modal-container"),
            modalInfoContainer = document.querySelector(".modal-info-container");

            modalInfoContainer.innerHTML = `
            <img class="modal-img" src="${picture}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state} ${postcode}</p>
            <p class="modal-text">Birthday: ${dob}</p>`;

            modalContainer.style.display = "block";
        });
    });
    
} main();

function fetchRandomUser() {
    return fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => data.results[0])
        .catch(error => console.error(error));
}

function init() {
    // insertSearchBox();
    insertModalContainer();
    
    var modalContainer = document.querySelector(".modal-container"), 
    modalCloseButton = document.querySelector("#modal-close-btn");

    modalContainer.style.display = "none"; // Hides modal on start

    modalCloseButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
}

function insertModalContainer() {
    const html = `
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container"></div>
            </div>
    </div>`;
    document.querySelector("#gallery").insertAdjacentHTML("afterend", html);
}

function insertSearchBox() {
    const html = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    document.querySelector(".search-container").insertAdjacentHTML("beforeend", html);
}