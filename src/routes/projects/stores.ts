import { writable } from "svelte/store";

export const NO_TAG = "All";
export const selected_tag = writable<string>(NO_TAG);
