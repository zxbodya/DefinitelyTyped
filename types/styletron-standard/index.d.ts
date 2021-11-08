// Type definitions for styletron-standard 3.0
// Project: https://github.com/styletron/styletron
// Definitions by: Eric Taylor <https://github.com/erictaylor>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.9

import { StandardProperties, VendorProperties, ObsoleteProperties, SvgProperties, Property, AtRule } from 'csstype';

interface KeyframesPercentageObject {
    [key: string]: Properties;
}
type KeyframesObject = KeyframesPercentageObject & {
    from?: Properties;
    to?: Properties;
};
type AnimationNameProperty = Property.AnimationName | KeyframesObject;
type FontFaceObject = AtRule.FontFace;
type FontFamilyProperty = Property.FontFamily | FontFaceObject;
type TLength = string | 0;
type Properties = {
    animationName?: AnimationNameProperty;
    fontFamily?: FontFamilyProperty | FontFamilyProperty[];
    MozAnimationName?: AnimationNameProperty;
    WebkitAnimationName?: AnimationNameProperty;
    OAnimationName?: AnimationNameProperty;
} & Omit<
    StandardProperties<TLength> & VendorProperties<TLength> & ObsoleteProperties<TLength> & SvgProperties<TLength>,
    'animationName' | 'fontFamily' | 'MozAnimationName' | 'WebkitAnimationName' | 'OAnimationName'
>;

interface NestedStyleObject {
    [x: string]: StyleObject;
}
type StyleObject = NestedStyleObject | Properties;
interface StandardEngine {
    renderStyle(style: StyleObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
    renderFontFace(fontFace: FontFaceObject): string;
}
declare function driver(style: StyleObject, styletron: StandardEngine): string;
declare function getInitialStyle(): StyleObject;
declare function renderDeclarativeRules(style: StyleObject, styletron: StandardEngine): StyleObject;

/**
 * @deprecated use `FontFaceObject` instead
 */
type FontFace = FontFaceObject;

export {
    FontFace,
    FontFaceObject,
    KeyframesObject,
    NestedStyleObject,
    Properties,
    StandardEngine,
    StyleObject,
    driver,
    getInitialStyle,
    renderDeclarativeRules,
};
