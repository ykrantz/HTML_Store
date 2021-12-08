// alert("Welcoe to store");

// **********
// SB E01:
//

// **********
// level 00: inital define variables
// **********
// localStorage.local_item_list=""
// localStorage.local_item_cart=""

let item_list = [];
let item_cart = [];
let item_pressed_to_remove = "";
let eror_log = [];

function Item(item_id, item_name, price) {
  this.item_id = item_id;
  this.item_name = item_name;
  this.price = price;
  // this.currency = currency;
  // this.stock = stock;
}

function Cart(item_id, quantity) {
  this.item_id = item_id;
  this.quantity = quantity;
}

// **********
// level 01- main:
// **********
creat_item_list();
create_cart_list();
set_item_list();
set_cart_list();
set_total_price();

document
  .getElementById("div_ul_item_list")
  .addEventListener("click", add_to_cart);
document
  .getElementById("div_ul_cart")
  .addEventListener("click", reduce_from_cart_if_double_press);
document.getElementById("button_add").addEventListener("click", add_a_item);
document
  .getElementById("button_reset_to_defult")
  .addEventListener(
    "click",
    reset_and_update_local_item_list_and_cart_to_defult
  );

// **********
// level 02- key func:
// **********

function set_item_list() {
  clear_elements_from_div("div_ul_item_list");
  for (i of item_list) {
    let item = document.createElement("li");
    item.setAttribute("data-item_id", i.item_id);
    item.innerText = `${i.item_name} | ${Number(i.price).toFixed(2)} $`;
    document.getElementById("div_ul_item_list").append(item);
  }
}
function set_cart_list() {
  clear_elements_from_div("div_ul_cart");
  // sort array cart so item that added the first time will be added last in the list element
  sort_arr_cart();
  for (i of item_cart) {
    if (i.quantity == 0) {
      continue;
    } else {
      let item = document.createElement("li");
      item.setAttribute("data-item_id", i.item_id);
      item.innerText = `${get_item_details(
        i.item_id,
        "item_name"
      )}, Quantity: ${i.quantity}`;
      document.getElementById("div_ul_cart").append(item);
    }
  }
}

function set_total_price() {
  document.getElementById("total_spm").innerHTML = `${calc_total().toFixed(
    2
  )} $`;
}
// **********
// level 03- side func:
// **********
function sort_arr_cart() {
  // sort the cart array so item with quantity zero, will be last in array.
  item_cart.sort((a, b) => b.quantity - 0.1);
}

function get_item_details(item_id, item_filed) {
  return item_list.find((v) => v.item_id == item_id)[item_filed];
}
// console.log("DD");
// console.log(get_item_details[("2", "price")]);

function clear_elements_from_div(id_to_clear) {
  id_to_clear = document.getElementById(id_to_clear);
  while (id_to_clear.firstChild) {
    id_to_clear.removeChild(id_to_clear.firstChild);
  }
}

function calc_total() {
  let total = 0;
  for (i of item_cart) {
    total += Number(get_item_details(i.item_id, "price")) * i.quantity;
  }
  return total;
}

function get_item_index(id, arr) {
  return arr.findIndex((v) => v.item_id == id);
}

function reset_item_cart_press_counter() {
  item_pressed_to_remove = "";
}
function reduce_from_cart(item_id) {
  item_cart[get_item_index(item_id, item_cart)].quantity--;
}

// **********
// level 04-  func for events:
// **********
function add_a_item() {
  reset_item_cart_press_counter();
  let item_id = get_id("id");
  let item_name = get_string("item name");
  let item_price = get_number("item price");
  item_list.push(new Item(item_id, item_name, item_price));
  set_item_list();
  item_cart.push(new Cart(item_id, 0));
  update_local_storage_item();
  update_local_storage_cart();
}

function reduce_from_cart_if_double_press(ev) {
  let item_pressed_id = ev.target.dataset.item_id;

  try {
    if (item_pressed_id == undefined) throw "you didn't press a specific item";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "press eror"]);
    return false;
  }
  // removes only if prees 2 times in a row at the same item
  if (item_pressed_to_remove != item_pressed_id) {
    item_pressed_to_remove = item_pressed_id;
  } else {
    reset_item_cart_press_counter();
    reduce_from_cart(item_pressed_id);
    set_cart_list();
    set_total_price();
  }
  update_local_storage_cart();
}

