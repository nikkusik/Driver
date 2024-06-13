'use client';
import React, { useEffect, useState } from 'react';

const NotificationBanner = ({ notifications }: { notifications: any[] }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 relative" role="alert">
            <button
                onClick={() => setVisible(false)}
                className="absolute top-0 right-0 p-2"
                aria-label="Close"
            >
                &times;
            </button>
            <p className="font-bold">Уведомления</p>
            {notifications.map((notification) => (
                <p key={notification.id}>{notification.message}</p>
            ))}
        </div>
    );
};

export default NotificationBanner;
