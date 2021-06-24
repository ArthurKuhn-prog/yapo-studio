<template>
    <div class="title card button">
        <button type="button">
            {{script.title}}
        </button> <br>
        <span class="description">{{script.description}}</span><br>
        <span class="tags">{{script.type}}</span>
    </div>
</template>

<script>

export default {
    props:{
        script:{
            type: Object,
            required: true
        }
    }
}

</script>