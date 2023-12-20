declare module '*.module.scss' {
    const className: {readonly [key: string]: string}
    export default className
}

declare module '*.module.sass' {
    const className: {readonly [key: string]: string}
    export default className
}

declare module '*.json' {
    const className: {readonly [key: string]: any}
    export default className
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.git'