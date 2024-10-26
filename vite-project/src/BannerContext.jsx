import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BannerContext = createContext();

export const useBanner = () => useContext(BannerContext);

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const BannerProvider = ({ children }) => {
    const [bannerData, setBannerData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: ''
    });

    const getBannerData = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}get_headder.php`);
            if (res.data && res.data.length > 0) {
                setBannerData(res.data[0]);
            }
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };
    
    useEffect(() => {
        getBannerData();
    }, []);

    const updateBannerData = (newData) => {
        setBannerData(newData);
    };


    return (
        <BannerContext.Provider value={{ bannerData, updateBannerData }}>
            {children}
        </BannerContext.Provider>
    );
};