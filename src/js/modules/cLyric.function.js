
/**
 * To transform the lrc contents into a array
 * @module module/cLyric.function
 * @param  {string} lrc The lyric string
 * @return {array} Sorted lyric array
 */
export function cLyric(lrc){
	let offset = 0,
	lyricArray = [];
	lrc.replace(/\n+/gi,"\n").split("\n").forEach(function(content){
		//content is like:
		// [00:12.34]JUUUUUUUUUUUUUUMP!!!!!!
		//get OFFSET
		if(content.indexOf("offset")!==-1) offset = parseInt((/offset\:(\d+)/gi).exec(content)[1]);
		//get Lyric and translate it.
		//ar[] -> [1.24,2.21,36.15,"HEY!"]
		if(/\[\d+:[\d\.]+\]/gi.test(content)){
			let ar = [];
			[].forEach.call(content.match(/\[\d+\:[\.\d]+\]/gi),function(e){
				let number = /\[(\d+)\:([\.\d]+)\]/gi.exec(e);
				ar.push(parseInt(number[1])*60+parseFloat(number[2]-offset*0.001));
			});
			ar.push(/(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(content)[1]);
			do{
				lyricArray.push({time:ar.shift(),content:ar[ar.length-1]});
			}while(ar.length>=2)
		}
	});
	return lyricArray.sort((a, b)=> {
	    return a.time - b.time;
	});
};