var xhttp = new XMLHttpRequest();


var jsonObj = data.items;

// Cart List
var y = [];
for (let g = 0; g < jsonObj.length; g++) {
    const element = jsonObj[g];
    y.push(element)
}
console.log(y);
var r = y.map(function (el, i) {
    var o = Object.assign({}, el);
    o.id = i + 1;
    return o;
});
var cardBox = "";
for (var index = 0; index < r.length; index++) {
    cardBox += '<div class="cartItem">' + '<div class="cartImg">' + '<img src="' + r[index].image + '" alt="' + r[index].name + '">' + '<span class="discountText">' + r[index].discount + '%' + '</span>' + '</div>' + '<h3 class="cardTitle">' + r[index].name + '</h3>' + '<div class="cartContent flexBox alignitemCenter justifyContentBetween">' + '<div class="contentLeft">' + '<div class="priceSec">' + '$' + '<span class="oldPrice">' + r[index]['price'].actual + '</span>' + '<span class="currentPrice">' + r[index]['price'].display + '</span>' + '</div>' + '</div>' + '<div class="contentRight">' + '<span class="addtoCartBtn globalBtn" onclick="addtocartFunc(' + r[index].id + ')" id="' + 'addtocart-' + r[index].id + '">' + 'Add to Cart' + '</span>' + '</div>' + '</div>' + '</div>'
}

document.getElementById("cartList").innerHTML = cardBox;
document.getElementById("ordersummerySec").hidden = true;
document.getElementById("totalOrderId").hidden = true;

var addData = [];
var ordSum = "";
var hy = "";
var yy = [];

function addtocartFunc(event) {
    var filData = r.filter(x => x.id === event);
    console.log(filData[0]);
    addData.push(filData[0]);
    document.getElementById("ordersummerySec").hidden = false;
    document.getElementById("totalOrderId").hidden = false;
    var btnvar = document.getElementById("addtocart-" + event);
    btnvar.classList.add("disableBtn");
    btnvar.innerHTML = 'Added';
    var vw = document.getElementById("viewCart"); 
    vw.classList.remove("disableClsss"); 
    
    defaultFunc();
    
    
}
var countvar = 1;
var itemsprice = "";
var itemsdiscount = "";

function defaultFunc() {
    ordSum = "";
    var w = [];
    var wd = [];

    for (let f = 0; f < addData.length; f++) {
        var p = addData[f]['price'].display;
        var d = addData[f].discount;
        w.push(p);
        wd.push(d);
        ordSum += '<tr>' + '<td class="ordertd">' + addData[f].name + '</td>' + '<td class="ordertd">' + '<div class="qtyBox flexBox alignitemCenter justifyContentBetween">' + '<span class="minusBtn actIcon disableClass" onclick="decrementItemFunc(' + addData[f].id + ')" id="' + 'minus-' + addData[f].id + '">' + '<i class="fa fa-minus">' + '</i>' + '</span>' + '<span class="inputCont">' + '<input type="text" class="inputBox" value="1" id="' + 'inputVal-' + addData[f].id + '">' + '</span>' + '<span class="plusBtn actIcon" onclick="incrementItemFunc(' + addData[f].id + ')" id="' + 'plus-' + addData[f].id + '">' + '<i class="fa fa-plus">' + '</i>' + '</span>' + '</div>' + '</td>' + '<td class="ordertd" id="' + 'itemsTotal-' + addData[f].id + '">' + addData[f]['price'].display + '</td>' + '<td class="ordertd">' + '<span class="removeBtn" onclick="removeRowFunc(' + f + ',' + addData[f].id + ')">' + '<i class="fa fa-times">' + '</i>' + '</span>' + '</td>' + '</tr>';


    }
    

    document.getElementById("ordsumTr").innerHTML = ordSum;
    itemsprice = "";
    itemsprice = w.reduce(function (a, b) {
        return Number(a) + Number(b);
    }, 0);
    document.getElementById("cartItemPrice").innerHTML = '$' + itemsprice;

    itemsdiscount = "";
    itemsdiscount = wd.reduce(function (a, b) {
        return Number(a) + Number(b);
    }, 0);
    document.getElementById("discountItemPrice").innerHTML = '$' + itemsdiscount;


    hy = Number(itemsprice) + Number(itemsdiscount);
    document.getElementById("totalItemPrice").innerHTML = '$' + hy;
    var count = addData.length;
    document.getElementById("itemsCount").innerHTML = count;
    document.getElementById("viewitemsCount").innerHTML = count;
    countvar = count;
    
}

