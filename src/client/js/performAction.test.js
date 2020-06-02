import { performAction } from './performAction';
import { getImage } from './functionsApp';
import { getLocation } from './functionsApp';

test('performAction should be a function', () => {
  expect(typeof performAction).toBe("function");
});

test('getImage should be a function', () => {
  expect(typeof getImage).toBe("function");
});

test('getLocation should be a function', () => {
  expect(typeof getLocation).toBe("function");
});


