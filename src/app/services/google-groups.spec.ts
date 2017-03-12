import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { GoogleGroupsService } from './google-groups';

describe('Service: GoogleGroups', () => {
  let service: GoogleGroupsService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        },
        GoogleGroupsService
      ]
    });
  });

  beforeEach(inject([GoogleGroupsService, MockBackend], (googleGroupsService: GoogleGroupsService, mockBackend: MockBackend) => {
    service = googleGroupsService;
    backend = mockBackend;
  }));

  const data = {
    'title': 'Group Title',
    'author': 'John Smith',
    'volumeId': '12345'
  };

  const groups = {
    items: [
      {id: '12345', volumeInfo: {title: 'Title'}},
      {id: '67890', volumeInfo: {title: 'Another Title'}}
    ]
  };

  const queryTitle = 'Group Title';

  it('should call the search api and return the search results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(groups)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`https://www.googleapis.com/groups/v1/volumes?q=${queryTitle}`);
    });

    service
      .searchGroups(queryTitle)
      .subscribe((res) => {
        expect(res).toEqual(groups.items);
        done();
      });
  });

  it('should retrieve the group from the volumeId', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(data)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`https://www.googleapis.com/groups/v1/volumes/${queryTitle}`);
    });
    service
      .retrieveGroup(queryTitle)
      .subscribe((response) => {
        expect(response).toEqual(data);
        done();
      });
  });

});
