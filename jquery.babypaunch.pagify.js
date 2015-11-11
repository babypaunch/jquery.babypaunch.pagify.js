/*
* jquery pager plugin
* dev: 정대규(jeong dae gyu)
* first: 2015.10.08
* update: 2015.11.12
* version: 0.2
* lisence: MIT(free)
*/

$.fn.pagify = function(settings){
    var defaults = {
        current: 1 //현재 페이지 번호(text)
        , total: 0 //전체 건수
        , pager: 10 //web에서는 보통 pager를 10개로 노출한다.
		, textType: true //pager의 type을 결정, true이면 숫자링크, false면 input으로 출력
        , combo: [10, 20, 30, 50] //콤보박스의 선택에 대한 부분은 추후 개발 예정임.
        , list: 20 //한 화면에 listing될 갯수를 지정.
        , showCombo: true //콤보박스의 선택에 대한 부분은 추후 개발 예정임.
		, showPrevNext: true //이전/다음 버튼을 보일지 여부.
        , showFirstEnd: true //처음/끝 버튼을 보일지 여부.
		, attr: "index" //set custom attr name
        
        , first: function(min){ //'처음' 버튼
            return {[this.attr] : min - 1, "text": min};
        } //end: , first: function(min){
        , prev: function(num, min){ //'이전' 버튼
            var _prev = (num - 1) * this.pager - this.pager + 1;
            return _prev < min ? {[this.attr]: min - 1, "text": min} : {[this.attr]: _prev - 1, "text": _prev};
        } //end: , prev: function(num, min){
        , from: function(num){ //'pager 시작' 번호
            return num === 1 ? 1 : num * this.pager - this.pager + 1;
        } //end: , from: function(num){
        , to: function(num){ //'pager 끝' 번호
            return num === 1 ? this.pager : num * this.pager;
        } //end: , to: function(num){
        , next: function(num, max){ //'다음' 버튼
            var _next = num * this.pager + 1;
            return _next > max ? {[this.attr]: max - 1, "text": max} : {[this.attr]: _next - 1, "text": _next};
        } //end: , next: function(num, max){
        , end: function(max){ //'끝' 버튼
            return {[this.attr]: max - 1, "text": max};
        } //end: , end: function(max){
        
        /*
        * 커스터마이징을 하는 가장 중요한 부분일 수 있음.
        * 원하는 형태로 아래 ui 부분을 수정해서 사용하면 됨.
        * 동적으로 그려진 객체가 되며, 클릭에 대한 이벤트는 플러그인 외부에서 처리하면 됨.
        */
        , ui: {
			style: function(idx){
				var _style = "text-decoration: none; font-size: 1em; pointer: cursor;";
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
			} //end: style: function(idx){

			/*
			* default set buttons
			* 아래 _type 부분을 편의에 따라 img, span, i 등의 tag로 수정해서 사용하면 됨.
			*/
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
			} //end: , nav: function(type, num, text){

            , pager: function(num, text, isCurrent, type, listed){ //'pager' 버튼 전체
				var result = "";
				if(type === 0){ //일반 텍스트 타입
					result = "<a href='#' data-" + defaults.attr + "='" + num + "'" + this.style(isCurrent ? 1 : 0) + ">" + text + "</a>\n";
				}else{ //input 타입
					result = "<input type='number' min='1' max='" + listed + "' data-" + defaults.attr + "='" + num + "' value='" + text + "' style='font-size: 1em; width: 60px; text-align: right;'/>\n";
				}
                return result;
            } //end: , pager: function(num, text, isCurrent, type, listed){ //'pager' 버튼 전체
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
            if(defaults.showPrevNext && defaults.current > defaults.pager){ //'이전' 버튼 추가 여부
                result.prev = defaults.prev(i, 1);
            }
            result.fromTo = fromTo; //미리 구한 'pager fromTo' 추가
            if(defaults.showPrevNext && defaults.next(i, listed).text < defaults.end(listed).text){ //'다음' 버튼 추가 여부
                result.next = defaults.next(i, listed);
            }
            if(defaults.showFirstEnd && paged > 1 && defaults.current !== listed){ //'끝' 버튼 추가 여부
                result.end = defaults.end(listed);
            }
        } //end: if(inPaged){
    } //end: for(var i = 0; i <= paged; i++){
    
    return this.each(function(){
        var tags = ""; //최종적으로 그릴 tag
        var _ui = defaults.ui;
        
        /*
        * 동적으로 그릴 tag 작성
        * '처음, 끝' 버튼은 추후 작성 예정
        */
        for(var i in result){ //계산된 json 객체
            var _result = result[i];
            if(i === "fromTo"){ //pager 부분에 해당하면
				for(var j = 0; j < _result.length; j++){
					if(defaults.textType){ //pager의 type이 text이면
						tags += _ui.pager(_result[j][defaults.attr], _result[j].text, _result[j].isCurrent, 0);
					}else{ //pager의 type이 text가 아니면 input
						if(_result[j].isCurrent){ //current에 해당하는 값만 attr에 남기면 됨.
							tags += _ui.pager(_result[j][defaults.attr], _result[j].text, _result[j].isCurrent, 1, listed);
						}
					}
				}
            }else{
                tags += _ui.nav(i, _result[defaults.attr], _result.text); //default set buttons
			}
        } //end: for(var i in result){

		if(defaults.showCombo){ //select box의 처리
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
