export interface LocaleProps {
    key: string
    label: string
    value: string
}

export const LocaleData: Array<LocaleProps> = [
    {
        key: 'zh-CN',
        label: '简体中文',
        value: 'zh-CN'
    },
    {
        key: 'zh-HK',
        label: '繁体中文',
        value: 'zh-HK'
    },
    {
        key: 'en',
        label: 'English',
        value: 'en'
    }
]