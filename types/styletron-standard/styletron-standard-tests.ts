import {
    driver,
    getInitialStyle,
    renderDeclarativeRules,
    StyleObject,
    StandardEngine,
    KeyframesObject,
    FontFaceObject,
} from 'styletron-standard';

const validStyleObject: StyleObject = {
    display: 'block',
    ':after': {
        content: '" "',
    },
};

const renderStyle = (style: StyleObject) => 'style';
const renderKeyframes = (keyframes: KeyframesObject) => 'keyframes';
const renderFontFace = (fontFace: FontFaceObject) => 'font-face';

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
