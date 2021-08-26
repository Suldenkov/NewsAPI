const btn = document.querySelector('#btn');
const list = document.querySelector('.container');

const getCard = ({title, url, description, urlToImage}) => {
    return `
    <div class="card">
        <div class="card__fragment">
            <img class="card__image" src="${urlToImage}" alt="">
            <span class="card__title">${title}</span>
        </div>
        <div class="card__content">
            <p>${description}</p>
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
        let data = await axios.get('https://newsapi.org/v2/everything?q=Apple&from=2021-08-26&sortBy=popularity&apiKey=4dd10ac3b26049f8b53ffbd4d98c419f');
        renderCards(data.data.articles);
    }
    catch(error){
        console.log(error.status);
    }
}

btn.addEventListener('click', () => {
    getNews();
})