//Init
const TelegramBot 	= require("node-telegram-bot-api");
const os 			= require('os');
const cfg 			= require("./config.js");
const bot 			= new TelegramBot(cfg.token, cfg.options);

var receiveCommands = false;

async function onCommand(msg, match) 
{
	try
	{
		const me = await bot.getMe({}).catch(function(){});		//User object for bot
		const arg = match[1].split(' ');						//Command args
		var cmd = arg[0].toLowerCase();										//Command
		if (cmd.includes(me.username))
		{
			cmd = cmd.split('@')[0];
		}

		var params = { reply_to_message_id: msg.message_id, };
		

		if (receiveCommands) switch (cmd) 
		{
			case "start":
			{
				const userPhotos = await bot.getUserProfilePhotos(me.id, 0, 0);
				params = { reply_to_message_id: msg.message_id,
							caption: "<b>XNode bot by eightxn</b>\n<b>Version:</b> 0.2-dbg\n<b>Lang:</b> Node.JS",
							parse_mode: "html"};

				await bot.sendPhoto(msg.chat.id, 
					userPhotos.photos[0][2].file_id,
					params);
			}				
			break;		
				
			case "printf":
			{
				if (arg.length > 1) 
				{
					const text = msg.text.replace('/' + arg[0], '');
					await bot.sendMessage(msg.chat.id, 
						text, 
						params);
				} 
				else 
				{
					params = {
						reply_to_message_id: msg.message_id,
						parse_mode: "html",
					};
						
					await bot.sendMessage(msg.chat.id, 
						"<b>Command using:</b> <i>'/printf some text' = 'some text'</i>", 
						params);
				}
			}
			break;
					
			case "rand":
			{
				params = { reply_to_message_id: msg.message_id,
					parse_mode: "html"};
					
				if (arg.length > 2)
				{
					const text = "<b>Your number is:</b> " + cfg.Rand(Number(arg[1]), Number(arg[2]));
					await bot.sendMessage(msg.chat.id, 
						text, 
						params);
				}
				else 
				{
					await bot.sendMessage(msg.chat.id, 
						"<b>Command using:</b> <i>'/rand arg1 arg2' = '%random number between arg1 and arg2%'</i>", 
						params);
				}
			}
			break;

			case "":
			{
				
			}
			break;
		}
	}
	catch(err)
	{
		console.log(err);
	}
}
async function onDirCommand(msg, match)
{	
	try
	{
		if (msg.from.id == cfg.admin)
		{
			const me = await bot.getMe({}).catch(function(){});		//User object for bot
			const arg = match[1].split(' ');						//Command args
			const cmd = arg[0].split('@')[0].toLowerCase();			//Command
			var params = { reply_to_message_id: msg.message_id, };
			
			switch (cmd)
			{
				case "crc":
				{
					receiveCommands = !receiveCommands;
					await bot.sendMessage(msg.chat.id,
						`Commands receiving: ${receiveCommands}`,
						params);
					console.log(`Commands receiving: ${receiveCommands}`);
				}
				break;

				case "sys":
				{
					var text = `OS type: ${os.type()}
								OS platform: ${os.platform()}
								OS arch: ${os.arch()}
								OS release: ${os.release()}`
					await bot.sendMessage(msg.chat.id,
						text,
						params);
				}
				break;
			}
		}
	}
	catch(err)
	{
		console.log(err);
	}
}

//Etc
bot.onText(/\/(.+)/, onCommand);							//Standart command
bot.onText(/#xdev (.+)/, onDirCommand);						//Directive