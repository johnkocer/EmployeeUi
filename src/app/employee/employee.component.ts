import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { LogService } from "../log.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[LogService]

})
export class EmployeeComponent implements OnInit {
  public employeeList: Employee[];
  showEditor = true;
  myName: string;
  newEmployee: Employee;
  findEmployee: Employee;

  constructor(private dataService: EmployeeService,  private logger: LogService,private route: ActivatedRoute, private router: Router) {
    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = '';

  }
  @Input() comp: any;
  ngOnInit() {
    this.search();
  }

  employeeSeach() {
    if (!this.findEmployee.name.trim()) { return; }

    this.dataService.searchEmployees(this.findEmployee.name).subscribe(
      (data: Employee[]) => {
        this.employeeList = data;
        console.log("EmployeeComponent -> employeeSeach -> data", data)
        // this.logger.logInfoMessage(`Large price discounted: ${data}`);
        // this.logger.logErrorMessage(`this.comp.name: ${this.constructor.name}`);
        //this.logger.logErrorMessage("EmployeeComponent -> employeeSeach -> data",  `${EmployeeComponent.name}`);
        this.logger.logErrorMessage("EmployeeComponent -> employeeSeach -> data",  `${EmployeeComponent.name}`);


      },
      error => {
        console.log('could not get Employees', error);
        this.employeeList = null;
      }
    );
  }

  search() {
    this.dataService.search().subscribe(
      (data: Employee[]) => {
        this.employeeList = data;
        console.log("EmployeeComponent -> search -> data", data)
        this.logger.logInfoMessage("EmployeeComponent -> search -> data",`Employee LIST: ${JSON.stringify(data)}`);
      //  this.logger.logErrorMessage(`this.comp.name: ${this.route.component.name}`)
       this.logger.logErrorMessage("EmployeeComponent -> search -> data",`this.comp.name: ${EmployeeComponent.name}`);


      },
      error => {
        console.log('could not get Employees', error);
       this.logger.logErrorMessage("EmployeeComponent -> search -> data",`Could not get Employees: ${JSON.stringify(error)}`);

        this.employeeList = null;
      }
    );
  }

  public post(item: Employee) {
    this.dataService.post(this.newEmployee).subscribe(
      (data: Employee) => {
        this.employeeList.push(data);
      },
      error => {
        console.log('oops could not add employee', error);
      }
    );
  }

  public put(item: Employee) {
    this.dataService.put(item).subscribe(
      employee => {
        this.search();
      },
      error => {
        console.log('oops could not update employee', error);
      }
    );
  }

  public delete(employee: Employee) {
    this.dataService.delete(employee.id).subscribe(
      data => {
        console.log('employee deleted');
        this.search();
      },
      error => {
        console.log('oops could not delete employee', error);
      }
    );
  }

  get() {
    this.dataService.get(this.findEmployee.id).subscribe(
      e => {
        if (e == null) {
          const employeeFind = new Employee();
          employeeFind.id = this.findEmployee.id;
          this.findEmployee = employeeFind;
        } else if (e !== undefined) {
          this.findEmployee = e;
        }
      },
      error => {
        this.findEmployee = new Employee();
        console.log('could not get Employee', error);
      }
    );
  }
}

export class Employee {
  public id: number;
  public name: string;
  public gender: string;
  public departmentId: number;
  public salary: number;
}
