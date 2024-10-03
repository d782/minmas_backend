import { Test, TestingModule } from '@nestjs/testing';
import { BuysService } from './buys.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Buys } from '../../repository/buys.repository';

describe('BuysService', () => {
  let service: BuysService;

  const mockRepository ={
    find:jest.fn(),
    delete:jest.fn(),
    save:jest.fn(),
    update:jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuysService,
        {
          provide:getRepositoryToken(Buys),
          useValue:mockRepository
        }
      ],
    }).compile();

    service = module.get<BuysService>(BuysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
