import { writable } from "svelte/store";
import { NO_TAG, type tag } from "./tags";

export const show_tags = writable<boolean>(true);
export const selected_tag = writable<tag>(NO_TAG);
