import React, { useState } from 'react';
import { SleepInputForm } from './SleepInputForm';
import { SleepResultsDisplay } from './SleepResultsDisplay';

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

    // State for Lab Report Simulation
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadError, setUploadError] = useState(null);

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
        setShieldScore(null); // Clear previous results

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

    /**
     * Handles mock lab report file selection and submission.
     */
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadMessage('');
        setUploadError(null);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadError("Please select a file to upload.");
            return;
        }

        setUploadMessage("Simulating upload...");
        setUploadError(null);

        // Simulate API call for lab report upload (no actual file transfer here)
        try {
            // If you had a real mock endpoint, you would send FormData:
            // const formData = new FormData();
            // formData.append('file', selectedFile);
            // const response = await fetch(`${API_BASE_URL}/api/lab/upload`, {
            //     method: 'POST',
            //     body: formData,
            // });
            // if (!response.ok) {
            //     throw new Error(`Upload failed with status: ${response.status}`);
            // }
            // const data = await response.json();
            // setUploadMessage(data.message || 'File upload simulated successfully!');

            // For now, just a timeout to simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            setUploadMessage(`File '${selectedFile.name}' simulated upload successfully! (No actual data processed)`);
            setSelectedFile(null); // Clear selected file

        } catch (err) {
            console.error('Simulated upload error:', err);
            setUploadError(`Simulated upload failed: ${err.message}`);
            setUploadMessage('');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    SHIELD Sleep Dashboard
                </h1>

                {/* AI Integration Clarity */}
                <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-3 rounded-md mb-6 text-sm">
                    <p>
                        **Note:** The sleep scoring logic for SHIELD Score and Bio-Age Delta in this demo is based on hardcoded rules. In a full production system, this could be powered by advanced machine learning models for dynamic and personalized insights.
                    </p>
                </div>


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

                {/* Lab Report Upload Simulation */}
                <div className="mt-10 border-t-2 border-gray-200 pt-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Lab Report Upload Simulation</h2>
                    <p className="text-gray-600 text-center mb-4 text-sm">
                        (This is a simulated interface to demonstrate readiness for clinical workflows. No actual file processing occurs.)
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <input
                            type="file"
                            id="labReportUpload"
                            accept=".pdf,.jpg,.png"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                        />
                        {selectedFile && (
                            <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
                        )}
                        <button
                            onClick={handleFileUpload}
                            disabled={!selectedFile || uploadMessage.startsWith("Simulating")}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploadMessage.startsWith("Simulating") ? "Uploading..." : "Simulate Lab Report Upload"}
                        </button>
                        {uploadMessage && (
                            <p className="text-green-600 text-sm mt-2">{uploadMessage}</p>
                        )}
                        {uploadError && (
                            <p className="text-red-600 text-sm mt-2">{uploadError}</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default App;