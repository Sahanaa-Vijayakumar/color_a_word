import { Component } from '@angular/core';
import { ImagesService } from './images.service';
import Vibrant from 'node-vibrant';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Color From Word';
  searchTerm = '';
  matchingShades!: string[];
  public masonryOptions: NgxMasonryOptions = {
    columnWidth: 200,
    gutter: 30,
    fitWidth: true,
  };

  constructor(private imageService: ImagesService) {}

  onSubmit() {
    if (this.searchTerm) {
      this.imageService.search(this.searchTerm).subscribe((res: any) => {
        if (res && res.items && res.items.length) {
          const imageUrl = res.items[0].link;
          if (imageUrl) {
            Vibrant.from(imageUrl).getPalette((err, palette) => {
              this.matchingShades = [];
              let vibrantHex = palette?.Vibrant?.getHex();
              if (vibrantHex) {
                this.matchingShades.push(vibrantHex);
                for (let i = 1; i < 4; i++) {
                  let percentage = 20 * i;
                  this.matchingShades.push(
                    this.shadeColor(vibrantHex, percentage)
                  );
                }
                for (let i = 1; i < 3; i++) {
                  let percentage = -20 * i;
                  this.matchingShades.push(
                    this.shadeColor(vibrantHex, percentage)
                  );
                }
              }
            });
          }
        }
      });
    }
  }

  shadeColor(color: any, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = (R * (100 + percent)) / 100;
    G = (G * (100 + percent)) / 100;
    B = (B * (100 + percent)) / 100;

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    let RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
    let GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
    let BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

    return '#' + RR.slice(0, 2) + GG.slice(0, 2) + BB.slice(0, 2);
  }
}
