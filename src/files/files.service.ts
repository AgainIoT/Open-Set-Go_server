import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FilesService {
  constructor(private readonly httpService: HttpService) {}
}
