const config = {
    componentName: 'CarouselView',
    name: 'Banner轮播',
    icon: 'https://gw.alicdn.com/tfs/TB1G9tTaBr0gK0jSZFnXXbRRXXa-144-144.png',
    category: 'common',
    grid: 1,
    version: '0.0.1',
    setters: [
        {
            propName: 'label',
            setterName: 'Input',
            category: 'common',
            props: {
                label: '标题',
            },
        },
        {
            propName: 'imageUploadType',
            setterName: 'Select',
            props: {
                label: '添加方式',
                options: [
                    {
                        value: 0,
                        title: '本地上传',
                    }
                ],
            },
        },
        {
            propName: 'autoplay',
            setterName: 'Select',
            category: 'common',
            props: {
                label: '播放方式',
                options: [
                    {
                        value: true,
                        title: '自动播放',
                    },
                ],
            },
        },
        {
            propName: 'autoplayInterval',
            setterName: 'Select',
            category: 'common',
            props: {
                label: '播放间隔',
                options: [
                    {
                        value: 3,
                        title: '3秒',
                    },
                    {
                        value: 4,
                        title: '4秒',
                    },
                    {
                        value: 5,
                        title: '5秒',
                    },
                ],
            },
        },
        // 是否有左右margin
        {
            propName: 'fullWidth',
            setterName: 'Select',
            props: {
                label: '通栏布局',
                options: [
                    {
                        value: true,
                        title: '满栏',
                    },
                    {
                        value: false,
                        title: '非满栏',
                    }
                ],
            },
        },
        // 组件下边距，需要设置min，max，以及默认值
        {
            propName: 'marginBottom',
            setterName: 'Slider',
            category: 'common',
            props: {
                label: '下间距',
                min: 0,
                max: 32,
            },
        },
        // 圆角设置，有间距的通栏布局才生效
        {
            propName: 'borderRadius',
            setterName: 'Select',
            props: {
                label: '填充方式',
                options: [
                    {
                        value: true,
                        title: '圆角',
                    },
                    {
                        value: false,
                        title: '非圆角',
                    }
                ],
            },
            hidden: [{
                propName: 'fullWidth',
                value: true,
            }],
        },
        // 默认图片
        {
            propName: 'defaultImage',
            setterName: 'SelectIconSetter',
            category: 'advanced',
            props: {
                label: '默认图片',
            },
        },
        // 数组
        {
            propName: 'dataSource',
            setterName: 'SelectImgSetter',
            category: 'advanced',
            props: {
                label: '轮播图片',
            },
        },
    ],
    props: {
        label: 'Banner轮播',
        autoplay: true,
        autoplayInterval: 3,
        fullWidth: true,
        marginBottom: 16,
        borderRadius: true,
        source: 0,
        imageUploadType: 0,
        defaultImage: {},
        env: 'dev',
        fetchParams: [
            {
                apiKey: 'getCarouselView',
                params: '',
                inner: true,
            },
        ],
        dataSource: [
            {
                image: 'https://gw.alicdn.com/tfs/TB1kGnhaUT1gK0jSZFrXXcNCXXa-1029-414.png',
                link: 'https://www.dingtalk.com/',
            }
        ],
    },
};

export default config;
