import React from 'react';

// Changed to named export
export const SleepResultsDisplay = ({ shieldScore, bioAgeDelta, alerts, suggestions }) => {
    // Determine color class for SHIELD Score
    const getScoreColorClass = (score) => {
        if (score >= 85) return 'bg-green-500'; // Change to bg- for background color
        if (score >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // Determine color class for Bio-Age Delta
    const getBioAgeDeltaColorClass = (delta) => {
        const deltaNum = parseFloat(delta);
        if (deltaNum < 0) return 'text-green-600'; // Younger bio-age
        if (deltaNum === 0) return 'text-gray-600'; // Same bio-age
        return 'text-red-600'; // Older bio-age
    };

    return (
        <div className="mt-8 border-t-2 border-gray-200 pt-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Sleep Report</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* SHIELD Sleep Score Card */}
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 shadow-md">
                    <p className="text-lg font-semibold text-blue-700 mb-2">SHIELD Sleep Score</p>
                    <div
                        className={`text-5xl font-extrabold ${getScoreColorClass(shieldScore).replace('bg-', 'text-')}`} // Keep text color for score text
                        title={`A score of ${shieldScore} out of 100.`}
                    >
                        {shieldScore}
                    </div>
                    {/* Sleep Score Meter */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div
                            className={`h-2.5 rounded-full ${getScoreColorClass(shieldScore)}`} // Apply background color class here
                            style={{ width: `${shieldScore}%` }} // Only width needed in style
                            title={`Sleep Score: ${shieldScore}%`}
                        ></div>
                    </div>
                </div>

                {/* Bio-Age Change Card */}
                <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-md">
                    <p className="text-lg font-semibold text-green-700 mb-2">Bio-Age Change</p>
                    <div
                        className={`text-5xl font-extrabold ${getBioAgeDeltaColorClass(bioAgeDelta)}`}
                        title={`Your sleep patterns indicate a biological age delta of ${bioAgeDelta} years.`}
                    >
                        {bioAgeDelta}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        {parseFloat(bioAgeDelta) < 0
                            ? 'Your sleep patterns suggest a younger biological age!'
                            : parseFloat(bioAgeDelta) > 0
                            ? 'Your sleep patterns suggest an older biological age.'
                            : 'Your sleep patterns align with your chronological age.'}
                    </p>
                </div>
            </div>

            {/* System Alerts Section */}
            {alerts.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">System Alerts</h3>
                    <ul className="space-y-4">
                        {alerts.map((alert, index) => (
                            <li key={index} className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm">
                                <p className="font-semibold text-yellow-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.542 2.705-1.542 3.47 0l5.58 11.299A1.5 1.5 0 0117.035 16H2.965a1.5 1.5 0 01-1.47-1.602l5.58-11.299zM10 13a1 1 0 100-2 1 1 0 000 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                    </svg>
                                    {alert}
                                </p>
                                {suggestions[index] && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        <span className="font-medium">Suggestion:</span> {suggestions[index]}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Alerts Message */}
            {alerts.length === 0 && shieldScore !== null && ( // Only show if score is calculated and no alerts
                <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm text-center">
                    <p className="text-lg font-semibold text-green-800">
                        <svg className="w-6 h-6 inline-block mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Great job! No specific alerts for your sleep data.
                    </p>
                </div>
            )}
        </div>
    );
};