import { LoggerInjector } from '../src/lib/logger.injector';
import { LoggerService } from '../src/lib/logger.service';

describe('[TEST]: Check injector error', () => {
    it('should return error', () => {
        try {
            return LoggerInjector.getInjector().get<LoggerService>(LoggerService).log;
        } catch (e) {
            expect(e.message).toEqual(`You've forgotten to import \`LoggerModule\``);
        }
    });
});
