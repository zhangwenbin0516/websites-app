export interface LocaleProps {
    key: string
    label: string
    value: string
}

export const LocaleData: Array<LocaleProps> = [
    {
        key: 'zh-cn',
        label: '简体中文',
        value: 'zh-cn'
    },
    {
        key: 'zh-hk',
        label: '繁体中文',
        value: 'zh-hk'
    },
    {
        key: 'en',
        label: 'English',
        value: 'en'
    }
]