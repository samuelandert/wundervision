// $lib/data/queryMessages.ts

import { writable } from 'svelte/store';

export interface Message {
    text: string;
    timestamp: string;
    sender: string;
    type: string;
    composite?: object | null;
}

const isClientSide = typeof window !== "undefined";

function getFromLocalStorage(key, defaultValue) {
    return isClientSide && localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : defaultValue;
}

function setToLocalStorage(key, value) {
    if (isClientSide) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const initialMessages: Message[] = getFromLocalStorage('chat-messages', [
    { text: "Hello there!", timestamp: new Date().toLocaleString(), sender: "John", type: "text" },
    { text: "How are you?", timestamp: new Date().toLocaleString(), sender: "Alice", type: "text" }
]);

const messages = writable(initialMessages);

messages.subscribe(currentMessages => {
    setToLocalStorage('chat-messages', currentMessages);
});

export const queryMessages = messages;
