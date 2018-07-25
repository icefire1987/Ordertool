import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatSelect} from "@angular/material";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProcessdropdownComponent),
    multi: true
};


@Component({
    selector: 'processdropdown',
    templateUrl: './processdropdown.component.html',
    styleUrls: ['./processdropdown.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class ProcessdropdownComponent implements ControlValueAccessor, OnInit {

    private valuechange: Function;

    patchedValue: any;

    writeValue(val: any): void {
        //this.c.setValue(val, { emitEvent: false });
        this.select.value = val;
    }

    registerOnChange(fn: any): void {
        this.valuechange = fn;
    }
    registerOnTouched(fn: any): void {
    }
    constructor() { }

    @Input() model: any;
    @Input() selectedValue: any;
    @Input() disabled = false;
    @Input() myPlaceholder = "Prozess wählen";
    @Input() noEvent = true;
    @Input() c: FormControl = new FormControl();


    @ViewChild('myselect') select: MatSelect;

    @Output()
    change = new EventEmitter();

    ngOnInit(): void {
        if(this.c){
            this.valuechange = function(val){
                this.c.setValue(val, { emitEvent: false });
            }
        }else{
            this.valuechange = function() {
                return false;
            }
        }
    }


}
