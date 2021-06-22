import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Character } from 'src/app/models/character';
import { RickMortyService } from './../../services/rick-morty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters: Character[] = [];
  favArray = [];
  page: number = 0;
  cargando: boolean = false;
  lastPage: number = 1;
  form: FormGroup;
  searchButton: boolean = false;
  filterSelect = ['Female', 'Male', 'Genderless', 'Unknown'];
  showBtnTop: boolean = false;
  top: number = 0;

  @HostListener('window:scroll', ['$event'])
  listenerScroll(){
    let pos = (document.documentElement.scrollTop || document.body.scrollTop)

    this.top = pos;
    if(this.top > 1500){
      this.showBtnTop = true
    }else{
      this.showBtnTop = false;
    }
  }

  constructor(
    private rickMortyService: RickMortyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getInfo();
  }

  createForm(){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      filter: ['']
    });
  }

  get nameRequired(){ return this.form.get('name').invalid }
  get filter(){ return this.form.get('filter').value }
  
  getInfo(){
    this.page++;
    if(this.cargando){return} 
    if(this.page > this.lastPage) {return}
    let name = this.form.get('name').value;
    let filter = this.form.get('filter').value;
    this.cargando = true;
    this.rickMortyService.getCharacters(this.page, name, filter).subscribe((res: any) => {
    this.cargando = false;
      this.lastPage = res.info.pages;
      this.characters = [...this.characters, ...res.results];
    }, error => {
      this.cargando = false;
      Swal.fire({
        title: 'Error',
        text: error.error.error,
        icon: 'error',
        customClass:{
          title: 'title-swal',
          confirmButton: 'confirm-button-swal',
          popup:'container-swal'
        },
        background: '#262626',
      })
    })
  }

  backTop(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  onScroll(){
    this.getInfo()
  }

  search(){
    if(this.form.valid){
      this.searchButton = true;
      this.page = 0;
      this.characters = [];
      this.getInfo()
    }
  }

  showAll(){
    this.searchButton = false;
    this.page = 0;
    this.characters = [];
    this.form.get('name').setValue('');
    this.form.get('filter').setValue('');
    this.getInfo();
  }

  changeFilter(){
    this.characters = [];
    this.page = 0;
    this.getInfo();
  }

}
