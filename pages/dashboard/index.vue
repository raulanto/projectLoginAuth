<script setup lang=ts>

import ChartStackbar from "~/components/charts/chartStackbar.vue";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";

definePageMeta({
    layout: 'dashboard',
    middleware:'auth'
});



const user = useCookie('user').value;
</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">


        <div class="grid grid-cols-5 grid-rows-5 gap-4 auto-rows-auto">
            <div class="col-span-2 row-span-3 h-fit overflow-y-auto ">
                <Card class="overflow-y-auto h-fit ">
                    <CardContent class="overflow-y-auto">
                        <chart-stackbar/>
                    </CardContent>
                </Card>
            </div>
            <div class="col-span-2 row-span-2 col-start-3">2</div>
            <div class="col-start-5">3</div>
            <div class="col-start-5 row-start-2">4</div>
            <div class="col-span-3 row-span-3 col-start-3 row-start-3">5</div>
            <div class="col-span-2 row-span-2 row-start-4">6</div>
        </div>

    </main>
</template>