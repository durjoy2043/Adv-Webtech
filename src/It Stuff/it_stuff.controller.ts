import { Body, Controller, Get, Param, Post, Put, Patch, Query, UsePipes, ValidationPipe, Delete, BadRequestException, Res, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ITStuffService } from './it_stuff.service';
import { CreateITStaffDto } from './it_stuff.dto';
import { ITStuffEntity } from './it_stuff.entity';
import { MulterError } from 'multer';
import { diskStorage } from 'multer';

@Controller('/it-stuff')
export class ITStuffController {
  constructor(private readonly itStuffService: ITStuffService) {}

  // Criteria: Get a list of all IT staff
  @Get()
  async getAllITStaff() {
    return this.itStuffService.getAllITStaff();
  }

  // Criteria: Get IT staff by ID
  @Get(':id')
  @UsePipes(new ParseIntPipe()) // Transformation: Convert id to number
  async getITStaffById(@Param('id') id: number) {
    return this.itStuffService.getITStaffById(id);
  }

  // Criteria: Create a new IT staff
  @Post('/create')
  @UsePipes(new ValidationPipe()) // Validation: Validate input data
  async createITStaff(@Body() createITStaffDto: CreateITStaffDto) {
    return this.itStuffService.createITStuff(createITStaffDto);
  }

  // Criteria: Update IT staff by ID
  @Put('update/:id')
  @UsePipes(new ValidationPipe()) // Validation: Validate input data
  async updateITStaff(@Param('id') id: number, @Body() updateITStaffDto: CreateITStaffDto) {
    return this.itStuffService.updateITStaff(id, updateITStaffDto);
  }

  // Criteria: Partially update IT staff by ID
  @Patch('update/:id')
  @UsePipes(new ValidationPipe()) // Validation: Validate input data
  async partialUpdateITStaff(@Param('id') id: string, @Body() partialUpdateITStaffDto: Partial<CreateITStaffDto>) {
    return this.itStuffService.partialUpdateITStaff(id, partialUpdateITStaffDto);
  }

  // Criteria: Delete IT staff by ID
  @Delete('delete/:id')
  async deleteITStaff(@Param('id') id: number) {
    return this.itStuffService.deleteITStaff(id);
  }

  // Criteria: Change user status by ID
  @Patch(':id/')
  async changeUserStatus(@Param('id') id: string, @Body() up: CreateITStaffDto) {
    return this.itStuffService.changeUserStatus(parseInt(id), up);
  }

  // Criteria: Get a list of users older than 40
  @Get('older-than-40')
  async getUsersOlderThan40(): Promise<ITStuffEntity[]> {
    const age = 40;
    return this.itStuffService.getUsersOlderThan(age);
  }
  
  // Criteria: Get a list of inactive users
  @Get('inactive-users')
  async getInactiveUsers(): Promise<ITStuffEntity[]> {
    return this.itStuffService.getInactiveUsers();
  }

  // Criteria: Upload file with validation
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|jpeg)$/)) cb(null, true);
      else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    },
    limits: { fileSize: 30000 },
    storage: diskStorage({
      destination: './uploads',
      filename: (_req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  
}
