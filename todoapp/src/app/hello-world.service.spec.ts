import { HelloWorldService } from './hello-world.service';

describe('HelloWorldService', () => {
    let service: HelloWorldService;

    beforeEach(() => {
        service = new HelloWorldService();
    });

    it('should return "Hello, World!"', () => {
        expect(service.getGreeting()).toBe('Hello, World!');
    });
});