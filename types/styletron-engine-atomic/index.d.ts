// Type definitions for styletron-engine-atomic 1.4
// Project: https://github.com/styletron/styletron
// Definitions by: Jhey Tompkins <https://github.com/jh3y>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.9

import { StandardEngine, KeyframesObject, FontFaceObject, StyleObject } from 'styletron-standard';

declare class SequentialIDGenerator {
    prefix: string;
    count: number;
    offset: number;
    msb: number;
    power: number;
    constructor(prefix?: string);
    next(): string;
    increment(): number;
}

type OnNewCacheFn<T> = (c: string, b: Cache<T>, a?: string | null) => any;
type OnNewValueFn<T> = (cache: Cache<T>, id: string, value: T) => any;
declare class MultiCache<T> {
    caches: {
        [x: string]: Cache<T>;
    };
    idGenerator: SequentialIDGenerator;
    onNewCache: OnNewCacheFn<T>;
    onNewValue: OnNewValueFn<T>;
    sortedCacheKeys: string[];
    constructor(idGenerator: SequentialIDGenerator, onNewCache: OnNewCacheFn<T>, onNewValue: OnNewValueFn<T>);
    getCache(key: string): Cache<T>;
    getSortedCacheKeys(): string[];
}
declare class Cache<T> {
    cache: {
        [x: string]: string;
    };
    idGenerator: SequentialIDGenerator;
    key: string;
    onNewValue: (cache: Cache<T>, id: string, value: any) => any;
    constructor(idGenerator: SequentialIDGenerator, onNewValue: (cache: Cache<T>, id: string, value: any) => any);
    addValue(key: string, value: T): string;
}

type hydrateT = HTMLCollectionOf<HTMLStyleElement> | HTMLStyleElement[] | NodeListOf<HTMLStyleElement>;
interface optionsT$1 {
    hydrate?: hydrateT;
    container?: Element;
    prefix?: string;
}
declare class StyletronClient implements StandardEngine {
    container: Element;
    styleElements: {
        [x: string]: HTMLStyleElement;
    };
    fontFaceSheet: HTMLStyleElement;
    keyframesSheet: HTMLStyleElement;
    styleCache: MultiCache<{
        pseudo: string;
        block: string;
    }>;
    keyframesCache: Cache<KeyframesObject>;
    fontFaceCache: Cache<FontFaceObject>;
    constructor(opts?: optionsT$1);
    renderStyle(style: StyleObject): string;
    renderFontFace(fontFace: FontFaceObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
}

interface attrsT {
    'data-hydrate'?: 'keyframes' | 'font-face';
    media?: string;
    class?: string;
}
interface sheetT {
    css: string;
    attrs: attrsT;
}
interface optionsT {
    prefix?: string;
}
declare class StyletronServer implements StandardEngine {
    styleCache: MultiCache<{
        pseudo: string;
        block: string;
    }>;
    keyframesCache: Cache<KeyframesObject>;
    fontFaceCache: Cache<FontFaceObject>;
    styleRules: {
        [x: string]: string;
    };
    keyframesRules: string;
    fontFaceRules: string;
    constructor(opts?: optionsT);
    renderStyle(style: StyleObject): string;
    renderFontFace(fontFace: FontFaceObject): string;
    renderKeyframes(keyframes: KeyframesObject): string;
    getStylesheets(): sheetT[];
    getStylesheetsHtml(className?: string): string;
    getCss(): string;
}

declare global {
    interface Window {
        __STYLETRON_DEVTOOLS__: any;
    }
}

export { StyletronClient as Client, StyletronServer as Server };
