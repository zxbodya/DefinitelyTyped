// Type definitions for styletron-standard 2.0
// Project: https://github.com/styletron/styletron
// Definitions by: Eric Taylor <https://github.com/erictaylor>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.9

import * as CSS from 'csstype';

export type AnimationNameProperty = CSS.Property.AnimationName | KeyframesObject;
export type FontFamilyProperty = CSS.Property.FontFamily | FontFace;
export type Properties = {
    animationName?: AnimationNameProperty;
    fontFamily?: FontFamilyProperty | FontFamilyProperty[];
    MozAnimationName?: AnimationNameProperty;
    WebkitAnimationName?: AnimationNameProperty;
    OAnimationName?: AnimationNameProperty;
} & Omit<
  CSS.StandardProperties<string | number> &
  CSS.VendorProperties<string | number> &
  CSS.ObsoleteProperties<string | number> &
  CSS.SvgProperties<string | number>,
  | "animationName"
  | "fontFamily"
  | "MozAnimationName"
  | "WebkitAnimationName"
  | "OAnimationName"
>;

export type FontFace = CSS.AtRule.FontFace;
export interface KeyframesPercentageObject {
    [key: string]: Properties;
}

export type KeyframesObject = KeyframesPercentageObject & {
    from?: Properties | undefined;
    to?: Properties | undefined;
};

// Unrecognized properties are assumed to be media queries
// or pseudo selectors w/ nested style objects.
// See: https://github.com/styletron/styletron-standard
export type StyleObject = Properties &
    { [key in string]: Properties[keyof Properties] | StyleObject };

export interface StandardEngine {
    renderStyle(style: StyleObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
    renderFontFace(fontFace: FontFace): string;
}

export function driver(style: StyleObject, styletron: StandardEngine): string;

export function getInitialStyle(): StyleObject;

export function renderDeclarativeRules(
    style: StyleObject,
    styletrong: StandardEngine
): StyleObject;
