import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { join } from 'path';
import { LANGUAGE_MAP } from 'src/course/course.service';

@Injectable()
export class TasksService {
    getLevels(lang: string, id: string, unit: string, lesson: string) {
        return { count: fs.readdirSync(join(process.cwd(), 'data', LANGUAGE_MAP[lang], id, unit, lesson)).length }
    }

    getTask(lang: string, id: string, unit: string, lesson: string, level: string) {
        return JSON.parse(
            fs.readFileSync(join(process.cwd(), 'data', LANGUAGE_MAP[lang], id, unit, lesson, `${level}.json`), 'utf-8')
        )
    }
}
