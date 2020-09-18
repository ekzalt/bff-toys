import { Test, TestingModule } from '@nestjs/testing';
import { MediatorService } from './mediator.service';

describe('ResolverService', () => {
  let service: MediatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediatorService],
    }).compile();

    service = module.get<MediatorService>(MediatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
