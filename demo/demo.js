// --- SVG Utilities Demo ---
const utilsDemo = document.getElementById("utils-demo");

// (no click listener yet)

const svg = ChartMonky.utils.createSVG(200, 150);
const rect = ChartMonky.utils.createRect(20, 40, 50, 80, "green");
svg.appendChild(rect);
utilsDemo.appendChild(svg);

// --- Bar Chart Demo ---
const barDemo = document.getElementById("bar-demo");

const barChart = ChartMonky.charts.bar([5,120,80], {
    width: 300,
    height: 200,
    labels: ["one","two","three"],
    scaleStep:20,
    colors: ["red","orange","green"],
});

barDemo.appendChild(barChart);

// --- Warehouse Map Chart Demo ---
const warehouseDemo = document.getElementById("warehouse-demo");

const warehouseChart = ChartMonky.charts.warehouse({
    width: 400,
    height: 300,
    image: "../images/warehouse.png",
    points: [
        { x: 134, y: 65, color: "red", flash:true, id:'a1' }
    ]
});

warehouseDemo.appendChild(warehouseChart.svg);

// ⭐ CLICK LISTENER GOES HERE ⭐
warehouseChart.svg.addEventListener("click", (e) => {
    const rect = warehouseChart.svg.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    console.log("Point coords:", { x, y });
});

// test add-point
warehouseChart.addPoint({
    id: "a2",
    x: 236,
    y: 87,
    color: "blue",
    flash: false,
    radius: 6
});
