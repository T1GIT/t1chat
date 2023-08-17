<script setup lang="ts">
import { nextTick, shallowRef, watch } from 'vue'
import type { ChatMessage } from '../types/chat-message.ts'
import Message from './Message.vue'

const props = defineProps<{
  messages: ChatMessage[]
}>()

const list = shallowRef<HTMLDivElement>()
function scrollBottom() {
  nextTick(() => list.value && list.value.scrollTo(0, list.value.scrollHeight))
}
watch(() => props.messages, scrollBottom)
</script>

<template>
  <div ref="list" class="bg-white p-3 flex-auto overflow-auto flex flex-col gap-3 rounded-2xl shadow-lg scroll-smooth">
    <TransitionGroup
      enter-from-class="translate-y-5 opacity-0"
      enter-active-class="transition duration-300"
    >
      <Message
        v-for="message in props.messages"
        :key="message.date.getTime()"
        :bot="message.bot"
        :text="message.text"
        :date="message.date"
      />
    </TransitionGroup>
  </div>
</template>
