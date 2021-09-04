import { mock } from "../../data/mock"

const mockResponse = {
    data: {
        results: mock
    }
  }
  
  
  export default {
    __esModule: true,
    get: jest.fn().mockResolvedValue(mockResponse),
  }