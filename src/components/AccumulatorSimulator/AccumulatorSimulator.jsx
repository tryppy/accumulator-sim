import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Alert } from '@/components/ui/alert';
import { ScenarioCard } from './ScenarioCard';
import { NVDA_PRESETS, INITIAL_MARGIN, TRADING_DAYS, BIWEEKLY_DAYS, SHARES_PER_DAY, GEARING_RATIO } from './constants';
import { generateScenarios } from './utils';

const AccumulatorSimulator = () => {
  const [currentPrice, setCurrentPrice] = useState(700);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [simulationResult, setSimulationResult] = useState(null);

  const strikePrice = NVDA_PRESETS[selectedPreset].strike * currentPrice / 100;
  const knockoutPrice = NVDA_PRESETS[selectedPreset].ko * currentPrice / 100;
  const guaranteePeriod = NVDA_PRESETS[selectedPreset].guarantee;

  const runSimulation = (presetIndex) => {
    setSelectedPreset(presetIndex);
    setSimulationResult(generateScenarios(currentPrice, strikePrice, knockoutPrice, guaranteePeriod));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">NVDA Accumulator Simulator</h1>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {NVDA_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => runSimulation(idx)}
              className={`p-3 rounded-lg ${
                selectedPreset === idx 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Price ($)</label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Strike Price ($)</label>
            <input
              type="number"
              value={strikePrice.toFixed(2)}
              disabled
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Knock-out Price ($)</label>
            <input
              type="number"
              value={knockoutPrice.toFixed(2)}
              disabled
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Guaranteed Days</label>
            <input
              type="number"
              value={guaranteePeriod}
              disabled
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
        </div>
      </div>

      {simulationResult && (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Price Simulation</h2>
            <div className="h-96">
              <LineChart
                width={1000}
                height={400}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: 'Trading Days', position: 'bottom' }} />
                <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={knockoutPrice} label="Knock-out" stroke="red" strokeDasharray="3 3" />
                <ReferenceLine y={strikePrice} label="Strike" stroke="blue" strokeDasharray="3 3" />
                {Object.entries(simulationResult).map(([scenario, data]) => (
                  <Line
                    key={scenario}
                    data={data.prices}
                    type="monotone"
                    dataKey="price"
                    name={scenario}
                    stroke={
                      scenario === 'bullish' ? '#82ca9d' :
                      scenario === 'bearish' ? '#8884d8' : '#ffc658'
                    }
                  />
                ))}
              </LineChart>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {Object.entries(simulationResult).map(([scenario, data]) => (
              <ScenarioCard key={scenario} scenario={scenario} data={data} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Risk Analysis</h3>
            <div className="space-y-4">
              <Alert>
                <strong>Knock-out Risk:</strong> Early termination if price reaches {NVDA_PRESETS[selectedPreset].ko}% 
                of initial price (${knockoutPrice.toFixed(2)}). Minimum {guaranteePeriod * SHARES_PER_DAY} shares
                guaranteed during initial {guaranteePeriod} days.
              </Alert>
              
              <Alert>
                <strong>Leverage Risk:</strong> {GEARING_RATIO}x gearing doubles accumulation below strike price,
                amplifying potential losses in declining markets. Maximum share accumulation: {TRADING_DAYS * SHARES_PER_DAY * GEARING_RATIO}.
              </Alert>
              
              <Alert>
                <strong>Margin Risk:</strong> Initial margin requirement of {INITIAL_MARGIN * 100}%. Margin calls
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