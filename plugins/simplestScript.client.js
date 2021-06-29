export default function(context, inject){
    inject('simplestScript', {
        simplestScript
    })

    function simplestScript(canvas) {
        let localCanvas = canvas;
        console.log(localCanvas.clientWidth); 
        
        let sketch = function(s){
            let fft = new p5.FFT(0.9, 1024);

            let cnv = '';

            s.setup = function() {
                const source = new p5.AudioIn();
                source.start();

                fft.setInput(source);

                cnv = s.createCanvas(localCanvas.clientWidth,localCanvas.clientHeight);
                cnv.parent(localCanvas);

                s.background(33,33,33);
            }

            s.draw = function(){

                let divisions = 2;
                let speed = 1;
        
                var h = localCanvas.clientHeight/divisions;
                var spectrum = fft.analyze(); //Is the result of the fft analysis
        
                var scaledSpectrum = s.splitOctaves(spectrum, 6);
                var len = scaledSpectrum.length;

                s.copy(cnv,0,0,window.innerWidth,window.innerHeight,0, 2,window.innerWidth,window.innerHeight-20)
                s.background(33, 33, 33);
        
                s.strokeWeight(1);
                s.stroke(245);
                s.fill(33,33,33);
        
                s.drawLine(len, scaledSpectrum, h);
            }

            s.drawLine = (len, scaledSpectrum, h) => {
                s.beginShape();
        
                s.curveVertex(0,h) //We create a first vertex at the far corner
                //s.translate(window.innerWidth/2,window.innerHeight/2)
                for(var i = 0; i < len; i ++){
                    let step = s.TWO_PI/len; 
                    let minimumDiameter = 120;
                    let maximumDiameter = 300;
                    var point = s.smoothPoint(scaledSpectrum, i, 2);
                    //console.log(point);
                    var x = s.map(i, 0, len-1, 0, window.innerWidth);
                    var y = s.map(point, 0, 255, h, 0);
        
                    //var x = s.map(point,0, 255, minimumDiameter, maximumDiameter) * s.sin((i + 1) * step);
                    //var y = s.map(point,0, 255, minimumDiameter, maximumDiameter) * s.cos((i + 1) * step);
        
                    s.curveVertex(x,y);
                }
        
                s.curveVertex(window.innerWidth,h);
                s.endShape();
              }
        
              s.splitOctaves = (spectrum, slicesPerOctave) => {
                var scaledSpectrum = [];
                var len = spectrum.length;
        
                //default the number of slices to third
                var n = slicesPerOctave || 3;
                var nRootOfTwo = Math.pow(2, 1/n);
        
                var lowestBin = slicesPerOctave;
        
                var binIndex = len - 1;
                var i = binIndex;
        
        
                while (i > lowestBin){
                    var nextBinIndex = Math.round(binIndex/nRootOfTwo);
                    if (nextBinIndex === 1) return;
        
                    var total = 0;
                    var numBins = 0;
        
                    for(i = binIndex; i > nextBinIndex; i --){
                        total += spectrum[i];
                        numBins++;
                    }
        
                    var energy = total/numBins;
                    scaledSpectrum.push(energy);
        
                    binIndex = nextBinIndex;
                }
        
                for(var j = i; j > 0; j--){
                    scaledSpectrum.push(spectrum[j]);
                }
        
                scaledSpectrum.reverse();
        
                return scaledSpectrum;
              }
        
              s.smoothPoint = (spectrum, index, numberOfNeighbors) => {
                var neighbors = numberOfNeighbors || 2;
                var len = spectrum.length;
        
                var val = 0;
        
                var indexMinusNeighbors = index - neighbors;
                var smoothedPoints = 0;
        
                for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++){
                    if(typeof(spectrum[i]) !== 'undefined'){
                        val += spectrum[i];
                        smoothedPoints++;
                    }
                } 
        
                val = val/smoothedPoints;
        
                return val;
            
              }   
            
        }

        const script = new p5(sketch);
    }
}