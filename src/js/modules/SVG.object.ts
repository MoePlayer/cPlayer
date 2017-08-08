let SVG:{[propName:string]:string} = {
    "playArrow"     :'M16 10v28l22-14z',
    "pause"         :'M12 38h8V10h-8v28zm16-28v28h8V10h-8z',
    "playlistPlay"  :'M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z',
    "note"          :'M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z',
    "volumeUp"      :'M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z',
    "volumeMute"    :'M14 18v12h8l10 10V8L22 18h-8z',
    "volumeOff"     :'M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z',
    "volumeDown"    :'M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z',
};
for(let i = 0,keys = Object.keys(SVG),length = keys.length;i<length;i++){
	let svg = keys[i]==="playlistPlay" ?
	     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="' + SVG[keys[i]] + '"/></svg>' :
	     '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="' + SVG[keys[i]] + '"/></svg>';
	SVG[keys[i]] = svg;
}
export { SVG };