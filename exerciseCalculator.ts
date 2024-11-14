interface ExerciseResult {
	periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseParameters {
	periodLength: number,
    trainingDays: number,
}

const parseExerciseArguments = (args: string[]): ExerciseParameters => {
	let arg: string;
    let trainingDays: number = 0;
    for(arg in args) {
        if(!isNaN(Number(args[arg])) && Number(args[arg]) > 0) {
            trainingDays = trainingDays + 1;
        }
    }
    return {
        periodLength: args.length,
        trainingDays: trainingDays
    }
}


  
const exerciseCalculator = (periodLength: number, trainingDays: number, target: number, hoursPerDay: string[]): ExerciseResult => {
    const avg: number = hoursPerDay.reduce((a, b) => Number(a) + Number(b), 0) / hoursPerDay.length;
	let rating: number;
    let ratingDescription: string;
    if(avg >= target) {
        rating = 1;
        ratingDescription = 'Buena performance';
    }else if(target-avg > 1) {
        rating = 2;
        ratingDescription = 'Muy mala performance';
    }else {
        rating = 3;
        ratingDescription = 'Mala performance';
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: avg >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avg
    }
}
  
try {
    if (process.argv.length < 2) throw new Error('Not enough arguments');
	const { periodLength, trainingDays } = parseExerciseArguments([...process.argv.slice(3)]);
	const result = exerciseCalculator(periodLength, trainingDays, Number(process.argv[2]), [...process.argv.slice(3)]);
    console.log(result)
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
	  	errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}