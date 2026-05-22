import {DistanceUnit, TimeUnit} from './units';

export type DistanceExercise = {
    type: 'distance',
    distance: number,
    unit: DistanceUnit
}

export type TimeExercise = {
    type: 'time',
    time: number,
    unit: TimeUnit
}

export type RepetitionExercise = {
    type: 'repetitions',
    repetitions: number
}

export type Exercise = DistanceExercise | RepetitionExercise | TimeExercise