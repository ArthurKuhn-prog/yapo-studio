<template>
    <div style="margin: auto; text-align: center;">
        <h1>{{script.title}}</h1>
        {{script.description}}
        
        <button type="button" ref="toggle" v-on:click="scriptLauncher()">Start the script</button>

        <div ref="canvas" style="width:800px; height: 800px; border: 1px solid black;"></div>
    </div>
</template>

<script>
import scripts from'~/data/p5Scripts'

export default {
    head(){
        return {
        }
    },
    data(){
        return {
            script:{}
        }
    },
    methods:{
        scriptLauncher: function(){
            this.[`$${this.script.linkTitle}`].[this.script.linkTitle](this.$refs.canvas)
        }
    },
    mounted(){
        this.script.libraries.forEach(lib => {
            if(lib.side === "client"){
                this.$libCalls.libCall(lib)
            }            
        });
    },
    created(){
        const script = scripts.find((script) => script.linkTitle == this.$route.params.id)
        this.script = script

        script.libraries.forEach(lib => {
            if(lib.side === "server"){

            }            
        });
    }
}

</script>