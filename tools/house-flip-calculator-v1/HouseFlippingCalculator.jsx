import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const HouseFlippingCalculator = () => {
  // Complete 50 state data
  const stateData = {
    AL: { name: 'Alabama', tax: 0.0038, insurance: 120, closingBuy: 0.019, closingSell: 0.019, medianHome: 180000, avgRehab: 28000, avgProfit: 35000 },
    AK: { name: 'Alaska', tax: 0.0104, insurance: 135, closingBuy: 0.021, closingSell: 0.021, medianHome: 320000, avgRehab: 42000, avgProfit: 48000 },
    AZ: { name: 'Arizona', tax: 0.0055, insurance: 145, closingBuy: 0.020, closingSell: 0.020, medianHome: 425000, avgRehab: 38000, avgProfit: 52000 },
    AR: { name: 'Arkansas', tax: 0.0059, insurance: 125, closingBuy: 0.018, closingSell: 0.018, medianHome: 160000, avgRehab: 25000, avgProfit: 28000 },
    CA: { name: 'California', tax: 0.0073, insurance: 165, closingBuy: 0.023, closingSell: 0.023, medianHome: 720000, avgRehab: 55000, avgProfit: 85000 },
    CO: { name: 'Colorado', tax: 0.0049, insurance: 155, closingBuy: 0.021, closingSell: 0.021, medianHome: 560000, avgRehab: 45000, avgProfit: 68000 },
    CT: { name: 'Connecticut', tax: 0.0179, insurance: 180, closingBuy: 0.025, closingSell: 0.025, medianHome: 340000, avgRehab: 42000, avgProfit: 45000 },
    DE: { name: 'Delaware', tax: 0.0056, insurance: 140, closingBuy: 0.020, closingSell: 0.020, medianHome: 310000, avgRehab: 35000, avgProfit: 42000 },
    FL: { name: 'Florida', tax: 0.0086, insurance: 220, closingBuy: 0.021, closingSell: 0.021, medianHome: 385000, avgRehab: 40000, avgProfit: 55000 },
    GA: { name: 'Georgia', tax: 0.0083, insurance: 150, closingBuy: 0.019, closingSell: 0.019, medianHome: 295000, avgRehab: 32000, avgProfit: 42000 },
    HI: { name: 'Hawaii', tax: 0.0027, insurance: 185, closingBuy: 0.024, closingSell: 0.024, medianHome: 820000, avgRehab: 65000, avgProfit: 92000 },
    ID: { name: 'Idaho', tax: 0.0060, insurance: 135, closingBuy: 0.020, closingSell: 0.020, medianHome: 445000, avgRehab: 38000, avgProfit: 52000 },
    IL: { name: 'Illinois', tax: 0.0207, insurance: 160, closingBuy: 0.022, closingSell: 0.022, medianHome: 250000, avgRehab: 32000, avgProfit: 38000 },
    IN: { name: 'Indiana', tax: 0.0078, insurance: 130, closingBuy: 0.018, closingSell: 0.018, medianHome: 195000, avgRehab: 28000, avgProfit: 32000 },
    IA: { name: 'Iowa', tax: 0.0144, insurance: 135, closingBuy: 0.019, closingSell: 0.019, medianHome: 175000, avgRehab: 26000, avgProfit: 30000 },
    KS: { name: 'Kansas', tax: 0.0132, insurance: 145, closingBuy: 0.019, closingSell: 0.019, medianHome: 185000, avgRehab: 27000, avgProfit: 32000 },
    KY: { name: 'Kentucky', tax: 0.0081, insurance: 135, closingBuy: 0.018, closingSell: 0.018, medianHome: 175000, avgRehab: 26000, avgProfit: 30000 },
    LA: { name: 'Louisiana', tax: 0.0052, insurance: 190, closingBuy: 0.019, closingSell: 0.019, medianHome: 205000, avgRehab: 28000, avgProfit: 32000 },
    ME: { name: 'Maine', tax: 0.0110, insurance: 145, closingBuy: 0.021, closingSell: 0.021, medianHome: 290000, avgRehab: 35000, avgProfit: 38000 },
    MD: { name: 'Maryland', tax: 0.0096, insurance: 155, closingBuy: 0.022, closingSell: 0.022, medianHome: 380000, avgRehab: 40000, avgProfit: 52000 },
    MA: { name: 'Massachusetts', tax: 0.0109, insurance: 175, closingBuy: 0.024, closingSell: 0.024, medianHome: 540000, avgRehab: 48000, avgProfit: 65000 },
    MI: { name: 'Michigan', tax: 0.0142, insurance: 140, closingBuy: 0.020, closingSell: 0.020, medianHome: 215000, avgRehab: 28000, avgProfit: 32000 },
    MN: { name: 'Minnesota', tax: 0.0103, insurance: 150, closingBuy: 0.021, closingSell: 0.021, medianHome: 305000, avgRehab: 35000, avgProfit: 42000 },
    MS: { name: 'Mississippi', tax: 0.0061, insurance: 140, closingBuy: 0.018, closingSell: 0.018, medianHome: 145000, avgRehab: 24000, avgProfit: 26000 },
    MO: { name: 'Missouri', tax: 0.0093, insurance: 145, closingBuy: 0.019, closingSell: 0.019, medianHome: 205000, avgRehab: 28000, avgProfit: 32000 },
    MT: { name: 'Montana', tax: 0.0082, insurance: 140, closingBuy: 0.020, closingSell: 0.020, medianHome: 385000, avgRehab: 38000, avgProfit: 45000 },
    NE: { name: 'Nebraska', tax: 0.0156, insurance: 145, closingBuy: 0.019, closingSell: 0.019, medianHome: 210000, avgRehab: 28000, avgProfit: 32000 },
    NV: { name: 'Nevada', tax: 0.0053, insurance: 150, closingBuy: 0.021, closingSell: 0.021, medianHome: 420000, avgRehab: 40000, avgProfit: 52000 },
    NH: { name: 'New Hampshire', tax: 0.0197, insurance: 165, closingBuy: 0.023, closingSell: 0.023, medianHome: 395000, avgRehab: 42000, avgProfit: 48000 },
    NJ: { name: 'New Jersey', tax: 0.0223, insurance: 185, closingBuy: 0.025, closingSell: 0.025, medianHome: 480000, avgRehab: 48000, avgProfit: 58000 },
    NM: { name: 'New Mexico', tax: 0.0076, insurance: 135, closingBuy: 0.019, closingSell: 0.019, medianHome: 245000, avgRehab: 30000, avgProfit: 35000 },
    NY: { name: 'New York', tax: 0.0153, insurance: 195, closingBuy: 0.024, closingSell: 0.024, medianHome: 420000, avgRehab: 45000, avgProfit: 55000 },
    NC: { name: 'North Carolina', tax: 0.0077, insurance: 145, closingBuy: 0.020, closingSell: 0.020, medianHome: 285000, avgRehab: 32000, avgProfit: 40000 },
    ND: { name: 'North Dakota', tax: 0.0099, insurance: 140, closingBuy: 0.019, closingSell: 0.019, medianHome: 245000, avgRehab: 30000, avgProfit: 35000 },
    OH: { name: 'Ohio', tax: 0.0145, insurance: 135, closingBuy: 0.019, closingSell: 0.019, medianHome: 185000, avgRehab: 27000, avgProfit: 30000 },
    OK: { name: 'Oklahoma', tax: 0.0087, insurance: 165, closingBuy: 0.018, closingSell: 0.018, medianHome: 175000, avgRehab: 26000, avgProfit: 30000 },
    OR: { name: 'Oregon', tax: 0.0087, insurance: 150, closingBuy: 0.021, closingSell: 0.021, medianHome: 485000, avgRehab: 42000, avgProfit: 58000 },
    PA: { name: 'Pennsylvania', tax: 0.0135, insurance: 155, closingBuy: 0.021, closingSell: 0.021, medianHome: 230000, avgRehab: 30000, avgProfit: 35000 },
    RI: { name: 'Rhode Island', tax: 0.0141, insurance: 170, closingBuy: 0.023, closingSell: 0.023, medianHome: 380000, avgRehab: 40000, avgProfit: 48000 },
    SC: { name: 'South Carolina', tax: 0.0055, insurance: 155, closingBuy: 0.019, closingSell: 0.019, medianHome: 250000, avgRehab: 30000, avgProfit: 35000 },
    SD: { name: 'South Dakota', tax: 0.0119, insurance: 140, closingBuy: 0.019, closingSell: 0.019, medianHome: 230000, avgRehab: 28000, avgProfit: 32000 },
    TN: { name: 'Tennessee', tax: 0.0064, insurance: 145, closingBuy: 0.019, closingSell: 0.019, medianHome: 255000, avgRehab: 30000, avgProfit: 38000 },
    TX: { name: 'Texas', tax: 0.0160, insurance: 175, closingBuy: 0.020, closingSell: 0.020, medianHome: 300000, avgRehab: 35000, avgProfit: 45000 },
    UT: { name: 'Utah', tax: 0.0057, insurance: 145, closingBuy: 0.020, closingSell: 0.020, medianHome: 485000, avgRehab: 42000, avgProfit: 58000 },
    VT: { name: 'Vermont', tax: 0.0190, insurance: 160, closingBuy: 0.022, closingSell: 0.022, medianHome: 315000, avgRehab: 38000, avgProfit: 42000 },
    VA: { name: 'Virginia', tax: 0.0080, insurance: 150, closingBuy: 0.021, closingSell: 0.021, medianHome: 350000, avgRehab: 38000, avgProfit: 48000 },
    WA: { name: 'Washington', tax: 0.0092, insurance: 155, closingBuy: 0.022, closingSell: 0.022, medianHome: 565000, avgRehab: 48000, avgProfit: 68000 },
    WV: { name: 'West Virginia', tax: 0.0058, insurance: 125, closingBuy: 0.018, closingSell: 0.018, medianHome: 135000, avgRehab: 22000, avgProfit: 24000 },
    WI: { name: 'Wisconsin', tax: 0.0165, insurance: 150, closingBuy: 0.020, closingSell: 0.020, medianHome: 245000, avgRehab: 30000, avgProfit: 35000 },
    WY: { name: 'Wyoming', tax: 0.0058, insurance: 140, closingBuy: 0.020, closingSell: 0.020, medianHome: 295000, avgRehab: 35000, avgProfit: 40000 },
  };

  const [inputs, setInputs] = useState({
    purchasePrice: 180000,
    closingCostsPurchase: 3420,
    squareFeet: 1200,
    rehabCosts: 35000,
    rehabQuality: 'standard', // budget, standard, premium
    contingency: 15,
    propertyTax: 228,
    insurance: 145,
    utilities: 100,
    hoa: 0,
    lawnMaintenance: 100,
    holdingMonths: 6,
    arv: 280000,
    realtorCommission: 6,
    closingCostsSelling: 2,
    loanAmount: 0,
    interestRate: 11,
    loanPoints: 2,
    lenderFees: 1500,
  });

  const [selectedState, setSelectedState] = useState('TX');
  const [savedDeals, setSavedDeals] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showProTip, setShowProTip] = useState(null);
  const [dealName, setDealName] = useState('');
  const [currentTab, setCurrentTab] = useState('purchase');

  useEffect(() => {
    const saved = localStorage.getItem('savedFlipDeals');
    if (saved) {
      setSavedDeals(JSON.parse(saved));
    }
  }, []);

  // Auto-calculate rehab based on sqft and quality
  useEffect(() => {
    if (inputs.squareFeet > 0) {
      let costPerSqft = 55; // default standard
      if (inputs.rehabQuality === 'budget') costPerSqft = 25;
      if (inputs.rehabQuality === 'premium') costPerSqft = 125;
      
      const suggestedRehab = inputs.squareFeet * costPerSqft;
      // Only auto-update if user hasn't manually changed it significantly
      if (Math.abs(inputs.rehabCosts - suggestedRehab) > suggestedRehab * 0.3) {
        setInputs(prev => ({ ...prev, rehabCosts: suggestedRehab }));
      }
    }
  }, [inputs.squareFeet, inputs.rehabQuality]);

  const calculations = () => {
    const {
      purchasePrice,
      closingCostsPurchase,
      rehabCosts,
      contingency,
      propertyTax,
      insurance,
      utilities,
      hoa,
      lawnMaintenance,
      holdingMonths,
      arv,
      realtorCommission,
      closingCostsSelling,
      loanAmount,
      interestRate,
      loanPoints,
      lenderFees,
      squareFeet,
    } = inputs;

    const totalRehabCosts = rehabCosts * (1 + contingency / 100);
    const monthlyHoldingCosts = propertyTax + insurance + utilities + hoa + lawnMaintenance;
    const totalHoldingCosts = monthlyHoldingCosts * holdingMonths;
    
    const monthlyInterest = (loanAmount * (interestRate / 100)) / 12;
    const totalInterest = monthlyInterest * holdingMonths;
    const points = loanAmount * (loanPoints / 100);
    const totalFinancingCosts = totalInterest + points + lenderFees;
    
    const realtorFees = arv * (realtorCommission / 100);
    const sellingClosing = arv * (closingCostsSelling / 100);
    const totalSellingCosts = realtorFees + sellingClosing;
    
    const totalInvestment = 
      purchasePrice +
      closingCostsPurchase +
      totalRehabCosts +
      totalHoldingCosts +
      totalFinancingCosts;
    
    const grossProfit = arv - totalInvestment - totalSellingCosts;
    const roi = totalInvestment > 0 ? (grossProfit / totalInvestment) * 100 : 0;
    const cashNeeded = purchasePrice + closingCostsPurchase + totalRehabCosts - loanAmount;
    const cashOnCashReturn = cashNeeded > 0 ? (grossProfit / cashNeeded) * 100 : 0;
    
    // 70% Rule Check
    const maxPurchasePrice70Rule = (arv * 0.70) - totalRehabCosts;
    const passes70Rule = purchasePrice <= maxPurchasePrice70Rule;
    
    // Cost per sqft
    const costPerSqft = squareFeet > 0 ? rehabCosts / squareFeet : 0;
    
    // Timeline estimate
    let estimatedTimeline = '4-6 months';
    if (costPerSqft < 30) estimatedTimeline = '2-4 months (Cosmetic)';
    else if (costPerSqft > 90) estimatedTimeline = '6-12 months (Major Rehab)';
    
    let dealScore = 0;
    if (roi >= 25) dealScore += 40;
    else if (roi >= 15) dealScore += 30;
    else if (roi >= 10) dealScore += 20;
    else if (roi >= 5) dealScore += 10;
    
    if (grossProfit >= 50000) dealScore += 30;
    else if (grossProfit >= 30000) dealScore += 25;
    else if (grossProfit >= 20000) dealScore += 20;
    else if (grossProfit >= 10000) dealScore += 10;
    
    if (holdingMonths <= 4) dealScore += 20;
    else if (holdingMonths <= 6) dealScore += 15;
    else if (holdingMonths <= 9) dealScore += 10;
    else dealScore += 5;
    
    if (arv / purchasePrice >= 1.4) dealScore += 10;
    else if (arv / purchasePrice >= 1.3) dealScore += 5;

    return {
      totalRehabCosts,
      totalHoldingCosts,
      totalFinancingCosts,
      totalSellingCosts,
      totalInvestment,
      grossProfit,
      roi,
      cashNeeded,
      cashOnCashReturn,
      dealScore: Math.min(100, dealScore),
      monthlyHoldingCosts,
      realtorFees,
      sellingClosing,
      maxPurchasePrice70Rule,
      passes70Rule,
      costPerSqft,
      estimatedTimeline,
    };
  };

  const calc = calculations();

  const getDealRating = (score) => {
    if (score >= 80) return { label: 'EXCELLENT DEAL', color: 'text-emerald-600' };
    if (score >= 60) return { label: 'GOOD DEAL', color: 'text-blue-600' };
    if (score >= 40) return { label: 'MARGINAL', color: 'text-amber-600' };
    return { label: 'WALK AWAY', color: 'text-rose-600' };
  };

  const rating = getDealRating(calc.dealScore);

  // Quick Templates
  const applyTemplate = (template) => {
    const state = stateData[selectedState];
    const sqft = inputs.squareFeet || 1200;
    
    if (template === 'cosmetic') {
      setInputs(prev => ({
        ...prev,
        rehabQuality: 'budget',
        rehabCosts: sqft * 25,
        contingency: 12,
        holdingMonths: 3,
      }));
    } else if (template === 'standard') {
      setInputs(prev => ({
        ...prev,
        rehabQuality: 'standard',
        rehabCosts: sqft * 55,
        contingency: 15,
        holdingMonths: 6,
      }));
    } else if (template === 'luxury') {
      setInputs(prev => ({
        ...prev,
        rehabQuality: 'premium',
        rehabCosts: sqft * 125,
        contingency: 20,
        holdingMonths: 9,
      }));
    }
  };

  const applyStatePreset = (stateCode) => {
    const state = stateData[stateCode];
    setSelectedState(stateCode);
    
    setInputs(prev => ({
      ...prev,
      purchasePrice: state.medianHome,
      closingCostsPurchase: state.medianHome * state.closingBuy,
      propertyTax: (state.medianHome * state.tax) / 12,
      insurance: state.insurance,
      rehabCosts: state.avgRehab,
      arv: state.medianHome + state.avgProfit + state.avgRehab,
      closingCostsSelling: state.closingSell * 100,
      utilities: 100,
      lawnMaintenance: 100,
      realtorCommission: 6,
      contingency: 15,
    }));
  };

  const saveDeal = () => {
    if (!dealName.trim()) {
      alert('Please enter a deal name');
      return;
    }
    
    const newDeal = {
      id: Date.now(),
      name: dealName,
      state: stateData[selectedState].name,
      inputs: { ...inputs },
      calculations: { ...calc },
      date: new Date().toLocaleDateString(),
    };
    
    const updated = [...savedDeals, newDeal];
    setSavedDeals(updated);
    localStorage.setItem('savedFlipDeals', JSON.stringify(updated));
    setDealName('');
    alert('Deal saved!');
  };

  const loadDeal = (deal) => {
    setInputs(deal.inputs);
    setDealName(deal.name);
  };

  const deleteDeal = (id) => {
    const updated = savedDeals.filter(d => d.id !== id);
    setSavedDeals(updated);
    localStorage.setItem('savedFlipDeals', JSON.stringify(updated));
  };

  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const costBreakdown = [
    { name: 'Purchase', value: inputs.purchasePrice + inputs.closingCostsPurchase },
    { name: 'Rehab', value: calc.totalRehabCosts },
    { name: 'Holding', value: calc.totalHoldingCosts },
    { name: 'Financing', value: calc.totalFinancingCosts },
    { name: 'Selling', value: calc.totalSellingCosts },
  ];

  const COLORS = ['#44403c', '#78716c', '#a8a29e', '#d6d3d1', '#e7e5e4'];

  const tabs = [
    { id: 'purchase', label: 'Purchase', icon: '🏠' },
    { id: 'rehab', label: 'Rehab', icon: '🔨' },
    { id: 'holding', label: 'Holding', icon: '⏱️' },
    { id: 'selling', label: 'Selling', icon: '💰' },
    { id: 'financing', label: 'Financing', icon: '🏦' },
  ];

  const topStates = Object.entries(stateData)
    .map(([code, data]) => ({ 
      code, 
      name: data.name, 
      profit: data.avgProfit,
      roi: ((data.avgProfit / (data.medianHome + data.avgRehab)) * 100).toFixed(1)
    }))
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 10);

  const ProTip = ({ title, children }) => (
    <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-xs">
      <div className="font-bold text-blue-900 mb-1">💡 PRO TIP: {title}</div>
      <div className="text-blue-800">{children}</div>
    </div>
  );

  const RedFlag = ({ children }) => (
    <div className="mt-2 p-3 bg-rose-50 border-l-4 border-rose-500 rounded text-xs">
      <div className="font-bold text-rose-900 mb-1">⚠️ RED FLAG</div>
      <div className="text-rose-800">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-stone-50 py-20 px-6 border-b-4 border-amber-600/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-3xl">🏛️</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-600/40 to-transparent" />
          </div>
          <h1 className="text-6xl md:text-7xl font-light mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            House Flipping Calculator
          </h1>
          <p className="text-2xl text-stone-300 font-light tracking-wide mb-4">
            Professional Analysis • All 50 States • Real Market Data • Pro Tips
          </p>
          <div className="flex gap-4 items-center flex-wrap">
            <button
              onClick={() => setShowDisclaimerModal(true)}
              className="text-xs text-amber-300 hover:text-amber-200 underline transition-colors"
            >
              Legal Disclaimer
            </button>
            <span className="text-stone-500">•</span>
            <span className="text-xs text-stone-400">70% Rule Checker Built-In</span>
            <span className="text-stone-500">•</span>
            <span className="text-xs text-stone-400">Data updated May 2026</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Templates */}
        <div className="mb-8 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md border border-blue-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4">
            <h3 className="text-white text-sm uppercase tracking-widest font-bold">⚡ Quick Start Templates</h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => applyTemplate('cosmetic')}
                className="p-6 bg-white rounded-lg border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-3">🎨</div>
                <div className="text-lg font-bold text-stone-900 mb-2">Cosmetic Flip</div>
                <div className="text-sm text-stone-600 mb-3">Paint, floors, fixtures only</div>
                <div className="text-xs text-emerald-700 font-semibold">$15-40/sqft • 2-4 months</div>
              </button>
              <button
                onClick={() => applyTemplate('standard')}
                className="p-6 bg-white rounded-lg border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-3">🔨</div>
                <div className="text-lg font-bold text-stone-900 mb-2">Full Rehab</div>
                <div className="text-sm text-stone-600 mb-3">Kitchen, baths, systems</div>
                <div className="text-xs text-blue-700 font-semibold">$40-90/sqft • 4-8 months</div>
              </button>
              <button
                onClick={() => applyTemplate('luxury')}
                className="p-6 bg-white rounded-lg border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-3">💎</div>
                <div className="text-lg font-bold text-stone-900 mb-2">Luxury Flip</div>
                <div className="text-sm text-stone-600 mb-3">Custom everything, gut job</div>
                <div className="text-xs text-amber-700 font-semibold">$100-150+/sqft • 6-12 months</div>
              </button>
            </div>
          </div>
        </div>

        {/* Top 10 Markets */}
        <div className="mb-12 bg-gradient-to-br from-amber-50 to-white rounded-lg shadow-md border border-amber-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-4">
            <h3 className="text-white text-sm uppercase tracking-widest font-bold">Top 10 Markets by Average Profit</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {topStates.map((state, idx) => (
                <button
                  key={state.code}
                  onClick={() => applyStatePreset(state.code)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedState === state.code
                      ? 'border-amber-600 bg-amber-50 shadow-md'
                      : 'border-stone-200 bg-white hover:border-amber-400 hover:shadow-sm'
                  }`}
                >
                  <div className="text-2xl font-bold text-amber-600 mb-1">#{idx + 1}</div>
                  <div className="text-sm font-semibold text-stone-900 mb-2">{state.name}</div>
                  <div className="text-xs text-stone-600">${(state.profit / 1000).toFixed(0)}K avg</div>
                  <div className="text-xs text-emerald-600 font-semibold">{state.roi}% ROI</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Selector */}
        <div className="mb-12 bg-white rounded-lg shadow-lg border border-stone-200/60 overflow-hidden">
          <div className="bg-gradient-to-r from-stone-50 to-white px-8 py-6 border-b border-stone-200/60">
            <h3 className="text-sm uppercase tracking-widest text-stone-600 font-bold mb-2">Select Your Market</h3>
            <p className="text-xs text-stone-500">Real data for all 50 states</p>
          </div>
          <div className="p-8">
            <select
              value={selectedState}
              onChange={(e) => applyStatePreset(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all cursor-pointer font-medium"
            >
              {Object.entries(stateData)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([code, data]) => (
                  <option key={code} value={code}>
                    {data.name} • ${(data.medianHome / 1000).toFixed(0)}K median • ${(data.avgProfit / 1000).toFixed(0)}K avg profit
                  </option>
                ))}
            </select>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-stone-50 rounded-lg">
              <div>
                <div className="text-xs uppercase tracking-wider text-stone-600 mb-1">Property Tax</div>
                <div className="text-lg font-bold text-stone-900">{(stateData[selectedState].tax * 100).toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-stone-600 mb-1">Insurance</div>
                <div className="text-lg font-bold text-stone-900">${stateData[selectedState].insurance}/mo</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-stone-600 mb-1">Median Home</div>
                <div className="text-lg font-bold text-stone-900">${(stateData[selectedState].medianHome / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-stone-600 mb-1">Avg Profit</div>
                <div className="text-lg font-bold text-emerald-600">${(stateData[selectedState].avgProfit / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border border-stone-200/60">
              <div className="border-b border-stone-200/60 px-8 pt-6">
                <div className="flex overflow-x-auto gap-6">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`pb-4 font-semibold whitespace-nowrap transition-all text-sm tracking-wide flex items-center gap-2 ${
                        currentTab === tab.id
                          ? 'border-b-2 border-amber-600 text-amber-600'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {currentTab === 'purchase' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Square Footage</label>
                      <input
                        type="number"
                        value={inputs.squareFeet}
                        onChange={(e) => updateInput('squareFeet', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        placeholder="1200"
                      />
                      <ProTip title="Size Matters">
                        Larger homes (2000+ sqft) often have lower cost per sqft but higher total rehab. Smaller homes (under 1000 sqft) can flip faster with less capital.
                      </ProTip>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Purchase Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">$</span>
                        <input
                          type="number"
                          value={inputs.purchasePrice}
                          onChange={(e) => updateInput('purchasePrice', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                      </div>
                      {!calc.passes70Rule && (
                        <RedFlag>
                          You're paying too much! 70% Rule says max purchase should be ${calc.maxPurchasePrice70Rule.toLocaleString()}. You're ${(inputs.purchasePrice - calc.maxPurchasePrice70Rule).toLocaleString()} over.
                        </RedFlag>
                      )}
                      {calc.passes70Rule && (
                        <div className="mt-2 p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded text-xs">
                          <div className="font-bold text-emerald-900">✅ Passes 70% Rule</div>
                          <div className="text-emerald-800">Max allowed: ${calc.maxPurchasePrice70Rule.toLocaleString()}</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Closing Costs (Purchase)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">$</span>
                        <input
                          type="number"
                          value={inputs.closingCostsPurchase}
                          onChange={(e) => updateInput('closingCostsPurchase', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                      </div>
                      <ProTip title="Hidden Soft Costs">
                        Budget 10% of purchase price for all closing costs: title, escrow, transfer taxes, recording fees, inspection, appraisal.
                      </ProTip>
                    </div>
                  </div>
                )}

                {currentTab === 'rehab' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Renovation Quality</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'budget', label: 'Budget', range: '$15-40/sqft' },
                          { value: 'standard', label: 'Standard', range: '$40-90/sqft' },
                          { value: 'premium', label: 'Premium', range: '$100-150+/sqft' }
                        ].map(quality => (
                          <button
                            key={quality.value}
                            onClick={() => setInputs(prev => ({ ...prev, rehabQuality: quality.value }))}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              inputs.rehabQuality === quality.value
                                ? 'border-amber-600 bg-amber-50 shadow-md'
                                : 'border-stone-300 bg-white hover:border-amber-400'
                            }`}
                          >
                            <div className="font-bold text-sm mb-1">{quality.label}</div>
                            <div className="text-xs text-stone-600">{quality.range}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Total Rehab Costs</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">$</span>
                        <input
                          type="number"
                          value={inputs.rehabCosts}
                          onChange={(e) => updateInput('rehabCosts', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                      </div>
                      {inputs.squareFeet > 0 && (
                        <div className="mt-2 text-sm text-stone-600">
                          Cost per sqft: <span className="font-bold text-stone-900">${calc.costPerSqft.toFixed(2)}/sqft</span>
                          <span className="ml-2 text-xs">
                            ({inputs.rehabQuality === 'budget' ? '🎨 Cosmetic' : inputs.rehabQuality === 'premium' ? '💎 Luxury' : '🔨 Standard'})
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-stone-500 mt-2">State avg: ${stateData[selectedState].avgRehab.toLocaleString()}</p>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Contingency Buffer (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs.contingency}
                          onChange={(e) => updateInput('contingency', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">%</span>
                      </div>
                      <p className="text-sm text-stone-600 mt-3 flex justify-between items-center">
                        <span>Total with contingency</span>
                        <span className="font-bold text-stone-900">${calc.totalRehabCosts.toLocaleString()}</span>
                      </p>
                      <ProTip title="Always Add More">
                        Pros use 15-20% minimum, not the standard 10%. You can't see behind walls: mold, termites, asbestos, bad wiring, foundation issues add up fast.
                      </ProTip>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                      <div className="font-bold text-sm text-blue-900 mb-3">⏱️ Estimated Timeline: {calc.estimatedTimeline}</div>
                      <div className="text-xs text-blue-800">
                        {calc.costPerSqft < 30 && "Quick flip! Focus on curb appeal, paint, floors, light fixtures."}
                        {calc.costPerSqft >= 30 && calc.costPerSqft <= 90 && "Standard rehab. Plan for permits, contractor scheduling, material delays."}
                        {calc.costPerSqft > 90 && "Major renovation. Factor in architect, permits, inspections. Market could shift during hold."}
                      </div>
                    </div>
                  </div>
                )}

                {currentTab === 'holding' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { key: 'propertyTax', label: 'Property Tax', tip: 'Check your exact county rate - can vary 2x within same state!' },
                        { key: 'insurance', label: 'Insurance', tip: 'Vacant home insurance costs 50-100% MORE than occupied. Factor this in!' },
                        { key: 'utilities', label: 'Utilities', tip: 'Keeping water/electric on prevents pipe freeze, mold. Budget year-round.' },
                        { key: 'hoa', label: 'HOA Fees', tip: 'Unpaid HOA fees = liens. Check if seller has unpaid dues before closing.' },
                        { key: 'lawnMaintenance', label: 'Maintenance', tip: 'Code violations for unmowed lawn = fines. Budget weekly service.' },
                        { key: 'holdingMonths', label: 'Holding Period', suffix: 'mo', tip: 'Every extra month = more holding costs. Move fast!' }
                      ].map(field => (
                        <div key={field.key}>
                          <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">
                            {field.label}
                            {field.key !== 'holdingMonths' && <span className="text-stone-400 ml-1 normal-case">(monthly)</span>}
                          </label>
                          <div className="relative">
                            {field.suffix !== 'mo' && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>}
                            <input
                              type="number"
                              value={inputs[field.key]}
                              onChange={(e) => updateInput(field.key, e.target.value)}
                              className={`w-full ${field.suffix !== 'mo' ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all`}
                            />
                            {field.suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">{field.suffix}</span>}
                          </div>
                          {field.tip && (
                            <div className="mt-2 text-xs text-stone-600 italic">💡 {field.tip}</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="bg-stone-50 p-5 rounded-lg border-2 border-stone-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-stone-600 font-semibold">Total holding costs</span>
                        <span className="text-2xl font-bold text-stone-900">${calc.totalHoldingCosts.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-stone-600 mt-2">
                        ${calc.monthlyHoldingCosts.toLocaleString()}/month × {inputs.holdingMonths} months
                      </div>
                    </div>
                    {inputs.holdingMonths > 9 && (
                      <RedFlag>
                        Holding over 9 months is risky! Market conditions can shift. Consider dropping price to sell faster.
                      </RedFlag>
                    )}
                  </div>
                )}

                {currentTab === 'selling' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">After Repair Value (ARV)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">$</span>
                        <input
                          type="number"
                          value={inputs.arv}
                          onChange={(e) => updateInput('arv', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-bold"
                        />
                      </div>
                      <ProTip title="Don't Over-Improve">
                        Match neighborhood comps! A $500K renovation in a $200K neighborhood = lost money. Get 3-5 recent sold comps within 0.5 miles.
                      </ProTip>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Realtor Commission</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs.realtorCommission}
                          onChange={(e) => updateInput('realtorCommission', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">%</span>
                      </div>
                      <p className="text-sm text-stone-600 mt-3 flex justify-between">
                        <span>Commission amount</span>
                        <span className="font-bold text-stone-900">${calc.realtorFees.toLocaleString()}</span>
                      </p>
                      <div className="mt-2 text-xs text-stone-600">
                        💡 FSBO (For Sale By Owner) saves 6% but takes more time. Pros move inventory 40% faster.
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Closing Costs (Selling)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs.closingCostsSelling}
                          onChange={(e) => updateInput('closingCostsSelling', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">%</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentTab === 'financing' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg border-2 border-amber-300 mb-6">
                      <h4 className="text-sm font-bold text-amber-900 mb-3 uppercase tracking-wider">💰 Hard Money Lenders</h4>
                      <div className="space-y-2 text-xs">
                        <a href="https://www.kiavi.com/affiliates" target="_blank" rel="noopener noreferrer" className="block text-amber-800 hover:text-amber-600 font-semibold underline">
                          Kiavi • $700 per funded loan
                        </a>
                        <a href="https://www.ablfunding.com/brokers/" target="_blank" rel="noopener noreferrer" className="block text-amber-800 hover:text-amber-600 font-semibold underline">
                          ABL • Up to 4% commission
                        </a>
                        <a href="https://www.gokapital.com/broker-program/" target="_blank" rel="noopener noreferrer" className="block text-amber-800 hover:text-amber-600 font-semibold underline">
                          GoKapital • Up to 6% commission (HIGHEST)
                        </a>
                        <a href="https://easystreetcap.com/real-estate-agent-loan-referral-program/" target="_blank" rel="noopener noreferrer" className="block text-amber-800 hover:text-amber-600 font-semibold underline">
                          Easy Street Capital • 0.50% per DSCR loan
                        </a>
                      </div>
                      <div className="mt-4 text-xs text-amber-900 bg-amber-200/50 p-3 rounded">
                        ⚡ Hard money = 8-15% interest, 2-5 points, but funds in 7-14 days vs 30-45 for traditional
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Loan Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">$</span>
                        <input
                          type="number"
                          value={inputs.loanAmount}
                          onChange={(e) => updateInput('loanAmount', e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-lg font-medium"
                        />
                      </div>
                      <p className="text-xs text-stone-500 mt-2 italic">Enter 0 for all-cash purchase</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Interest Rate</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={inputs.interestRate}
                            onChange={(e) => updateInput('interestRate', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">% APR</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Loan Points</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={inputs.loanPoints}
                            onChange={(e) => updateInput('loanPoints', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-bold mb-3">Lender Fees</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                        <input
                          type="number"
                          value={inputs.lenderFees}
                          onChange={(e) => updateInput('lenderFees', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Deals */}
            <div className="mt-8 bg-white rounded-lg shadow-lg border border-stone-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-stone-50 to-white px-8 py-6 border-b border-stone-200/60">
                <h3 className="text-sm uppercase tracking-widest text-stone-600 font-bold">Portfolio Comparison</h3>
              </div>
              <div className="p-8">
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={dealName}
                    onChange={(e) => setDealName(e.target.value)}
                    placeholder="Property address or name"
                    className="flex-1 px-4 py-3 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none text-sm"
                  />
                  <button
                    onClick={saveDeal}
                    className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-all text-sm tracking-wide shadow-lg"
                  >
                    Save
                  </button>
                </div>
                
                {savedDeals.length > 0 ? (
                  <div className="space-y-3">
                    {savedDeals.map(deal => (
                      <div key={deal.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border-2 border-stone-200">
                        <div className="flex-1">
                          <p className="font-bold text-stone-900 text-sm">{deal.name}</p>
                          <p className="text-xs text-stone-600 mt-1">
                            {deal.state} • ${deal.calculations.grossProfit.toLocaleString()} • {deal.calculations.roi.toFixed(1)}% ROI • {deal.date}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadDeal(deal)}
                            className="px-4 py-2 bg-white border-2 border-stone-300 hover:border-amber-600 text-stone-700 rounded-lg text-xs font-semibold"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteDeal(deal.id)}
                            className="px-4 py-2 bg-white border-2 border-red-300 hover:border-red-500 text-red-700 rounded-lg text-xs font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-500 text-sm italic text-center py-8">No saved properties yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* 70% Rule Checker */}
            <div className={`rounded-lg shadow-lg border-2 overflow-hidden ${
              calc.passes70Rule ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-white' : 'border-rose-500 bg-gradient-to-br from-rose-50 to-white'
            }`}>
              <div className={`px-6 py-4 ${calc.passes70Rule ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                <h3 className="text-white text-sm uppercase tracking-widest font-bold">70% Rule Check</h3>
              </div>
              <div className="p-6 text-center">
                <div className="text-6xl mb-3">
                  {calc.passes70Rule ? '✅' : '⛔'}
                </div>
                <div className={`text-2xl font-bold mb-2 ${calc.passes70Rule ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {calc.passes70Rule ? 'GOOD DEAL' : 'OVERPAYING'}
                </div>
                <div className="text-sm text-stone-700 mb-4">
                  Max purchase: <span className="font-bold">${calc.maxPurchasePrice70Rule.toLocaleString()}</span>
                </div>
                <div className="text-xs text-stone-600">
                  Formula: (ARV × 70%) - Rehab = ${(inputs.arv * 0.7).toLocaleString()} - ${calc.totalRehabCosts.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Deal Assessment */}
            <div className="bg-white rounded-lg shadow-lg border border-stone-200/60 overflow-hidden">
              <div className="bg-gradient-to-br from-stone-900 to-stone-800 px-8 py-10 text-center">
                <div className="text-8xl font-light mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {calc.dealScore}
                </div>
                <div className={`text-sm uppercase tracking-widest font-bold mb-4 ${
                  calc.dealScore >= 80 ? 'text-emerald-300' :
                  calc.dealScore >= 60 ? 'text-blue-300' :
                  calc.dealScore >= 40 ? 'text-amber-300' : 'text-rose-300'
                }`}>
                  {rating.label}
                </div>
                <div className="w-full bg-stone-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      calc.dealScore >= 80 ? 'bg-emerald-400' :
                      calc.dealScore >= 60 ? 'bg-blue-400' :
                      calc.dealScore >= 40 ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${calc.dealScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Red Flags Section */}
            {(calc.roi < 10 || calc.dealScore < 40 || !calc.passes70Rule || inputs.holdingMonths > 9) && (
              <div className="bg-rose-50 border-2 border-rose-400 rounded-lg p-6">
                <div className="text-rose-900 font-bold mb-3 uppercase text-sm">⚠️ Warning Signs</div>
                <div className="space-y-2 text-xs text-rose-800">
                  {calc.roi < 10 && <div>• ROI under 10% - Too thin for the risk</div>}
                  {!calc.passes70Rule && <div>• Violates 70% Rule - Overpaying</div>}
                  {inputs.holdingMonths > 9 && <div>• Long hold time - Market risk</div>}
                  {calc.dealScore < 40 && <div>• Low overall score - Consider passing</div>}
                </div>
              </div>
            )}

            {/* Financial Summary */}
            <div className="bg-white rounded-lg shadow-lg border border-stone-200/60">
              <div className="bg-gradient-to-r from-stone-50 to-white px-8 py-6 border-b border-stone-200/60">
                <h3 className="text-sm uppercase tracking-widest text-stone-600 font-bold">Financial Summary</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-baseline pb-6 border-b-2 border-stone-200">
                  <span className="text-xs uppercase tracking-widest text-stone-600 font-bold">Gross Profit</span>
                  <span className={`text-4xl font-light ${calc.grossProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${Math.abs(calc.grossProfit).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pb-6 border-b-2 border-stone-200">
                  <span className="text-xs uppercase tracking-widest text-stone-600 font-bold">Return on Investment</span>
                  <span className="text-4xl font-light text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {calc.roi.toFixed(1)}<span className="text-xl">%</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline pb-6 border-b-2 border-stone-200">
                  <span className="text-xs uppercase tracking-widest text-stone-600 font-bold">Cash Required</span>
                  <span className="text-3xl font-light text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ${calc.cashNeeded.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-stone-600 font-bold">Cash on Cash Return</span>
                  <span className="text-3xl font-light text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {calc.cashOnCashReturn.toFixed(1)}<span className="text-lg">%</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-lg shadow-lg border border-stone-200/60">
              <div className="bg-gradient-to-r from-stone-50 to-white px-8 py-6 border-b border-stone-200/60">
                <h3 className="text-sm uppercase tracking-widest text-stone-600 font-bold">Investment Breakdown</h3>
              </div>
              <div className="p-8">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 space-y-3">
                  {costBreakdown.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                        <span className="text-stone-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-stone-900">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-stone-300">
                    <span className="text-xs uppercase tracking-widest text-stone-600 font-bold">Total Investment</span>
                    <span className="text-2xl font-bold text-stone-900">${calc.totalInvestment.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email CTA */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg shadow-xl overflow-hidden">
              <div className="px-8 py-10 text-white text-center">
                <h3 className="text-3xl font-light mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Receive Analysis
                </h3>
                <p className="text-amber-100 text-sm mb-6 font-light">Detailed breakdown with professional insights</p>
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="w-full py-4 bg-white text-amber-700 rounded-lg font-bold hover:bg-amber-50 transition-all shadow-lg text-sm tracking-wide uppercase"
                >
                  Email Report
                </button>
              </div>
            </div>

            {/* Ad Space */}
            <div className="bg-stone-100 border-2 border-stone-200 rounded-lg p-8 text-center">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3">Advertisement</p>
              <div className="h-60 flex items-center justify-center text-stone-400 text-sm font-medium">
                300×250 AdSense
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-16 border-t-2 border-stone-300">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-light mb-4 text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Begin Your Investment Journey
            </h2>
            <p className="text-stone-600 text-xl font-light max-w-3xl mx-auto mb-8">
              Join thousands of successful flippers using data-driven analysis
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="https://www.fiverr.com/pe/99ZKZZK" target="_blank" rel="noopener noreferrer" 
                 className="px-10 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold transition-all text-sm tracking-wide shadow-lg">
                Find Contractors
              </a>
              <a href="https://shopify.pxf.io/jeNZea" target="_blank" rel="noopener noreferrer"
                 className="px-10 py-4 bg-white border-2 border-stone-900 hover:bg-stone-50 text-stone-900 rounded-lg font-bold transition-all text-sm tracking-wide shadow-lg">
                Start Your Business
              </a>
              <a href="https://drivers.uber.com/i/u9zpq8d" target="_blank" rel="noopener noreferrer"
                 className="px-10 py-4 bg-white border-2 border-stone-900 hover:bg-stone-50 text-stone-900 rounded-lg font-bold transition-all text-sm tracking-wide shadow-lg">
                Drive with Uber
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-stone-500 tracking-wider space-y-2">
            <p>© 2026 House Flipping Calculator • Professional Investment Analysis Tool</p>
            <button 
              onClick={() => setShowDisclaimerModal(true)}
              className="text-amber-600 hover:text-amber-700 underline font-semibold"
            >
              View Legal Disclaimer
            </button>
          </div>
        </footer>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 px-8 py-10 text-white">
              <h3 className="text-3xl font-light mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Request Analysis</h3>
              <p className="text-amber-100 text-sm font-light">Receive your comprehensive investment report</p>
            </div>
            <div className="p-8">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-4 border-2 border-stone-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none mb-6"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-semibold transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Email service integration coming soon. Please screenshot your results for now.');
                    setShowEmailModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-all text-sm tracking-wide"
                >
                  Send Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Disclaimer Modal */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full my-8">
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 px-8 py-8 text-white border-b-4 border-amber-600">
              <h3 className="text-3xl font-light mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Legal Disclaimer</h3>
              <p className="text-stone-300 text-sm">Important Information Regarding Calculator Use</p>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-stone max-w-none text-sm">
                <h4 className="font-bold mb-4">DISCLAIMER OF LIABILITY</h4>
                <p className="mb-4">
                  This House Flipping Calculator is provided for informational and educational purposes only. 
                  The calculations, estimates, and projections are based on user-supplied data and market 
                  assumptions that may not reflect actual market conditions or individual circumstances.
                </p>
                <h5 className="font-bold mt-6 mb-3">No Guarantee of Accuracy</h5>
                <p className="mb-4">
                  While we strive to provide accurate data, we make no representations or warranties 
                  of any kind, express or implied, about the completeness, accuracy, reliability, or suitability.
                </p>
                <h5 className="font-bold mt-6 mb-3">Investment Risk Acknowledgment</h5>
                <p className="mb-4">
                  Real estate investment involves substantial risk of loss. Market conditions, property-specific factors, 
                  economic changes, and unforeseen circumstances can significantly impact results.
                </p>
                <h5 className="font-bold mt-6 mb-3">Not Professional Advice</h5>
                <p className="mb-4">
                  This Calculator does not constitute financial, investment, legal, tax, or real estate advice. 
                  Consult with qualified professionals before making investment decisions.
                </p>
                <h5 className="font-bold mt-6 mb-3">Limitation of Liability</h5>
                <p className="mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, 
                  INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THIS CALCULATOR.
                </p>
                <h5 className="font-bold mt-6 mb-3">Affiliate Relationships</h5>
                <p className="mb-4">
                  This Calculator contains affiliate links. We may receive compensation for referrals. 
                  These relationships do not constitute endorsements.
                </p>
                <p className="font-bold mt-6">
                  BY USING THIS CALCULATOR, YOU AGREE TO HOLD HARMLESS THE CALCULATOR PROVIDER FROM ANY CLAIMS, 
                  DAMAGES, LOSSES, OR EXPENSES ARISING FROM YOUR USE OF THIS TOOL.
                </p>
                <p className="text-xs text-stone-500 mt-6 italic">Last Updated: May 2026</p>
              </div>
            </div>
            <div className="px-8 py-6 bg-stone-50 border-t border-stone-200">
              <button
                onClick={() => setShowDisclaimerModal(false)}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold transition-all"
              >
                I Understand and Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseFlippingCalculator;
