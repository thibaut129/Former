import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent  implements OnInit {
  @Input() nextPage: number;
  @Output() nextPageChange = new EventEmitter<number>();

  @Input() coordsExperience: {latitude:number, longitude:number};
  @Output() coordsExperienceChange= new EventEmitter<{latitude:number, longitude:number}>();

  @Input() locationExperience: string;
  @Output() locationExperienceChange= new EventEmitter<string>();

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["(cities)"]
        types: ["(regions)"]
      });
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          // update newExperience
          let coords = {latitude: this.latitude, longitude: this.longitude}
          this.coordsExperience = coords;
          this.coordsExperienceChange.emit(coords);

          this.locationExperience = place.name;
          this.locationExperienceChange.emit(place.name);

          // next Page
          this.nextPageChange.emit(this.nextPage+1);

        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
