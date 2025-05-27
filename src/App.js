import React, { useState } from 'react';
import { SleepInputForm } from './SleepInputForm'; // Changed to named import
import { SleepResultsDisplay } from './SleepResultsDisplay'; // Changed to named import

const App = () => {
    // State variables to store user inputs for the form
    const [totalSleepHours, setTotalSleepHours] = useState('');
    const [sleepEfficiency, setSleepEfficiency] = useState('');
    const [remPercentage, setRemPercentage] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('male');

    // State variables to store results from the API
    const [shieldScore, setShieldScore] = useState(null);
    const [bioAgeDelta, setBioAgeDelta] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Base URL for the backend API. This must match your Java Spring Boot app's address.
    const API_BASE_URL = 'http://localhost:8080';

    /**
     * Handles the form submission, sending data to the backend API.
     * This function is passed down to SleepInputForm.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            totalSleepHours: parseFloat(totalSleepHours),
            sleepEfficiency: parseFloat(sleepEfficiency),
            remPercentage: parseFloat(remPercentage),
            age: parseInt(age),
            sex: sex,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/sleep/score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorDetails = 'Something went wrong with the API call.';
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.alerts && errorData.alerts.length > 0) {
                        errorDetails = errorData.alerts.join(', ');
                    } else if (errorData && errorData.message) {
                        errorDetails = errorData.message;
                    }
                } catch (jsonError) {
                    errorDetails = `API call failed with status: ${response.status} ${response.statusText}`;
                }
                throw new Error(errorDetails);
            }

            const data = await response.json();
            setShieldScore(data.shieldScore);
            setBioAgeDelta(data.bioAgeDelta);
            setAlerts(data.alerts || []);
            setSuggestions(data.suggestions || []);
        } catch (err) {
            console.error('Error fetching sleep score:', err);
            setError(err.message);
            setShieldScore(null);
            setBioAgeDelta(null);
            setAlerts([]);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    SHIELD Sleep Dashboard
                </h1>

                {/* Render the SleepInputForm component */}
                <SleepInputForm
                    totalSleepHours={totalSleepHours}
                    setTotalSleepHours={setTotalSleepHours}
                    sleepEfficiency={sleepEfficiency}
                    setSleepEfficiency={setSleepEfficiency}
                    remPercentage={remPercentage}
                    setRemPercentage={setRemPercentage}
                    age={age}
                    setAge={setAge}
                    sex={sex}
                    setSex={setSex}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />

                {/* Loading and Error Messages */}
                {loading && (
                    <div className="text-center text-indigo-600 text-lg font-semibold mb-4">
                        Loading results...
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                {/* Render the SleepResultsDisplay component */}
                {shieldScore !== null && !loading && !error && (
                    <SleepResultsDisplay
                        shieldScore={shieldScore}
                        bioAgeDelta={bioAgeDelta}
                        alerts={alerts}
                        suggestions={suggestions}
                    />
                )}
            </div>
            {/* Tailwind CSS CDN for styling */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Custom font (Inter) */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>
        </div>
    );
};

export default App;