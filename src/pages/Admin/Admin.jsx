"use client";
import { useState, useRef } from "react";
import { 
    Upload, 
    Link, 
    FileText, 
    Globe, 
    X, 
    CheckCircle, 
    AlertCircle, 
    Loader2,
    MessageSquare,
    Settings,
    Database,
    Plus,
    Trash2
} from "lucide-react";

export default function ChatAdminPanel() {
    const [activeTab, setActiveTab] = useState('documents');
    const [uploadedItems, setUploadedItems] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [urlParams, setUrlParams] = useState({
        maxDepth: 2,
        maxPages: 50
    });
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    
    const fileInputRef = useRef(null);

    // Base URL for API calls
    const API_BASE_URL = "http://127.0.0.1:8000";

    const generateId = () => Math.random().toString(36).substr(2, 9);

    const uploadDocument = async (file) => {
        const itemId = generateId();
        const newItem = {
            id: itemId,
            type: 'file',
            name: file.name,
            status: 'uploading',
            timestamp: new Date()
        };

        setUploadedItems(prev => [newItem, ...prev]);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/v1/agents/simple_agent/kb/doc/add`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setUploadedItems(prev => prev.map(item => 
                    item.id === itemId 
                        ? { ...item, status: 'success', message: result.message }
                        : item
                ));
            } else {
                throw new Error(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadedItems(prev => prev.map(item => 
                item.id === itemId 
                    ? { ...item, status: 'error', message: error instanceof Error ? error.message : 'Upload failed' }
                    : item
            ));
        } finally {
            setIsUploading(false);
        }
    };

    const uploadUrl = async () => {
        if (!urlInput.trim()) return;

        const itemId = generateId();
        const newItem = {
            id: itemId,
            type: 'url',
            name: urlInput,
            status: 'uploading',
            timestamp: new Date()
        };

        setUploadedItems(prev => [newItem, ...prev]);
        setIsUploading(true);

        try {
            const encodedUrl = encodeURIComponent(urlInput);
            const response = await fetch(
                `${API_BASE_URL}/v1/agents/simple_agent/kb/url/add?url=${encodedUrl}&max_depth=${urlParams.maxDepth}&max_pages=${urlParams.maxPages}`,
                {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json'
                    }
                }
            );

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setUploadedItems(prev => prev.map(item => 
                    item.id === itemId 
                        ? { 
                            ...item, 
                            status: 'success', 
                            message: result.message,
                            stats: result.stats 
                        }
                        : item
                ));
                setUrlInput('');
            } else {
                throw new Error(result.message || 'URL processing failed');
            }
        } catch (error) {
            console.error('URL upload error:', error);
            setUploadedItems(prev => prev.map(item => 
                item.id === itemId 
                    ? { ...item, status: 'error', message: error instanceof Error ? error.message : 'URL processing failed' }
                    : item
            ));
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                uploadDocument(file);
            });
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeItem = (id) => {
        setUploadedItems(prev => prev.filter(item => item.id !== id));
    };

    const clearKnowledgeBase = async () => {
        setIsClearing(true);
        try {
            const response = await fetch(`${API_BASE_URL}/v1/agents/simple_agent/kb/delete`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (response.ok) {
                // Clear the local state
                setUploadedItems([]);
                setShowClearConfirm(false);
                // You could add a success toast here if needed
            } else {
                throw new Error('Failed to clear knowledge base');
            }
        } catch (error) {
            console.error('Clear knowledge base error:', error);
            // You could add an error toast here if needed
        } finally {
            setIsClearing(false);
        }
    };

    const formatStats = (stats) => {
        if (!stats) return null;
        return (
            <div className="text-xs text-slate-600 mt-2 space-y-1">
                <div>Pages crawled: {stats.crawling?.pages_crawled || 0}</div>
                <div>Chunks created: {stats.deduplication?.unique_chunks_created || 0}</div>
                <div>Success rate: {stats.loading?.success_rate_percent || 0}%</div>
            </div>
        );
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'uploading':
                return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900">Chat Admin Panel</h1>
                            <p className="text-sm text-slate-600">Manage knowledge base content</p>
                        </div>
                    </div>
                </div>

                {/* Clear Confirmation Modal */}
                {showClearConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    Clear Knowledge Base
                                </h3>
                                <p className="text-sm text-slate-600 mb-6">
                                    This will permanently delete all uploaded documents and URLs from the knowledge base. 
                                    This action cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowClearConfirm(false)}
                                        disabled={isClearing}
                                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={clearKnowledgeBase}
                                        disabled={isClearing}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isClearing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Clearing...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4" />
                                                Clear All
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex h-[calc(100vh-81px)]">
                {/* Sidebar */}
                <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
                    {/* Tab Navigation */}
                    <div className="p-4 border-b border-slate-100">
                        <div className="flex bg-slate-100 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('documents')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                    activeTab === 'documents'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <FileText className="w-4 h-4" />
                                Documents
                            </button>
                            <button
                                onClick={() => setActiveTab('urls')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                    activeTab === 'urls'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Globe className="w-4 h-4" />
                                URLs
                            </button>
                        </div>
                    </div>

                    {/* Upload Section */}
                    <div className="p-4 border-b border-slate-100">
                        {activeTab === 'documents' ? (
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Upload className="w-5 h-5" />
                                    Upload Documents
                                </button>
                                <p className="text-xs text-slate-500 mt-2 text-center">
                                    PDF, DOC, DOCX, TXT files supported
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Max Depth
                                        </label>
                                        <input
                                            type="number"
                                            value={urlParams.maxDepth}
                                            onChange={(e) => setUrlParams(prev => ({
                                                ...prev,
                                                maxDepth: parseInt(e.target.value) || 2
                                            }))}
                                            min="1"
                                            max="5"
                                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Max Pages
                                        </label>
                                        <input
                                            type="number"
                                            value={urlParams.maxPages}
                                            onChange={(e) => setUrlParams(prev => ({
                                                ...prev,
                                                maxPages: parseInt(e.target.value) || 50
                                            }))}
                                            min="1"
                                            max="100"
                                            className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={uploadUrl}
                                    disabled={!urlInput.trim() || isUploading}
                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add URL
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Upload History */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-slate-900">Recent Uploads</h3>
                                {uploadedItems.length > 0 && (
                                    <button
                                        onClick={() => setShowClearConfirm(true)}
                                        disabled={isClearing}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                            <div className="space-y-3">
                                {uploadedItems.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Database className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">No items uploaded yet</p>
                                    </div>
                                ) : (
                                    uploadedItems.map((item) => (
                                        <div key={item.id} className="bg-slate-50 rounded-lg p-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-start gap-2 flex-1 min-w-0">
                                                    {item.type === 'file' ? (
                                                        <FileText className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <Link className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium text-slate-900 truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {item.timestamp.toLocaleTimeString()}
                                                        </p>
                                                        {item.message && (
                                                            <p className={`text-xs mt-1 ${
                                                                item.status === 'error' ? 'text-red-600' : 'text-green-600'
                                                            }`}>
                                                                {item.message}
                                                            </p>
                                                        )}
                                                        {formatStats(item.stats)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(item.status)}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                                                    >
                                                        <X className="w-3 h-3 text-slate-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="text-center py-12">
                                <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                    Knowledge Base Management
                                </h2>
                                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                    Upload documents and add website URLs to enhance your chat assistant's knowledge base. 
                                    All content is processed and indexed automatically.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <FileText className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                                        <h3 className="font-medium text-slate-900 mb-2">Document Upload</h3>
                                        <p className="text-sm text-slate-600">
                                            Upload PDF, Word, or text files to add structured content to your knowledge base.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <Globe className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                                        <h3 className="font-medium text-slate-900 mb-2">Website Crawling</h3>
                                        <p className="text-sm text-slate-600">
                                            Add website URLs to automatically crawl and index web content for your assistant.
                                        </p>
                                    </div>
                                </div>

                                {uploadedItems.length > 0 && (
                                    <div className="mt-8 p-4 bg-green-50 rounded-xl">
                                        <div className="flex items-center justify-center gap-2 text-green-700">
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="font-medium">
                                                {uploadedItems.filter(item => item.status === 'success').length} items successfully added
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}