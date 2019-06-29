interface HSV {
    h: number;
    s: number;
    v: number;
    a?: number;
}
interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}
interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}
export default class Color {
    _onChange: any;
    private value;
    /**
      * @constructor Color object
      * @param {Object | String | Color} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    */
    constructor(value: any);
    /**
      * @desc set the Color from any valid value
      * @param {Object | String | Color} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    */
    set(value: any): void;
    /**
      * @desc shortcut to set a specific channel value
      * @param {String} format - hsv | hsl | rgb
      * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
      * @param {Number} value - new value for the channel
    */
    setChannel(format: string, channel: string, value: number): void;
    /**
      * @desc make new Color instance with the same value as this one
      * @return {Color}
    */
    clone(): Color;
    /**
      * @desc convert hsv object to rgb
      * @param {Object} hsv hsv object
      * @return {Object} rgb object
    */
    static hsvToRgb(hsv: HSV): {
        r: number;
        g: number;
        b: number;
    };
    /**
      * @desc convert rgb object to hsv
      * @param {Object} rgb - rgb object
      * @return {Object} hsv object
    */
    static rgbToHsv(rgb: RGB): {
        h: number;
        s: number;
        v: number;
    };
    /**
      * @desc convert hsv object to hsl
      * @param {Object} hsv - hsv object
      * @return {Object} hsl object
    */
    static hsvToHsl(hsv: HSV): {
        h: number;
        s: number;
        l: number;
    };
    /**
      * @desc convert hsl object to hsv
      * @param {Object} hsl - hsl object
      * @return {Object} hsv object
    */
    static hslToHsv(hsl: HSL): {
        h: number;
        s: number;
        v: number;
    };
    hsv: {
        h: any;
        s: any;
        v: any;
    };
    rgb: any;
    hsl: any;
    rgbString: any;
    hexString: string;
    hslString: any;
}
export {};
