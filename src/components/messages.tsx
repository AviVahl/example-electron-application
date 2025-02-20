import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { sampleMessages, type Conversation } from "../data/sample-messages";

export const Messages: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>(sampleMessages[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    setNewMessage("");
  };

  return (
    <div className="flex h-full rounded-lg bg-white shadow dark:bg-gray-900">
      <div className="w-80 border-r border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Messages</h2>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto">
          {sampleMessages.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation)}
              className={`cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${activeConversation?.id === conversation.id ? "bg-gray-50 dark:bg-gray-800" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={conversation.participant.avatar} alt="" className="h-10 w-10 rounded-full" />
                  <div
                    className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
                      conversation.participant.status === "online"
                        ? "bg-green-500"
                        : conversation.participant.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-gray-100">
                    {conversation.participant.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {conversation.messages[conversation.messages.length - 1]?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {activeConversation ? (
          <>
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img src={activeConversation.participant.avatar} alt="" className="h-10 w-10 rounded-full" />
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-gray-100">
                    {activeConversation.participant.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activeConversation.participant.status}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {activeConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.senderId === "current-user" ? "justify-end" : ""}`}>
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.senderId === "current-user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};
