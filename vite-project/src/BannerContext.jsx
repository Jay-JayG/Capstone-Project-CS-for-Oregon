import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const BannerContext = createContext();

export const useBanner = () => useContext(BannerContext);

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const BannerProvider = ({ children }) => {
    const [bannerData, setBannerData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: ''
    });

    const [globalData, setGlobalData] = useState();
    const [allBanners, setAllBanners] = useState([]);

    const getBannerData = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}get_headder.php`);
            if (res.data && res.data.length > 0) {
                setAllBanners(res.data);
                console.log("res.data", res.data);
            }
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };

    const getGlobalData = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}globals.php`);
            if (res.status === 200) {
            console.log("global data", res.data);
            setGlobalData(res.data);
            }
        } catch (error) {
            console.error("Error fetching global data:", error);
        }
    };
    
    useEffect(() => {
        getGlobalData();
        getBannerData();
    }, []);

    useEffect(() => {
        if (globalData && allBanners.length > 0) {
            const bannerToShow = allBanners.find(
                (banner) => banner.id === globalData.banner_to_show
            );
            if (bannerToShow) {
                setBannerData(bannerToShow); // Set the bannerData to the matching banner
            }
            console.log("banner set", bannerData);
        }
    }, [globalData, allBanners]);

    const updateBannerData = (newData) => {
        setBannerData(newData);
    };

    const updateGlobalData = (newData) => {
        setGlobalData((prevData) => ({
            ...prevData, ...newData
        }));
    };

    return (
        
        <BannerContext.Provider value={{ bannerData, globalData, updateBannerData, updateGlobalData }}>
            {children}
        </BannerContext.Provider>
    );
};