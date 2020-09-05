import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  SERVER_URL = "http://localhost:3000/upload";
  file: File;

  images: { name: string; }[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.file);

    this.httpClient.post<{ name: string; }>(this.SERVER_URL, formData).subscribe(
      (res) => {
        this.images.push(res);
      },
      (err) => console.log(err)
    );
  }
}
