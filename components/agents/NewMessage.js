// New Messages component
import { useState, useEffect } from 'react';

export default function NewMessage({
  agents = [],
  admins = [],
  onRecipientSelect,
}) {
  const [selectedId, setSelectedId] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (agents.length > 0 || admins.length > 0) {
      const storedRecipientId = localStorage.getItem('selectedRecipientId');
      console.log('Stored Recipient ID:', storedRecipientId);

      if (storedRecipientId) {
        const selectedRecipient =
          agents.find((agent) => agent._id === storedRecipientId) ||
          admins.find((admin) => admin._id === storedRecipientId);

        if (selectedRecipient) {
          console.log('Selected Recipient Found:', selectedRecipient);
          setSelectedId(storedRecipientId);
          const recipientModel = storedRecipientId.startsWith('66')
            ? 'Admin'
            : 'Agent';
          onRecipientSelect({ ...selectedRecipient, model: recipientModel });
        }
      }

      setIsDataLoaded(true);
    }
  }, [agents, admins]);

  const handleRecipientChange = (e) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);
    localStorage.setItem('selectedRecipientId', selectedId);

    const selectedRecipient =
      agents.find((agent) => agent._id === selectedId) ||
      admins.find((admin) => admin._id === selectedId);

    if (selectedRecipient) {
      const recipientModel = selectedId.startsWith('66') ? 'Admin' : 'Employee';
      onRecipientSelect({ ...selectedRecipient, model: recipientModel });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageContent = e.target.elements.message.value;
    if (selectedId && messageContent) {
      console.log('Message sent to:', selectedId, 'Content:', messageContent);

      e.target.reset();
    }
  };

  if (!isDataLoaded) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm bg-transparent me-1 px-2"
        data-bs-toggle="modal"
        data-bs-target="#newMessageModal"
      >
        <i className="social-icon fa-solid fa-square-pen"></i>
      </button>

      <div
        className="modal fade"
        id="newMessageModal"
        tabIndex="-1"
        aria-labelledby="newMessageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newMessageModalLabel">
                New Message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">To</span>
                <select
                  className="form-select"
                  onChange={handleRecipientChange}
                  value={selectedId}
                >
                  <option value="">Contacts</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
              <form onSubmit={handleSendMessage}>
                <div className="input-group" style={{ width: '30rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    name="message"
                    required
                  />
                  <button className="btn btn-md" type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