function removeRowFunc(event, id) {
    var m = event + 1;
    for (let q = 0; q < addData.length; q++) {
        const element = addData[q];
        addData.splice(event, 1)

    }
    defaultFunc();

    var btnv = document.getElementById("addtocart-" + id);
    btnv.classList.remove("disableBtn");
    btnv.innerHTML = 'Add to Cart';

    if (addData.length > 0) {} else {
        document.getElementById("ordersummerySec").hidden = true;
        document.getElementById("totalOrderId").hidden = true;
        document.getElementById("cartPopupBox").hidden = true;
    }
}
var j = 1;
var z = [];
var valuetext = 1;
var priceVal = [];
var newArr = new Array();
var newArr2 = [];
var n = []
var priceI = 0;
var priceD = 0;
var priceto = 0;

function incrementItemFunc(id) {
    var u = []
    var dataFilter = addData.filter(e => e.id === id);
    j = dataFilter[0]['price'].display;
    for (let e = 0; e < addData.length; e++) {
        const element = addData[e].id;
        if (element === id) {
            j += dataFilter[0]['price'].display;
            z.push(j);
            u.push(element);
        }
    }

    var value = parseInt(document.getElementById("inputVal-" + id).value);
    value = isNaN(value) ? 1 : value;
    value++;
    var intv = document.getElementById("inputVal-" + id).value = value;
    console.log(intv);
    document.getElementById("inputVal-" + id).value = value;
    price = '$' + `<span>${dataFilter[0]['price'].display * value}</span>`;
    document.getElementById("itemsTotal-" + id).innerHTML = price;
    var hh = dataFilter[0]['price'].display * value;
    var dis = dataFilter[0].discount * value
    priceI = itemsprice - dataFilter[0]['price'].display + hh;
    priceD = itemsdiscount - dataFilter[0].discount + dis;
    priceto = priceI + priceD;
    if (value > 1) {
        var disableCls = document.getElementById("minus-" + id);
        disableCls.classList.remove("disableClass");
    }
    document.getElementById("cartItemPrice").innerHTML = '$' + priceI;
    document.getElementById("discountItemPrice").innerHTML = '$' + priceD;
    document.getElementById("totalItemPrice").innerHTML = '$' + priceto;

}

function decrementItemFunc(id) {
    var dataFilter = addData.filter(e => e.id === id);
    var value = parseInt(document.getElementById("inputVal-" + id).value);
    value = isNaN(value) ? 1 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById("inputVal-" + id).value = value;
    price = '$' + `<span>${dataFilter[0]['price'].display * value}</span>`;
    document.getElementById("itemsTotal-" + id).innerHTML = price;
    const hu = dataFilter[0]['price'].display * value;
    const pi= priceI - dataFilter[0]['price'].display;
    const pd= priceD - dataFilter[0].discount;
    const pt= priceto - pd - hu;
    if (value == 1) {
        var disableCls = document.getElementById("minus-" + id);
        disableCls.classList.add("disableClass");
    }
    document.getElementById("cartItemPrice").innerHTML = '$' + pi;
    document.getElementById("discountItemPrice").innerHTML = '$' + pd;
    document.getElementById("totalItemPrice").innerHTML = '$' + pt;

}
document.getElementById("cartPopupBox").hidden = true;
function viewCartFunc(){
    document.getElementById("cartPopupBox").hidden = false;
}
function closePopupFunc(){
    document.getElementById("cartPopupBox").hidden = true;
}