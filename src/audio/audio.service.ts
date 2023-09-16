import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { LANGUAGE_MAP } from 'src/course/course.service';

@Injectable()
export class AudioService {
    getAudio(lang: string, id: string) {
        const file = createReadStream(
            join(process.cwd(), 'data', LANGUAGE_MAP[lang], 'sentences', `${id}.mp3`)
        )
        return new StreamableFile(file);    
    }
}
