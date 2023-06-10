declare module '*.hoge' {
    export const DEAD: string;
    export const URL: {[key:string]:string};
    export const OPTI: {[key:string]:string};
    export const SCAN: {[key:string]:string};
    export const DEX: {[key:string]:string};
    export const ADDRESS: {[key: string]: {[key: string]:string}};
    export const ABI: {[key: string]: {[key: string]:[]}};
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";