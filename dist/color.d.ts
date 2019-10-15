interface HsvColor {
    h: number;
    s: number;
    v: number;
    a?: number;
}
interface RgbColor {
    r: number;
    g: number;
    b: number;
    a?: number;
}
interface HslColor {
    h: number;
    s: number;
    l: number;
    a?: number;
}
export declare type IroColorValue = IroColor | HsvColor | RgbColor | HslColor | string;
export declare class IroColor {
    onChange: Function;
    private value;
    /**
      * @constructor Color object
      * @param {Object | String | IroColor} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    */
    constructor(value: IroColorValue, onChange?: Function);
    /**
      * @desc set the Color from any valid value
      * @param {Object | String | IroColor} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    */
    set(value: IroColorValue): void;
    /**
      * @desc shortcut to set a specific channel value
      * @param {String} format - hsv | hsl | rgb
      * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
      * @param {Number} value - new value for the channel
    */
    setChannel(format: string, channel: string, value: number): void;
    /**
      * @desc make new Color instance with the same value as this one
      * @return {IroColor}
    */
    clone(): IroColor;
    /**
      * @desc convert hsv object to rgb
      * @param {Object} hsv hsv object
      * @return {Object} rgb object
    */
    static hsvToRgb(hsv: HsvColor): RgbColor;
    /**
      * @desc convert rgb object to hsv
      * @param {Object} rgb - rgb object
      * @return {Object} hsv object
    */
    static rgbToHsv(rgb: RgbColor): HsvColor;
    /**
      * @desc convert hsv object to hsl
      * @param {Object} hsv - hsv object
      * @return {Object} hsl object
    */
    static hsvToHsl(hsv: HsvColor): HslColor;
    /**
      * @desc convert hsl object to hsv
      * @param {Object} hsl - hsl object
      * @return {Object} hsv object
    */
    static hslToHsv(hsl: HslColor): HsvColor;
    hsv: any;
    rgb: any;
    hsl: any;
    rgbString: string;
    hexString: string;
    hslString: string;
}
export {};
