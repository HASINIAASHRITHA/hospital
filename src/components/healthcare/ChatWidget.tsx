import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'admin';
  timestamp: string;
  isRead: boolean;
}

interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  messages: ChatMessage[];
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [hasStarted, setHasStarted] = useState(false);
  const [chatSessions, setChatSessions] = useLocalStorage<ChatSession[]>('chatSessions', []);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = chatSessions.find(s => s.id === currentSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentSession?.messages.length) {
      scrollToBottom();
    }
  }, [currentSession?.messages]);

  const startChat = () => {
    if (!userInfo.name || !userInfo.email) return;

    const sessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: sessionId,
      userId: sessionId,
      userName: userInfo.name,
      userEmail: userInfo.email,
      messages: [{
        id: Date.now().toString(),
        message: `Hello! I'm ${userInfo.name}. I need assistance.`,
        sender: 'user',
        timestamp: new Date().toISOString(),
        isRead: false
      }, {
        id: (Date.now() + 1).toString(),
        message: 'Hello! Thank you for contacting us. How can I help you today?',
        sender: 'admin',
        timestamp: new Date().toISOString(),
        isRead: true
      }],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setChatSessions([...chatSessions, newSession]);
    setCurrentSessionId(sessionId);
    setHasStarted(true);
  };

  const sendMessage = () => {
    if (!message.trim() || !currentSession) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
      isRead: false
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage],
      updatedAt: new Date().toISOString()
    };

    setChatSessions(chatSessions.map(s => 
      s.id === currentSessionId ? updatedSession : s
    ));

    setMessage('');

    // Simulate admin response (in real app, this would be handled by admin dashboard)
    setTimeout(() => {
      const adminResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Thank you for your message. Our team will assist you shortly.',
        sender: 'admin',
        timestamp: new Date().toISOString(),
        isRead: true
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, adminResponse],
        updatedAt: new Date().toISOString()
      };

      setChatSessions(prev => prev.map(s => 
        s.id === currentSessionId ? finalSession : s
      ));
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl border-0 transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-96'
      }`}>
        <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Chat Support</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {!hasStarted ? (
              <div className="p-4 space-y-4 flex-1">
                <p className="text-sm text-muted-foreground">
                  Please provide your details to start chatting:
                </p>
                <div className="space-y-3">
                  <Input
                    placeholder="Your Name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  />
                  <Button 
                    onClick={startChat}
                    className="w-full"
                    disabled={!userInfo.name || !userInfo.email}
                  >
                    Start Chat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {currentSession?.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatWidget;