<script setup lang="ts">
const props = defineProps<{
  bot: boolean
  text: string
  date: Date
}>()
</script>

<template>
  <div class="flex">
    <div
      class="w-64 max-w-[max-content] p-3 pb-2 flex flex-col gap-1 shadow-sm"
      :class="[
        props.bot ? 'rounded-r-lg rounded-tl-lg' : 'rounded-l-lg rounded-tr-lg',
        props.bot ? 'bg-primary/30' : 'bg-secondary/30',
        props.bot ? 'mt-auto' : 'ml-auto',
      ]"
    >
      <span>
        {{ props.text }}
      </span>

      <span
        class="text-xs text-gray-500"
        :class="[
          props.bot ? 'mt-auto' : 'ml-auto',
        ]"
      >
        {{ props.date.toLocaleTimeString().slice(0, -3) }}
      </span>
    </div>
  </div>
</template>
