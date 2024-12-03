// View messages component
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import NewMessage from './NewMessage';

const formatMessageTimestamp = (timestamp) => {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formattedTime = messageDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = messageDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const isToday =
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear();

  const isYesterday =
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear();

  // Display the appropriate message
  if (isToday) {
    return `${formattedDate}, ${formattedTime}`;
  } else if (isYesterday) {
    return `Yesterday, ${formattedTime}`;
  } else {
    return `${formattedDate}, ${formattedTime}`;
  }
};

export default function ViewMessages({
  setActiveComponent,
  currentAgentId,
  currentAdminId,
}) {
  const [conversations, setConversations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRecipient, setActiveRecipient] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [messagesRes, adminsRes, agentsRes] = await Promise.all([
          axios.get('http://localhost:3001/messages'),
          axios.get('http://localhost:3001/admins'),
          axios.get('http://localhost:3001/agents'),
        ]);

        setAdmins(adminsRes.data);
        setEmployees(agentsRes.data);

        const groupedConversations = groupMessagesByConversation(
          messagesRes.data
        );

        const enrichedConversations = groupedConversations.map((conv) => {
          const sender = findUserById(
            conv.senderId,
            conv.senderModel,
            adminsRes.data,
            agentsRes.data
          );

          return {
            ...conv,
            senderName: sender?.name || 'Unknown Sender',
            timestamp: formatMessageTimestamp(conv.latestMessage.timestamp),
          };
        });

        setConversations(enrichedConversations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [currentAdminId]);

  const groupMessagesByConversation = (allMessages) => {
    const grouped = {};

    allMessages.forEach((msg) => {
      const key = generateConversationKey(msg.sender._id, msg.recipient._id);
      if (
        !grouped[key] ||
        new Date(msg.timestamp) > new Date(grouped[key].latestMessage.timestamp)
      ) {
        grouped[key] = {
          senderId: msg.sender._id,
          senderModel: msg.senderModel,
          recipientId: msg.recipient._id,
          latestMessage: msg,
        };
      }
    });

    return Object.values(grouped);
  };

  const generateConversationKey = (senderId, recipientId) =>
    [senderId, recipientId].sort().join('-');

  const findUserById = (id, model, admins, agents) => {
    if (model === 'Admin') return admins.find((admin) => admin._id === id);
    if (model === 'Agent') return agents.find((agent) => agent._id === id);
    return null;
  };

  const handleRecipientSelect = (recipient) => {
    setActiveRecipient(recipient);
    console.log('Recipient selected:', recipient);
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      <div className="mt-3">
        <div className="chat-container">
          <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
            <div className="card-body h-100">
              <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
                <div
                  className="fade tab-pane show active h-100"
                  id="chat-1"
                  role="tabpanel"
                  aria-labelledby="chat-1-tab"
                >
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex mb-2 mb-sm-0">
                      <div className="flex-shrink-0 avatar me-2">
                        <img
                          className="avatar-img rounded-circle"
                          src="assets/images/avatar/10.jpg"
                          alt=""
                        />
                      </div>
                      <div className="d-block flex-grow-1">
                        <h6 className="mb-0 mt-1 fw-bold d-flex px-1 fs-4">
                          Messages
                        </h6>
                      </div>
                    </div>
                    <NewMessage
                      currentAgentId={currentAgentId}
                      agents={agents}
                      admins={admins}
                      senderModel="Agent"
                      onRecipientSelect={handleRecipientSelect}
                    />
                  </div>
                  <hr />
                  <div className="list-group" style={{ width: '50rem' }}>
                    {conversations.map((conversation) => (
                      <label
                        key={generateConversationKey(
                          conversation.senderId,
                          conversation.recipientId
                        )}
                        className="list-group-item d-flex gap-3"
                      >
                        <a
                          href="#"
                          className="nav-link bg-transparent fs-6 me-2 text-dark"
                          onClick={() => {
                            setActiveComponent(
                              'Messages',
                              conversation.recipientId
                            );
                          }}
                        >
                          <span className="pt-1 form-checked-content">
                            <strong className="d-flex me-5 text-dark">
                              {conversation.senderName}
                            </strong>
                            <div className="mb-1">
                              <Image
                                src={activeRecipient?.image || ''}
                                alt={
                                  activeRecipient?.name || 'Recipient Avatar'
                                }
                                className="avatar-img rounded-circle"
                                width={40}
                                height={40}
                              />

                              {conversation.latestMessage.messageContent}
                            </div>
                            <div className="fw-bold">
                              {conversation.timestamp}{' '}
                            </div>
                          </span>
                        </a>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
