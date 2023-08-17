<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import type { ChatMessage } from '../types/chat-message.ts'
import { Hint } from '../constants/hint.ts'
import ChatHeader from './ChatHeader.vue'
import ChatBody from './ChatBody.vue'
import ChatInput from './ChatInput.vue'

const messages = shallowRef<ChatMessage[]>([])

function init() {
  const botMessage: ChatMessage = {
    bot: true,
    text: 'Привет! Сделаю всё, что вы попросите',
    date: new Date(),
  }
  setTimeout(() => messages.value = [...messages.value, botMessage], 400)
}

const answers: Record<Hint, string> = {
  [Hint.FOOD]: 'Заказ принят. Желаете что-то ещё?',
  [Hint.NEWS]: 'Ничего нового... Чем ещё могу помочь?',
  [Hint.CLOCK]: 'Будильник не подведет. Что-то ещё?',
  [Hint.WEATHER]: 'Солнечно, как и вчера',
}

const text = ref('')
function send() {
  const userMessage: ChatMessage = {
    bot: false,
    text: text.value,
    date: new Date(),
  }
  messages.value = [...messages.value, userMessage]

  const botMessage: ChatMessage = {
    bot: true,
    text: answers[text.value] ?? 'Не могу вас понять',
    date: new Date(),
  }
  setTimeout(() => messages.value = [...messages.value, botMessage], 300)

  text.value = ''
}

const showed = ref(false)
onMounted(() => setTimeout(() => showed.value = true, 0))
</script>

<template>
  <Transition
    enter-from-class="scale-105 opacity-0"
    enter-active-class="transition duration-700"
    @after-enter="init"
  >
    <div
      v-show="showed"
      class="w-full h-full mobile:w-[28rem] mobile:h-[40rem] p-4 flex flex-col mobile:rounded-2xl overflow-auto mobile:shadow-xl bg-white/60"
    >
      <ChatHeader class="mb-3" />

      <ChatBody class="mb-5" :messages="messages" />

      <ChatInput v-model:text="text" @send="send" />
    </div>
  </Transition>
</template>
