import {Approach} from './approach';
import {FoodType} from './units';

export type WorkoutEntry = {
    done: boolean,
}

export type WorkEntry = {
    todos: string[],
}

export type NutritionEntry = {
    foods: FoodType[]
}

export type GirlEntry = {
    approaches: Approach[]
}

export type CalendarEntry = {
    date: Date,
    entry: WorkoutEntry | WorkEntry | NutritionEntry | GirlEntry,
}

