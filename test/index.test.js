import chai from "chai";

require("jsdom-global")();

// import the iro class instance
import iro from "../src/iro.js";
// import the color models
import hsl from "../src/colorModels/hsl.js";
import rgb from "../src/colorModels/rgb.js";
import hslString from "../src/colorModels/hslString.js";
import rgbString from "../src/colorModels/rgbString.js";
import hexString from "../src/colorModels/hexString.js";

chai.should();

describe("Iro Library Test", function () {

  describe("iro.stylesheet", function () {

    var stylesheet = new iro.stylesheet({
      body: {
        "background-color": "rgb",
        "color": "rgb"
      },
    });

    var rgbString = "rgb(255, 0, 0)";
    stylesheet.update({rgbString});
    var bodyCss = getComputedStyle(document.body);

    it("should correctly style elements", function () {
      bodyCss.backgroundColor.should.equal(rgbString);
      bodyCss.color.should.equal(rgbString);
    });

    rgbString = "rgb(255, 0, 255)";
    stylesheet.update({rgbString});
    bodyCss = getComputedStyle(document.body);

    it("should correctly update styles", function () {
      bodyCss.backgroundColor.should.equal(rgbString);
      bodyCss.color.should.equal(rgbString);
    });

  });

});
