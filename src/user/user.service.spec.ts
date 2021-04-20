import {PrismaService} from './../prisma/prisma.service';
import {JwtService} from './../jwt/jwt.service';
import {Gender} from './entities/user.entity';
import {UserService} from './user.service';
import {Test} from '@nestjs/testing';

const mockPrismaService = {
  user: {
    findUnique: jest.fn((args) => {
      if (args?.where?.email === 'exists@test.com')
        return {
          isSucceeded: false,
          error: 'There is an user with that email already',
        };
      else return false;
    }),
    update: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn(() => 'signed-token'),
  verify: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = await module.resolve<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should fail if user exists', async () => {
      const signUpArgs = {
        email: 'exists@test.com',
        password: 'myPassword',
        name: 'test',
        birthday: new Date(),
        gender: Gender.male,
      };

      const result = await service.signUp(signUpArgs);

      expect(result).toMatchObject({
        isSucceeded: false,
        error: 'There is an user with that email already',
      });
    });

    it('should create an user', async () => {
      const signUpArgs = {
        email: 'new@test.com',
        password: 'myPassword',
        name: 'test',
        birthday: new Date(),
        gender: Gender.male,
      };

      const result = await service.signUp(signUpArgs);

      expect(prismaService.user.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({isSucceeded: true});
    });
  });

  it.todo('findById');
  it.todo('signIn');
  it.todo('updateProfile');
  it.todo('updatePassword');
});
