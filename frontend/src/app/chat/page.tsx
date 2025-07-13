"use client";

import { useState, useRef, useEffect } from 'react';
import {
    Send,
    MessageCircle,
    Plus,
    Settings,
    User,
    Bot,
    Menu,
    X,
    Edit2,
    Trash2,
    Clock,
    Sparkles,
    ArrowLeft
} from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
    lastUpdated: Date;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([
        {
            id: '1',
            title: 'ගණිතය - සරල සමීකරණ',
            messages: [],
            lastUpdated: new Date(Date.now() - 3600000)
        },
        {
            id: '2',
            title: 'විද්‍යාව - පොත්සියම් සංයෝග',
            messages: [],
            lastUpdated: new Date(Date.now() - 7200000)
        },
        {
            id: '3',
            title: 'ඉතිහාසය - කොළඹ නගරය',
            messages: [],
            lastUpdated: new Date(Date.now() - 86400000)
        }
    ]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `මම ඔබගේ ප්‍රශ්නය "${input}" හොඳින් තේරුම් ගෙන ඇත. මෙය ඉතා රසවත් ප්‍රශ්නයක්! ඔබට මෙම විෂය පිළිබඳ වැඩි විස්තර අවශ්‍ය නම් කරුණාකර වැඩිදුර ප්‍රශ්න කරන්න.`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const startNewChat = () => {
        setMessages([]);
        setCurrentSessionId(null);
    };

    const selectChat = (sessionId: string) => {
        const session = chatSessions.find(s => s.id === sessionId);
        if (session) {
            setMessages(session.messages);
            setCurrentSessionId(sessionId);
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'දැන්';
        if (diffInHours < 24) return `පැය ${diffInHours}කට පෙර`;
        if (diffInHours < 168) return `දින ${Math.floor(diffInHours / 24)}කට පෙර`;
        return date.toLocaleDateString('si-LK');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-300">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden`}>
                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-blue-600" />
                                AI-පාසල
                            </h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors md:hidden"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={startNewChat}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            නව කතාබහක්
                        </button>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                            පෙර කතාබහයන්
                        </h3>
                        {chatSessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => selectChat(session.id)}
                                className={`group p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700 ${currentSessionId === session.id ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-slate-800 dark:text-white truncate">
                                            {session.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatTime(session.lastUpdated)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                                            <Edit2 className="w-3 h-3" />
                                        </button>
                                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-800 dark:text-white">ඔබගේ ගිණුම</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">නොමිලේ සාමාජිකයා</p>
                            </div>
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                                <Settings className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {!sidebarOpen && (
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <Menu className="w-5 h-5" />
                                    </button>
                                )}
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">AI සහායක</h1>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">ඔන්ලයින්</p>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="/"
                                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">ආපසු මුල් පිටුවට</span>
                            </a>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                                    AI සහායක සමඟ කතාබහ ආරම්භ කරන්න
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                                    ඔබගේ ප්‍රශ්න, ගැටලු හෝ ඉගෙනීමේ අවශ්‍යතා සිංහලෙන් ටයිප් කරන්න. AI සහායක ඔබට උදව් කරනු ඇත.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {[
                                        "ගණිතයේ සරල සමීකරණ ගැන කියන්න",
                                        "විද්‍යාවේ පොත්සියම් සංයෝග ගැන",
                                        "ඉතිහාසයේ කොළඹ නගරය ගැන",
                                        "ඉංග්‍රීසි ව්‍යාකරණ ගැන"
                                    ].map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(suggestion)}
                                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.sender === 'ai' && (
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-3xl p-4 rounded-2xl ${message.sender === 'user'
                                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                            <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                                                }`}>
                                                {message.timestamp.toLocaleTimeString('si-LK', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        {message.sender === 'user' && (
                                            <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative flex items-end gap-3">
                                <div className="flex-1 relative">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="ඔබගේ ප්‍රශ්නය මෙහි ටයිප් කරන්න..."
                                        className="w-full p-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                                        rows={1}
                                        style={{ minHeight: '56px' }}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 bottom-2 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                                AI-පාසල ගැන තවත් දැනගැනීමට Enter ඔබන්න. Shift + Enter නව රේඛාවකට.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}