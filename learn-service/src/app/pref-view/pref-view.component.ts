import { Component, OnInit } from '@angular/core';
import { PrefData } from '../Data';
import { PrefService } from '../pref.service';

@Component({
  selector: 'app-pref-view',
  templateUrl: './pref-view.component.html',
  styleUrls: ['./pref-view.component.scss']
})
export class PrefViewComponent implements OnInit {
  data: PrefData[];
  selectedItem: PrefData | undefined;

  constructor(private service: PrefService) { }

  ngOnInit(): void {
    this.createData();
  }


  createData() {
    this.data = [
      {prefCode:1,prefName:"北海道",prefArea:78419.54,prefPopulation:5285430},
      {prefCode:2,prefName:"青森県",prefArea:9645.65,prefPopulation:1262686},
      {prefCode:3,prefName:"秋田県",prefArea:11637.57,prefPopulation:980694},
      {prefCode:4,prefName:"岩手県",prefArea:15275.02,prefPopulation:1240522},
      {prefCode:5,prefName:"福島県",prefArea:13783.90,prefPopulation:1865143}
    ];
  }

  onClickRow(item: PrefData) {
    this.selectedItem = item;
    this.service.subject.next(item.prefCode);
  }

  rowBackColor(item: PrefData): string {
    if(this.selectedItem === undefined) return 'white';
    if(this.selectedItem.prefCode === item.prefCode) return 'gainsboro';
    return 'white';
  }
}
