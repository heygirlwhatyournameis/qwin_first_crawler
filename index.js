var cheerio = require('cheerio');
var superagent = require('superagent');

const config = {
  id: 12199843,
};

((conf) => {
  const url = 'http://music.163.com/artist?id=' + conf.id;

  let item = [];

  superagent.get(url)
    .end((err, res) => {
      if (err)
        return next(err)
      const $ = cheerio.load(res.text, { decodeEntities: false });
      let title = $('#artist-name').text();
      let data = JSON.parse($('#song-list-pre-cache textarea').html())

      console.log(`${title}的歌曲`);
      data.forEach((val) => {
        console.log(`歌名:${val.name}  专辑：${val.album.name}`);
      })

    })
})(config);