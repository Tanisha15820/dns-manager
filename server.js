const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudflare = require('cloudflare');
const path = require('path');

const cf = new cloudflare({
  email: 'tanisha15820@gmail.com',
  key: 'kShZftK7dJxF1-A7EWA3n6J4mQ9ERdnnL63j3bsY'
});

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.post('/dns/create', (req, res) => {
  const { domain, type, name, content, ttl } = req.body;
  
  if (!req.session || !req.session.loggedIn) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  cf.dnsRecords.add('6b9835d97d19557c58678e34a3940ded', {
    type: type,
    name: name,
    content: content,
    ttl: ttl
  })
    .then(response => {
      res.json({ success: true, message: 'DNS record created successfully' });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Failed to create DNS record', error: err });
    });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
