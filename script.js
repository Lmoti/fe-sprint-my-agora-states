// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 질문 제목 및 정보
  const discussionTitle = document.createElement('h2');
  const discussionUrl = document.createElement('a');
  discussionTitle.className = 'discussion__title';
  discussionUrl.setAttribute('target', '_blink');
  discussionUrl.textContent = obj['title'];
  discussionUrl.href = obj.url;
  discussionTitle.appendChild(discussionUrl);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj['author']} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  // 답변
  // if (obj.answer !== null) {
  // discussionAnswered.textContent = '☑';
  // }
  discussionAnswered.textContent = obj.answer ? '☑' : '☒';


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 디스커션 추가 기능
const submit = document.querySelector('.btn');
submit.onclick = () => {
  console.log('눌리냐?')
  let enterName = document.querySelector('#name');
  let enterTitle = document.querySelector('#title');
  let yourQuestion = document.querySelector('#story');
  const date = new Date();
  let addAgoraStates = {
    author: `${enterName.value}`,
    title: `${enterTitle.value}`,
    // 날짜
    createdAt: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  };
  if (enterName.value && enterTitle.value && yourQuestion.value) {
    console.log(addAgoraStates.author);
    console.log(addAgoraStates.title);
    agoraStatesDiscussions.unshift(addAgoraStates);
    enterName.value = '';
    enterTitle.value = '';
    yourQuestion.value = '';
    ul.innerHTML = '';
    render(ul);
  }
  else {
    alert("양식에 맞춰 모두 적고 제출하세요");
  }
}


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);