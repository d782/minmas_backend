import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Products } from '../../repository/products.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let productMock:Products={
    "product_id":1,
    "product_name": "baldosa #2",
    "quantity": 1200,
    "price": 56000,
    "buy_cost": 34000,
    "created_at": new Date()
  }

  const mockRepository ={
    find:jest.fn(),
    delete:jest.fn(),
    save:jest.fn(),
    update:jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide:getRepositoryToken(Products),
          useValue:mockRepository
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crear productos y actualizar', async () => {
    try {
      jest.spyOn(mockRepository,'save').mockReturnValue(productMock);
      const product=await service.createProducts(productMock);
      expect(product).toEqual(productMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })

  it('obtener productos',async ()=>{
    try {
      jest.spyOn(mockRepository,'find').mockReturnValue([productMock]);
      const products= await service.getProducts({});
      expect(products).toHaveLength(1);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })

  it('eliminar productos', async () => {
    try {
      jest.spyOn(mockRepository,'delete')
      const deleteProduct=await service.removeProduct({product_id:productMock.product_id});
      expect(mockRepository.delete).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })
});
