import {WeekDay} from './units';
import {Task} from './task';

export type Targets = {
    weekDay: WeekDay,
    tasks: Task[],
}