const xhttp = new XMLHttpRequest();


const jsonObj = data.items;

// Cart List
const y = [];

for (const element of jsonObj) {
    y.push(element)
}
const r = y.map((el, i) => {
    const o = Object.assign({}, el);
    o.id = i + 1;
    return o;
});
let cardBox = "";
for (let index = 0; index < r.length; index++) {
    cardBox += `<div class="cartItem"><div class="cartImg"><img src="${r[index].image}" alt="${r[index].name}"><span class="discountText">${r[index].discount}%</span></div><h3 class="cardTitle">${r[index].name}</h3><div class="cartContent flexBox alignitemCenter justifyContentBetween"><div class="contentLeft"><div class="priceSec">$<span class="oldPrice">${r[index]['price'].actual}</span><span class="currentPrice">${r[index]['price'].display}</span></div></div><div class="contentRight"><span class="addtoCartBtn globalBtn" onclick="addtocartFunc(${r[index].id})" id="addtocart-${r[index].id}">Add to Cart</span></div></div></div>`
}

document.getElementById("cartList").innerHTML = cardBox;
document.getElementById("ordersummerySec").hidden = true;
document.getElementById("totalOrderId").hidden = true;

const addData = [];
let ordSum = "";
let hy = "";
const yy = [];

function addtocartFunc(event) {
    const filData = r.filter(x => x.id === event);
    addData.push(filData[0]);
    document.getElementById("ordersummerySec").hidden = false;
    document.getElementById("totalOrderId").hidden = false;
    const btnvar = document.getElementById(`addtocart-${event}`);
    btnvar.classList.add("disableBtn");
    btnvar.innerHTML = 'Added';
    const vw = document.getElementById("viewCart");
    vw.classList.remove("disableClsss");

    defaultFunc();


}
let countvar = 1;
let itemsprice = "";
let itemsdiscount = "";

function defaultFunc() {
    ordSum = "";
    const w = [];
    const wd = [];

    for (let f = 0; f < addData.length; f++) {
        const p = addData[f]['price'].display;
        const d = addData[f].discount;
        w.push(p);
        wd.push(d);
        ordSum += `<tr><td class="ordertd">${addData[f].name}</td><td class="ordertd"><div class="qtyBox flexBox alignitemCenter justifyContentBetween"><span class="minusBtn actIcon disableClass" onclick="increDecFunc(${f}, \'minus\',${addData[f].id})" id="minus-${f}"><i class="fa fa-minus"></i></span><span class="inputCont"><input type="text" class="inputBox" value="1" id="inputVal-${f}"></span><span class="plusBtn actIcon" onclick="increDecFunc(${f } , \'plus\',${addData[f].id})" id="plus-${f}"><i class="fa fa-plus"></i></span></div></td><td class="ordertd" id="itemsTotal-${f}">${addData[f]['price'].display}</td><td class="ordertd"><span class="removeBtn" onclick="removeRowFunc(${f},${addData[f].id})"><i class="fa fa-times"></i></span></td></tr>`;


    }


    document.getElementById("ordsumTr").innerHTML = ordSum;
    itemsprice = "";
    itemsprice = w.reduce((a, b) => {
        return Number(a) + Number(b);
    }, 0);
    document.getElementById("cartItemPrice").innerHTML = `$${itemsprice}`;

    itemsdiscount = "";
    itemsdiscount = wd.reduce((a, b) => {
        return Number(a) + Number(b);
    }, 0);
    document.getElementById("discountItemPrice").innerHTML = `$${itemsdiscount}`;


    hy = Number(itemsprice) - Number(itemsdiscount);
    document.getElementById("totalItemPrice").innerHTML = `$${hy}`;
    const count = addData.length;
    document.getElementById("itemsCount").innerHTML = count;
    document.getElementById("viewitemsCount").innerHTML = count;
    countvar = count;

}

