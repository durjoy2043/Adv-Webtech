import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITStuffEntity } from './it_stuff.entity';
import { CreateITStaffDto } from './it_stuff.dto';

@Injectable()
export class ITStuffService {
  constructor(
    @InjectRepository(ITStuffEntity)
    private readonly itStuffRepository: Repository<ITStuffEntity>,
  ) {}

  async getAllITStaff(): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.find();
  }

  async getITStaffById(id: number): Promise<ITStuffEntity> {
    const itStaff = await this.itStuffRepository.findOne( {where: { id }, });
    if (!itStaff) {
      throw new NotFoundException('IT Staff not found');
    }
    return itStaff;
  }

  async createITStuff(createITStaffDto: CreateITStaffDto): Promise<ITStuffEntity> {
    const itStuff = this.itStuffRepository.create(createITStaffDto);
    return this.itStuffRepository.save(itStuff);
  }

  async updateITStaff(id: number, updateITStaffDto: CreateITStaffDto): Promise<ITStuffEntity> {
    const itStaff = await this.getITStaffById(id);
    this.itStuffRepository.merge(itStaff, updateITStaffDto);
    return this.itStuffRepository.save(itStaff);
  }

  async partialUpdateITStaff(id: string, partialUpdateITStaffDto: Partial<CreateITStaffDto>): Promise<ITStuffEntity> {
    const itStaff = await this.getITStaffById(Number(id));
    this.itStuffRepository.merge(itStaff, partialUpdateITStaffDto);
    return this.itStuffRepository.save(itStaff);
  }

  async deleteITStaff(id: number): Promise<void> {
    const result = await this.itStuffRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('IT Staff not found');
    }
  }

  async changeUserStatus(id: number, updateData: Partial<CreateITStaffDto>): Promise<ITStuffEntity> {
    const itStaff = await this.getITStaffById(id);
    itStaff.status = updateData.status;
    return this.itStuffRepository.save(itStaff);
  }

  async getUsersOlderThan(age: number): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.createQueryBuilder('itStaff')
      .where('itStaff.age > :age', { age })
      .getMany();
  }

  async getInactiveUsers(): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.createQueryBuilder('itStaff')
      .where('itStaff.status = :status', { status: 'inactive' })
      .getMany();
  }

  async getUsersByStatus(status: 'active' | 'inactive'): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.find({ where: { status } });
  }
}
