import { Directive, forwardRef, ElementRef, Renderer, HostListener, Input } from '@angular/core'
import { Component } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

@Directive({
  selector: 'div[contentEditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableDivDirective),
      multi: true
    }
  ]
})
export class EditableDivDirective implements ControlValueAccessor {

  @Input()
  placeholder: string

  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }

  onChange() {
    if (this._onChange) {
      this._onChange(this._elRef.nativeElement.innerText)
    }
  }

  @HostListener('keyup', ['$event'])
  keyup(event: any) {
    this.onChange()
  }


  // ControlValueAccessor implementation
  // ====================================

  private _onChange = (_) => { } // call it if your value changed..
  private _onTouched = () => { } // call it "on blur" ..

  // will be called if a values comes in via ngModule !
  writeValue(val: any) {
    if (!val) { val = '' }

    this._renderer.setElementProperty(this._elRef.nativeElement, 'innerText', val)
  }

  registerOnChange(fn: (_: any) => void): void { this._onChange = fn }
  registerOnTouched(fn: () => void): void { this._onTouched = fn }
}
