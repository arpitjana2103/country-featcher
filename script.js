const baseUrl = "https://restcountries.com/v3.1";

const cardsContainer = document.querySelector(".country__cards");
const loadCardsBtn = document.querySelector(".load__country");

loadCardsBtn.addEventListener("click", function () {
    fetchCountryData_AJAX("india");
    loadCardsBtn.classList.add("hide");
});

// ( CallBack Hell )
function fetchCountryData_AJAX(countryName) {
    let countryCount = 1;
    const url_name = `${baseUrl}/name/${countryName}`;

    // AJAX CALL 1
    const request1 = new XMLHttpRequest();
    request1.open("GET", url_name);
    request1.send();

    request1.addEventListener("load", function () {
        const data1 = JSON.parse(request1.responseText);
        const countryData1 = data1.at(0);
        const neighbourAlpha1 = getRandomBorderAlpha(countryData1.borders);

        // Display Card ( Country 1 )
        displayCountryCard(countryData1, countryCount++);

        // AJAX CALL 2
        const url_alpha1 = `${baseUrl}/alpha/${neighbourAlpha1}`;
        const request2 = new XMLHttpRequest();
        request2.open("GET", url_alpha1);
        request2.send();

        request2.addEventListener("load", function () {
            const data2 = JSON.parse(request2.responseText);
            const countryData2 = data2.at(0);
            const neighbourAlpha2 = getRandomBorderAlpha(countryData2.borders);

            // Display Card ( Country 2 )
            displayCountryCard(countryData2, countryCount++);

            // AJAX CALL 3
            const url_alpha2 = `${baseUrl}/alpha/${neighbourAlpha2}`;
            const request3 = new XMLHttpRequest();
            request3.open("GET", url_alpha2);
            request3.send();

            request3.addEventListener("load", function () {
                const data3 = JSON.parse(request3.responseText);
                const countryData3 = data3.at(0);
                const neighbourAlpha3 = getRandomBorderAlpha(
                    countryData3.borders
                );

                // Display Card ( Country 2 )
                displayCountryCard(countryData3, countryCount++);
            });
        });
    });
}

function displayCountryCard(coutryData, countryCount) {
    const card = createCountryCard(coutryData, countryCount);
    cardsContainer.append(card);
}

function createCountryCard(countryData, countryCount) {
    // 1. flag
    const flag = countryData.flags.png;

    // 2. currency
    const currency = Object.values(countryData.currencies)[0];

    // 3. population
    const population = Number(countryData.population / 1000_000).toFixed(2);

    // 4. name
    const name = countryData.name.common;

    // 5. region
    const region = countryData.region;

    // 6. languages
    const languages = Object.values(countryData.languages).join(", ");

    const countryCard = document.createElement("article");
    countryCard.classList.add("country__card");
    countryCard.innerHTML = `
                <span class="token">Country ${countryCount}</span>
                <img class="country__img"
                    src="${flag}" />
                <div class="country__data">
                    <h3 class="country__name">${name}</h3>
                    <h4 class="country__region">${region}</h4>
                    <p class="country__row"><span>👫</span>${population} M people</p>
                    <p class="country__row"><span>🗣️</span>${languages}</p>
                    <p class="country__row"><span>💰</span>${currency.name} ( ${currency.symbol} )</p>
                </div>
    `;

    return countryCard;
}

function getRandomBorderAlpha(bordersArr) {
    return bordersArr.at(getRandom(0, bordersArr.length - 1));
}

function getRandom(min, max) {
    const range = max - min + 1;
    const random = Math.floor(Math.random() * range) + min;
    return random;
}
