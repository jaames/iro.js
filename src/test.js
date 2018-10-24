import iro from "./iro";

let wrap = document.createElement("div");
wrap.id = "demoWheel";
document.body.appendChild(wrap);

var demo = new iro.ColorPicker("#demoWheel", {
  width: 360,
  height: 360,
  markerRadius: 8,
  color: "#f00",
  borderWidth: 2,
  padding: 4,
  anticlockwise: true,
  css: {
    body: {
      "background-color": "$color",
      "color": "$color"
    },
    ".test": {
      "border-color": "$color",
      "color": "$color"
    }
  }
});

window.demo = demo;
export default iro;

