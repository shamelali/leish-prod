"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { isLocale, defaultLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import ImageWithFallback from "@/components/ImageWithFallback";
import { artists } from "@/data/artists";
import {
  Send, ArrowLeft, Search, MessageCircle, MoreVertical,
  Phone, Video, Info, Paperclip, Smile, Check, CheckCheck
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  read: boolean;
}

interface Conversation {
  artistId: string;
  artistName: string;
  artistImage: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

// Mock conversations
const mockConversations: Conversation[] = [
  {
    artistId: "aiko-nakamura",
    artistName: "Aiko Nakamura",
    artistImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Looking forward to your booking! Let me know if you have any questions.",
    lastTime: "2m ago",
    unread: 1,
    messages: [
      { id: "m1", senderId: "aiko-nakamura", text: "Hi! Thank you for booking with me 🎉", time: "10:00", read: true },
      { id: "m2", senderId: "me", text: "Hi Aiko! I'm so excited for my appointment.", time: "10:02", read: true },
      { id: "m3", senderId: "aiko-nakamura", text: "Me too! Do you have any inspiration photos for the look you want?", time: "10:05", read: true },
      { id: "m4", senderId: "me", text: "Yes, I'll send some over. I'm thinking soft glam with a natural finish.", time: "10:08", read: true },
      { id: "m5", senderId: "aiko-nakamura", text: "Looking forward to your booking! Let me know if you have any questions.", time: "10:10", read: false },
    ],
  },
  {
    artistId: "mei-lin",
    artistName: "Mei Lin",
    artistImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Your SFX transformation is going to be incredible!",
    lastTime: "1h ago",
    unread: 0,
    messages: [
      { id: "m6", senderId: "mei-lin", text: "Hey! I saw your booking for the SFX package. Great choice! 🎭", time: "09:00", read: true },
      { id: "m7", senderId: "me", text: "Thanks! I can't wait to see the transformation.", time: "09:15", read: true },
      { id: "m8", senderId: "mei-lin", text: "Your SFX transformation is going to be incredible!", time: "09:20", read: true },
    ],
  },
];

export default function MessagesPage({ params }: Props) {
  const { lang } = use(params);
  const locale = isLocale(lang) ? lang : defaultLocale;
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user) router.push(`/${locale}/login`);
  }, [mounted, user, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  if (!mounted || !user) return null;

  const active = mockConversations.find((c) => c.artistId === activeConversation);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success("Message sent!");
    setNewMessage("");
  };

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-20" style={{ height: "calc(100vh - 0px)" }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className={`${activeConversation ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 lg:w-96 border-r border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900`}>
            <div className="p-4 border-b border-gray-100 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Messages</h1>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((conv) => (
                <button
                  key={conv.artistId}
                  onClick={() => setActiveConversation(conv.artistId)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors text-left ${
                    activeConversation === conv.artistId ? "bg-rose-50 dark:bg-rose-950/30 border-r-2 border-rose-500" : ""
                  }`}
                >
                  <ImageWithFallback src={conv.artistImage} alt={conv.artistName} className="w-11 h-11 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{conv.artistName}</p>
                      <span className="text-[10px] text-gray-400 shrink-0">{conv.lastTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="shrink-0 w-5 h-5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${!activeConversation ? "hidden md:flex" : "flex"} flex-col flex-1 bg-white dark:bg-neutral-900`}>
            {active ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setActiveConversation(null)} className="md:hidden p-1 text-gray-400">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <ImageWithFallback src={active.artistImage} alt={active.artistName} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{active.artistName}</p>
                      <p className="text-[10px] text-green-500">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"><Phone className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"><Video className="w-4 h-4" /></button>
                        <Link href={`/${locale}/artists/${active.artistId}`} className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"><Info className="w-4 h-4" /></Link>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30 dark:bg-neutral-950/30">
                  {active.messages.map((msg) => {
                    const isMe = msg.senderId === "me";
                    return (
                      <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                          isMe
                            ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-br-md"
                            : "bg-white dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-100 dark:border-neutral-700 rounded-bl-md"
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 ${isMe ? "text-white/60" : "text-gray-400"}`}>
                            <span className="text-[10px]">{msg.time}</span>
                            {isMe && (msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Paperclip className="w-5 h-5" /></button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all pr-10"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"><Smile className="w-4 h-4" /></button>
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <MessageCircle className="w-16 h-16 text-gray-200 dark:text-neutral-700 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Messages</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mx-auto">Select a conversation to start chatting with your artist.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
