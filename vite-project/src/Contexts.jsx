import React from 'react';
import { BannerProvider } from './BannerContext';
import { EventPagesProvider } from './pages/AdminPage/MajorEventsAdminPage/EventPageContext';

// Centralized Context Wrapper
export const AppProviders = ({ children }) => {
    return (
        <BannerProvider>
            <EventPagesProvider>
                {children}
            </EventPagesProvider>
        </BannerProvider>
    );
};