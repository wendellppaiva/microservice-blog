const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    const event = {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    };
    await axios.post('http://localhost:4005/events', event).catch((err) => {
      console.log(err.message);
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003: Moderation');
});
