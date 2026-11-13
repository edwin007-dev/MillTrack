import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-viewcustmillservices',
  templateUrl: './viewcustmillservices.component.html',
  styleUrls: ['./viewcustmillservices.component.css']
})
export class ViewcustmillservicesComponent

{
  millid: string | null = null;
  categoryid: string | null = null;
  subcategories: any[] = [];
  public imageService: ImageService;

  constructor(private route: ActivatedRoute, private dbService: DbserviceService, public imgService: ImageService) {
    this.imageService = imgService;
  }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => {
      this.millid = params.get('millid');
      this.categoryid = params.get('categoryid');

      if (this.millid && this.categoryid) {
        this.loadSubcategories();
      }
    });
  }

  loadSubcategories() 
  {
    localStorage.setItem("millid",this.millid)
    console.log('local',localStorage)
    this.dbService.getSubcategoriesByMillAndCategory(this.millid ?? '', this.categoryid ?? '').then((data: any) => {
      this.subcategories = data;
      console.log("🔹 Loaded subcategories:", data);
    }).catch((error: any) => {
      console.error("❌ Error loading subcategories:", error);
    });
  }
}
