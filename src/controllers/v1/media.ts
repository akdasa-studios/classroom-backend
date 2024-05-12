import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@classroom/admin/guards';

@ApiTags('Media')
@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
  constructor() {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return { path: file.filename }
  }
}
