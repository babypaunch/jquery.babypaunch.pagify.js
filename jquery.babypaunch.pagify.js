/*
* jquery pager plugin
* 만든이: 정대규
* 일시: 2015.10.08
* 버전: 0.1
* lisence: MIT(공짜)
*/

$.fn.pagify = function(settings){
    var defaults = {
        current: 1 //현재 페이지 번호(text)
        , total: 0 //전체 건수
        , pager: 10 //web에서는 보통 pager를 10개로 노출한다.
        , combo: [10, 20, 30, 50] //콤보박스의 선택에 대한 부분은 추후 개발 예정임.
        , list: 20 //한 화면에 listing될 갯수를 지정.
        , showCombo: true//콤보박스의 선택에 대한 부분은 추후 개발 예정임.
        , showFirstEnd: true//처음/끝 버튼을 보일지 여부.
		, attr: "offset" //set custom attr name
        
        , first: function(min){ //'처음' 버튼
            return {[this.attr] : min - 1, "text": min};
        }
        , prev: function(num, min){ //'이전' 버튼
            var _prev = (num - 1) * this.pager - this.pager + 1;
            return _prev < min ? {[this.attr]: min - 1, "text": min} : {[this.attr]: _prev - 1, "text": _prev};
        }
        , from: function(num){ //'pager 시작' 번호
            return num === 1 ? 1 : num * this.pager - this.pager + 1;
        }
        , to: function(num){ //'pager 끝' 번호
            return num === 1 ? this.pager : num * this.pager;
        }
        , next: function(num, max){ //'다음' 버튼
            var _next = num * this.pager + 1;
            return _next > max ? {[this.attr]: max - 1, "text": max} : {[this.attr]: _next - 1, "text": _next};
        }
        , end: function(max){ //'끝' 버튼
            return {[this.attr]: max - 1, "text": max};
        }
        
        /*
        * 커스터마이징을 하는 가장 중요한 부분일 수 있음.
        * 원하는 형태로 아래 ui 부분을 수정해서 사용하면 됨.
        * 동적으로 그려진 객체가 되며, 클릭에 대한 이벤트는 플러그인 외부에서 처리하면 됨.
        */
        , ui: {
			style: function(idx){
				var _style = "text-decoration: none; font-size: 1.2em; pointer: cursor;";
				switch(idx){
					case 0:
						_style += " color: silver; padding: 0.3em;"
					break;
					case 1:
						_style += " color: gray; padding: 0.3em; font-weight: bold;"
					break;
					default:
						_style += " color: gray; font-weight: bold;"
					break;
				}
				return " style='" + _style + "'";
			}
			/* easy set buttons
            , first: function(num, text){ //'처음' 버튼
                return "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style() + "> ≪ </a>\n";
            }
            , prev: function(num, text){ //'이전' 버튼
                return "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style() + "> ＜ </a>\n";
            }
            , pager: function(num, text, isCurrent){ //'pager' 버튼 전체
                return "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style(isCurrent ? 1 : 0) + ">" + text + "</a>\n";
            }
            , next: function(num, text){ //'다음' 버튼
                return "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style() + "> ＞ </a>\n";
            }
            , end: function(num, text){ //'끝' 버튼
                return "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style() + "> ≫ </a>\n";
            }
			*/
			/* default set buttons */
			, nav: function(type, num, text){
				var _type = "";
				switch(type){
					case "first":
						_type = "≪";
					break;
					case "prev":
						_type = "＜";
					break;
					case "next":
						_type = "＞";
					break;
					case "end":
						_type = "≫";
					break;
				}
                return "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style() + "> " + _type + " </a>\n";
			}
        } //end: , ui: {
    } //end: var defaults = {
    
    /*
    * 플러그인의 실행부
    */
    $.extend(true, defaults, settings); //ui 부분을 위한 deep copy
    
    var listed = Math.ceil(defaults.total / defaults.list); //리스트화된 전체 건수
    var paged = Math.ceil(listed / defaults.pager); //pager 그룹의 건수
    var result = {}; 
    
    for(var i = 0; i <= paged; i++){
        var fromTo = [];
        var inPaged = false;
        
        /* pager fromTo를 먼저 구한다. */
        for(var j = defaults.from(i), num = j - 1; j <= defaults.to(i); j++, num++){ 
            if(j <= listed){
                if(j === defaults.current){
                    inPaged = true;
                }
                fromTo.push({[defaults.attr]: num, "text": j, "isCurrent": j === defaults.current});
            }
        } //end: for(var j = defaults.from(i), num = j - 1; j <= defaults.to(i); j++, num++){
        
        if(inPaged){ //보여줄 pager에 해당되면
            if(defaults.showFirstEnd && paged > 1 && defaults.current !== 1){ //'처음' 버튼 추가 여부
                result.first = defaults.first(1);
            }
            if(defaults.current > defaults.pager){ //'이전' 버튼 추가 여부
                result.prev = defaults.prev(i, 1);
            }
            result.fromTo = fromTo; //미리 구한 'pager fromTo' 추가
            if(defaults.next(i, listed).text < defaults.end(listed).text){ //'다음' 버튼 추가 여부
                result.next = defaults.next(i, listed);
            }
            if(defaults.showFirstEnd && paged > 1 && defaults.current !== listed){ //'끝' 버튼 추가 여부
                result.end = defaults.end(listed);
            }
        } //end: if(inPaged){
    } //end: for(var i = 0; i <= paged; i++){
    
    return this.each(function(){
        var tags = "";
        var _ui = defaults.ui;
        
        /*
        * 동적으로 그릴 tag 작성
        * '처음, 끝' 버튼은 추후 작성 예정
        */
        for(var i in result){
            var _result = result[i];
            if(i === "fromTo"){
                for(var j = 0; j < _result.length; j++){
                    tags += _ui.pager(_result[j][defaults.attr], _result[j].text, _result[j].isCurrent);
                }
            }else{
                //tags += _ui[i](_result[defaults.attr], _result.text); //easy set buttons
                tags += _ui.nav(i, _result[defaults.attr], _result.text); //default set buttons
			}
        } //end: for(var i in result){

		if(defaults.showCombo){
			tags += "<select style='font-size: 1em;'>\n";
			for(var i = 0, combo = defaults.combo; i < combo.length; i++){
				tags += "\t<option value='" + combo[i] + "'" + (defaults.list === combo[i] ? " selected='selected'" : "") + ">"
					+ combo[i]
				+ "</option>\n";
			}
			tags += "</select>\n";
		} //end: if(defaults.showCombo){
        
        $(this).html(tags); //해당 객체에 결과 그려넣기.
    }); //end: return this.each(function(){
} //end: $.fn.pagify = function(settings){
