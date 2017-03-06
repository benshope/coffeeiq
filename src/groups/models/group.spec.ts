import { Group } from './group';


describe('groups/', () => {
  describe('Group', () => {
    it('should set title', () => {
      expect(new Group('testTitle', 'testLocation').title).toBe('testTitle');
    });

    it('should set location', () => {
      expect(new Group('testTitle', 'testLocation').location).toBe('testLocation');
    });

    it('should set completed to false by default', () => {
      expect(new Group('testTitle', 'testLocation').completed).toBe(false);
    });
  });
});
