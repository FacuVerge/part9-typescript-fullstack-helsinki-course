import express from 'express';
import { bmiCalculatorModule } from './bmiCalculator'
import { exerciseCalculatorModule } from './exerciseCalculator'

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height : number = Number(req.query.height);
    const weight : number = Number(req.query.weight);
    res.send(bmiCalculatorModule({ weight: weight, height: height }));
});

app.post('/exercises', (req, res) => {
    const { daily_exercises , target } = req.body;
    
    if ( !daily_exercises || !target) {    
        res.status(400).send({ error: 'parameters missing'});  
    }

    const result = exerciseCalculatorModule(daily_exercises, target);
    res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});