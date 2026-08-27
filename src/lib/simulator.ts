export type CapitalizationFrequency = 'mensual' | 'trimestral' | 'anual' | 'al_vencimiento';

export interface SimulationDataPoint {
  month: number;
  capital: number;
  earnings: number;
  totalEarnings: number;
}

export interface SimulationSummary {
  finalValue: number;
  totalEarnings: number;
  netReturn: number;
  effectiveRate: number;
}

export interface SimulationResult {
  dataPoints: SimulationDataPoint[];
  summary: SimulationSummary;
}

export function simulateInvestment(
  capital: number,
  annualRate: number,
  months: number,
  capitalization: CapitalizationFrequency
): SimulationResult {
  const dataPoints: SimulationDataPoint[] = [];
  const monthlyRate = annualRate / 12;
  
  let currentCapital = capital;
  let totalEarnings = 0;
  
  // Convert capitalization string to months interval
  let capInterval = 1; // Default mensual
  if (capitalization === 'trimestral') capInterval = 3;
  if (capitalization === 'anual') capInterval = 12;
  if (capitalization === 'al_vencimiento') capInterval = months;

  let accumulatedEarningsSinceLastCap = 0;

  for (let month = 1; month <= months; month++) {
    // Calculate this month's earnings based on the *capitalized* amount
    const monthEarnings = currentCapital * monthlyRate;
    
    accumulatedEarningsSinceLastCap += monthEarnings;
    totalEarnings += monthEarnings;

    if (month % capInterval === 0 || month === months) {
      // Capitalize
      currentCapital += accumulatedEarningsSinceLastCap;
      accumulatedEarningsSinceLastCap = 0;
    }

    dataPoints.push({
      month,
      capital: currentCapital + accumulatedEarningsSinceLastCap,
      earnings: monthEarnings,
      totalEarnings,
    });
  }

  const finalValue = currentCapital + accumulatedEarningsSinceLastCap;
  const netReturn = totalEarnings / capital;
  
  // Effective rate annualized (simple approximation or actual effective rate)
  // r_eff = (FV / PV)^(12/n) - 1
  const effectiveRate = Math.pow(finalValue / capital, 12 / months) - 1;

  return {
    dataPoints,
    summary: {
      finalValue,
      totalEarnings,
      netReturn,
      effectiveRate,
    }
  };
}
