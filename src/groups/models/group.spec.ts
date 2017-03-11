import { Group } from './group';


describe('groups/', () => {
  describe('Group', () => {
    it('should set name', () => {
      expect(new Group('testName', 'testLocation').name).toBe('testName');
    });

    it('should set location', () => {
      expect(new Group('testName', 'testLocation').location).toBe('testLocation');
    });
  });
});
