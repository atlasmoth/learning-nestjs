import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger';
import { ParamsDto, ReportBodyDto, ResponseReportDto } from './dtos/reportBody';
import { ExtendRequest } from 'src/users/interfaces/extendRequest';
import { AuthGuard } from 'src/users/auth.guard';

@ApiTags('Reports')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('reports')
@ApiSecurity('x-api-key', ['x-api-key'])
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({
    status: 201,
    description: 'Report Created',
    type: ResponseReportDto,
  })
  async createUser(@Body() body: ReportBodyDto, @Req() request: ExtendRequest) {
    let { lat, lng, price, content } = body;

    const report = await this.reportService.create(
      { lat, lng, price, content },
      request.user,
    );
    return report;
  }
  @Get()
  @ApiOperation({ summary: 'fetch all reports for a user' })
  @ApiResponse({
    status: 200,
    description: 'All reports for current user',
    isArray: true,
    type: ResponseReportDto,
  })
  async getUsers(@Req() request: ExtendRequest) {
    return await this.reportService.fetchReports(request.user);
  }
  @UseGuards(AuthGuard)
  @Patch('/:reportId/approve')
  @ApiParam({
    name: 'reportId',
    description: 'Gets the report id',
    example: 1,
  })
  @ApiOperation({ summary: 'Approve report' })
  @ApiResponse({
    status: 204,
    description: 'Report approved',
  })
  async approveReport(
    @Req() request: ExtendRequest,
    @Param() params: ParamsDto,
  ) {
    await this.reportService.approveReport(request.user, params.reportId);
    return;
  }
}
