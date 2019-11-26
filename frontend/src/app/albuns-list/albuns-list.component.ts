import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spotify-albuns-list',
  templateUrl: './albuns-list.component.html',
  styleUrls: ['./albuns-list.component.scss']
})
export class AlbunsListComponent implements OnInit {
  album: String[] = [];
  'https://material.angular.io/assets/img/examples/shiba2.jpg';

  constructor() {}

  ngOnInit() {}
}
