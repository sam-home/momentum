import {WeekDay} from './units';

export type ApproachTask = {
    type: 'approach',
}

export type WorkoutTask = {
    type: 'workout',
    name: string,
}

export type WorkTask = {
    type: 'work',
}

export type NutritionTask = {
    type: 'nutrition',
}

export type Task = ApproachTask | WorkoutTask | WorkTask | NutritionTask