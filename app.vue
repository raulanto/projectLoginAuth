<template>
  <div>
      <Toaster />
      <NuxtLayout>
          <NuxtPage/>
      </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import {Toaster} from "~/components/ui/toast";
</script>