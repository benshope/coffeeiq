import { Group } from './group';


describe('groups/', () => {
  describe('Group', () => {
    it('should set title', () => {
      expect(new Group('test').title).toBe('test');
    });

    it('should set completed to false by default', () => {
      expect(new Group('test').completed).toBe(false);
    });
  });
});
