import { Conversation } from '../types';

const CONVERSATIONS_KEY = 'ai_shop_assistant_conversations';
const ACTIVE_CONVERSATION_ID_KEY = 'ai_shop_assistant_active_id';
const HISTORY_VISIBILITY_KEY = 'ai_shop_assistant_history_visible';


export function saveConversations(conversations: Conversation[]): void {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error("Failed to save conversations to localStorage:", error);
  }
}

export function loadConversations(): Conversation[] {
  try {
    const storedConversations = localStorage.getItem(CONVERSATIONS_KEY);
    return storedConversations ? JSON.parse(storedConversations) : [];
  } catch (error) {
    console.error("Failed to load conversations from localStorage:", error);
    return [];
  }
}

export function saveActiveConversationId(id: string | null): void {
    try {
        if (id) {
            localStorage.setItem(ACTIVE_CONVERSATION_ID_KEY, id);
        } else {
            localStorage.removeItem(ACTIVE_CONVERSATION_ID_KEY);
        }
    } catch (error) {
        console.error("Failed to save active conversation ID to localStorage:", error);
    }
}

export function loadActiveConversationId(): string | null {
    try {
        return localStorage.getItem(ACTIVE_CONVERSATION_ID_KEY);
    } catch (error) {
        console.error("Failed to load active conversation ID from localStorage:", error);
        return null;
    }
}

export function saveHistoryVisibility(isVisible: boolean): void {
    try {
        localStorage.setItem(HISTORY_VISIBILITY_KEY, JSON.stringify(isVisible));
    } catch (error) {
        console.error("Failed to save history visibility to localStorage:", error);
    }
}

export function loadHistoryVisibility(): boolean {
    try {
        const storedVisibility = localStorage.getItem(HISTORY_VISIBILITY_KEY);
        if (storedVisibility === null) {
            return true; // Default ke terlihat
        }
        return JSON.parse(storedVisibility);
    } catch (error) {
        console.error("Failed to load history visibility from localStorage:", error);
        return true; // Default ke terlihat jika ada error
    }
}
