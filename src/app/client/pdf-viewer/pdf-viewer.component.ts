import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer',
  template: '<div #pdfContainer></div>',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit {
  @ViewChild('pdfContainer') pdfContainer: ElementRef;
  @Input() pdfUrl: string;
  @Input() thumbnail: boolean;

  ngAfterViewInit(): void {
    if (!this.pdfUrl) {
      console.error('PDF URL is not provided');
      return;
    }

    const container = this.pdfContainer.nativeElement;

    pdfjsLib.getDocument(this.pdfUrl).promise.then(pdf => {
      const pageCount = this.thumbnail ? 1 : pdf.numPages;

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        pdf.getPage(pageNum).then(page => {
          const canvas = document.createElement('canvas');
          container.appendChild(canvas);

          const viewport = page.getViewport({ scale: 0.5 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const context = canvas.getContext('2d');
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext);
        });
      }
    });
  }
}
