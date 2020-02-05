//   var db = openDatabase("menu", "1.0", "store menu items", 65535);

//   $(function(){
//     $("#crt-tbl").click(function(){
//     db.transaction(function(transaction){
//       var sql = "CREATE TABLE menu" +
//       "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
//       "item VARCHAR(20) NOT NULL," +
//       "quantity INT(5) NOT NULL)";
//       transaction.executeSql(sql, undefined,
//       function(){
//         alert("table created!");
//       }, function(){
//         alert("table exists!");
//       })
//     })
//   })
// })

let menu = [];

const menuDiv = document.querySelector("#menu");
const inputName = document.querySelector("#item-name");
const inputPrice = document.querySelector("#item-price");

document
    .querySelector("#add-btn")
    .addEventListener("click", addItem);
document
    .querySelector("#del-btn")
    .addEventListener("click", () => delItem(menu.length - 1));

document
    .querySelector("#viw-mnu")
    .addEventListener("click", function () {
        location.href = "/menu.html";
    })

function render(items) {
    menuDiv.innerHTML = "";
    [inputName, inputPrice].forEach(input => (input.value = ""));
    items.forEach((item, index) =>
        menuDiv.append(menuElement(item, index))
    );
}

function menuElement(item, index) {
    const menuText = document.createElement("span");
    menuText.innerText = `${item.itemName}   -   ${item.itemPrice}`;

    const delBtn = document.createElement("button");
    delBtn.innerText = "delete item";
    delBtn.addEventListener("click", () => delItem(index));

    const itemDiv = document.createElement("div");
    [menuText, delBtn].forEach(el => itemDiv.append(el));

    return itemDiv;
}

function delItem(index) {
    menu.splice(index, 1);
    render(menu);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menu)
    };
    fetch("/menu", options)
        .then(res => console.log(res));
}

function addItem() {
    menu.push({
        itemName: inputName.value,
        itemPrice: inputPrice.value
    });
    // localStorage.setItem("itemName", inputName.value);
    // localStorage.setItem("itemPrice", inputPrice.value);
    // menu.forEach((item, index) =>
    //   localStorage.setItem(index, JSON.stringify(item))
    // );
    // console.log(JSON.parse(localStorage));
    console.log(menu);
    // console.log(localStorage.getItem("itemName"));
    // console.log(localStorage.getItem("itemPrice"));
    render(menu);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(menu)
    };
    fetch("/menu", options)
        .then(res => console.log(res));
    // console.log("fetch sent");
}
