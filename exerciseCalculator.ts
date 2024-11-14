interface ExerciseResult {
	periodLength?: number,
    trainingDays?: number,
    success?: boolean,
    rating?: number,
    ratingDescription?: string,
    target?: number,
    average?: number
}

interface ExerciseParameters {
	periodLength?: number,
    trainingDays?: number,
    error?: string
}

const parseExerciseArguments = (daily_exercises: number[], target: number): ExerciseParameters => {
	let arg: string;
    let trainingDays: number = 0;
    if(isNaN(target) || !Array.isArray(daily_exercises) || daily_exercises.length == 0) {
        return { error: 'malformatted parameters' }
    }
    for(arg in daily_exercises) {
        if(!isNaN(Number(daily_exercises[arg])) && Number(daily_exercises[arg]) > 0) {
            trainingDays = trainingDays + 1;
        } else {
            return { error: 'malformatted parameters' }
        }
    }
    return {
        periodLength: daily_exercises.length,
        trainingDays: trainingDays
    }
}


  
const exerciseCalculator = (exerciseParameters: ExerciseParameters, target: number, hoursPerDay: number[]): ExerciseResult => {
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
        periodLength: exerciseParameters.periodLength,
        trainingDays: exerciseParameters.trainingDays,
        success: avg >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: avg
    }
}
  
export const exerciseCalculatorModule = (daily_exercises: number[], target: number) : ExerciseResult => {
    const exerciseParameters : ExerciseParameters = parseExerciseArguments(daily_exercises, target);
    return exerciseParameters.error? exerciseParameters : exerciseCalculator(exerciseParameters, target, daily_exercises) ;   
}