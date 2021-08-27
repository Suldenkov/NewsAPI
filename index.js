const   btn = document.querySelector('#btn');
        list = document.querySelector('.container');
        category = document.querySelector('.category');
        language = document.querySelector('.language');
        country = document.querySelector('.country');
        apiKey = '4dd10ac3b26049f8b53ffbd4d98c419f';
        URL = `https://newsapi.org/v2/top-headlines`;

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