<template>
    <v-col class="fill-height">
        <v-row justify="center" style="height: 50%; overflow: auto;">
            <slot name="c1"></slot>
        </v-row>
        <v-row style="height: 50%;">
            <v-col class="fill-height" style="overflow: auto;">
                <slot name="c2"></slot>
            </v-col>
            <v-col class="fill-height" style="overflow: auto;">
                <slot name="c3"></slot>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
  name: 'Layout2'
}
</script>

<style scoped>

</style>
