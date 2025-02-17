import React from 'react';
import { BannerProvider } from './BannerContext';
import { EventPagesProvider } from './pages/AdminPage/MajorEventsAdminPage/EventPageContext';
import { PolicyTextProvider } from './pages/AdminPage/PolicyAdminPage/PolicyPageContext';
// Centralized Context Wrapper
export const AppProviders = ({ children }) => {
    return (
        <BannerProvider>
            <EventPagesProvider>
                <PolicyTextProvider>
                    {children}
                </PolicyTextProvider>
            </EventPagesProvider>
        </BannerProvider>
    );
};
