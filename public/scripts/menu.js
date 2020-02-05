async function getData() {
    const response = await fetch("/menu");
    const data = await response.json();


    // for (let item of data) {
    data.forEach(element => {
        const root = document.createElement("div");
        const menuItem = document.createElement("span");
        menuItem.textContent = `${element.itemName} - ${element.itemPrice}`;
        const buy = document.createElement("button");
        buy.innerText = "Buy now!";
        menuItem.className = "menuItem";
        root.append(menuItem, buy);
        document.getElementById("menu").append(root);
    });
    console.log(data);
}
getData();