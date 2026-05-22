import {Exercise} from './exercise';

export type Workout = {
    name: string,
    rounds?: number,
    timeLimit?: number,
    exercises: Exercise[]
}