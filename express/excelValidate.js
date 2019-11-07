const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));


const absPath = __dirname + '\\'
const configPath = absPath + 'data.json'
const fileExists = fs.existsSync(configPath)

const result = (data, success= true)=>{
  return {
    msg: '',
    data: data,
    success: success
  }
}
app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "picGo.html" );
})

app.post('/excel/login', (req, res) => {
  res.send(result({
    appToken: 'sdasdasdas'
  }))
})
app.post('/excel/info', (req, res) => {
  res.send(result({
    username: 'zhibi',
    realName: '吕宗远',
    roleCode: 'admin'
  }))
})
app.post('/excel/user/list', (req, res) => {
  let arr = []
  for (let i = 0; i < 10; i++) {
    arr.push({name: `姓名${i}`,password: '123456', modifyDate: '2019-11-10',})
  }
  res.send(result({
    total: 20,
    list: arr
  }))
})
app.get('/picGoConfig/info', (req, res) => {
  const stat = fs.statSync(configPath)
  res.send(stat.mtime.toLocaleString())
})

app.get('/picGoConfig/download', (req, res) => {
  if (fileExists) {
    res.sendFile(configPath)
  } else {
    const response = {
      message: '配置文件不存在',
      success: false
    }
    res.send(response)
  }
})

app.post('/picGoConfig/upload', (req, res) => {
  const { data } = req.body
  fs.writeFile(configPath, JSON.stringify(data), (err) => {
    res.send({
      success: !!err,
      msg: err?'上传失败':'上传成功'
    })
  })
})

const server = app.listen(3000, function() {
  // const host = server.address().address
  const host = 'localhost'
  const port = server.address().port
  
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})