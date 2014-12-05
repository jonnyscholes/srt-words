var srt = require('srt-parse').fromString;
var strip = require('strip');

module.exports = {
	getWordUsage: getWordUsage,
	getSrtWords: getSrtWords
};

function getWordUsage(srtString) {
	var srtObject = srt(srtString);
	var srtTextArr = Object.keys(srtObject).map(function (key) {return srtObject[key].text});
	var words = getSrtWords(srtTextArr);
	var wordStats = {};

	words.forEach(function(word){
		if (!wordStats.hasOwnProperty(word)) {
			wordStats[word] = 1;
		} else {
			wordStats[word] = wordStats[word] + 1;
		}
	});
	return wordStats;
}

function getSrtWords(textArr) {
	var words = [];
	textArr.forEach(function(text){
		var t = strip(text);
		if (t) {
			t.split(/[\n|\s]/).forEach(function(word){
				var w = word.replace(/[.|,|"|!|\-|'\?]/g, '').toLowerCase();
				if (w.length > 0){
					words.push(w);
				}
			});
		}
	});
	return words;
}