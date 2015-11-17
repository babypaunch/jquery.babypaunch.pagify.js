/*
* jquery pager plugin
* dev: 정대규(jeong dae gyu)
* first: 2015.10.08
* update: 2015.11.18
* version: 1.0
* lisence: MIT(free)
*/

$.fn.pagify = function(setting){
	"use strict";

    var config = {
        current: 1 //현재 페이지 번호, offset은 1부터
        , total: 0 //전체 건수
        , pager: 10 //노출할 pager 갯수
		, isText: true //pager의 스타일을 결정, true이면 숫자링크, false면 input으로 출력
        , combo: [10, 20, 30, 50] //listing group
        , list: 20 //한 화면에 listing될 갯수를 지정.
        , showListed: false //전체 건수 show/hide
        , showCombo: true //콤보박스 show/hide
		, showPrevNext: true //이전/다음 버튼 show/hide
        , showFirstEnd: true //처음/끝 버튼 show/hide
		, attr: "index" //set custom attr name
		, classes: {
			first: "first"
			, prev: "prev"
			, current: "on"
			, next: "next"
			, end: "end"
		}
    }; //end: var config = {

	var method = {
        first: function(min){ //'처음' 버튼
            return {[config.attr] : min - 1, "text": min};
        } //end: , first: function(min){
        , prev: function(num, min){ //'이전' 버튼
            var _prev = (num - 1) * config.pager - config.pager + 1;
            return _prev < min ? {[config.attr]: min - 1, "text": min} : {[config.attr]: _prev - 1, "text": _prev};
        } //end: , prev: function(num, min){
        , from: function(num){ //'pager 시작' 번호
            return num === 1 ? 1 : num * config.pager - config.pager + 1;
        } //end: , from: function(num){
        , to: function(num){ //'pager 끝' 번호
            return num === 1 ? config.pager : num * config.pager;
        } //end: , to: function(num){
        , next: function(num, max){ //'다음' 버튼
            var _next = num * config.pager + 1;
            return _next > max ? {[config.attr]: max - 1, "text": max} : {[config.attr]: _next - 1, "text": _next};
        } //end: , next: function(num, max){
        , end: function(max){ //'끝' 버튼
            return {[config.attr]: max - 1, "text": max};
        } //end: , end: function(max){

		, result: function(){
			var listed = Math.ceil(config.total / Number(config.list)); //리스트화된 전체 건수
			var paged = Math.ceil(listed / config.pager); //pager 그룹의 건수
			var json = {
				listed: listed
				, paged: paged
			}; //return type
			
			for(var i = 0; i <= paged; i++){
				var fromTo = [];
				var inPaged = false;
				
				/* pager fromTo를 먼저 구한다. */
				for(var j = this.from(i), num = j - 1; j <= this.to(i); j++, num++){ 
					if(j <= listed){
						if(j === config.current){
							inPaged = true;
						}
						fromTo.push({[config.attr]: num, "text": j, "isCurrent": j === config.current});
					}
				} //end: for(var j = this.from(i), num = j - 1; j <= this.to(i); j++, num++){ 
				
				if(inPaged){ //보여줄 pager에 해당되면
					if(config.showFirstEnd && paged > 1 && config.current !== 1){ //'처음' 버튼 추가 여부
						json.first = this.first(1);
					}
					if(config.showPrevNext && config.current > config.pager){ //'이전' 버튼 추가 여부
						json.prev = this.prev(i, 1);
					}
					json.fromTo = fromTo; //미리 구한 'pager fromTo' 추가
					if(config.showPrevNext && this.next(i, listed).text < this.end(listed).text){ //'다음' 버튼 추가 여부
						json.next = this.next(i, listed);
					}
					if(config.showFirstEnd && paged > 1 && config.current !== listed){ //'끝' 버튼 추가 여부
						json.end = this.end(listed);
					}
				} //end: if(inPaged){
			} //end: for(var i = 0; i <= paged; i++){

			return json;
		} //end: , result: function(){
	}; //end: var method = {
        
	/*
	* 커스터마이징을 하는 가장 중요한 부분일 수 있음.
	* 원하는 형태로 아래 ui 부분을 수정해서 사용하면 됨.
	* 동적으로 그려진 객체가 되며, 클릭에 대한 이벤트는 플러그인 외부에서 처리하면 됨.
	*/
	var ui = {
		listed: function(total){
			return "<span>" + total + "</span>";
		}

		, pager: function(config, dataset){
			var str = "";
			var listed = dataset.listed;

			if(config.isText && config.showListed){
				str += this.listed(listed) + " ";
			}

			for(var i in dataset){ //계산된 json 객체
				var data = dataset[i];
				var attr = config.attr;
				var classes = config.classes;

				if(i === "first"){
					str += "<a href='#' data-" + attr + "='" + data[attr] + "' class='" + classes.first + "'> ≪ </a>\n";
				}
				if(i === "prev"){
					str += "<a href='#' data-" + attr + "='" + data[attr] + "' class='" + classes.prev + "'> ＜ </a>\n";
				}
				if(i === "fromTo"){
					for(var j = 0; j < data.length; j++){
						var _data = data[j];
						if(config.isText){
							var _current = _data.isCurrent ? "[" + _data.text + "]" : _data.text;
							var _currentClass = _data.isCurrent ? classes.current : "";
							str += "<a href='#' data-" + attr + "='" + _data[attr] + "' class='" + _currentClass + "'> " + _current + " </a>\n";
						}else{
							if(_data.isCurrent){
								str += "<input type='number' min='1' max='" + listed + "' data-" + attr + "='" + _data[attr] + "' value='" + _data.text + "'/>\n";
								if(config.showListed){
									str += " / " + this.listed(listed);
								}
							}
						}
					}
				}
				if(i === "next"){
					str += "<a href='#' data-" + attr + "='" + data[attr] + "' class='" + classes.next + "'> ＞ </a>\n";
				}
				if(i === "end"){
					str += "<a href='#' data-" + attr + "='" + data[attr] + "' class='" + classes.end + "'> ≫ </a>\n";
				}
			} //end: for(var i in dataset){
			return str;
		} //end: pager: function(config, dataset){

		, select: function(config){
			var str = "";
			if(config.showCombo){ //select box의 처리
				str += "<select>\n";
				for(var i = 0, combo = config.combo; i < combo.length; i++){
					str += "\t<option value='" + combo[i] + "'" + (Number(config.list) === combo[i] ? " selected='selected'" : "") + ">"
						+ combo[i]
					+ "</option>\n";
				}
				str += "</select>\n";
			} //end: if(config.showCombo){
			return str;
		} //end: , select: function(config){
	}; //end: var ui = {
    
    /*
    * 플러그인의 실행부
    */
    $.extend(config, setting); //ui 부분을 위한 deep copy
	var dataset = method.result();

    return this.each(function(){
        var html = ""; //최종적으로 그릴 객체들
		html += ui.pager(config, dataset); //pager 그리기
		html += ui.select(config); //select box 그리기
        $(this).html(html); //해당 객체에 결과 그려넣기.
    }); //end: return this.each(function(){
} //end: $.fn.pagify = function(setting){
