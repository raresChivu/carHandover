import { useState } from 'react';


export function useAppStates() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentView, setCurrentView] = useState('cars');
    const [pvs, setPvs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [showCarForm, setShowCarForm] = useState(false);
    const [showPvForm, setShowPvForm] = useState(false);
    const [currentPv, setCurrentPv] = useState(null);
    const [showSignature, setShowSignature] = useState(false);
    const [signatureType, setSignatureType] = useState('donor');
    const [isDrawing, setIsDrawing] = useState(false);
    const [signatures, setSignatures] = useState({ donor: null, recipient: null });

    return {
        isAuthenticated,
        setIsAuthenticated,
        currentView,
        setCurrentView,
        pvs,
        setPvs,
        searchTerm,
        setSearchTerm,
        selectedCar,
        setSelectedCar,
        showCarForm,
        setShowCarForm,
        showPvForm,
        setShowPvForm,
        currentPv,
        setCurrentPv,
        showSignature,
        setShowSignature,
        signatureType,
        setSignatureType,
        isDrawing,
        setIsDrawing,
        signatures,
        setSignatures
    };
}


