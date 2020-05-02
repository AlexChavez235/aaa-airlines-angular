import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Router } from '@angular/router';
import { StoreService } from '../_services/store.service';
import { AuthService } from '../_services/auth.service';
import { Customer } from '../_models/customer';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  customers: Customer[];
  customersCount: number;
  searchName = "";
  searchAddress = "";
  searchPhone = "";
  page = 1;
  pageSize = 10;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.loading = true;
    let requestParams = [];
    if (this.page) requestParams.push({ page: this.page });
    if (this.pageSize) requestParams.push({ pagesize: this.pageSize });
    if (this.searchName) requestParams.push({ customerName: this.searchName });
    if (this.searchAddress) requestParams.push({ customerAddress: this.searchAddress });
    if (this.searchPhone) requestParams.push({ customerPhone: this.searchPhone });
    this.customerService.getCustomers(requestParams).subscribe(
      (data: any) => {
        this.loading = false;
        this.customers = data.customers || data.pageContent;
        this.customersCount = data.customersCount || data.totalRecords;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getCustomerById(id: number) {
      this.storeService.setStore({...this.storeService.getStore(), customerId: id});
      this.router.navigate([`${this.authService.currentUserValue.role}/customer`]);
  }

  addCustomer() {
    console.log('Add customer');
  }

  changePage() {
    this.getCustomers();
  }

}
