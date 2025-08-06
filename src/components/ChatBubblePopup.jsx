"use client";
import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X, Minimize2, Maximize2, MessageCircle } from "lucide-react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Simple markdown renderer component
const MarkdownRenderer = ({ content }) => {
    const renderInlineContent = (text) => {
        const parts = [];
        let currentText = text;
        let elementIndex = 0;
        
        // First pass: handle links [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let linkMatch;
        let linkParts = [];
        let lastLinkIndex = 0;
        
        while ((linkMatch = linkRegex.exec(currentText)) !== null) {
            if (linkMatch.index > lastLinkIndex) {
                linkParts.push(currentText.slice(lastLinkIndex, linkMatch.index));
            }
            linkParts.push(
                <a 
                    key={`link-${elementIndex++}`} 
                    href={linkMatch[2]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    {linkMatch[1]}
                </a>
            );
            lastLinkIndex = linkMatch.index + linkMatch[0].length;
        }
        
        if (lastLinkIndex < currentText.length) {
            linkParts.push(currentText.slice(lastLinkIndex));
        }
        
        // If no links found, use original text
        if (linkParts.length === 0) {
            linkParts = [currentText];
        }
        
        // Second pass: handle bold text **text** in each part
        linkParts.forEach((part, partIndex) => {
            if (typeof part === 'string') {
                const boldRegex = /\*\*(.*?)\*\*/g;
                let boldMatch;
                let boldParts = [];
                let lastBoldIndex = 0;
                
                while ((boldMatch = boldRegex.exec(part)) !== null) {
                    if (boldMatch.index > lastBoldIndex) {
                        boldParts.push(part.slice(lastBoldIndex, boldMatch.index));
                    }
                    boldParts.push(
                        <strong key={`bold-${partIndex}-${elementIndex++}`} className="font-semibold">
                            {boldMatch[1]}
                        </strong>
                    );
                    lastBoldIndex = boldMatch.index + boldMatch[0].length;
                }
                
                if (lastBoldIndex < part.length) {
                    boldParts.push(part.slice(lastBoldIndex));
                }
                
                // Add bold parts or original part if no bold found
                if (boldParts.length > 0) {
                    parts.push(...boldParts);
                } else {
                    parts.push(part);
                }
            } else {
                // It's already a JSX element (link), add it as-is
                parts.push(part);
            }
        });
        
        return parts.length > 0 ? parts : [text];
    };

    const renderMarkdown = (text) => {
        const lines = text.split('\n');
        const elements = [];
        let listItems = [];
        let currentListType = null;
        
        const flushList = () => {
            if (listItems.length > 0) {
                const ListComponent = currentListType === 'ol' ? 'ol' : 'ul';
                elements.push(
                    <ListComponent key={`list-${elements.length}`} className={currentListType === 'ol' ? "list-decimal list-inside space-y-1 my-2 ml-4" : "list-disc list-inside space-y-1 my-2 ml-4"}>
                        {listItems.map((item, idx) => (
                            <li key={`item-${idx}`} className="text-sm leading-relaxed text-slate-800">
                                {renderInlineContent(item)}
                            </li>
                        ))}
                    </ListComponent>
                );
                listItems = [];
                currentListType = null;
            }
        };
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Handle headers
            if (trimmedLine.startsWith('### ')) {
                flushList();
                const headerText = trimmedLine.slice(4);
                elements.push(
                    <h3 key={`h3-${index}`} className="text-base font-semibold text-slate-900 mt-3 mb-1">
                        {renderInlineContent(headerText)}
                    </h3>
                );
            } else if (trimmedLine.startsWith('## ')) {
                flushList();
                const headerText = trimmedLine.slice(3);
                elements.push(
                    <h2 key={`h2-${index}`} className="text-lg font-semibold text-slate-900 mt-3 mb-1">
                        {renderInlineContent(headerText)}
                    </h2>
                );
            } else if (trimmedLine.startsWith('# ')) {
                flushList();
                const headerText = trimmedLine.slice(2);
                elements.push(
                    <h1 key={`h1-${index}`} className="text-xl font-bold text-slate-900 mt-3 mb-1">
                        {renderInlineContent(headerText)}
                    </h1>
                );
            }
            // Handle unordered lists
            else if (trimmedLine.startsWith('- ')) {
                if (currentListType !== 'ul') {
                    flushList();
                    currentListType = 'ul';
                }
                listItems.push(trimmedLine.slice(2));
            }
            // Handle ordered lists
            else if (/^\d+\.\s/.test(trimmedLine)) {
                if (currentListType !== 'ol') {
                    flushList();
                    currentListType = 'ol';
                }
                listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
            }
            // Handle empty lines
            else if (trimmedLine === '') {
                flushList();
                if (elements.length > 0) {
                    elements.push(<div key={`space-${index}`} className="h-1" />);
                }
            }
            // Handle regular paragraphs and standalone text
            else {
                flushList();
                if (trimmedLine) {
                    elements.push(
                        <p key={`p-${index}`} className="text-sm leading-relaxed mb-1 text-slate-800">
                            {renderInlineContent(trimmedLine)}
                        </p>
                    );
                }
            }
        });
        
        // Flush any remaining list items
        flushList();
        
        return elements;
    };
    
    return <div className="space-y-1">{renderMarkdown(content)}</div>;
};

