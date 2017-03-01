import { Group } from './group';


describe('groups/', () => {
  describe('Group', () => {
    it('should set title', () => {
      expect(new Group('test').title).toBe('test');
    });

    it('should set members to an empty array by default', () => {
      expect(new Group('test').members).toBe([]);
    });
  });
});
