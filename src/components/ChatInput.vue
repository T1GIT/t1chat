<script setup lang="ts">
import { computed, useModel } from 'vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import { Hint } from '../constants/hint.ts'

const props = defineProps<{
  text: string
}>()

const emits = defineEmits<{
  (e: 'update:text', value: string): void
  (e: 'send'): void
}>()

const text = useModel(props, 'text')
const empty = computed(() => text.value === '')

function handleHint(content: string) {
  text.value = content
  emits('send')
}

function handleSubmit() {
  if (!empty.value)
    emits('send')
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-row flex-wrap gap-2">
      <button
        v-for="hint in Object.values(Hint)"
        :key="hint"
        class="px-2 py-1 bg-secondary/40 rounded-lg shadow-sm outline-0 transition duration-300 hover:bg-secondary/80 hover:duration-200 active:bg-secondary active:duration-100"
        @click="handleHint(hint)"
      >
        {{ hint }}
      </button>
    </div>

    <form class="relative pr-3 flex flex-row bg-white rounded-2xl shadow-lg" @submit.prevent="handleSubmit">
      <label class="absolute pl-5 inset-0 flex items-center opacity-50 pointer-events-none">
        <Transition
          enter-from-class="translate-x-5 opacity-0"
          leave-to-class="translate-x-10 opacity-0"
          enter-active-class="transition duration-300"
          leave-active-class="transition duration-100 linear"
        >
          <span v-show="empty">Введите сообщение ...</span>
        </Transition>
      </label>

      <input
        class="flex-auto px-3 py-2 bg-transparent outline-0"
        :value="text"
        autofocus
        @input="(e) => text = (e.target as HTMLInputElement).value"
      >

      <Transition
        enter-from-class="-translate-x-2 opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-300"
        leave-active-class="transition duration-200"
      >
        <button v-show="!empty" type="submit">
          <PaperAirplaneIcon class="h-6 w-6 text-primary/70 drop-shadow-md outline-0 transition duration-300 hover:text-primary hover:duration-200 active:translate-x-1" />
        </button>
      </Transition>
    </form>
  </div>
</template>
