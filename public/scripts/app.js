// Client facing scripts here
const BASE_URL = 'http://localhost:1234/'
$(() => {
  const $api_key = 'N7gUjYrwZdtcyknRlQUgu3CJQpVmUhDZ05tG7ajgY6I';


  const $showImages = function(images) {
    images.forEach((image) => {
      const $imgHtml = `
        <div class="img-box">
          <div class="pic-box">
            <img src="${image.urls.thumb}" alt="${image.alt_description}"
          </div>
          <p class="img-name">${image.alt_description}</p>
        </div>
      `;

      $('.results').append($imgHtml);
    });
  }

  const $showTexts = (text) => {
    const $txtHtml = `
      <div class="text-container">
      <p class="user1">${text[0].content}</p>
      <p class="seller1">${text[1].content}</p>
      <p class="user2">${text[2].content}</p>
      <p class="seller2">${text[3].content}</p>
      </div>
    `;

    $('.message').append($txtHtml);

  }

  const $getImages = () => {
    $.get({
      url: `https://api.unsplash.com/search/photos?query=vintage&client_id=${$api_key}`
    })
    .done((data) => {
      console.log(data)
      $('.results').empty();
      $showImages(data.results)
    })
  }
  $getImages();

  const setActive = ()=> {
    console.log($('.carousel-item')[0]);
  }
  setActive();


  $('#texts').on('click', () => {
    console.log('you clicked messages')
    $.get({
      url: `${BASE_URL}api/users/messages`
    })
    .then((data) => {
      console.log(data);
      $showTexts(data)
    })
  })


  $('#texts').on('click', () => {
    console.log('you clicked messages')
    $.get({
      url: `${BASE_URL}api/users/messages`
    })
    .then((data) => {
      console.log(data);
      $showTexts(data)
    })
  })

})
