import React, { useEffect, useState } from "react";
import NotificationElement from "../NotificationElement";
import Modal from "../Modal";
import { PVSForm } from "../forms/PVsForm";
import Signature from "../Signature";

function NotificationsList() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeNotif, setActiveNotif] = useState<any | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    // Get current user
    let currentUser = null;
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        try {
          currentUser = JSON.parse(userStr);
        } catch {}
      }
    }
    if (currentUser) {
      // Get all users and find notifications for current user
      const usersRaw = localStorage.getItem('registeredUsers');
      if (usersRaw) {
        try {
          const users = JSON.parse(usersRaw);
          const user = users.find((u: any) => u.email === currentUser.email);
          setNotifications(user?.notifications || []);
        } catch {}
      }
    }
  }, []);

  if (!notifications.length) {
    return <div className="text-center text-gray-500 mt-8">No notifications.</div>;
  }

  const handleComplete = (notif: any) => {
    setActiveNotif(notif);
    setShowReview(true);
  };

  const handleContinue = () => {
    setShowReview(false);
    setShowSignature(true);
  };

  const handleSignatureSave = () => {
    // Mark notification as read (completed)
    if (typeof window !== 'undefined' && activeNotif) {
      const usersRaw = localStorage.getItem('registeredUsers');
      const currentUserStr = localStorage.getItem('currentUser');
      if (usersRaw && currentUserStr) {
        try {
          const users = JSON.parse(usersRaw);
          const currentUser = JSON.parse(currentUserStr);
          const updatedUsers = users.map((u: any) => {
            if (u.email === currentUser.email) {
              return {
                ...u,
                notifications: u.notifications.map((n: any) =>
                  n.id === activeNotif.id ? { ...n, read: true } : n
                ),
              };
            }
            return u;
          });
          localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        } catch {}
      }
    }
    setShowSignature(false);
    setActiveNotif(null);
    // Optionally, refresh notifications
    window.location.reload();
  };

  return (
    <div className="space-y-4 mt-4">
      {notifications.slice().reverse().map((notif) => (
        <div key={notif.id}>
          <NotificationElement notification={notif} />
          {!notif.read && (
            <button
              className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => handleComplete(notif)}
            >
              Complete
            </button>
          )}
        </div>
      ))}

      {/* Modal for review and signature */}
      {activeNotif && showReview && (
        <Modal isOpen={showReview} onClose={() => { setShowReview(false); setActiveNotif(null); }} title="Review Request/Assignment">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-black">Review Details</h3>
            <ul className="text-black mb-4">
              <li><strong>Type:</strong> {activeNotif.type === 'assign' ? 'Assignment' : 'Request'}</li>
              <li><strong>Car:</strong> {activeNotif.carPlate || activeNotif.carId}</li>
              <li><strong>From:</strong> {activeNotif.from}</li>
              <li><strong>To:</strong> {activeNotif.to}</li>
              <li><strong>Date:</strong> {new Date(activeNotif.date).toLocaleString()}</li>
              <li><strong>Message:</strong> {activeNotif.message}</li>
            </ul>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </Modal>
      )}
      {activeNotif && showSignature && (
        <Modal isOpen={showSignature} onClose={() => { setShowSignature(false); setActiveNotif(null); }} title="Complete with Signature">
          <div className="p-4">
            <Signature onSave={handleSignatureSave} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default NotificationsList;


