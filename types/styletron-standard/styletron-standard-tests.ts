import {
    driver,
    getInitialStyle,
    renderDeclarativeRules,
    StyleObject,
    StandardEngine,
    KeyframesObject,
    FontFace,
} from 'styletron-standard';

const validStyleObject: StyleObject = {
    display: 'block',
    ':after': {
        content: '" "',
    },
};

const validStyleWithAnimation1: StyleObject = {
    animationName: {
        to: {
            transform: 'rotate(360deg)',
        },
        from: {
            transform: 'rotate(0deg)',
        },
    },
};

const validStyleWithAnimation2: StyleObject = {
    animationDuration: '.1s',
    animationName: {
        '0%': { pointerEvents: 'none' },
        '99%': { pointerEvents: 'none' },
        '100%': { pointerEvents: 'auto' },
    },
};

const renderStyle = (style: StyleObject) => 'style';
const renderKeyframes = (keyframes: KeyframesObject) => 'keyframes';
const renderFontFace = (fontFace: FontFace) => 'font-face';

const engine: StandardEngine = {
    renderStyle,
    renderKeyframes,
    renderFontFace,
};

// driver tests
driver(validStyleObject, engine); // $ExpectType string
driver(getInitialStyle(), engine); // $ExpectType string

// renderDeclarativeRules tests
renderDeclarativeRules(getInitialStyle(), engine); // $ExpectType StyleObject
renderDeclarativeRules(validStyleObject, engine); // $ExpectType StyleObject
