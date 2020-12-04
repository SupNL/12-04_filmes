import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MovieApiService } from '../services/movie-api.service';

interface MoviesRequest {
  page : number;
  total_pages: number;
  results : [Movie];
}

interface Movie {
  original_language : string;
  original_title : string;
  overview : string;
  release_date : string;
  backdrop_path : string | null;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public movies : [Movie];
  private page : number = 1;
  private totalPages : number;

  constructor(private movieService : MovieApiService, public toastController: ToastController) {
    this.loadMovies();
  }

  async presentToastMessage(message : string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  public getImageUrl(id : string) { 
    return `https://image.tmdb.org/t/p/w300${id}`;
  } 

  private loadMovies() {
    this.movieService.getPopulars(this.page).subscribe(
      (res : MoviesRequest) => {
        if(this.page <= res.total_pages){
          this.movies = res.results;
          this.scrollTop();
        } else {
          this.presentToastMessage("Página inexistente");
        }
        this.totalPages = res.total_pages;
      }, (err) => {
        this.presentToastMessage("Ocorreu um erro");
        console.log(err);
      }
    )
  }

  private getContent() {
    return document.querySelector('ion-content');
  }

  private scrollTop() {
    this.getContent().scrollToTop(0);
  }

  public decrementPage() {
    if (this.page != 1) {
      this.page -= 1;
      this.loadMovies();
    } else {
      this.presentToastMessage("Página inexistente");
    }
  }

  public incrementPage() {
    this.page += 1;
    this.loadMovies();
  }
}
