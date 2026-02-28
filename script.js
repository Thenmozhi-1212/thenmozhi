let tokenNumber = 1;

// Load all orders from localStorage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Display only current student's orders
function displayMyOrders() {
    let studentName = document.getElementById("studentName").value.trim();
    let table = document.getElementById("myOrdersTable");
    table.innerHTML = "";

    if(studentName === "") return;

    // Filter orders by this student only
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

// Crowd indicator based on total active orders
function updateCrowdIndicator() {
    let activeOrders = orders.length; // total orders in the system
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

// Place a new order
function placeOrder() {
    let name = document.getElementById("studentName").value.trim();
    let item = document.getElementById("item").value;

    if(name === "") { 
        alert("Enter your name"); 
        return; 
    }

    // Waiting time = total orders in the queue * 2 minutes
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

// Auto-refresh every 2 seconds
setInterval(() => {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    displayMyOrders();
    updateCrowdIndicator();
}, 2000);