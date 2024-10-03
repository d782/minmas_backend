import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Users } from '../../repository/users.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from '../../repository/contact.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  
  let userMock:Users={
    "user_name": "Juana",
    "surename": "Cano",
    "birth_date": "1993-01-19",
    "document": "10956789",
    "email": "drtyryr@d.z.z",
    "pwd": "qwerty1234",
    "enabled": 1
  }

  const mockRepository ={
    find:jest.fn(),
    delete:jest.fn(),
    save:jest.fn(),
    update:jest.fn()
  }

  const mockRepositoryContact ={
    find:jest.fn(),
    delete:jest.fn(),
    save:jest.fn(),
    update:jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({
          secret:"moscow",
          signOptions:{
            expiresIn:'1d'
          }
        })
      ],
      providers: [
        UsersService,
        JwtService,
        {
        provide:getRepositoryToken(Users),
        useValue:mockRepository
        },
        {
        provide:getRepositoryToken(Contact),
        useValue:mockRepositoryContact
        },{
          provide:JwtService,
          useValue:{
            sign:jest.fn()
          }
        }
    ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user',async  () =>{

    try {
      jest.spyOn(mockRepository,'save').mockReturnValue(userMock);
      const user=await service.createUser(userMock);
      expect(user).toEqual(userMock);
      expect(mockRepository.save).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })

  it('obtener usuarios',async ()=>{
    try {
      jest.spyOn(mockRepository,'find').mockReturnValue([userMock]);
      const user=await service.getUsers({});
      expect(user).toHaveLength(1);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })

  it('obtener token',async ()=>{
    try {
      const result=await service.getToken(userMock);
      expect(result).toHaveProperty("token")
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })

  it('delete user',async ()=>{
    try {
      jest.spyOn(mockRepository,'delete');
      const user=await service.removeUser({user_id:1});
      expect(mockRepository.delete).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })
});
