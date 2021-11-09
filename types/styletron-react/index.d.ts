// Type definitions for styletron-react 6.0
// Project: https://github.com/styletron/styletron
// Definitions by: Eric Taylor <https://github.com/erictaylor>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

import * as React from 'react';
import { StyleObject, StandardEngine, driver } from 'styletron-standard';
export { StyleObject } from 'styletron-standard';

interface AssignmentCommutativeReducerContainer {
    assignmentCommutative: true;
    reducer: (style: StyleObject) => StyleObject;
    style: StyleObject;
    factory: (style: StyleObject) => AssignmentCommutativeReducerContainer;
}

interface NonAssignmentCommutativeReducerContainer {
    assignmentCommutative: false;
    reducer: (style: StyleObject, props?: object) => StyleObject;
}

type ReducerContainer = AssignmentCommutativeReducerContainer | NonAssignmentCommutativeReducerContainer;

interface Styletron {
    reducers: ReducerContainer[];
    base: React.ElementType;
    driver: typeof driver;
    name?: string;
    wrapper: (fc: React.FC<any>) => React.ComponentType<any>;
    getInitialStyle: () => StyleObject;
    ext?: {
        name?: string | null;
        base: any;
        getInitialStyle: any;
        with: any;
    };
    debug?: {
        stackIndex: number;
        stackInfo: {
            stack: string | undefined;
            stacktrace: any;
            message: string;
        };
    };
}

type StyletronProps<Props = {}> = Partial<{
    $style: StyleObject | ((props: Props) => StyleObject);
    $as: React.ComponentType<any> | keyof JSX.IntrinsicElements;
    className: string;
    /** @deprecated */
    $ref: Props extends {
        ref?: infer T;
    }
        ? T
        : React.Ref<any>;
    ref: Props extends {
        ref?: infer T;
    }
        ? T
        : React.Ref<any>;
}>;
type StyletronComponent<Props> = React.FC<Props & StyletronProps<Props>> & {
    __STYLETRON__: any;
};
interface StyledFn {
    <T extends keyof JSX.IntrinsicElements | React.ComponentType<any>, Props>(
        component: T,
        style: StyleObject | ((a: Props) => StyleObject),
    ): StyletronComponent<
        (T extends React.ComponentType<infer BaseProps>
            ? BaseProps
            : T extends keyof JSX.IntrinsicElements
            ? JSX.IntrinsicElements[T]
            : {}) &
            Props
    >;
}
interface WithStyleFn {
    <Base extends StyletronComponent<any>, Props = {}>(
        comnponent: Base,
        a: StyleObject | ((a: Props) => StyleObject),
    ): StyletronComponent<(Base extends StyletronComponent<infer BaseProps> ? BaseProps : never) & Props>;
}
type WithTransformFn = <Base extends StyletronComponent<any>, Props>(
    b: Base,
    a: (b: StyleObject, a: Props) => StyleObject,
) => StyletronComponent<(Base extends StyletronComponent<infer BaseProps> ? BaseProps : never) & Props>;
type WithWrapperFn = <Base extends StyletronComponent<any>, Props>(
    component: Base,
    wrapper: (a: Base) => React.ComponentType<Props>,
) => StyletronComponent<(Base extends StyletronComponent<infer BaseProps> ? BaseProps : never) & Props>;

declare class BrowserDebugEngine {
    private worker;
    private counter;
    constructor(worker?: any);
    debug({ stackIndex, stackInfo }: { stackIndex: any; stackInfo: any }): string;
}
declare class NoopDebugEngine {
    debug(): void;
}

declare const DebugEngine: typeof BrowserDebugEngine | typeof NoopDebugEngine;

declare global {
    interface Window {
        __STYLETRON_DEVTOOLS__: any;
    }
}

interface DevProviderProps {
    children: React.ReactNode;
    value: StandardEngine;
    debugAfterHydration?: boolean;
    debug?: any;
}

declare class DevProvider extends React.Component<
    DevProviderProps,
    {
        hydrating: boolean;
    }
> {
    constructor(props: DevProviderProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const Provider: typeof DevProvider | React.Provider<StandardEngine>;

interface CreateStyledOptions {
    getInitialStyle: () => StyleObject;
    driver: typeof driver;
    wrapper: (a: React.FC<any>) => React.ComponentType<any>;
}

declare function useStyletron(): [(style: StyleObject) => string];
declare function createStyled({ getInitialStyle, driver, wrapper }: CreateStyledOptions): StyledFn;
declare const styled: StyledFn;
declare const withTransform: WithTransformFn;
declare const withStyleDeep: WithStyleFn;
declare const withStyle: WithStyleFn;
declare const withWrapper: WithWrapperFn;
declare function autoComposeShallow(
    styletron: Styletron,
    styleArg: StyleObject | ((props: object) => StyleObject),
): Styletron;
declare function autoComposeDeep(
    styletron: Styletron,
    styleArg: StyleObject | ((props: object) => StyleObject),
): Styletron;
declare function staticComposeShallow(styletron: Styletron, style: StyleObject): Styletron;
declare function staticComposeDeep(styletron: Styletron, style: StyleObject): Styletron;
declare function dynamicComposeShallow(styletron: Styletron, styleFn: (props: object) => StyleObject): Styletron;
declare function dynamicComposeDeep(styletron: Styletron, styleFn: (props: object) => StyleObject): Styletron;
declare function createShallowMergeReducer(style: StyleObject): AssignmentCommutativeReducerContainer;
declare function createDeepMergeReducer(style: StyleObject): AssignmentCommutativeReducerContainer;
declare function composeStatic(
    styletron: Styletron,
    reducerContainer: AssignmentCommutativeReducerContainer,
): Styletron;
declare function composeDynamic(
    styletron: Styletron,
    reducer: (style: StyleObject, props: object) => StyleObject,
): Styletron;
declare function createStyledElementComponent(styletron: Styletron): StyletronComponent<any>;
declare function resolveStyle(
    getInitialStyle: () => StyleObject,
    reducers: ReducerContainer[],
    props: object,
): StyleObject;

// added for backward compatibility
export { StandardEngine, DevProvider };
export { StyletronComponent, StyledFn, WithStyleFn };

export {
    DebugEngine,
    Provider,
    StyletronProps,
    autoComposeDeep,
    autoComposeShallow,
    composeDynamic,
    composeStatic,
    createDeepMergeReducer,
    createShallowMergeReducer,
    createStyled,
    createStyledElementComponent,
    dynamicComposeDeep,
    dynamicComposeShallow,
    resolveStyle,
    staticComposeDeep,
    staticComposeShallow,
    styled,
    useStyletron,
    withStyle,
    withStyleDeep,
    withTransform,
    withWrapper,
};
