import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and return sorted list of country names', () => {
    const mockResponse = [
      { name: { common: 'Canada' } },
      { name: { common: 'Brazil' } },
      { name: { common: 'Argentina' } }
    ];

    service.getCountries().subscribe(countries => {
      expect(countries).toEqual(['Argentina', 'Brazil', 'Canada']);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
