
  
const parseArguments = (args: string[]): IMCParameters => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');
  
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		}
	} else {
	  	throw new Error('Provided values were not numbers!');
	}
}

interface IMCParameters {
	height: number;
	weight: number;
}
  
const imcCalculator = (height: number, weight: number): void => {
	const imcIndex: number = weight / Math.pow(height, 2);
	if (imcIndex < 18.50) {
		console.log(`Peso bajo, Height: ${height}, Weight: ${weight}`);
	} else if (imcIndex < 25) {
		console.log(`Normal, Height: ${height}, Weight: ${weight}`)
	} else if (imcIndex < 29.99) {
		console.log(`Sobrepeso, Height: ${height}, Weight: ${weight}`)
	} else {
		console.log(`Obesidad, Height: ${height}, Weight: ${weight}`)
	}
}
  
try {
	const { height, weight } = parseArguments(process.argv);
	imcCalculator(height, weight);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
	  	errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}