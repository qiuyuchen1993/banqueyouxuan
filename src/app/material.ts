import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material'

import { MatDialogModule } from '@angular/material/dialog';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatChipsModule } from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatSelectModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatTabsModule,
        TextFieldModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatToolbarModule
    ],
    exports: [
        MatSelectModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatTabsModule,
        TextFieldModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatToolbarModule
    ],
})
export class MaterialModule { }