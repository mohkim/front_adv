import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificationHead } from 'src/app/modules/SpecificationHead';
import { SpecificaitonHeadService } from 'src/app/service/specificationHead/SpecificaitonHeadService';
import { Location } from '@angular/common';
import { SubcatagoryService } from 'src/app/service/subcatagory/subcatagory.service';
@Component({
  selector: 'app-specificationhead-form',
  templateUrl: './specificationhead-form.component.html',
  styleUrls: ['./specificationhead-form.component.css']
})
export class SpecificationheadFormComponent implements OnInit {

  hidetextFom:boolean=false
  hideSelectTypeForm:boolean=false
  hideparentKey:boolean=false
  specificationHeadForm

  public sid: number;
  public cid: number;
  public scid: number;
  public  specificationHead 

  public spH_list:any

  ngOnInit(){
 this.getSource()

  }
  
  constructor( private fb:FormBuilder,
               private  route:ActivatedRoute,
               private  router:Router,
               private location: Location,
               private  subCatService:SubcatagoryService,
               private   speHeadService:SpecificaitonHeadService){

  }
  


  private updateForm(){
  this.specificationHeadForm.patchValue({
    id: this.specificationHead.id  ,
    controlType: this.specificationHead.controlType,
    selectType: this.specificationHead.selectType,
    parentkey: this.specificationHead.parentkey,
    type: this.specificationHead.type ,
    label: this.specificationHead.label,
    placeholder: this.specificationHead.placeholder,
    key: this.specificationHead.key,
    // value: this.specificationHead.value ,
    required: this.specificationHead.required ,
    pattern: this.specificationHead.pattern ,
  })
  
  this.checkControlTypeChange();
  
  }
  
  private updateObjectFromForm(){
     this.specificationHead.id=this.specificationHeadForm.value.id
     this.specificationHead.controlType=this.specificationHeadForm.value.controlType
     this.specificationHead.selectType=this.specificationHeadForm.value.selectType
     this.specificationHead.parentkey=this.specificationHeadForm.value.parentkey
     this.specificationHead.type=this.specificationHeadForm.value.type
     this.specificationHead.label=this.specificationHeadForm.value.label
     this.specificationHead.placeholder=this.specificationHeadForm.value.placeholder
     this.specificationHead.key=this.specificationHeadForm.value.key.replace(/\s/g, "")
    // this.specificationHead.value=this.specificationHeadForm.value.value
     this.specificationHead.required=this.specificationHeadForm.value.required
     this.specificationHead.pattern=this.specificationHeadForm.value.pattern
   
    
    }
  private  checkControlTypeChange(){
   
    if(this.specificationHead.controlType ==="dropdown"){
         this.hidetextFom=true
         this.hideSelectTypeForm=false;
    } else  {
      this.hidetextFom=false
      this.hideSelectTypeForm=true;
    }  
  }
  private removeId(){
    this.specificationHeadForm.patchValue({
      id: this.specificationHead.id  
    })
  }
  onControlTypeChange(ev){
   // console.log("on Click ==> "+JSON.stringify(ev.value))
    if(ev.value ==="dropdown"){
      this.hidetextFom=true
         this.hideSelectTypeForm=false;
         
    } else {
      this.hidetextFom=false
      this.hideSelectTypeForm=true;
    }   
  }
  onselectTypeChange(ev){
   // console.log("on select Chage  ==> "+JSON.stringify(ev.value))
    if(ev.value ==="CHILD"){
      this.hideparentKey=false;
    }  else {
      this.hideparentKey=true;
    }
  }
  submitForm(){
    if(this.specificationHeadForm.value.id==-1) this.removeId()
  this.updateObjectFromForm()
    console.log("on Form submit => "+JSON.stringify(this.specificationHead))
 
    this.speHeadService.saveSpecificationHead(this.scid,this.specificationHead).subscribe(
        result=>{
          console.log("success message =>"+JSON.stringify(result))
         this.router.navigate(['admin/specification'] , {queryParams:{cid:this.cid,scid:this.scid}})
        },
        error=> {
          console.log("error message =>"+JSON.stringify(error.error.message))
        }
    )

  }
  async getSource (){
    const z=await   this.route.queryParams.subscribe(
      param=> {
       this.cid=param.cid
       this.scid=param.scid 
       this.sid=param.sid
   }   )

    
    
   this.specificationHead=new SpecificationHead(-1,"","",false,"textbox","text","NONE","","","")
 
   if(this.sid>-1){
     this.speHeadService.getSpecificationHeadById(this.sid).subscribe(
         result =>{
      this.specificationHead=result 
       this.updateForm()
         },
       error=> {
       console.log("error retrieving specifiationHead  data")
       }
     )

   } 
   if(this.scid>-1){
    this.speHeadService.getallSpecificationHeadKey(this.scid).subscribe(
        result =>{
          this.spH_list=result
           const index=this.spH_list.indexOf(this.specificationHead.key,0)
           if(index > -1)  this.spH_list.splice(index,1) // delete current specification head
      //this.updateForm()
        },
      error=> {
      console.log("error retrieving specification List data")
      }
    )
   }
   
    
 
  this.specificationHeadForm=this.fb.group({
    id:[this.specificationHead.id ],
   controlType:[this.specificationHead.controlType,Validators.required],
   selectType:[this.specificationHead.selectType ],
   parentkey:[this.specificationHead.parentkey],
   type:[this.specificationHead.type],
   label:[this.specificationHead.label,Validators.required],
   placeholder:[this.specificationHead.placeholder,Validators.required],
   key:[this.specificationHead.key,Validators.required],
   value:[this.specificationHead.value],
   required:[this.specificationHead.required],
   pattern:[this.specificationHead.pattern],
  })
  this.checkControlTypeChange();
 


  }
}
 