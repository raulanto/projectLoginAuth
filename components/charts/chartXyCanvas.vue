
<script setup lang="ts">
import { ref } from "vue";
import {
    VueDataUi,
    type VueUiXyCanvasDatasetItem,
    type VueUiXyCanvasConfig
} from "vue-data-ui";
import "vue-data-ui/style.css";


const dataset = ref<VueUiXyCanvasDatasetItem[]>();
const config = ref<VueUiXyCanvasConfig>();
</script>

<template>
    <client-only>
        <VueDataUi
            component="VueUiXyCanvas"
            :dataset="dataset"
            :config="config"
        />
    </client-only>

</template>
