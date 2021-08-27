const   btn = document.querySelector('#btn');
        list = document.querySelector('.container');
        category = document.querySelector('.category');
        country = document.querySelector('.country');
        apiKey = '4dd10ac3b26049f8b53ffbd4d98c419f';
        URL = `https://newsapi.org/v2/top-headlines`;
        categoryes = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
        countries = {
            'us': 'United State', 'ru' : 'Russia', 'fr' : 'French', 'ae': 'United Arab Emirates', 'ar' : 'Argentina', 'at' : 'Austria',
            'au' : 'Australia', 'be' : 'Belgium', 'bg' : 'Bulgaria', 'br' : 'Brazil', 'ca' : 'Canada', 'ch' : 'Switzerland', 'cn' : 'China', 'cu' : 'Cuba',
            'cz' : 'Czech Republic', 'de' : 'Germany', 'eg' : 'Egypt', 'gb' : 'United Kingdom', 'gr' : 'Greece'
        };

let     showCategory = 'business';
        showCountry = 'us';

const getCard = ({title, url, description, urlToImage}) => {
    return `
    <div class="card">
        <div class="card__fragment">
            <img class="card__image" src="${urlToImage || './img/imgNotFound.jpg'}" alt="">
            <span class="card__title">${title || ''}</span>
        </div>
        <div class="card__content">
            <p>${description || ''}</p>
        </div>
        <div class="card__action">
            <a href="${url}"></a>
        </div>
    </div>`
}

const renderCards = (news) =>{
    let fragment = '';

    news.forEach(element => {
        fragment += getCard(element);
    });
    list.innerHTML = fragment;
}

async function getNews()
{
    try{
        let data = await axios.get(URL + `?country=${showCountry}&category=${showCategory}&apiKey=${apiKey}`);
        renderCards(data.data.articles);
        console.log('ok');
    }
    catch(error){
        console.log(error.status);
    }
}

const init = () =>{
    const fragment = document.createDocumentFragment();

    categoryes.forEach((element) =>{
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element[0].toUpperCase() + element.slice(1);
        fragment.appendChild(option);
    })
    category.appendChild(fragment);

    Object.keys(countries).forEach((element) => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = countries[element];
        fragment.appendChild(option);
    })
    country.appendChild(fragment);
}

init();

category.addEventListener('change', (e) => {
    showCategory = e.target.value;
    window.scrollTo(0, 0)
    getNews();
})

country.addEventListener('change', (e) => {
    showCountry = e.target.value;
    window.scrollTo(0, 0);
    getNews();
})


getNews();