export function cLyric(lrc:string):{time:number,content:string}[]{
	let offset:number = 0,
	lyricArray:{time:number,content:string}[] = [];
	lrc.replace(/\n+/gi,"\n").split("\n").forEach(function(content:string){
		//content is like:
		// [00:12.34]JUUUUUUUUUUUUUUMP!!!!!!
		//get OFFSET
		if(content.indexOf("offset")!==-1) offset = parseInt(((/offset\:(\d+)/gi).exec(content) as RegExpExecArray)[1]);
		//get Lyric and translate it.
		//ar[] -> [1.24,2.21,36.15,"HEY!"]
		if(/\[\d+:[\d\.]+\]/gi.test(content)){
			let ar:(number|string)[] = [];
			[].forEach.call(content.match(/\[\d+\:[\.\d]+\]/gi),function(e:string){
				let number = /\[(\d+)\:([\.\d]+)\]/gi.exec(e) as RegExpExecArray;
				ar.push(parseInt(number[1])*60+parseFloat(number[2])-offset*0.001);
			});
			ar.push((/(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(content) as RegExpExecArray)[1]);
			do{
				lyricArray.push({time:<number>ar.shift(),content:<string>ar[ar.length-1]});
			}while(ar.length>1)
		}
	});
	
	return lyricArray.sort((a, b)=> {
	    return a.time - b.time;
	});
};