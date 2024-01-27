class ViewPort{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.center = new Point(this.canvas.width/2,this.canvas.width/2);
        this.zoom = 1;
        this.offset = scale(this.center,-1);   //top left corner is the origin 

        this.drag={
            start :new Point(0,0),
            end: new Point(0,0) ,   
            offset: new Point(0,0),
            active:false
        }

        this.#addEventListeners();
    }

    restore(){
        this.ctx.restore();
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.canvas.width/2,this.canvas.height/2);
        this.ctx.scale(1/this.zoom,1/this.zoom,);
        const offset = this.getOffset()
        this.ctx.translate(offset.x,offset.y);
    }

    getMouse(evt,subDragOffset=false){
        const p =  new Point(
            (evt.offsetX-this.center.x)*this.zoom -this.offset.x,
            (evt.offsetY-this.center.y)*this.zoom - this.offset.y
        );
        return subDragOffset ? subtract(p,this.drag.offset) : p;
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousewheel",this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown",this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove",this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup",this.#handleMouseUp.bind(this));

    }

    #handleMouseWheel(evt){
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom+=dir*step;
        this.zoom = Math.max(1,Math.min(5,this.zoom));
        //console.log(this.zoom);

    }
    #handleMouseDown(evt){
        if(evt.button ==1){
            this.drag.active=true;
            this.drag.start = this.getMouse(evt);
            //this.drag.offset = this.offset.copy();
        }
    }

    #handleMouseMove(evt){
        if(this.drag.active){
            this.drag.end = this.getMouse(evt);
            //this.offset = this.drag.offset.add(this.drag.start.subtract(this.drag.end));
            this.drag.offset = subtract(this.drag.end,this.drag.start)
        }
    }
    #handleMouseUp(evt){
        if(this.drag.active){
            this.offset = add(this.offset,this.drag.offset);
            this.drag={
                start :new Point(0,0),
                end: new Point(0,0) ,   
                offset: new Point(0,0),
                active:false
            }
        }
    }

    getOffset(){
        return add(this.offset,this.drag.offset);
    }
}
//make the eventlisterner for mousewheel to create a  viewport
