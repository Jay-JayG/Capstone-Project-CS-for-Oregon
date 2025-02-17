import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { EventPage } from '../../../types/eventTypes';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface EventPagesContextType {
    eventPages: EventPage[];
    setEventPages: React.Dispatch<React.SetStateAction<EventPage[]>>;
    fetchEventPages: () => Promise<void>; // Expose fetchEventPages in the context
}

// Create a context with EventPagesContextType or undefined as the default value
const EventPagesContext = createContext<EventPagesContextType | undefined>(undefined);

export const EventPagesProvider = ({ children }: { children: ReactNode }) => {
    const [eventPages, setEventPages] = useState<EventPage[]>([]);
    
    // Fetch event pages data from server
    const fetchEventPages = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}majorevents.php`);
            setEventPages(res.data);
        } catch (error) {
            console.error('Error fetching event pages:', error);
        }
    };

    // Fetch event pages when the component mounts
    useEffect(() => {
        fetchEventPages();
    }, []);

    return (
        <EventPagesContext.Provider value={{ eventPages, setEventPages, fetchEventPages }}>
            {children}
        </EventPagesContext.Provider>
    );
};

// This is a "custome hook" which wraps useContext meaning useing useEventPages on a module
// does not nerquire importing useContext.

export const useEventPages = () => {
    const context = useContext(EventPagesContext);
    // This line below prevents errors if context is undefines, which it would be if the provider does not wrap the page it used on.
    if (!context) throw new Error('useEventPages must be used within an EventPagesProvider');
    return context;
};