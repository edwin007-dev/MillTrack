import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent {

  Category_id: any;
  public categoryeditdataarray: any[] = [];
  CategoeyeditformGroup!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: any;
  message = '';
  CategoryeditformGroup: any;
  category_id: any;
  public imageService: ImageService;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbserviceService,
    private router: Router,
    private route: ActivatedRoute,
    public imgService: ImageService
  ) {
    this.imageService = imgService;
    route.paramMap.subscribe((Params: ParamMap) => {
      this.category_id = Params.get('category_id');
    });
  }

  ngOnInit(): void {
    console.log(this.category_id);
    this.CategoryeditformGroup = this.fb.group({
      category_id: [this.category_id],
      categoryname: [''],
      image: [''],
    });

    const id = this.category_id;
    console.log(id)
    this.dbservice.getcategorydetails({ id }).then((data: any) => {
      this.categoryeditdataarray = data;
      console.log(this.categoryeditdataarray);
      this.CategoryeditformGroup.setValue({
        category_id: this.category_id,
        categoryname: this.categoryeditdataarray[0].categoryname,
        image: this.categoryeditdataarray[0].image,
      });
      console.log(this.CategoryeditformGroup.value);
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
  }

  Onsubmit() {
    if (this.selectedFiles) {
      //console.log(this.selectedFiles);
      console.log(this.selectedFiles.item(0));
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        //console.log(this.currentFile);
        this.dbservice.upload(this.currentFile).subscribe(
          (event: any) => {
            this.message = event.body.message;
          });
      }
      this.CategoryeditformGroup.value.image = this.currentFile.name;
      console.log(this.currentFile.name)

      this.dbservice.updatecategory(this.CategoryeditformGroup.value).then((confirmation: any) => {
        alert('Category Details Updated Successfully');
        this.router.navigate(['/adminmaster/categoryview'])
      });
    }
    else {

      this.dbservice.updatecategory(this.CategoryeditformGroup.value).then((confirmation: any) => {
          alert('Category Details Updated Successfully');
          this.router.navigate(['/adminmaster/categoryview']);
        }
      );
    }
  }
}