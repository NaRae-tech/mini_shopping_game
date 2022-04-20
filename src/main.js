//모든 의류 데이터를 받아오는 함수
function loadItems() {                      
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

//받아온 데이터를 기반으로 정해놓은 공간에 데이터를 html로 만들어 뿌리는 함수
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

//데이터를 받아서 정해진 html형식으로 그리는 함수
function createHTMLString(item) {
    return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <span class="item__detail">${item.gender}, ${item.size}</span>
        </li>
    `;
}

//화면에 메인 로고와 의류 종류 및 색깔 버튼에 기능 넣는 함수
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.btns');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

//버튼을 누르면 해당 버튼의 속성을 가져와서 속성에 맞는 의류들만 분류해서 그리는 함수
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }
    displayItems(items.filter(item => (item[key] == value)));
}

loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log)