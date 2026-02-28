let tokenNumber = 1;
let orders = JSON.parse(localStorage.getItem("orders")) || [];
function displayMyOrders() {
    let studentName = document.getElementById("studentName").value.trim();
    let table = document.getElementById("myOrdersTable");
    table.innerHTML = "";

    if(studentName === "") return;
    let myOrders = orders.filter(o => o.name.toLowerCase() === studentName.toLowerCase());

    myOrders.forEach(order => {
        let row = `
            <tr>
                <td>${order.token}</td>
                <td>${order.item}</td>
                <td>${order.waitingTime}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function updateCrowdIndicator() {
    let activeOrders = orders.length; 
    let level = "";
    let indicator = document.getElementById("crowdLevel");

    if (activeOrders <= 3) {
        level = "Empty";
        indicator.className = "empty";
    } else if (activeOrders <= 7) {
        level = "Moderate";
        indicator.className = "moderate";
    } else {
        level = "Crowded";
        indicator.className = "crowded";
    }

    indicator.innerText = level;
}
function placeOrder() {
    let name = document.getElementById("studentName").value.trim();
    let item = document.getElementById("item").value;

    if(name === "") { 
        alert("Enter your name"); 
        return; 
    }
    let waitingTime = orders.length * 2;

    let order = {
        token: tokenNumber++,
        name: name,
        item: item,
        waitingTime: waitingTime
    };

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    displayMyOrders();
    updateCrowdIndicator();
}
setInterval(() => {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    displayMyOrders();
    updateCrowdIndicator();

}, 2000);
