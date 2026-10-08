import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, RotateCcw, Copy, ThumbsUp } from 'lucide-react';
import { aiResponses, suggestedPrompts } from '@/lib/mockData';
import type { Message } from '@/types';
import { toast } from 'sonner';

function TypingDots() {
  return (
    <div className="flex items-center gap-1 p-4">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="ai-message flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  );
}
function RenderAIContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this line is part of a markdown table (e.g. starts with '|')
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map(c => c.trim());
        
        // Skip separator row (tableLines[1])
        const bodyRows = tableLines.slice(2).map(tl =>
          tl
            .split('|')
            .slice(1, -1)
            .map(c => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-xs text-left">
              <thead className="bg-blue-500/10 text-blue-300 font-semibold border-b border-white/10">
                <tr>
                  {headerCells.map((hc, hIdx) => (
                    <th key={hIdx} className="px-3.5 py-2.5 whitespace-nowrap">{hc}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 text-gray-300 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    if (line.startsWith('## ')) {
      elements.push(<h3 key={i} className="font-display font-bold text-white mt-2 mb-1 text-base">{line.slice(3)}</h3>);
    } else if (line.startsWith('### ')) {
      elements.push(<h4 key={i} className="font-display font-semibold text-blue-300 mt-2.5 mb-1 text-sm">{line.slice(4)}</h4>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="font-semibold text-white my-1">{line.slice(2, -2)}</p>);
    } else if (line.match(/^\d+\.\s/)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        elements.push(
          <div key={i} className="flex items-start gap-2 py-0.5 text-gray-300 text-sm">
            <span className="font-bold text-blue-400 flex-shrink-0">{match[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: match[2].replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
          </div>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex items-start gap-2 text-gray-300 py-0.5 text-sm">
          <span className="text-blue-400 font-bold flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
        </div>
      );
    } else if (line.startsWith('*') && line.endsWith('*')) {
      elements.push(<p key={i} className="text-xs text-gray-400 italic my-1">{line.slice(1, -1)}</p>);
    } else if (line === '') {
      elements.push(<div key={i} className="h-1.5" />);
    } else {
      elements.push(
        <p key={i} className="text-gray-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}
        />
      );
    }

    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function StreamingText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const index = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index.current < text.length) {
        setDisplayed(text.slice(0, index.current + 1));
        index.current++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 8);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <RenderAIContent content={displayed} />;
}

function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === 'user') {
    return (
      <div className="flex justify-end px-4 py-2">
        <div className="user-message max-w-[75%]">
          <p className="text-sm text-gray-200">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 px-4 py-2">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="ai-message">
          <RenderAIContent content={message.content} />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={copy} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <Copy className="w-3 h-3" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <ThumbsUp className="w-3 h-3" />
            Helpful
          </button>
        </div>
      </div>
    </div>
  );
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('performance') || lower.includes('analyze') || lower.includes('analysis')) return aiResponses.default;
  if (lower.includes('sale') || lower.includes('deal') || lower.includes('pipeline') || lower.includes('report')) return aiResponses.sales;
  if (lower.includes('customer') || lower.includes('client') || lower.includes('best')) return aiResponses.customers;
  if (lower.includes('focus') || lower.includes('today') || lower.includes('priority')) return aiResponses.focus;
  return aiResponses.default;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `## Good morning! I'm your BADRA AI Business Assistant 👋

I have full visibility into your business data — revenue, customers, deals, projects, and automations.

**What I can help you with:**
- Analyze business performance and identify opportunities
- Review your sales pipeline and deal status
- Generate insights from your customer data
- Create reports and forecasts
- Prioritize your daily actions

**Ask me anything about your business** or choose a suggested prompt below.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isStreaming]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);

    const response = getAIResponse(text);
    setStreamingMessage(response);
    setIsStreaming(true);
  };

  const handleStreamComplete = () => {
    setIsStreaming(false);
    const aiMsg: Message = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      content: streamingMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setStreamingMessage('');
  };

  const handleReset = () => {
    setMessages([]);
    setLoading(false);
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground">AI Business Assistant</h1>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online · BADRA AI Engine
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl mb-4"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="py-4">
          {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
          {loading && <TypingDots />}
          {isStreaming && (
            <div className="flex items-start gap-3 px-4 py-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="ai-message flex-1">
                <StreamingText text={streamingMessage} onComplete={handleStreamComplete} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="flex-shrink-0 mb-4">
          <p className="text-xs text-muted-foreground mb-3 px-1">Suggested prompts</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {suggestedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => sendMessage(p.text)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span>{p.icon}</span>
                <span className="truncate">{p.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-shrink-0">
        <form
          onSubmit={e => { e.preventDefault(); sendMessage(input); }}
          className="flex gap-3"
        >
          <div className="flex-1 relative">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/60" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about your business..."
              className="form-input pl-11 pr-4 py-4 text-sm"
              disabled={loading || isStreaming}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading || isStreaming}
            className="w-14 flex items-center justify-center rounded-xl transition-all duration-150 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
