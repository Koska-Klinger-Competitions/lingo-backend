import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksController: TasksService) {}

    @Get(':lang-:id/:unit/:lesson/levels')
    get(@Param('lang') lang, @Param('id') id: string, @Param('unit') unit: string, @Param('lesson') lesson: string) {
        return this.tasksController.getLevels(lang, id, unit, lesson)
    }

    @Get(':lang-:id/:unit/:lesson/tasks/:level')
    getTasks(@Param('lang') lang, @Param('id') id: string, @Param('unit') unit: string, @Param('lesson') lesson: string, @Param('level') level) {
        return this.tasksController.getTask(lang, id, unit, lesson, level)
    }
}
