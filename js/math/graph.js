class Graph{
    constructor(points=[],segments = []){
        this.points=points;
        this.segments=segments;
    }

    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }

    addPoint(point){
        this.points.push(point);
    }
    removePoint(point){                                     //Need to remove the segments that are in the removed points also for making sense
        const segs = this.getSegmentWithPoint(point);
        for(const seg of segs){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point),1);
    }

    
    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }
    addSegment(seg){
        this.segments.push(seg);
    }
    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg),1);
    }
    containsSegment(seg){
        return this.segments.find((s) => s.equals(seg));
    }

    tryAddSegment(seg){
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)){
            this.addSegment(seg);
            return true;
        }
        return false;
    }

    getSegmentWithPoint(point){
        let res = [];
        for (const seg of this.segments){
            if(seg.includes(point)) res.push(seg);
        }
        return res;
    }


    draw(ctx){
        for(const seg of this.segments){
            seg.draw(ctx)
        }

        for(const point of this.points){
            point.draw(ctx)
        }
    }

    dispose(){
        this.segments.length=0;
        this.points.length=0;
    }
}