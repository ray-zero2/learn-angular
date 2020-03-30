import { Component, OnInit } from '@angular/core';
import { CityData } from '../Data';
import { PrefService } from '../pref.service';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {

  data: CityData[];
  private baseData: CityData[];
  private selectedPrefCode: number;

  constructor(private service: PrefService) { }

  ngOnInit() {

    this.createData();

    this.service.observe.subscribe(
      (selectedPrefCode: number)=>{
        this.selectedPrefCode = selectedPrefCode;
        this.setPrefCity();
      }
    );
  }

  setPrefCity(){
    this.data = new Array();
    this.baseData.forEach( item => {
      if(item.prefCode === this.selectedPrefCode) this.data.push(item);
    });
  }

  createData(){
    this.baseData=[
      {prefCode:1,cityCode:1,cityName:"札幌市",cityArea:1121.26,cityPopulation:1966416},
      {prefCode:1,cityCode:2,cityName:"釧路市",cityArea:1362.90,cityPopulation:168698},
      {prefCode:2,cityCode:1,cityName:"青森市",cityArea:824.61,cityPopulation:279133},
      {prefCode:2,cityCode:2,cityName:"八戸市",cityArea:305.56,cityPopulation:225463},
      {prefCode:3,cityCode:1,cityName:"秋田市",cityArea:906.07,cityPopulation:308482},
      {prefCode:3,cityCode:2,cityName:"横手市",cityArea:692.80,cityPopulation:87960},
      {prefCode:4,cityCode:1,cityName:"盛岡市",cityArea:886.47,cityPopulation:294047},
      {prefCode:4,cityCode:2,cityName:"一関市",cityArea:1256.42,cityPopulation:116479},
      {prefCode:5,cityCode:1,cityName:"いわき市",cityArea:1232.02,cityPopulation:342897},
      {prefCode:5,cityCode:2,cityName:"郡山市",cityArea:757.20,cityPopulation:332863}
    ];
  }

}
