import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports:[],
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.startMatrixEffect();
  }

  startMatrixEffect() {
    const canvas = document.getElementById("matrixCodeSpace") as HTMLCanvasElement;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
  
    const columns = Math.floor(width / 20) + 1;
    const yPosition = Array(columns).fill(0);
  
    // Texto personalizado para mostrar en el efecto
    const customText = "LITTLE DETAILS"; // Puedes cambiarlo por lo que quieras
    let charIndex = 0; // Índice para recorrer el texto
  
    function matrixEffect() {
      if (!ctx) return;
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#0f0";
      ctx.font = "15pt monospace";
  
      yPosition.forEach((y, index) => {
        // Obtener una letra del texto de forma cíclica
        const text = customText[charIndex % customText.length];
        charIndex++;
  
        const x = index * 20;
        ctx.fillText(text, x, y);
        yPosition[index] = y > 100 + Math.random() * 10000 ? 0 : y + 20;
      });
    }
  
    setInterval(matrixEffect, 50);
  }
  
}
