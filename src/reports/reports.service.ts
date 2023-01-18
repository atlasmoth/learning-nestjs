import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ReportBodyDto } from './dtos/reportBody';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(report: ReportBodyDto, user: User) {
    const reportInstance = this.repo.create({ ...report, user });
    return this.repo.save(reportInstance);
  }
  fetchReports(user: User) {
    return this.repo
      .createQueryBuilder()
      .select('*')
      .where('"userId" = :id', { id: user.id })
      .getRawMany();
  }
  fetchReportById(id: number) {
    return this.repo.findOneBy({ id });
  }
  async approveReport(user: User, id: string) {
    const report = await this.repo.findOneBy({ id: Number(id) });

    report.is_approved = true;
    return this.repo.save(report);
  }
}
