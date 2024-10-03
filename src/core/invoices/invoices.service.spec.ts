import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoices } from '../../repository/invoices.repository';

describe('InvoicesService', () => {
  let service: InvoicesService;
  const mockRepository ={
    find:jest.fn(),
    delete:jest.fn(),
    save:jest.fn(),
    update:jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesService,{
        provide:getRepositoryToken(Invoices),
        useValue:mockRepository
      }],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
