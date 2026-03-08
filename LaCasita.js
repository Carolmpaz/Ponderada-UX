// Limpa o canvas antes de começar para evitar duplicação
d3.select("#canvas").html("");

const svg = d3.select("#canvas")
    .append("svg")
    .attr("viewBox", "0 0 2187 757")
    .attr("width", "100%")
    .attr("height", "auto")
    .style("background", "#0a0a0a"); // Fundo bem escuro para o show

const defs = svg.append("defs");

// --- 1. GRADIENTES (Copiados exatamente do seu original) ---
const createGrad = (id, x1, y1, x2, y2, stops) => {
    const lg = defs.append("linearGradient")
        .attr("id", id).attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2)
        .attr("gradientUnits", "userSpaceOnUse");
    stops.forEach(s => lg.append("stop").attr("offset", s.offset).attr("stop-color", s.color));
};

createGrad("paint0_linear_0_1", 951.5, 404, 952, 434.5, [{offset: 0, color: "black"}, {offset: 1, color: "#E0AF75"}]);
const soil = [{offset: 0, color: "#525004"}, {offset: 1, color: "#797B29"}];
for(let i=1; i<=13; i++) createGrad(`paint${i}_linear_0_1`, 0, 496, 0, 588, soil);

// --- 2. CAMADA DE LUZES (ATRÁS DE TUDO) ---
const lightGroup = svg.append("g").attr("class", "light-layer").style("opacity", 0);
const lightColors = ["#00f2ff", "#ff007b", "#adff00", "#ffbb00"];

const beams = lightGroup.selectAll(".beam")
    .data(d3.range(6))
    .enter()
    .append("path")
    .attr("d", "M 0 0 L -300 1500 L 300 1500 Z")
    .attr("fill", (d, i) => lightColors[i % lightColors.length])
    .attr("fill-opacity", 0.2)
    .attr("transform", (d, i) => `translate(${(i + 1) * 350}, -50)`);

function animate() {
    beams.transition()
        .duration(() => 2000 + Math.random() * 2000)
        .attr("transform", (d, i) => `translate(${(i + 1) * 350}, -50) rotate(${Math.random() * 50 - 25})`)
        .on("end", animate);
}
animate();

// --- 3. O DESENHO (CRIADO ELEMENTO POR ELEMENTO) ---
const draw = svg.append("g").attr("class", "main-draw");

// Ordem exata do seu SVG original para não perder nada
draw.append("rect").attr("x", 448).attr("y", 105).attr("width", 400).attr("height", 337).attr("fill", "#EEA572");
draw.append("rect").attr("x", 448).attr("y", 105).attr("width", 958).attr("height", 337).attr("fill", "#EEA572");
draw.append("path").attr("d", "M1584 300L1755 378.912V494L1589.5 458.5L1584 300Z").attr("fill", "#A9654F");
draw.append("rect").attr("x", 1381).attr("y", 105).attr("width", 96).attr("height", 337).attr("fill", "#BF735B");
draw.append("path").attr("d", "M448 442H1632.5L1701 481H448V442Z").attr("fill", "#E0AF75");
draw.append("rect").attr("x", 488).attr("y", 195).attr("width", 315).attr("height", 156).attr("fill", "#626154").attr("stroke", "#DAAD16").attr("stroke-width", 12);
draw.append("rect").attr("x", 1058).attr("y", 195).attr("width", 168).attr("height", 156).attr("fill", "#626154").attr("stroke", "#DAAD16").attr("stroke-width", 12);
draw.append("rect").attr("x", 894).attr("y", 207).attr("width", 115).attr("height", 235).attr("fill", "#151515");
draw.append("path").attr("d", "M925.5 404.158L981 404L1009 442H894L925.5 404.158Z").attr("fill", "url(#paint0_linear_0_1)");
draw.append("path").attr("d", "M398 481H324V88H398V481ZM896 481H822V88H896V481ZM1319 481H1245V88H1319V481ZM1817 481H1743V88H1817V481Z").attr("fill", "#E68D76");
draw.append("rect").attr("x", 448).attr("y", 88).attr("width", 14).attr("height", 354).attr("fill", "#D98670");
draw.append("rect").attr("x", 1539).attr("y", 126).attr("width", 53).attr("height", 316).attr("fill", "#BF735B");
draw.append("path").attr("d", "M1381 88H1643L1691.25 101.5L1381 183V88Z").attr("fill", "#BF735B");
draw.append("rect").attr("x", 324).attr("y", 88).attr("width", 1453).attr("height", 17).attr("fill", "#E68D76");

