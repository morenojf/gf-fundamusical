import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { inject, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { filter, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private overlay = inject(Overlay);
  private overlayRef!: OverlayRef


  openDialog<T = unknown>(template: TemplateRef<T>, viewContainerRef: ViewContainerRef, context?: any) {
	const config = this.getOverlayConfig();
	const overlayRef = this.overlay.create(config);
	this.overlayRef  = overlayRef
	const portal = context
    ? new TemplatePortal(template, viewContainerRef, context)
    : new TemplatePortal(template, viewContainerRef);
  overlayRef.attach(portal);
  this.overlayDetachment(overlayRef);

  }


  getOverlayConfig(): OverlayConfig {
	const state = new OverlayConfig({
		positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
		panelClass: 'hello-codescript',
		hasBackdrop: true
	});
	return state
  }

  overlayDetachment(overlayRef: OverlayRef) {
	const backdropClick$ = overlayRef.backdropClick();
	const escapeKey$ = overlayRef.keydownEvents().pipe(filter((event: KeyboardEvent) => event.key === 'Escape')
);
merge(backdropClick$, escapeKey$).subscribe(()=> {
	overlayRef.dispose();
})

  }

  
  closeModal(){
	this.overlayRef?.dispose();
  }
}
