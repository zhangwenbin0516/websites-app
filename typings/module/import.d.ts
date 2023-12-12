declare module '*.module.scss' {
    const className: {readonly [key: string]: string}
    export default className
}

declare module '*.module.sass' {
    const className: {readonly [key: string]: string}
    export default className
}

declare module '*.png'