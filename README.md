# Accumulator Product Simulator

A sophisticated simulator for analyzing equity accumulator products, focusing on NVIDIA (NVDA) structured products. This tool helps visualize different market scenarios, potential outcomes, and associated risks.

## Features

- **Price Simulation**: Visualize bullish, bearish, and sideways market scenarios
- **Real-time Calculations**: Dynamic P&L analysis and risk metrics
- **Knock-out Analysis**: Track knock-out events and guaranteed periods
- **Margin Call Detection**: Monitor potential margin calls in different scenarios
- **Risk Analysis**: Comprehensive risk breakdown including leverage and margin risks
- **Biweekly Settlement**: Detailed settlement calculations and tracking
- **Dark Mode Interface**: Eye-friendly design for financial analysis

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tryppy/accumulator-sim.git
```

2. Navigate to the project directory:
```bash
cd accumulator-sim
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit: `http://localhost:3000`

## Usage Guide

### Setting Parameters

1. **Current Price**: Enter the current NVDA stock price
2. **Preset Selection**: Choose from 6 different preset configurations:
   - 105% KO with 4-week guarantee
   - 105% KO with 8-week guarantee
   - 108% KO with 4-week guarantee
   - 108% KO with 8-week guarantee
   - 110% KO with 4-week guarantee
   - 110% KO with 8-week guarantee

### Reading the Simulation

#### Price Chart
- **Green Line**: Bullish scenario
- **Red Line**: Bearish scenario
- **Yellow Line**: Sideways scenario
- **Blue Line**: Strike price level
- **Red Line**: Knock-out price level

#### Scenario Analysis
Each scenario card shows:
- Total accumulated shares
- Total cost and average cost
- Final price and P&L
- Knock-out status (if applicable)
- Biweekly settlement details
- Margin call events

### Risk Analysis

The simulator provides three key risk metrics:
1. **Knock-out Risk**: Early termination analysis
2. **Leverage Risk**: Impact of gearing on accumulation
3. **Margin Risk**: Margin call probability and impact

## Technical Details

### Stock Parameters
- Trading Days: 250 days
- Biweekly Settlement: Every 10 trading days
- Default Shares Per Day: 100
- Gearing Ratio: 2x
- Initial Margin: 30%

### Simulation Methodology
- Monte Carlo simulation with three scenarios
- Volatility: 2% daily
- Uptrend: 0.08% daily drift (bullish)
- Downtrend: -0.08% daily drift (bearish)
- Random walk for sideways scenario

## Development

### Technology Stack
- Next.js 13
- React 18
- Recharts for visualization
- TailwindCSS for styling
- TypeScript for type safety

### Project Structure
```
src/
├── app/
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── AccumulatorSimulator/
│   │   ├── index.jsx
│   │   ├── ScenarioCard.jsx
│   │   ├── constants.js
│   │   └── utils.js
│   └── ui/
│       └── alert.jsx
└── styles/
    └── globals.css
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Disclaimers

This simulator is for educational and demonstration purposes only. Real market conditions may vary significantly. Always consult with financial professionals before making investment decisions.

## License

MIT License - see the [LICENSE.md](LICENSE) file for details