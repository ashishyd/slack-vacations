const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    // socketMode: true,
    // appToken: process.env.APP_TOKEN
});

app.command('/add-vacation', async ({ ack,body, client, say, respond }) => {
    try{
        await ack();
        const result = await client.views.open({
            trigger_id: body.trigger_id,
            view: {
                type: 'modal',
                callback_id: 'view_1',
                title: {
                    type: 'plain_text',
                    text: 'Add New Vacation'
                },
                blocks: [
                    {
                        type: 'input',
                        block_id: 'input_start_datetime',
                        label: {
                            type: 'plain_text',
                            text: 'Start date'
                        },
                        element: {
                            type: 'datepicker',
                            action_id: 'start_datetime_input',
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'input_end_datetime',
                        label: {
                            type: 'plain_text',
                            text: 'End date'
                        },
                        element: {
                            type: 'datepicker',
                            action_id: 'end_datetime_input',
                        }
                    },
                    {
                        type: 'input',
                        block_id: 'input_general_info',
                        label: {
                            type: 'plain_text',
                            text: 'General Info'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'input_text_general_info',
                            multiline: true
                        }
                    },
                    {
                        type: 'input',
                        block_id: 'input_backups',
                        label: {
                            type: 'plain_text',
                            text: 'Backup Users'
                        },
                        element: {
                            type: 'multi_users_select',
                            action_id: 'backup_users_select'
                        }
                    }
                ],
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                }
            }
        });
        await say(result.view.title);
    } catch (err){
        console.log(err);
    }
});

app.command('/vacations',  async ({ command, ack, say}) => {
    try{
        await ack();
        await say("Welcome to vacations app!");
    } catch (err) {
        console.log(err);
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
