window.ChartMonky = {
    version: "0.0.1",
    utils: {},
    charts: {}
};

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

