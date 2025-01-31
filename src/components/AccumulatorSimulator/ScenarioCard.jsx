import React from 'react';

export const ScenarioCard = ({ scenario, data }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
    <h4 className="text-lg font-bold mb-4 capitalize text-gray-100">{scenario}</h4>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
        <div>Total Shares:</div>
        <div className="text-gray-100">{data.summary.totalShares?.toLocaleString()}</div>
        <div>Total Cost:</div>
        <div className="text-gray-100">${data.summary.totalCost?.toLocaleString()}</div>
        <div>Average Cost:</div>
        <div className="text-gray-100">${data.summary.avgCost?.toFixed(2)}</div>
        <div>Final Price:</div>
        <div className="text-gray-100">${data.summary.finalPrice?.toFixed(2)}</div>
        <div>P&L:</div>
        <div className={data.summary.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
          ${data.summary.pnl?.toLocaleString()} ({data.summary.pnlPercent?.toFixed(2)}%)
        </div>
        {data.summary.knockoutDay && (
          <>
            <div>Knocked Out:</div>
            <div className="text-yellow-400">Day {data.summary.knockoutDay}</div>
          </>
        )}
      </div>

      <div>
        <h5 className="font-medium mb-2 text-gray-300">Settlements</h5>
        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr>
                <th className="text-left py-2">Period</th>
                <th className="text-right py-2">Shares</th>
                <th className="text-right py-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.settlements.map((settlement, idx) => (
                <tr key={idx} className="border-t border-gray-700">
                  <td className="py-2">{idx + 1}</td>
                  <td className="text-right py-2">{settlement.shares.toLocaleString()}</td>
                  <td className="text-right py-2">${settlement.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {data.marginCalls?.length > 0 && (
        <div>
          <h5 className="font-medium mb-2 text-red-400">Margin Calls</h5>
          <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr>
                  <th className="text-left py-2">Day</th>
                  <th className="text-right py-2">Shortfall</th>
                </tr>
              </thead>
              <tbody>
                {data.marginCalls.map((call, idx) => (
                  <tr key={idx} className="border-t border-gray-700">
                    <td className="py-2">{call.day}</td>
                    <td className="text-right py-2 text-red-400">
                      ${call.shortfall.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);