// --- SVG Utilities Demo ---
const utilsDemo = document.getElementById("utils-demo");

const svg = ChartMonky.utils.createSVG(200, 150);
const rect = ChartMonky.utils.createRect(20, 40, 50, 80, "green");
svg.appendChild(rect);

utilsDemo.appendChild(svg);

// --- Bar Chart Demo ---
const barDemo = document.getElementById("bar-demo");

const barChart = ChartMonky.charts.bar([5,10,80,10,6,50], {
    width: 300,
    height: 200,
    // default 10
    labels: ["one", "two", "three", "four", "five", "six"],
    scaleStep:20,
    colors: ["red", "orange", "yellow", "green"],
});

barDemo.appendChild(barChart);
