<template>
    <div>
        <Logo />
        <div v-for="script in scripts" :key="script.objectID">
            <nuxt-link :to="`/scripts/${script.linkTitle}`">
                <title-card :script="script"></title-card>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import scripts from'~/data/p5Scripts'

export default {
    head(){
        return {
            title: 'Homepage',
            meta: [{
                name: "description",
                content: "Homepage of Yapo Studio, collection of scripts for artists online",
                hid: "description"
            }]
        }
    },
    data(){
        return {
            scripts: scripts,
        }
    }
}

</script>
