const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../service/user-service');
const userController = require('../controllers/user-controller');
const express = require('express');

// Mock функции и объекты
jest.mock('express-validator');
jest.mock('../service/user-service');

describe('User Controller - Registration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully register a new user', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        userName: 'testuser',
      },
    };

    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    validationResult.mockReturnValue({
      isEmpty: jest.fn(() => true),
      array: jest.fn(() => []),
    });

    userService.registration.mockResolvedValue({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: { id: 'mockUserId', email: 'test@example.com' },
    });

    await userController.registration(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(userService.registration).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'testuser'
    );

    expect(res.cookie).toHaveBeenCalledWith(
      'refreshToken',
      'mockRefreshToken',
      expect.objectContaining({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: { id: 'mockUserId', email: 'test@example.com' },
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should handle validation errors', async () => {
    const req = {
      body: {},
    };

    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    validationResult.mockReturnValue({
      isEmpty: jest.fn(() => false),
      array: jest.fn(() => [{ msg: 'Validation Error' }]),
    });

    await userController.registration(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(userService.registration).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalledWith(ApiError.BadRequest('Ошибка при валидации', [{ msg: 'Validation Error' }]));

    expect(res.cookie).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});


const app = express();

app.use(express.json());

// Мокаем userService.login
jest.mock('../service/user-service');
userService.login.mockResolvedValue({
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
  user: { id: 'mockUserId', email: 'test@example.com' },
});

app.post('/login', userController.login);

describe('User Controller - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully login a user', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    const res = {
      cookie: jest.fn(),
      json: jest.fn(),
    };

    const next = jest.fn();

    // Мокаем express-validator для успешной валидации
    jest.mock('express-validator', () => ({
      validationResult: jest.fn(() => ({
        isEmpty: () => true,
        array: () => [],
      })),
    }));

    await userController.login(req, res, next);

    // Проверяем, что вернулся ожидаемый статус код
    expect(res.json).toHaveBeenCalledWith({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: { id: 'mockUserId', email: 'test@example.com' },
    });

    // Проверяем, что был вызван userService.login с ожидаемыми параметрами
    expect(userService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});

