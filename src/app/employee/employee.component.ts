import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  dataList: any[] = [];
  dataForm: FormGroup;
  selectedValue: string = 'ALL';
  editMode: boolean = false;
  searchClicked: boolean = false;
  dropDownList: any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.dataForm = this.fb.group({
      techName: [null, Validators.compose([Validators.required])],
      id: []
    })
  }

  addDataToList(): void {
    this.searchClicked = true;
    if (this.dataForm.valid) {
      let valuesObject = { id: null, value: '', status: 'UNPROCESSED' };
      let formValues = this.dataForm.getRawValue();
      valuesObject.value = formValues.techName;
      valuesObject.id = `${formValues.techName}${this.dataList.length}`;
      this.dataList.push(valuesObject);
      this.dataForm.reset();
      this.searchClicked = false;
      this.createUniqueList();
    }
  }

  //this will make sure to change the process to unprocess
  processRecord(id: string): void {
    this.processOrUnprocessRecord(id, 'UNPROCESSED');
  }

  //this will make sure to change the process to unprocess
  UnProcessRecord(id: string): void {
    this.processOrUnprocessRecord(id, 'PROCESSED');
  }

  //this will create the unique dropdown list values
  createUniqueList(): void {
    const uniqueList = new Set();
    this.dataList.forEach(list => {
      const status = list.status;
      uniqueList.add(status);
    })
    this.dropDownList = [...uniqueList];
  }

  processOrUnprocessRecord(id: string, statusType: string): void {
    this.dataList[this.getIndexNumber(id)].status = statusType;
    this.createUniqueList();
  }

  getIndexNumber(id: string): number {
    return this.dataList.findIndex(singleRecord => singleRecord.id === id);
  }

  deleteRecord(id: string): void {
    this.dataList.splice(this.getIndexNumber(id), 1);
    this.createUniqueList();
  }

  updateValues(id: string): void {
    let index = this.getIndexNumber(id);
    let recordToUpdate = this.dataList[index];
    this.patchvaluesInToForm(recordToUpdate);
    this.editMode = true;
  }

  patchvaluesInToForm(recordToUpdate: any): void {
    this.dataForm.patchValue({
      techName: recordToUpdate.value,
      id: recordToUpdate.id
    })
  }

  saveRecord(): void {
    let index = this.getIndexNumber(this.dataForm.getRawValue().id);
    let recToUpdate = this.dataList[index];
    recToUpdate.value = this.dataForm.getRawValue().techName;
    this.dataList.splice(index, 1, recToUpdate);
    this.editMode = false;
    this.dataForm.reset();
  }

}
