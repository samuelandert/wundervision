// $lib/data/queryTodos.ts
import { writable } from 'svelte/store';

export const queryTodos = writable([
    {
        id: "1",
        text: "todo 1",
        type: "x"
    },
    {
        id: "2",
        text: "todo 2",
        type: "x"
    },
    {
        id: "3",
        text: "todo 3",
        type: "z"
    },
    {
        id: "4",
        text: "todo 4",
        type: "z"
    }
]);
