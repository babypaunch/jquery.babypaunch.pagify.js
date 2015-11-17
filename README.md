<p>
그동안 수 많은 pager를 사용하고, 만들어오면서 쌓인 노하우를 남기고자 한다.<br/>
이 pager는 최대한 data와 view를 분리하고자 만든 내용이다보니, 한번에 모든 사용방법을 터득하긴 어려울 수도 있다. 하지만 반면에 data와 view를 최대한 분리한만큼 customizing이나 구현 방법이 다양할 것이라고 생각한다.<br/>
자유롭게 사용하고, 이런 개발자도 있구나..하고 기억해주시면 감사할거 같다<br/>
</p>

<p>
1. requirements(필요사항)<br/>
1.1. jquery는 1.9.x 이상이면 문제없음을 확인함.(2015.10.07)<br/>
</p>

<p>
2. options(옵션)
<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>description</th>
  </tr>
  <tr>
    <td>current</td>
    <td>number</td>
    <td>1</td>
    <td>현재 페이지의 번호</td>
  </tr>
  <tr>
    <td>total</td>
    <td>number</td>
    <td>0</td>
    <td>페이징 처리할 전체 건수</td>
  </tr>
  <tr>
    <td>pager</td>
    <td>number</td>
    <td>10</td>
    <td>페이저로 노출할 갯수. 웹에서는 일반적으로 10개의 페이저를 구성하고, 모바일에서는 5개 정도면 적당하다.</td>
  </tr>
  <tr>
    <td>textType</td>
    <td>boolean</td>
    <td>true</td>
    <td>pager를 출력할때 나타날 형태를 지정. false이면 input 태그중에 number type으로 대체되어 출력됨.</td>
  </tr>
  <tr>
    <td>combo</td>
    <td>array</td>
    <td>[10, 20, 30, 50]</td>
    <td>한 화면에 보여질 게시물의 건수를 그룹으로 지정.</td>
  </tr>
  <tr>
    <td>list</td>
    <td>number</td>
    <td>20</td>
    <td>한 화면에 보여질 게시물의 건수를 지정. 웹이면 일반적으로 20개, 모바일이면 10개 정도로 지정하면 됨.</td>
  </tr>
  <tr>
    <td>showListed</td>
    <td>boolean</td>
    <td>false</td>
    <td>페이징 처리된 전체 건수를 보여줄지 지정</td>
  </tr>
  <tr>
    <td>showCombo</td>
    <td>boolean</td>
    <td>true</td>
    <td>콤보박스를 보여줄지 지정</td>
  </tr>
  <tr>
    <td>showPrevNext</td>
    <td>boolean</td>
    <td>true</td>
    <td>이전/다음 버튼을 보여줄지 지정</td>
  </tr>
  <tr>
    <td>showFirstend</td>
    <td>boolean</td>
    <td>true</td>
    <td>처음/끝 버튼을 보여줄지 지정</td>
  </tr>
  <tr>
    <td>attr</td>
    <td>string</td>
    <td>"index"</td>
    <td>동적으로 그려질 페이저에 커스텀속성으로 넣을 이름을 지정. default를 그대로 사용하는 경우 data-index라는 속성을 가지게되며, offset이 0인 페이지별 값을 가진다.</td>
  </tr>
  <tr>
    <td>classes</td>
    <td>json</td>
    <td>{first: "first", prev: "prev", current: "on", next: "next", end: "end"}</td>
    <td>동적으로 그려질 페이저에 커스텀 클래스명을 지정할 수 있음.</td>
  </tr>
</table>
</p>

<p>
3. sample code file: index.html
</p>

<p>
4. ETC(기타)<br/>
4.1. MIT License(2015.10.07 ~ forever)로 해당 플러그인을 마음껏 사용해도 좋음.<br/>
4.2. 한국의 웹표준화 작업에는 적절치 않을 수 있음.(2015.10.07)<br/>
</p>

<p>
5. contact: babypaunch@gmail.com<br/>
</p>
