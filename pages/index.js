import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import axios from 'axios'



function Titulo (props) {
    const Tag = props.tag
    return (
        <>
        <Tag>{props.children}</Tag>
        <style jsx> {`
            ${Tag}{
                color: ${appConfig.theme.colors.neutrals['900']};
                font-size: 24px;
                font-weight: 600;
            }
            `}
            </style>
        </>
    )
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('')
    // const [info, setInfo] = React.useState('')
    const roteamento = useRouter();
    const nullPic = 'https://media.istockphoto.com/photos/half-of-orage-fruit-slice-isolated-on-white-picture-id950915068?b=1&k=20&m=950915068&s=170667a&w=0&h=QmGr8Pjt6KJPQYmwtbZiJ0t2bvWUGHriILUJJJ_bSUk='


    
      // const githubApi = async () => {
      //   await axios.get(`https://api.github.com/users/${username}`).then((response) => {
      //   setInfo(response.data)
      //       // console.log(response.data)
      //   })
      // }
      // githubApi()

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://cdn.wallpapersafari.com/29/67/4mL0ap.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[600],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (event){
                event.preventDefault()
                console.log('alguém enviou o form')
                roteamento.push('/chat')
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Welcome, folks!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['800'] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                placeholder='Insira seu user do Github aqui... 😁'
                autoComplete="off"
                value = {username}
                onChange={function (event){
                  const userValue = event.target.value
                  setUsername(userValue)
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[300],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                  },
                }}
              />
              <Button
                type='submit'
                disabled={username.length < 3}
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[900],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[500],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={ username.length > 2 ? `https://github.com/${username}.png` : nullPic}
                onError = { function(error) {
                  error.target.src = `${nullPic}`
                }}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['050'],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
                
              </Text>
              {/* <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['050'],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
               Nome: {info.name}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['050'],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
              Repositórios: {info.public_repos}
              </Text> */}
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }