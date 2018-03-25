var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var dbconfig = require('./public/assets/js/configs/dbconfig.js');
var emailconfig = require('./public/assets/js/configs/emailconfig.js');
var connection = mysql.createConnection(dbconfig.db_connection);
var cors = require('cors');
var app = express();


app.use(cors());
connection.connect();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Methods Get */
  /* Messages */
  app.get('/getMessage', function(request, response){
    connection.query('SELECT * FROM messages ORDER BY date', function(err, rows, fields){
        if(err) throw err;

        response.json(rows);
    });
  });

  /* Gifts */
  app.get('/getGiftsList', function(request, response){
    connection.query('SELECT * FROM gifts ORDER BY product', function(err, rows, fields, status){
        if(err) throw err;

        response.json(rows);
    });
  });

/* Methods Post */
  /* Messages */
  app.post('/postMessage', function(request, response){
    var sqlQuery = {name: request.body.name, email: request.body.email, message: request.body.message},
      status,
      statusText;

    connection.query('INSERT INTO messages SET ?', sqlQuery, function(err, result){
      if (err) throw err;
    });

    response.sendStatus(200);
  });

  /* RSVPs */
  app.post('/postPresence', function(request, response){
    var sqlQueryRSVP = {name: request.body.name, email: request.body.email, presence: request.body.presence};

    connection.beginTransaction(function(err){
      if(err) {throw err;}
      connection.query('INSERT INTO rsvps SET ?', sqlQueryRSVP, function(err, result){
        if (err) {
          return connection.rollback(function(){
            throw err;
          });
        }

        for(var i in request.body.companions){
          request.body.companions[i].rsvps_id = result.insertId;
        }

        for(var i = 0, max = request.body.companions.length; i < max; i++){
          var sqlQueryCompanions = request.body.companions[i];

          connection.query('INSERT INTO companions SET ?', sqlQueryCompanions, function(err, result){
            if (err){
              return connection.rollback(function(){
                throw err;
              });
            }
            connection.commit(function(err){
              if(err){
                return connection.rollback(function(){
                  throw err;
                });
              }
            });
          });
        }
        console.log('Success!!!');
      });
    });

    response.sendStatus(200);
  });

  /* GiftGuest */
  app.post('/postChoosenGift', function(request, response){
    var nameguest = request.body.nameguest,
        emailguest = request.body.emailguest,
        idgift = request.body.idgift,
        nameGift = request.body.giftguest,
        imageGift = request.body.imageGift,
        descriptionGift = request.body.descriptionGift,
        brandGift = request.body.brandGift,
        modelGift = request.body.modelGift,
        colorGift = request.body.colorGift,
        voltageGift = request.body.voltageGift,
        amountGift = request.body.amountgiftguest,
        sqlQuery = {nameguest: nameguest, emailguest: emailguest, giftguest: nameGift, amountgiftguest: amountGift, idgift: idgift};

    connection.query('INSERT INTO choosen_gifts SET ?', sqlQuery, function(err, result){
      if (err) {
        throw err;
      }
      else{
        sendMailGift(nameguest, emailguest, nameGift, imageGift, descriptionGift, brandGift, modelGift, colorGift, voltageGift, amountGift);
      }
    });

    response.sendStatus(200);
  });

