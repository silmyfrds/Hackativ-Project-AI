
export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface Conversation {
    id:string;
    title: string;
    messages: Message[];
}
