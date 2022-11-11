const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const itemInfo = 'itemInfo';
const keys = ['productName', 'price', 'rate'];

const sortTable = (sortKey, itemList) => {

}

const createTableRow = (itemList, name) => {
    const table = document.getElementById('table');
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (let i = 0; i < itemList['keys'].length; i++) {
        const td = document.createElement('td');
        td.innerText = itemList[name][itemList['keys'][i]];
        tr.appendChild(td);
    }
}

const addItem = (itemList) => {
    // keysを用いてFor文で書く
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const rate = document.getElementById('rate').value;
    itemList.name.push(productName);
    itemList[productName] = { productName: productName, price: price, rate, rate };
    setItemToLocalStorage(itemInfo, itemList);
    createTableRow(itemList, productName);

    console.log(itemList);
}


window.onload = (event) => {
    console.log(getItemFromLocalStorage(itemInfo))
    const itemList = (() => {
        if (localStorage.getItem(itemInfo)) {
            return getItemFromLocalStorage(itemInfo);
        }
        return { name: [], keys: keys };
    })();

    for (let i = 0; i < itemList['name'].length; i++) {
        createTableRow(itemList, itemList['name'][i]);
    }

    document.getElementById('submit').addEventListener('click', e => {
        e.preventDefault();
        addItem(itemList);
    });
};