function add_to_cart(ev) {
  let item_id = ev.target.dataset.item_id;
  reset_item_cart_press_counter();
  try {
    if (item_id == undefined) throw "you didn't press a specific item";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "press eror"]);
    return false;
  }

  item_cart[get_item_index(item_id, item_cart)].quantity++;
  set_cart_list();
  set_total_price(calc_total());

  update_local_storage_cart();
}

// **********
// level 04-2- update local storage:
// **********
function get_local_storage_item() {
  return JSON.parse(localStorage.local_item_list);
}

function update_local_storage_item() {
  localStorage.local_item_list = JSON.stringify(item_list);
}

function update_local_storage_cart() {
  localStorage.local_item_cart = JSON.stringify(item_cart);
}

function get_local_storage_cart() {
  return JSON.parse(localStorage.local_item_cart);
}

// **********
// level 05- get data from user:
// **********

function get_string(str_type) {
  let str = "";
  let flag = true;
  do {
    str = prompt(`Please enter ${str_type}`);
    flag = check_valid_string(str);
  } while (flag == false);
  return str;
}
function get_id(str_type) {
  let id = "";
  let flag = true;
  do {
    id = prompt(`Please enter ${str_type}`);
    flag = check_valid_id(id) & check_if_uniq_id(id);
  } while (flag == false);

  return id;
}
function get_number(str_type) {
  let num = "";
  let flag = true;
  do {
    num = prompt(`Please enter ${str_type}`);
    flag = check_valid_number(num);
  } while (flag == false);
  return num;
}

// **********
// level 06- create func:
// **********

function creat_item_list() {
  if (localStorage.local_item_list) {
    item_list = get_local_storage_item();
  } else {
    reset_item_list_to_defult();
  }
}

function create_cart_list() {
  if (localStorage.local_item_cart) {
    item_cart = get_local_storage_cart();
  } else {
    reset_cart_list_to_defult();
  }
}

function reset_cart_list_to_defult() {
  item_cart = [
    new Cart("1", 0),
    new Cart("2", 0),
    new Cart("3", 0),
    new Cart("4", 0),
    new Cart("5", 0),
  ];
}

function reset_item_list_to_defult() {
  item_list = [
    new Item("1", "Milk", "5"),
    new Item("2", "Bamba", "2.43"),
    new Item("3", "Cheese", "3"),
    new Item("4", "Meat", "60"),
    new Item("5", "Chichen", "38.2"),
  ];
}
function reset_and_update_local_item_list_and_cart_to_defult() {
  // TODO:
  // debugger;
  reset_item_list_to_defult();
  update_local_storage_item();
  set_item_list();

  reset_cart_list_to_defult();
  update_local_storage_cart();
  set_cart_list();
  set_total_price();
}

// **********
// level 10- validation func:
// **********

function show_eror_log() {
  if (eror_log) {
    console.log("Erors:");
    console.table(eror_log);
  }
}
function check_valid_id(id) {
  try {
    if (id == "" || id == null || id == undefined) throw "empty";
    if (id == null || id == undefined) throw "you press cancel";
    if (isNaN(id)) throw "contains a char";

    // for Persom ID
    // if (String(id).length != 9) throw "doesn't contain 9 digits";

    // for catalog not more than 9 digit:
    if (String(id).length > 9) throw "contain more than 9 digits";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "id eror"]);
    return false;
  }
  return true;
}

function check_valid_string(str) {
  try {
    if (String(str).trim() == "" || str == null || str == undefined)
      throw "empty";
    if (String(str).search(/\d/) >= 0) throw "contain a number";
    // only letters or space allowed
    if (String(str).search(/^[a-zA-Z ]+$/) < 0)
      throw "contain char that isn't a letter";
    if (String(str).length > 20) throw "string more than 20 char";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "string eror"]);
    return false;
  }
  return true;
}

function check_valid_number(str) {
  str = Number(str);
  flag = true;

  try {
    if (str == null) throw "you pressed cancel";
    if (str == "") throw "empty";
    if (isNaN(str)) throw "not a number";

    // if need to check if integer
    // if (!Number.isInteger(str)) throw "not a integer";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "number eror"]);

    return false;
  }
  return flag;
}

function check_if_uniq_id(id) {
  try {
    if (item_list.some((v) => v.item_id == id))
      throw `ID: ${id} , already exists`;
  } catch (err) {
    console.log(err);
    eror_log.push([err, "number eror"]);
    return false;
  }
  return true;
}
