import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../cases';

@Component({
  selector: 'app-cases-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CasesDetailsComponent implements OnInit {
  cases: Cases = {
    id: null,
    name: '',
    gender: '',
    age: null,
    address: '',
    city: '',
    country: '',
    status: '',
    updated: null,
  };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params['id']);
  }

  getCasesDetails(id: string) {
    this.api.getCasesById(id).subscribe((data: any) => {
      this.cases = data;
      console.log(this.cases);
      this.isLoadingResults = false;
    });
  }

  async deleteCases(id: any) {
    try {
      this.isLoadingResults = true;
      await this.api.deleteCases(id).toPromise();
      this.isLoadingResults = false;
      this.router.navigate(['/cases']);
    } catch (err) {
      console.log(err);
      this.isLoadingResults = false;
    }
  }
}
