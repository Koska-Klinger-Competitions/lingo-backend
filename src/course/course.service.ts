import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { join } from 'path';

export const LANGUAGE_MAP = {
    'es': 'spanish',
    'de': 'german'   
}

@Injectable()
export class CourseService {
	getAllCourses(): string[] {
		return Object.keys(LANGUAGE_MAP)
	}

    getCourses(lang: string): string[] {
        if (lang == null) return []

        return fs.readdirSync(
            join(process.cwd(), 'data', LANGUAGE_MAP[lang])
        ).filter((item) => !item.startsWith(".") && item != "sentences")
    }

    getCourse(lang: string, id: string) {
        if (lang == null || id == null) return null

        return JSON.parse(
            fs.readFileSync(
                join(process.cwd(), 'data', LANGUAGE_MAP[lang], id, 'summary.json'),
                'utf8'
            )
        )
    }

    getCourseWords(lang: string, id: string) {
        if (lang == null || id == null) return null

        return JSON.parse(
            fs.readFileSync(
                join(process.cwd(), 'data', LANGUAGE_MAP[lang], id, 'word_list_foreign.json'),
                'utf8'
            )
        )
    }
}