function removeRowFunc(event, id) {
    const m = event + 1;

    for (const element of addData) {
        addData.splice(event, 1)
    }

    defaultFunc();

    const btnv = document.getElementById(`addtocart-${id}`);
    btnv.classList.remove("disableBtn");
    btnv.innerHTML = 'Add to Cart';

    if (addData.length > 0) {} else {
        document.getElementById("ordersummerySec").hidden = true;
        document.getElementById("totalOrderId").hidden = true;
        document.getElementById("cartPopupBox").hidden = true;
        const vw = document.getElementById("viewCart");
        vw.classList.add("disableClsss");
    }
}
let j = 1;
const z = [];
const valuetext = 1;
const priceVal = [];
const newArr = new Array();
const newArr2 = [];
const n = [];
let priceI = 0;
let priceD = 0;
let priceto = 0;

function increDecFunc(id, flag, newId) {
    const dataFilter = addData.filter(e => e.id === newId);
    let valueInt = parseInt(document.getElementById(`inputVal-${id}`).value, 10);
    if (flag == 'plus') {
        if (valueInt < 10) {
            valueInt = isNaN(valueInt) ? 1 : valueInt;
            valueInt++;
            document.getElementById(`inputVal-${id}`).value = valueInt;
        }
    }
    if (flag == 'minus') {
        if (valueInt > 1) {
            valueInt--;
            document.getElementById(`inputVal-${id}`).value = valueInt;
        }
    }
    let pp = 0;
    let disc = 0;
    let xx = 0;
    let discWithTotal=0;
    xx = document.getElementById(`inputVal-${id}`).value * dataFilter[0]['price'].display;
    for (let b = 0; b < addData.length; b++) {
        pp += document.getElementById(`inputVal-${b}`).value * addData[b]['price'].display;
        disc += document.getElementById(`inputVal-${b}`).value * addData[b].discount;
    }
    discWithTotal=pp-disc
    price = `$${`<span>${xx}</span>`}`;
    document.getElementById(`itemsTotal-${id}`).innerHTML = price;
    if (valueInt > 1) {
        const disableCls = document.getElementById(`minus-${id}`);
        disableCls.classList.remove("disableClass");
    }
    if (valueInt == 1) {
        const disableCls = document.getElementById(`minus-${id}`);
        disableCls.classList.add("disableClass");
    }
    document.getElementById("cartItemPrice").innerHTML = `$${pp}`;
    document.getElementById("discountItemPrice").innerHTML = `$${disc}`;
    document.getElementById("totalItemPrice").innerHTML = `$${discWithTotal}`;

}

// function decrementItemFunc(id) {
//     const dataFilter = addData.filter(e => e.id === id);
//     let value = parseInt(document.getElementById(`inputVal-${id}`).value);
//     value = isNaN(value) ? 1 : value;
//     value < 1 ? value = 1 : '';
//     value--;
//     document.getElementById(`inputVal-${id}`).value = value;
//     price = `$${`<span>${dataFilter[0]['price'].display * value}</span>`}`;
//     document.getElementById(`itemsTotal-${id}`).innerHTML = price;
//     const hu = dataFilter[0]['price'].display * value;
//     const pi = priceI - dataFilter[0]['price'].display;
//     const pd = priceD - dataFilter[0].discount;
//     const pt = priceto - pd - hu;
//     if (value == 1) {
//         const disableCls = document.getElementById(`minus-${id}`);
//         disableCls.classList.add("disableClass");
//     }
//     document.getElementById("cartItemPrice").innerHTML = `$${pi}`;
//     document.getElementById("discountItemPrice").innerHTML = `$${pd}`;
//     document.getElementById("totalItemPrice").innerHTML = `$${pt}`;

// }
document.getElementById("cartPopupBox").hidden = true;

function viewCartFunc() {
    document.getElementById("cartPopupBox").hidden = false;
}

function closePopupFunc() {
    document.getElementById("cartPopupBox").hidden = true;
}