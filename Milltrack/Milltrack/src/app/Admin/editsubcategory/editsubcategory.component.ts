import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.css']
})
export class EditsubcategoryComponent {

  subcat_id: any;
    public subcategoryeditdataarray: any[] = [];
    subcategoryeditformGroup!: FormGroup;
    selectedFiles?: FileList;
    currentFile?: any;
    message = '';
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
        this.subcat_id = Params.get('subcat_id');
      });
    }

    ngOnInit(): void {
      console.log(this.subcat_id);
      this.subcategoryeditformGroup = this.fb.group({
        subcat_id: [this.subcat_id],
        subcatname: [''],
        image: [''],
        description: [''],
      });

      const id = this.subcat_id;
      console.log(id)
      this.dbservice.getsubcategorydetails({ id }).then((data: any) => {
        this.subcategoryeditdataarray = data;
        console.log(this.subcategoryeditdataarray);
        this.subcategoryeditformGroup.setValue({
          subcat_id: this.subcat_id,
          subcatname: this.subcategoryeditdataarray[0].subcatname,
          image: this.subcategoryeditdataarray[0].image,
          description: this.subcategoryeditdataarray[0].description,
        });
        console.log(this.subcategoryeditformGroup.value);
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
        this.subcategoryeditformGroup.value.image = this.currentFile.name;
        console.log(this.currentFile.name)

        this.dbservice.updatesubcategory(this.subcategoryeditformGroup.value).then((confirmation: any) => {
          alert('SubCategory Details Updated Successfully');
          this.router.navigate(['/adminmaster/subcategoryview'])
        });
      }
      else {

        this.dbservice.updatesubcategory(this.subcategoryeditformGroup.value).then((confirmation: any) => {
            alert('SubCategory Details Updated Successfully');
            this.router.navigate(['/adminmaster/subcategoryview']);
          }
        );
      }
    }
  }