import React, { useState } from 'react';
import CustomerSidebar from './CustomerSidebar';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import './CustomerMessage.css';

const CustomerMessage = () => {
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    isMobile: false,
    isCollapsed: false
  });
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Maria's Bakery",
      type: "MSME Business",
      lastMessage: "Thank you for your order! Your buko pie will be ready tomorrow.",
      time: "2m ago",
      unread: true,
      avatar: "M"
    },
    {
      id: 2,
      name: "Mountain Brew Coffee",
      type: "MSME Business",
      lastMessage: "We have new arabica beans available!",
      time: "1h ago",
      unread: false,
      avatar: "M"
    },
    {
      id: 3,
      name: "Support Team",
      type: "Support",
      lastMessage: "How can we help you today?",
      time: "1d ago",
      unread: false,
      avatar: "S"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Maria's Bakery",
      message: "Hi! Thank you for your interest in our buko pie. How many would you like to order?",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Hi like to order 2 buko pies. When can I pick them up?",
      time: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Maria's Bakery",
      message: "Perfect! Your order for 2 buko pies is confirmed. They will be ready tomorrow at 2 PM. Total is ₱500.",
      time: "10:33 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      message: "Great! I'll pay upon pickup. Thank you!",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Maria's Bakery",
      message: "Thank you for your order! Your buko pie will be ready tomorrow.",
      time: "10:37 AM",
      isOwn: false
    }
  ];

  const handleSidebarToggle = (state) => {
    setSidebarState(state);
  };

  const handleChatSelect = (conversation) => {
    setSelectedChat(conversation);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <CustomerSidebar onSidebarToggle={handleSidebarToggle} />
      <div className={`dashboard-content ${sidebarState.isOpen && !sidebarState.isMobile ? 'sidebar-open' : ''} ${sidebarState.isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="message-layout">
          {/* Conversations List */}
          <div className="conversations-panel">
            <div className="conversations-header">
              <h2>Messages</h2>
              <div className="search-box">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                />
                {searchTerm && (
                  <button 
                    className="clear-search" 
                    onClick={() => setSearchTerm('')}
                    title="Clear search"
                  >
                    <ClearIcon />
                  </button>
                )}
              </div>
            </div>
            <div className="conversations-list">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`}
                    onClick={() => handleChatSelect(conversation)}
                  >
                    <div className="conversation-avatar">
                      {conversation.avatar}
                    </div>
                    <div className="conversation-info">
                      <div className="conversation-header">
                        <h4>{conversation.name}</h4>
                        <span className="conversation-time">{conversation.time}</span>
                        {conversation.unread && <div className="unread-indicator"></div>}
                      </div>
                      <p className="conversation-type">{conversation.type}</p>
                      <p className="last-message">{conversation.lastMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-conversations">
                  <p>No conversations found</p>
                  {searchTerm && (
                    <p className="search-hint">Try adjusting your search terms</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-panel">
            {selectedChat ? (
              <>
                <div className="chat-header">
                  <div className="chat-info">
                    <div className="chat-avatar">
                      {selectedChat.avatar}
                    </div>
                    <div>
                      <h3>{selectedChat.name}</h3>
                      <p>{selectedChat.type}</p>
                    </div>
                  </div>
                </div>
                <div className="chat-messages">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.isOwn ? 'message-own' : 'message-other'}`}
                    >
                      <div className="message-content">
                        {message.message}
                      </div>
                      <div className="message-time">
                        {message.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} className="send-button">
                    <SendIcon />
                  </button>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <h3>Select a conversation to start messaging</h3>
                <p>Choose from your existing conversations or start a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMessage;
