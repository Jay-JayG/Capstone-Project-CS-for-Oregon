import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { PolicyText } from '../../../types/eventTypes';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface PolicyTextContextType {
    policyText: PolicyText;
    setPolicyText: React.Dispatch<React.SetStateAction<PolicyText>>;
    fetchPolicyText: () => Promise<void>; // Expose fetchPolicyText in the context
}

// Create a context with PolicyTextContextType or undefined as the default value
const PolicyTextContext = createContext<PolicyTextContextType | undefined>(undefined);

export const PolicyTextProvider = ({ children }: { children: ReactNode }) => {
    const [policyText, setPolicyText] = useState<PolicyText>('');
    
    // Fetch event pages data from server
    const fetchPolicyText = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}policy_update.php`);
            // console.log("policy",res.data.policyText);
            setPolicyText(res.data.policyText);
        } catch (error) {
            console.error('Error fetching event pages:', error);
        }
    };

    // Fetch event pages when the component mounts
    useEffect(() => {
        fetchPolicyText();
    }, []);

    return (
        <PolicyTextContext.Provider value={{ policyText, setPolicyText, fetchPolicyText }}>
            {children}
        </PolicyTextContext.Provider>
    );
};

// This is a "custome hook" which wraps useContext meaning useing usePolicyText on a module
// does not nerquire importing useContext.

export const usePolicyText = () => {
    const context = useContext(PolicyTextContext);
    // This line below prevents errors if context is undefines, which it would be if the provider does not wrap the page it used on.
    if (!context) throw new Error('usePolicyText must be used within an PolicyTextProvider');
    return context;
};