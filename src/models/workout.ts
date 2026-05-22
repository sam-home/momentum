import {Exercise} from './exercise';

export type Workout = {
    id: number,
    name: string,
    rounds?: number,
    timeLimit?: number,
    exercises: Exercise[]
}