export default function ChatBubblePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        mobile: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [sessionId, setSessionId] = useState(""); // Store session ID in state
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Base URL for API calls
    const API_BASE_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        if (isOpen && !isMinimized) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, suggestions, isOpen, isMinimized]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    // Cleanup session on page unload/refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (sessionId) {
                deleteSession(sessionId);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [sessionId]);

    const generateId = () => Math.random().toString(36).substr(2, 9);
    const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Function to delete session
    const deleteSession = async (sessionIdToDelete) => {
        try {
            await fetch(`${API_BASE_URL}/v1/agents/simple_agent/sessions/${sessionIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                }
            });
        } catch (error) {
            console.error('Error deleting session:', error);
            // Don't show user error for cleanup operations
        }
    };

    const parseApiResponse = (data) => {
        // Handle string response
        if (typeof data === 'string') {
            return {
                reply: data,
                suggestions: []
            };
        }

        // Handle object response
        const reply = data.reply || "I apologize, but I couldn't process your request.";
        let suggestions = [];

        if (data.suggestions) {
            if (typeof data.suggestions === 'string') {
                // Single suggestion as string
                suggestions = [data.suggestions];
            } else if (Array.isArray(data.suggestions)) {
                // Array of suggestions
                suggestions = data.suggestions;
            } else if (data.suggestions.suggestions && Array.isArray(data.suggestions.suggestions)) {
                // Nested suggestions object
                suggestions = data.suggestions.suggestions;
            }
        }

        return { reply, suggestions };
    };

    const callAgentAPI = async (message, currentSessionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/v1/agents/simple_agent/runs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    stream: false,
                    model: "",
                    user_id: `user_${generateId()}`,
                    session_id: currentSessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return parseApiResponse(data);

        } catch (error) {
            console.error('API Error:', error);
            return {
                reply: "I'm having trouble connecting right now. Please try again in a moment.",
                suggestions: []
            };
        }
    };

    const handleSend = async (e, suggestionText) => {
        if (e) e.preventDefault();

        const messageText = suggestionText || input.trim();
        if (!messageText || isTyping) return;

        // Use existing session ID instead of generating new one
        const currentSessionId = sessionId;

        const userMessage = {
            role: "user",
            content: messageText,
            timestamp: new Date(),
            id: generateId()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setSuggestions([]);
        setIsTyping(true);

        try {
            const { reply: botResponse, suggestions: newSuggestions } = await callAgentAPI(messageText, currentSessionId);

            const botMessage = {
                role: "bot",
                content: botResponse,
                timestamp: new Date(),
                id: generateId()
            };

            setMessages(prev => [...prev, botMessage]);
            setSuggestions(newSuggestions);

        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                role: "bot",
                content: "Something went wrong. Please try again.",
                timestamp: new Date(),
                id: generateId()
            };
            setMessages(prev => [...prev, errorMessage]);
            setSuggestions([]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (isTyping) return;
        handleSend(undefined, suggestion);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!userInfo.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!userInfo.mobile.trim()) {
            errors.mobile = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(userInfo.mobile)) {
            errors.mobile = 'Please enter a valid 10-digit mobile number';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleStartChat = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowChat(true);
        }
    };

    const openChat = () => {
        setIsOpen(true);
        setIsMinimized(false);
        // Generate session ID only when chat opens
        if (!sessionId) {
            setSessionId(generateSessionId());
        }
    };

    const closeChat = () => {
        // Delete session before closing
        if (sessionId) {
            deleteSession(sessionId);
        }
        
        setIsOpen(false);
        setIsMinimized(false);
        setShowChat(false);
        setMessages([]);
        setSuggestions([]);
        setInput("");
        // Reset user info and form errors when chat is closed
        setUserInfo({ name: '', mobile: '' });
        setFormErrors({});
        // Reset session ID when chat is closed
        setSessionId("");
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Auto-resize textarea function
    const handleInputChange = (e) => {
        setInput(e.target.value);
        
        // Reset height to auto to get the correct scrollHeight
        e.target.style.height = 'auto';
        
        // Set the height based on scrollHeight, with min and max constraints
        const newHeight = Math.min(Math.max(e.target.scrollHeight, 48), 80);
        e.target.style.height = `${newHeight}px`;
    };

    return (
        <>
            {/* Chat Bubble Button */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={openChat}
                        className="group w-16 h-16 bg-slate-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
                        aria-label="Open chat"
                    >
                        <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                </div>
            )}

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div className={`bg-white rounded-2xl shadow-2xl border border-slate-200/50 backdrop-blur-sm transition-all duration-300 flex flex-col ${
                        isMinimized ? 'w-80 h-12' : 'w-[420px] h-[600px]'
                    }`}>
                        {/* Header */}
                        <div className={`flex items-center justify-between px-5 border-b border-slate-100 flex-shrink-0 ${
                            isMinimized ? 'py-3' : 'py-4'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="font-medium text-slate-900">Assistant</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={toggleMinimize}
                                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                                >
                                    {isMinimized ? 
                                        <Maximize2 className="w-4 h-4 text-slate-600" /> :
                                        <Minimize2 className="w-4 h-4 text-slate-600" />
                                    }
                                </button>
                                <button 
                                    onClick={closeChat}
                                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Content */}
                        {!isMinimized && (
                            <>
                                {/* User Info Form or Chat */}
                                <div className="flex-1 overflow-y-auto px-2 py-4 min-h-0">
                                    {!showChat ? (
                                        <div className="h-full flex flex-col justify-center px-4">
                                            <div className="mb-6 text-center">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <MessageSquare className="w-8 h-8 text-slate-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                    Welcome to our Support Chat
                                                </h3>
                                                <p className="text-sm text-slate-600 max-w-xs mx-auto mb-6">
                                                    Please provide your details to start chatting with our support team.
                                                </p>
                                            </div>

                                            <form onSubmit={handleStartChat} className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                                        Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={userInfo.name}
                                                        onChange={handleUserInfoChange}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm ${
                                                            formErrors.name ? 'border-red-500' : 'border-slate-300'
                                                        }`}
                                                        placeholder="Your name"
                                                        autoComplete="name"
                                                    />
                                                    {formErrors.name && (
                                                        <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                                                    )}
                                                </div>
                                                
                                                <div>
                                                    <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1">
                                                        Mobile Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="mobile"
                                                        name="mobile"
                                                        value={userInfo.mobile}
                                                        onChange={handleUserInfoChange}
                                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm ${
                                                            formErrors.mobile ? 'border-red-500' : 'border-slate-300'
                                                        }`}
                                                        placeholder="Your 10-digit mobile number"
                                                        maxLength="10"
                                                        autoComplete="tel"
                                                    />
                                                    {formErrors.mobile && (
                                                        <p className="mt-1 text-xs text-red-500">{formErrors.mobile}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <button
                                                        type="submit"
                                                        className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 flex items-center justify-center gap-2"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                        Start Chat
                                                    </button>
                                                    
                                                    <a
                                                        href="https://wa.me/+919898339903"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                                    >
                                                        <WhatsAppIcon style={{ fontSize: 20 }} />
                                                        Chat on WhatsApp
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="h-full flex flex-col justify-center text-center">
                                            <div className="mb-6">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <MessageSquare className="w-8 h-8 text-slate-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                    How can I help you?
                                                </h3>
                                                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                                                    Ask me anything and I'll provide helpful information
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                                                    Quick Start
                                                </p>
                                                <div className="flex flex-col items-center space-y-2">
                                                    {['Project Catalogue', 'Visit Our Head Office', 'Walkthroughs'].map((suggestion) => (
                                                        <button
                                                            key={suggestion}
                                                            onClick={() => handleSuggestionClick(suggestion)}
                                                            className="w-[50%] max-w-xs px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {messages.map((message) => (
                                                <div key={message.id}>
                                                    {message.role === 'user' ? (
                                                        <div className="flex justify-end">
                                                            <div className="bg-slate-900 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[85%] shadow-sm">
                                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                                    {message.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-start">
                                                            <div className="bg-slate-50 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
                                                                <MarkdownRenderer content={message.content} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {isTyping && (
                                                <div className="flex justify-start">
                                                    <div className="bg-slate-50 rounded-2xl rounded-bl-md px-4 py-3">
                                                        <div className="flex space-x-1">
                                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {suggestions.length > 0 && !isTyping && (
                                                <div className="space-y-2">
                                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                                                        Suggestions
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {suggestions.map((suggestion, index) => (
                                                            <button
                                                                key={`${suggestion}-${index}`}
                                                                onClick={() => handleSuggestionClick(suggestion)}
                                                                className="px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                                                            >
                                                                {suggestion}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div ref={messagesEndRef} />
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="px-5 py-3 border-t border-slate-100 flex-shrink-0">
                                    <div className="relative flex items-center">
                                        <textarea
                                            ref={inputRef}
                                            value={input}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm placeholder-slate-400 transition-all duration-200 overflow-hidden"
                                            rows={1}
                                            style={{ height: '48px' }}
                                            disabled={isTyping}
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim() || isTyping}
                                            className="ml-2 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                                            aria-label="Send message"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}