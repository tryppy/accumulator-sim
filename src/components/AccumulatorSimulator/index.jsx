import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Alert } from '@/components/ui/alert';
import { ScenarioCard } from './ScenarioCard';
import { TRADING_DAYS, SHARES_PER_DAY, GEARING_RATIO, INITIAL_MARGIN } from './constants';
import { generateScenarios } from './utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="text-gray-300">Day {label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AccumulatorSimulator = () => {
  const [currentPrice, setCurrentPrice] = useState(700);
  const [knockoutPercentage, setKnockoutPercentage] = useState(105);
  const [guaranteePeriod, setGuaranteePeriod] = useState(19);
  const [simulationResult, setSimulationResult] = useState(null);

  const strikePercentage = knockoutPercentage - 30; // Strike is usually ~30% below KO
  const strikePrice = (strikePercentage * currentPrice) / 100;
  const knockoutPrice = (knockoutPercentage * currentPrice) / 100;

  useEffect(() => {
    runSimulation();
  }, [currentPrice, knockoutPercentage, guaranteePeriod]);

  const runSimulation = () => {
    setSimulationResult(generateScenarios(currentPrice, strikePrice, knockoutPrice, guaranteePeriod));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">NVDA Accumulator Simulator</h1>
        
        <div className="grid grid-cols-1 gap-8 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Knock-out Percentage: {knockoutPercentage}%
            </label>
            <input
              type="range"
              min="105"
              max="110"
              step="0.5"
              value={knockoutPercentage}
              onChange={(e) => setKnockoutPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>105%</span>
              <span>110%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Guarantee Period: {guaranteePeriod} days
            </label>
            <input
              type="range"
              min="19"
              max="39"
              step="20"
              value={guaranteePeriod}
              onChange={(e) => setGuaranteePeriod(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>4 weeks (19 days)</span>
              <span>8 weeks (39 days)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Current Price ($)</label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Number(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Strike Price (${strikePrice.toFixed(2)})</label>
            <div className="w-full p-2 border rounded bg-gray-600 border-gray-500 text-gray-300">
              {strikePercentage.toFixed(2)}% of spot
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Knock-out Price (${knockoutPrice.toFixed(2)})</label>
            <div className="w-full p-2 border rounded bg-gray-600 border-gray-500 text-gray-300">
              {knockoutPercentage}% of spot
            </div>
          </div>
        </div>
      </div>

      {simulationResult && (
        <>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-100">Price Simulation</h2>
            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="day"
                    label={{ value: 'Trading Days', position: 'bottom', fill: '#9CA3AF' }}
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ 
                      backgroundColor: '#1F2937',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                    }}
                  />
                  <ReferenceLine 
                    y={knockoutPrice} 
                    label={{ value: 'Knock-out', fill: '#EF4444', position: 'right' }} 
                    stroke="#EF4444" 
                    strokeDasharray="5 5" 
                  />
                  <ReferenceLine 
                    y={strikePrice} 
                    label={{ value: 'Strike', fill: '#3B82F6', position: 'right' }} 
                    stroke="#3B82F6" 
                    strokeDasharray="5 5" 
                  />
                  <Line 
                    data={simulationResult.bullish.prices}
                    type="monotone"
                    dataKey="price"
                    name="Bullish"
                    stroke="#10B981"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line 
                    data={simulationResult.bearish.prices}
                    type="monotone"
                    dataKey="price"
                    name="Bearish"
                    stroke="#F87171"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line 
                    data={simulationResult.sideways.prices}
                    type="monotone"
                    dataKey="price"
                    name="Sideways"
                    stroke="#FBBF24"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {Object.entries(simulationResult).map(([scenario, data]) => (
              <ScenarioCard key={scenario} scenario={scenario} data={data} />
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-100">Risk Analysis</h3>
            <div className="space-y-4">
              <Alert className="bg-gray-700 border-red-500 text-gray-100">
                <strong className="text-red-400">Knock-out Risk:</strong> Early termination if price reaches {knockoutPercentage}% 
                of initial price (${knockoutPrice.toFixed(2)}). Minimum {guaranteePeriod * SHARES_PER_DAY} shares
                guaranteed during initial {guaranteePeriod} days.
              </Alert>
              
              <Alert className="bg-gray-700 border-yellow-500 text-gray-100">
                <strong className="text-yellow-400">Leverage Risk:</strong> {GEARING_RATIO}x gearing doubles accumulation below strike price,
                amplifying potential losses in declining markets. Maximum share accumulation: {TRADING_DAYS * SHARES_PER_DAY * GEARING_RATIO}.
              </Alert>
              
              <Alert className="bg-gray-700 border-blue-500 text-gray-100">
                <strong className="text-blue-400">Margin Risk:</strong> Initial margin requirement of {INITIAL_MARGIN * 100}%. Margin calls
                possible in adverse market conditions. Monitor margin calls in scenario analysis.
              </Alert>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccumulatorSimulator;