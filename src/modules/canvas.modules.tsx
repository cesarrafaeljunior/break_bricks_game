export class Canvas {

    static canvas:HTMLCanvasElement
    static ctx: CanvasRenderingContext2D;
    static widthCanvas: number;
    static heigthCanvas: number;

    constructor(){
        
        if(Canvas.canvas === null){
            Canvas.canvas = document.createElement("canvas") as HTMLCanvasElement;
            document.body.appendChild(Canvas.canvas);
        }
        if(Canvas.ctx == null){
            Canvas.ctx = Canvas.canvas.getContext("2d")!;
            Canvas.widthCanvas = Canvas.ctx.canvas.width;
            Canvas.heigthCanvas = Canvas.ctx.canvas.height;
        } 
    }
}
