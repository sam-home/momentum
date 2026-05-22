import {Exercise} from './exercise';
import {WeekDay} from './units';

export type Workout = {
    weekDay: WeekDay,
    rounds?: number,
    timeLimit?: number,
    exercises: Exercise[]
}