/* Função de envio de emails */
function sendMailGift(nameReceiver, emailReceiver, nameGift, imageGift, descriptionGift, brandGift, modelGift, colorGift, voltageGift, amountGift){
  // Criado para a reutilização do objeto transporter como padrão SMTP
  var transporter = nodemailer.createTransport(emailconfig.account.gmail);
  var description = '',
      brand = '',
      model = '',
      color = '',
      voltage = '';

  if(descriptionGift !== null){
    description = '<tr><td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;"><strong>Descrição: </strong>' + descriptionGift + '</td></tr>';
  }

  if(brandGift !== null){
    brand = '<tr><td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;"><strong>Marca: </strong>' +  brandGift + '</td></tr>';
  }

  if(modelGift !== null){
    model = '<tr><td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;"><strong>Modelo: </strong>' +  modelGift + '</td></tr>';
  }

  if(colorGift !== null){
    color = '<tr><td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;"><strong>Cor: </strong>' + colorGift + '</td></tr>';
  }

  if(voltageGift !== null){
    voltage = '<tr><td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;"><strong>Voltagem: </strong>' + voltageGift + 'V</td></tr>';
  }

  // Definição do HTML a ser enviado
  var templateHTML = '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                        '<tr>' +
                          '<td bgcolor="#ffffff" height="449" width="600" valign="top">' +
                            '<img src="http://www.ricardoetauana.com.br/assets/img/email/header.jpg" alt="Ricardo e Tauana" height="449" width="600" border="0" style="display: block">' +
                          '</td>' +
                        '</tr>' +
                        '<tr>' +
                          '<td bgcolor="#ffffff" height="50" width="600" valign="top">&nbsp;</td>' +
                        '</tr>' +
                        '<tr>' +
                          '<td bgcolor="#ffffff" width="600" valign="top">' +
                            '<table border="0" cellpadding="0" cellspacing="0" width="600">' +
                              '<tr>' +
                                '<td width="50" valign="top">&nbsp;</td>' +
                                '<td width="500" valign="top">' +
                                  '<table border="0" cellpadding="0" cellspacing="0" width="500">' +
                                    '<tr>' +
                                      '<td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 28px;"><strong>' + nameReceiver + ',</strong></td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="40" width="500" align="center" valign="top">&nbsp;</td>'+
                                    '</tr>' +
                                    '<tr>' +
                                      '<td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;">Você escolheu nos presentear com<br>' +
                                        '<strong>' + amountGift + ' ' + nameGift + '</strong>' +
                                      '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="50" width="500" align="center" valign="top">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="300" width="500" align="center" valign="top">' +
                                        '<table border="0" cellpadding="0" cellspacing="0" width="500">' +
                                          '<tr>' +
                                            '<td height="300" width="100" align="center" valign="top">&nbsp;</td>' +
                                            '<td height="300" width="300" align="center" valign="top"><img src="http://www.ricardoetauana.com.br/assets/img/gifts/' + imageGift + '" alt="' + nameGift + '" height="300" width="300"></td>' +
                                            '<td height="300" width="100" align="center" valign="top">&nbsp;</td>' +
                                          '</tr>' +
                                        '</table>' +
                                      '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="50" width="500" align="center" valign="top">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;">' +
                                        '<strong>Caracteristicas do produto:</strong>' +
                                      '</td>' +
                                    '</tr>' +
                                    description + brand + model + color + voltage +
                                    '<tr>' +
                                      '<td height="49" width="500" align="center" valign="top" style="border-bottom: 1px solid #000000">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="32" width="500" align="center" valign="top">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 28px;"><strong>Endereço de Entrega</strong></td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="26" width="500" align="center" valign="top">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="305" width="306" align="center" valign="top">' +
                                        '<img src="http://www.ricardoetauana.com.br/assets/img/email/map.jpg" alt="Rua Dom Pedro I, 65 - Ribeirão Pires - SP, CEP: 09401-280, Bairro: Colônia">' +
                                      '</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="45" width="500" align="center" valign="top">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;">Rua Dom Pedro I, 65, Ribeirão Pires<br>São Paulo, CEP: 09401-280<br>Bairro: Colônia</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td height="90" width="500" align="center" valign="top">&nbsp;</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                      '<td width="500" align="center" valign="top" style="color:#000000; font-family: Verdana, Tahoma, sans-serif; font-size: 20px;">Muito obrigado!!!</td>' +
                                    '</tr>' +
                                  '</table>' +
                                '</td>' +
                                '<td width="50" valign="top">&nbsp;</td>' +
                              '</tr>' +
                            '</table>' +
                          '</td>' +
                        '</tr>' +
                        '<tr>' +
                          '<td bgcolor="#ffffff" height="50" width="600" valign="top">&nbsp;</td>' +
                        '</tr>' +
                      '</table>';

  // Configuração dos dados do email com símbolos unicode
  var mailOptions = {
      from: emailconfig.sender.hotmail, // Endereço de remetente
      to: emailReceiver, // Lista de receptores
      subject: 'Endereço de entrega do presente', // Assunto
      text: templateHTML, // Corpo do plaintext
      html: templateHTML // Corpo do HTML
  };

  // Envio de email com a definição do objeto transporter
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }

      console.log('Message info response: ' + info.response);
  });
}

module.exports = app;