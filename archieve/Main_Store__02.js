// alert("Welcoe to store");

// **********
// SB E01:
//

// **********
// level 00: objects
// **********
function Item(itm_name, price) {
  this.itm_name = itm_name;
  this.price = price;
  // this.itm_id = itm_id;
  // this.currency = currency;
  // this.stock = stock;
}

function Cart(itm_name) {
  this.itm_name = itm_name;
  // this.quantity = quantity;
}
// **********
// level 01- main:
// **********

// **********
// level 02- key func:
// **********

// let i0= new Item("Milk","5")
let item_list = [
  new Item("Milk", "5"),
  new Item("Bamba", "2.4"),
  new Item("Cheese", "3"),
  new Item("Meat", "60"),
  new Item("Chichen", "38.2"),
];

let item_cart = [
  new Cart("Milk"),
  new Cart("Bamba"),
  new Cart("Milk"),
  new Cart("Meat"),
  new Cart("Milk"),
];

for (i of item_list) {
  let item = document.createElement("li");
  item.innerText = `${i.itm_name} | ${i.price} $`;
  document.getElementById("div_ul_item_list").append(item);
  // document.getElementById("div_ul_item_list").innerText;
}

for (i of item_cart) {
  let item = document.createElement("li");

  item.innerText = `${i.itm_name}`;
  document.getElementById("div_ul_cart").append(item);
  // document.getElementById("div_ul_item_list").innerText;
}

document
  .getElementById("div_ul_item_list")
  .addEventListener("click", add_to_cart);
// **********
// level 03- side func:
// **********
function add_to_cart(ev) {
  // get the target of what was press
  let temp = ev.target.innerText.split(" | ");
  let seperate_price = temp[1].split(" ");
  let item_to_add = [temp[0], seperate_price[0], seperate_price[1]];
  // console.log(item_to_add);
  new_item_li = document.createElement("li");
  new_item_li.innerText = item_to_add[0];
  document.getElementById("div_ul_cart").append(new_item_li);
  calc_total();
}

function calc_total() {}
// **********
// level 04- help func:
// **********

// **********
// level 05- validation func:
// **********
