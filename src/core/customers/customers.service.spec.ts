import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customers } from '../../repository/customers.repository';
import { HttpException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;
  const mockRepository ={
    find:jest.fn(),
    delete:jest.fn(),
    save:jest.fn(),
    update:jest.fn()
  }
  let customer:Customers={
    customer_id:2,
    full_name:"Doralba Cano",
    phone:"2345678",
    email:"d@d.com",
    address:"cll 58 #34"
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService,
        {
          provide:getRepositoryToken(Customers),
          useValue:mockRepository
        }
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crear o actualizar usuario', async ()=>{
    try {
      jest.spyOn(mockRepository,'save').mockReturnValue(customer);
      const _customer=await service.createCustomer(customer);
      expect(_customer).toEqual(customer);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  })

  it('obtener usuarios', async ()=>{
    try {
      jest.spyOn(mockRepository,'find').mockReturnValue([customer]);
      const findCustomers=await service.getCustomers({});
      expect(findCustomers).toHaveLength(1);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  })

  it('delete user', async ()=>{
    try {
      jest.spyOn(mockRepository,'delete');
      const deleteCustomer=await service.removeCustomer({customer_id:customer.customer_id});
      expect(mockRepository.delete).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  })
});
