import React from 'react';

// Changed to named export
export const SleepInputForm = ({
    totalSleepHours, setTotalSleepHours,
    sleepEfficiency, setSleepEfficiency,
    remPercentage, setRemPercentage,
    age, setAge,
    sex, setSex,
    handleSubmit,
    loading
}) => {
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total Sleep Hours Input */}
            <div>
                <label htmlFor="totalSleepHours" className="block text-gray-700 text-sm font-semibold mb-2">
                    Total Sleep Hours (e.g., 7.5)
                    <span className="ml-2 text-gray-500 text-xs italic" title="The total amount of time you spent asleep.">
                        (Hours)
                    </span>
                </label>
                <input
                    type="number"
                    id="totalSleepHours"
                    value={totalSleepHours}
                    onChange={(e) => setTotalSleepHours(e.target.value)}
                    step="0.1"
                    min="0"
                    max="24"
                    required
                    title="Enter the total number of hours you slept, e.g., 7.5 for 7 hours and 30 minutes."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                />
            </div>

            {/* Sleep Efficiency Input */}
            <div>
                <label htmlFor="sleepEfficiency" className="block text-gray-700 text-sm font-semibold mb-2">
                    Sleep Efficiency (%) (e.g., 90)
                    <span className="ml-2 text-gray-500 text-xs italic" title="The percentage of time you spent actually asleep while in bed.">
                        (%)
                    </span>
                </label>
                <input
                    type="number"
                    id="sleepEfficiency"
                    value={sleepEfficiency}
                    onChange={(e) => setSleepEfficiency(e.target.value)}
                    step="0.1"
                    min="0"
                    max="100"
                    required
                    title="Enter your sleep efficiency as a percentage (0-100%). Higher is generally better."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                />
            </div>

            {/* REM Percentage Input */}
            <div>
                <label htmlFor="remPercentage" className="block text-gray-700 text-sm font-semibold mb-2">
                    REM Percentage (%) (e.g., 20)
                    <span className="ml-2 text-gray-500 text-xs italic" title="The percentage of your total sleep time spent in Rapid Eye Movement (REM) sleep.">
                        (%)
                    </span>
                </label>
                <input
                    type="number"
                    id="remPercentage"
                    value={remPercentage}
                    onChange={(e) => setRemPercentage(e.target.value)}
                    step="0.1"
                    min="0"
                    max="100"
                    required
                    title="Enter the percentage of your sleep spent in REM stage (0-100%)."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                />
            </div>

            {/* Age Input */}
            <div>
                <label htmlFor="age" className="block text-gray-700 text-sm font-semibold mb-2">
                    Age
                    <span className="ml-2 text-gray-500 text-xs italic" title="Your current age in years. Used for age-specific sleep recommendations.">
                        (Years)
                    </span>
                </label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    max="120"
                    required
                    title="Enter your age. This helps personalize sleep score interpretation."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                />
            </div>

            {/* Sex Selection */}
            <div className="md:col-span-2">
                <label htmlFor="sex" className="block text-gray-700 text-sm font-semibold mb-2">
                    Sex
                    <span className="ml-2 text-gray-500 text-xs italic" title="Your biological sex. Sleep patterns can vary slightly by sex.">
                        (Biological)
                    </span>
                </label>
                <select
                    id="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                    title="Select your biological sex."
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Calculating...' : 'Calculate Sleep Score'}
                </button>
            </div>
        </form>
    );
};