import {lessToPairs, pairsToTheme} from './utils';

test('lessToPairs', () => {
  expect(lessToPairs('@primary-color: #1890ff;')['@primary-color']).toBe('#1890ff');
  expect(lessToPairs('@primary-color: #1890ff')['@primary-color']).toBe('#1890ff');
  expect(lessToPairs('// @primary-color: #1890ff;')['@primary-color']).toBe(undefined);
});

test('pairsToTheme', () => {
  const pairs = lessToPairs('@custom-color: #1890ff; @primary-color: @custom-color');
  expect(pairsToTheme(pairs)?.token?.colorPrimary).toBe('#1890ff');
});
