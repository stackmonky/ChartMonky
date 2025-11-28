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