// Curvas dos pilares
const p = ["M822.5 105H727L731.197 105.7C777.339 113.39 813.789 149.04 822.5 195V105Z", "M448.5 105L393.5 115.852C417.342 117.411 437.109 134.902 441.558 158.376L448.5 195V105Z", "M896 105H991.5L987.303 105.7C941.161 113.39 904.711 149.04 896 195V105Z", "M1245.5 105H1150L1154.2 105.7C1200.34 113.39 1236.79 149.04 1245.5 195V105Z", "M1754.5 105H1659L1663.2 105.7C1709.34 113.39 1745.79 149.04 1754.5 195V105Z", "M1319 105H1414.5L1410.3 105.7C1364.16 113.39 1327.71 149.04 1319 195V105Z", "M398 105H493.5L489.303 105.7C443.161 113.39 406.711 149.04 398 195V105Z"];
p.forEach((d, i) => draw.append("path").attr("d", d).attr("fill", i===1 ? "#D98670" : "#E68D76"));

draw.append("rect").attr("x", 115).attr("y", 52).attr("width", 1809).attr("height", 36).attr("fill", "#CA6D55");
draw.append("rect").attr("width", 2039).attr("height", 52).attr("fill", "#DAAD16");
draw.append("rect").attr("y", 642).attr("width", 2187).attr("height", 115).attr("fill", "#525004");
draw.append("path").attr("d", "M221.489 563H1951.03L2187 642H0L221.489 563Z").attr("fill", "#797B29");

const supports = [[324, 481, 1493], [534, 522, 124], [797, 522, 124], [1020, 522, 124], [1220, 522, 124], [1468, 522, 124], [1693, 522, 124], [324, 522, 124]];
supports.forEach(s => draw.append("rect").attr("x", s[0]).attr("y", s[1]).attr("width", s[2]).attr("height", 41).attr("fill", "#FDAD99"));

draw.append("path").attr("d", "M448 442V481H394L448 442Z").attr("fill", "#E0AF75");

// Sombras e rodas
[865.5, 329.5, 1283.5, 1777.5].forEach(cx => draw.append("ellipse").attr("cx", cx).attr("cy", 582).attr("rx", 102.5).attr("ry", 12).attr("fill", "black").attr("fill-opacity", 0.42));
[[912, 1], [813, 2], [813, 3], [1335, 4], [1236, 5], [1827, 6], [1728, 7], [379, 8], [280, 9]].forEach(w => draw.append("ellipse").attr("cx", w[0]).attr("cy", 542).attr("rx", 46).attr("ry", 46).attr("transform", `rotate(180 ${w[0]} 542)`).attr("fill", `url(#paint${w[1]}_linear_0_1)`));
[[859.5, 10], [329.5, 11], [1288.5, 12], [1777.5, 13]].forEach(w => draw.append("ellipse").attr("cx", w[0]).attr("cy", 510.5).attr("rx", 68.5).attr("ry", 68.5).attr("transform", `rotate(180 ${w[0]} 510.5)`).attr("fill", `url(#paint${w[1]}_linear_0_1)`));

draw.append("rect").attr("x", 494).attr("y", 201).attr("width", 303).attr("height", 72).attr("fill", "#3D3D3D");
draw.append("rect").attr("x", 1064).attr("y", 201).attr("width", 156).attr("height", 72).attr("fill", "#434343");
[592, 689, 1137].forEach(x => draw.append("rect").attr("x", x).attr("y", 201).attr("width", 10).attr("height", 144).attr("fill", "#2B2B2B"));
draw.append("path").attr("d", "M1455 105H1536C1536 116.598 1526.6 126 1515 126H1476C1464.4 126 1455 116.598 1455 105Z").attr("fill", "#D9D9D9");

// --- 4. INTERAÇÃO ---
svg.on("mouseenter", () => lightGroup.transition().duration(500).style("opacity", 1))
   .on("mouseleave", () => lightGroup.transition().duration(500).style("opacity", 0));
