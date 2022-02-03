import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router'
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMzkwOSwiZXhwIjoxOTU4ODk5OTA5fQ.Ni7qrY4kcbZQ7PaBnrhQZOcoy8JKb86RmIC67rO2L_c'
const SUPABASE_URL = 'https://qokjwfxodftlgcjrgdwf.supabase.co'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function liveMsg(addMessage) {
    return supabase
      .from('aluracord-msg')
      .on("INSERT", (respLive) => {
        addMessage(respLive.new);
      })
      .subscribe();
  }
  


export default function ChatPage() {
    const roteamento = useRouter();
    const login = roteamento.query.username;
    const [message, setMessage] = React.useState('')
    const [msgList, setMsgList] = React.useState([])

    React.useEffect(() => {
        supabase
        .from('aluracord-msg')
        .select('*')
        .order('id', {ascending: false})
        .then((data) =>{
        setMsgList(data.data)
    });
    liveMsg((newMsg) => {
        setMsgList((newValue) =>{
            return [newMsg, newValue]
        });
    });
    }, []);


    function handleNewMsg(newMsg) {
        const msg = {
            from: login,
            text: newMsg
        };
        supabase
        .from('aluracord-msg')
        .insert([msg])
        .then(({data}) => {
            console.log(data)
            setMsgList([
                data[0],
                ...msgList
            ])
        })
        setMessage('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://cdn.wallpapersafari.com/29/67/4mL0ap.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList msg={msgList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={function (e) {
                                const val = e.target.value;
                                setMessage(val);
                            }}
                            onKeyPress={function (e) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNewMsg(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            type="submit"
                            label="Enviar"
                            disabled={message.length < 2}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNewMsg(message);
                            }}
                            styleSheet={{
                                width: "70px",
                                borderRadius: "5px",
                                height: "60px",
                                marginBottom: "8px"
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals[999],
                                mainColor: appConfig.theme.colors.primary[600],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[300],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props)
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.msg.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {message.text}
                    </Text>
                )
            })}
        </Box>
    )
}