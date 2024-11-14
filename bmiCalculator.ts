interface IMCParameters {
	height: number;
	weight: number;
}

interface IMCResponse {
	weight?: number,
	height?: number,
	bmi?: string,
	error?: string
}
  
const imcCalculator = (imcParameters: IMCParameters): IMCResponse => {
	const imcIndex: number = imcParameters.weight / Math.pow(imcParameters.height, 2);
	if (imcIndex < 18.50) {
		return { weight: imcParameters.weight, height: imcParameters.height, bmi: 'Underweight' };
	} else if (imcIndex < 25) {
		return { weight: imcParameters.weight, height: imcParameters.height, bmi: 'Normal Weight' };
	} else if (imcIndex < 29.99) {
		return { weight: imcParameters.weight, height: imcParameters.height, bmi: 'Overweight' };
	} else {
		return { weight: imcParameters.weight, height: imcParameters.height, bmi: 'Obesity' };
	}
}

export const bmiCalculatorModule = (imcParameters: IMCParameters) : IMCResponse => {
	if (isNaN(imcParameters.height) || isNaN(imcParameters.weight)) {
		return { error: 'malformatted parameters' }
	} else {
		return imcCalculator(imcParameters);
	}
}
