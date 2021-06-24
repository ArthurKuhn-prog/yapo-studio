export default{
    components: true,
    head: {
        titleTemplate: "Yapo Studio - %s", 
        htmlAttrs: {
            lang: "en",
        },
        bodyAttrs:{
            class:["body"],
        },
        meta: [{
            charset: 'utf-8',
        }]
    },
    router: {
        prefetchLinks: false,
    },
    plugins:[
        {
            src:'~/plugins/simplestScript.client',
        },
        {
            src:'~/plugins/libCalls',
        }
    ]
}