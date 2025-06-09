import React from 'react';
import { BannerProvider } from './BannerContext';
import { EventPagesProvider } from './pages/AdminPages/MajorEventsAdminPage/EventPageContext';
import { PolicyTextProvider } from './pages/AdminPages/PolicyAdminPage/PolicyPageContext';
import { ProfileProvider } from './ProfileContext';
import { SpotlightProvider } from './SpotlightContext';

// Centralized Context Wrapper
export const AppProviders = ({ children }) => {
    return (
        <BannerProvider>
            <EventPagesProvider>
                <PolicyTextProvider>
                    <ProfileProvider>
                        <SpotlightProvider>
                            {children}
                        </SpotlightProvider>
                    </ProfileProvider>
                </PolicyTextProvider>
            </EventPagesProvider>
        </BannerProvider>
    );
};
