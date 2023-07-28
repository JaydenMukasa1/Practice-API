const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// The data for Jayden's workout
let exercises = [
    { id: 1, name: 'Converging chest press', muscleGroup: 'Chest' },
    { id: 2, name: 'Lateral raises', muscleGroup: 'Shoulders' },
    { id: 3, name: 'Bicep curls', muscleGroup: 'Biceps' },
];

// To request all of the exercies
app.get('/exercises', (req, res) => {
    res.json(exercises);
});

// Route to get a specific exercise by ID
app.get('/exercises/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const exercise = exercises.find((item) => item.id === id);
    if (exercise) {
        res.json(exercise);
    } else {
        res.status(404).json({ message: 'Exercise not found' });
    }
});

// If Jayden wanted to add a new exercise
app.post('/exercises', (req, res) => {
    const { name, muscleGroup } = req.body;
    const id = exercises.length + 1;
    const newExercise = { id, name, muscleGroup };
    exercises.push(newExercise);
    res.status(201).json(newExercise);
});

// If Jayden wanted to update an existing exercise
app.put('/exercises/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const exerciseIndex = exercises.findIndex((item) => item.id === id);
    if (exerciseIndex !== -1) {
        const { name, muscleGroup } = req.body;
        exercises[exerciseIndex] = { id, name, muscleGroup };
        res.json(exercises[exerciseIndex]);
    } else {
        res.status(404).json({ message: 'Exercise not found' });
    }
});

// If an exercise needed to be deleted
app.delete('/exercises/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedExercise = exercises.find((item) => item.id === id);
    if (deletedExercise) {
        exercises = exercises.filter((item) => item.id !== id);
        res.json(deletedExercise);
    } else {
        res.status(404).json({ message: 'Exercise not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

