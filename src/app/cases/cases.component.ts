import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Cases } from '../cases';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'status'];
  data: Cases[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    try {
      const result = await this.api.getCases().toPromise();
      if (result) {
        this.data = result;
        console.log(this.data);
      } else {
        console.log('Error: result is undefined');
      }
      this.isLoadingResults = false;
    } catch (err) {
      console.log(err);
      this.isLoadingResults = false;
    }
  }
}
