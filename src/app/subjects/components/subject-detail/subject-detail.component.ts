import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExpressionService } from 'src/app/expressions/services/expression.service';
import { UrlService } from 'src/app/shared/services/url.service';
import { LogoutComponent } from 'src/app/users/components/logout/logout.component';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {

  public previousRoute;
  public subjectExpressionList;
  public currentSubject;

  constructor(
    public dialog: MatDialog,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    const subjectId = this.route.snapshot.paramMap.get('subjectid');
    console.log(subjectId);
    // Get current subject
    this.subjectService.getSubjectById(subjectId)
    .subscribe(
      data => {
        this.currentSubject = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    // Get current subject linked expressions
    this.subjectService.getExpressionsBySubject(subjectId)
    .subscribe(
      data => {
        this.subjectExpressionList = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    // Route back
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousRoute = previousUrl;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '250px'
    });
  }

}
