'use client';

import React from 'react';
import { Message } from 'ai/react';

type Props = {
  messages: Message[];
  currentMessage?: Message;
};

const MessagesList = ({ messages, currentMessage }: Props) => {
  const allMessages = currentMessage ? [...messages, currentMessage] : messages;
  
  if (!allMessages.length) return null;

  return (
    <div className="space-y-2">
      {allMessages.map((msg) => (
        <div
          key={msg.id}
          className={`text-sm ${
            msg.role === 'user' ? 'text-right' : 'text-left ml-2'
          }`}
        >
          <span
            className={`inline-block max-w-xs px-3 py-2 rounded-md ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {msg.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
