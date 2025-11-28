window.ChartMonky = {
    version: "0.0.1",
    utils: {},
    charts: {}
};

const ChartMonky = window.ChartMonky;


// Create an SVG element
ChartMonky.utils.createSVG = function(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    // svg.style.border = "1px solid red"; // temporary visibility

    return svg;
};

// Create a rectangle element
ChartMonky.utils.createRect = function(x, y, width, height, fill = "green") {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", fill);

    return rect;
};

ChartMonky.utils.createText = function(x, y, textContent, options = {}) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.textContent = textContent;

    // Styling defaults
    text.setAttribute("font-size", options.fontSize || "12px");
    text.setAttribute("fill", options.color || "black");
    text.setAttribute("text-anchor", options.anchor || "middle");

    return text;
};
// ------------------------------------------------------------------------------------
// Chart Modules
// Bar chart module
ChartMonky.charts.bar = function (data, options = {}) {

    const labels = options.labels || data.map((_, i) => i + 1);

    const width = options.width || 300;
    const height = options.height || 200;
    const barColor = options.color || null;
    const barColors = options.colors || null;


    // Create the root SVG
    const svg = ChartMonky.utils.createSVG(width, height);

    // TEMPORARY: draw one test bar
    // Loop through each data value and draw a bar
    const count = data.length;
    const padding = 30;     // space on left + right
    const spacing = 10;     // space between bars

    // Total space used by all spacings
    const totalSpacing = spacing * (count - 1);

    // Dynamic bar width
    const barWidth = (width - padding * 2 - totalSpacing) / count;

    // Scaling: make the tallest bar fit the chart height
    const maxValue = Math.max(...data);
    // ===== Scaling =====

    // User can pass scaleStep; if not default to automatic 10
    const scaleStep = options.scaleStep || 10;

    // Max value from the data
    const rawMax = Math.max(...data);

    // Round up to nearest scaleStep (nice clean number)
    const niceMax = Math.ceil(rawMax / scaleStep) * scaleStep;

    // Compute pixel scale
    const scale = (height - padding * 2) / niceMax;


    // === Draw each bar ===
    data.forEach((value, index) => {

    const barHeight = value * scale;

    const x = padding + index * (barWidth + spacing);
    const y = height - padding - barHeight;

    // --- Determine color ---
    let fillColor = "blue"; // default

    if (barColors && barColors[index]) {
        fillColor = barColors[index];
    } else if (barColor) {
        fillColor = barColor;
    }

    // --- Create the bar ---
    const bar = ChartMonky.utils.createRect(
        x,
        y,
        barWidth,
        barHeight,
        fillColor
    );
    svg.appendChild(bar);
    // --- Draw value label above bar ---
    const valueX = x + barWidth / 2;
    const valueY = y - 5;
    const valueLabel = ChartMonky.utils.createText(valueX,valueY, value.toString(),{
        fontSize:'10px',
        color:fillColor || "black",
        anchor:'middle'
    })
    svg.appendChild(valueLabel);


    // --- Draw category label under bar ---
    const labelX = x + barWidth / 2;
    const labelY = height - padding + 15;

    const nameLabel = ChartMonky.utils.createText(labelX, labelY, labels[index], {
        fontSize: "10px",
        color: "black",
        anchor: "middle"
    });

    svg.appendChild(nameLabel);
});



    return svg;
};
